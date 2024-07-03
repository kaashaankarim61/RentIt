import mysql.connector
import pandas as pd
import nltk
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import re
nltk.download('punkt')
nltk.download('wordnet')
nltk.download('stopwords')


# Establish a connection to MySQL
connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='123456',
    database='rentitschema'
)

cursor = connection.cursor()

#Featch Data From MySQL
cursor.execute("SELECT * FROM rentitschema.items join itemcategories on itemCategory = itemcategories.categoryID")
data = cursor.fetchall()
columns = [column[0] for column in cursor.description]
df = pd.DataFrame(data, columns=columns)
print(df)

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Function to lemmatize and process text
def process_text(text):
    # Tokenize the text into words
    words = word_tokenize(text) 
    # Lemmatize each word, convert to lowercase, and remove stopwords
    processed_words = [lemmatizer.lemmatize(word.lower()) for word in words if word.lower() not in stopwords.words('english')]
    # Join the processed words back into a string
    processed_text = ' '.join(processed_words)
    
    processed_text = processed_text.replace('#', ' ')
    return processed_text



# Apply processing to the specified columns
df['itemDescription'] = df['itemDescription'].apply(process_text)
df['itemName'] = df['itemName'].apply(process_text)
df['keywords'] = df['keywords'].apply(process_text)
print(df['keywords'])
df['mainCategory'] = df['mainCategory'].apply(process_text)
df['subCategory'] = df['subCategory'].apply(process_text)
df['type'] = df['type'].apply(process_text)


# Combine columns into a single column
df['combined_text'] =   df['itemName']  + ' ' +df['subCategory'] + ' ' + df['type'] + ' ' + df['keywords']  # Replace 'column1' and 'column2' with your column names

# Initialize TF-IDF Vectorizer
tfidf = TfidfVectorizer()

# Fit the vectorizer to the combined text
tfidf_matrix = tfidf.fit_transform(df['combined_text'])

# Get the feature names (words/tokens)
feature_names = tfidf.get_feature_names_out()

# Convert the TF-IDF matrix to a DataFrame
tfidf_df = pd.DataFrame(tfidf_matrix.toarray(), columns=feature_names)

# Display the TF-IDF DataFrame
tfidf_df.head(20)

print(tfidf_df)


dense_tfidf_matrix = tfidf_matrix.toarray()

# Compute cosine similarity between documents using sklearn's cosine_similarity function
cosine_similarities = cosine_similarity(dense_tfidf_matrix, dense_tfidf_matrix)

# Create a DataFrame for cosine similarities
cosine_df = pd.DataFrame(cosine_similarities, columns=df.index, index=df.index)

# Display the Cosine similarity DataFrame
cosine_df.head(20)

print(cosine_df)

search_ids = df['itemId'].tolist()

# Assuming 'df' is your DataFrame containing the data
indices = df[df['itemId'].isin(search_ids)].index.tolist()

print("Indices where itemId matches search_ids:", indices)
print("Index : ", indices)


retrieved_columns = []
result_dict = {}

threshold = 0.02  # Set the threshold value for cosine similarity

for index in indices:
    retrieved_columns.append(cosine_df.iloc[:, index])

for idx, column in zip(indices, retrieved_columns):
    # Calculate cosine similarity for the column
    cosine_similarities = np.abs(column)

    # Filter values based on threshold
    similar_indices = cosine_similarities[cosine_similarities > threshold].index.tolist()

    # Sort indices based on cosine similarity in descending order
    sorted_indices = cosine_similarities.argsort()[::-1]

    # Filter indices based on threshold and take the first 5 similar indices
    similar_indices_sorted = [i for i in sorted_indices if i in similar_indices][:5]

    result_dict[idx] = similar_indices_sorted

print(result_dict)


# Replace indices in result_dict keys and values
updated_result_dict = {}
for idx, values in result_dict.items():
    # Replace index in key
    updated_idx = df.loc[idx, 'itemId']
    # Replace indices in values
    updated_values = [df.loc[val, 'itemId'] for val in values]
    updated_result_dict[updated_idx] = updated_values

print(updated_result_dict)

# Truncate the related_pairs table
cursor.execute("TRUNCATE TABLE related_pairs")


# Insert pairs from updated_result_dict
for key, values in updated_result_dict.items():
    for value in values:
        # Convert numpy.int64 to int
        key_int = int(key)
        value_int = int(value)
        # Only insert if the pair doesn't already exist
        cursor.execute("INSERT INTO related_pairs (itemId, related) SELECT %s, %s FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM related_pairs WHERE itemId = %s AND related = %s)", (key_int, value_int, key_int, value_int))
        # For reciprocal relationship, uncomment the next line
        # cursor.execute("INSERT INTO related_pairs (itemId, related) SELECT %s, %s FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM related_pairs WHERE itemId = %s AND related = %s)", (value_int, key_int, value_int, key_int))

# Commit changes to the database
connection.commit()

# Close the cursor and connection
cursor.close()
connection.close()
