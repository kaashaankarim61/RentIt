const pool = require('../dbConfig');
const messageQueries = require('../chatModule/messageQueries'); // Adjust path if needed

const getMessages = (req, res) => {
    const conversationId = req.params.id; // Assuming the conversation ID is passed as 'id' in the request parameters

    
    pool.query(messageQueries.getMessages,[conversationId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error fetching messages' });
        } else {
            res.json(results);
        }
        });
};

const insertMessage = (req, res) => {
    const { text, conversationId, senderId } = req.body;

    pool.query(messageQueries.insertMessage, [text, conversationId, senderId], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error inserting message' });
        } else {
            res.status(200).json({ message: 'Message inserted successfully' });
        }
    });
};
const addConversation = (req, res) => {
    const { participant1, participant2, unReadCount, status ,message} = req.body;
    const query = `
    SELECT 
        c.id AS conversationId,
        c.created_at AS createdAt,
        c.participant1 AS participant1Id,
        u1.name AS participant1Name,
        u1.email AS participant1Email,
        u1.profilePic AS participant1ProfilePic,
        c.participant2 AS participant2Id,
        u2.name AS participant2Name,
        u2.email AS participant2Email,
        u2.profilePic AS participant2ProfilePic,
        c.unReadCount,
        c.status
    FROM 
        rentitschema.conversation AS c
    JOIN
        rentitschema.users AS u1 ON c.participant1 = u1.userId
    JOIN
        rentitschema.users AS u2 ON c.participant2 = u2.userId
    WHERE
        (c.participant1 = ? AND c.participant2 = ?) OR (c.participant1 = ? AND c.participant2 = ?)`;

    // First, check if a conversation between the participants already exists
    pool.query(query, [participant1, participant2, participant2, participant1], (error, results) => {
        if (error) {
            console.error('Error checking conversation:', error);
            return res.status(500).json({ error: 'Error checking conversation' });
        }

        // If a conversation already exists, send success response without inserting
        if (results.length > 0) {
            console.log('Conversation already exists:', results);
            return res.status(200).json({ success: 'Conversation already exists' });
        }

        // If conversation doesn't exist, insert a new conversation
        pool.query(
            'INSERT INTO rentitschema.conversation (participant1, participant2, unReadCount, status) VALUES (?, ?, ?, ?)',
            [participant1, participant2, unReadCount, status],
            (insertError, insertResults) => {
                if (insertError) {
                    console.error('Error inserting conversation:', insertError);
                    return res.status(500).json({ error: 'Error inserting conversation' });
                }
                console.log('Conversation inserted successfully:', insertResults);
                pool.query(query, [participant1, participant2, participant2, participant1], (error, results) => {
                    if (error) {
                        console.error('Error checking conversation:', error);
                    }
                    if (results.length > 0) {
                        console.log('Conversation already exists:', results);
                        console.log("The Results = ", results)
                        pool.query(messageQueries.insertMessage, [message, results[0].conversationId, participant1], (error, results) => {
                            if (error) {
                                console.log(error)
                            } else {
                               console.log(results)
                            }
                        });




                    }
                })
                res.status(200).json({ success: 'Conversation inserted successfully' });
            }
        );
    });



   




};

  

  

const getConversations = (req, res) => {
    // Extract participantId from request parameters
    const participantId = req.params.participantid;
    const query = `
      SELECT 
          c.id AS conversationId,
          c.created_at AS createdAt,
          c.participant1 AS participant1Id,
          u1.name AS participant1Name,
          u1.email AS participant1Email,
          u1.profilePic AS participant1ProfilePic,
          c.participant2 AS participant2Id,
          u2.name AS participant2Name,
          u2.email AS participant2Email,
          u2.profilePic AS participant2ProfilePic,
          c.unReadCount,
          c.status
      FROM 
          rentitschema.conversation AS c
      JOIN
          rentitschema.users AS u1 ON c.participant1 = u1.userId
      JOIN
          rentitschema.users AS u2 ON c.participant2 = u2.userId
      WHERE
          c.participant1 = ? OR c.participant2 = ?`;
  
    // Execute the query with participantId as parameter
    pool.query(query, [participantId, participantId], (error, results) => {
      if (error) {
        console.error('Error retrieving conversations:', error);
        return res.status(500).json({ error: 'Error retrieving conversations' });
      }
      console.log('Conversations retrieved successfully:', results);
      res.status(200).json(results);
    });
  };
  
  
  module.exports = {
     getMessages,
    insertMessage,
    addConversation,
    getConversations
    
 };