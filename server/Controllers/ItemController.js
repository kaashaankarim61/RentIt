const pool = require("../dbConfig");
const itemQueries = require("../itemModule/searchItemModule/filterItemQueries"); // Adjust path if needed
const addItemQueries = require("../itemModule/addItemModule/addItemQueries");

const getAllItems = (req, res) => {
  pool.query(itemQueries.getAllItems, (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error fetching users" });
    } else {
      res.json(results);
    }
  });
};

const getItemByID = (req, res) => {
  const id = req.params.itemId;
  pool.query(itemQueries.getItemById, [id], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error fetching Item" });
    } else {
      res.json(results);
    }
  });
};

const availabilityOfItem = (req, res) => {
  const itemId = req.params.itemId;
  const bit = req.params.bit;
  pool.query(
    "UPDATE items SET isAvailable = ? WHERE itemId = ?",
    [bit, itemId],
    (error, results) => {
      if (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ error: "Error updating user status" });
      } else {
        if (results.affectedRows > 0) {
          res.json({
            message: `Item with ID ${itemId} `,
          });
        } else {
          res.status(404).json({ error: `Item with ID  not found` });
        }
      }
    }
  );
};

const getItemByMainCat = (req, res) => {
  console.log("Hello");
  const cat = req.params.cat;
  var param = "";
  if (cat === "fhd") {
    param = "Furniture & Home Decor";
  } else if (cat === "eha") {
    param = "Electronics & Home Appliances";
  } else if (cat === "fb") {
    param = "Fashion & Beauty";
  } else if (cat === "bhs") {
    param = "Books, Hobbies & Sports";
  } else if (cat === "k") {
    param = "Kids";
  }

  console.log(param);
  pool.query(itemQueries.getItemsByMainCategory, [param], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error fetching items" });
    } else {
      res.json(results);
    }
  });
};

const getItemBySubCat = (req, res) => {
  const main = req.params.main;
  const cat = req.params.cat;

  console.log("main<<", main, "cat...", cat);
  var param1 = "";
  var param2 = "";

  if (main === "fhd") {
    param1 = "Furniture & Home Decor";
    if (cat === "sc") {
      param2 = "Sofa & Chairs";
    } else if (cat === "bw") {
      param2 = "Beds & Wardrobes";
    } else if (cat === "hd") {
      param2 = "Home Decoration";
    } else if (cat === "td") {
      param2 = "Tables & Dining";
    } else if (cat === "of") {
      param2 = "Office Furniture";
    } else if (cat === "go") {
      param2 = "Garden & Outdoor";
    } else if (cat === "cb") {
      param2 = "Curtains & Blinds";
    } else if (cat === "rc") {
      param2 = "Rugs & Carpets";
    }
  } else if (main === "eha") {
    param1 = "Electronics & Home Appliances";
    if (cat === "ka") {
      param2 = "Kitchen Appliances";
    } else if (cat === "ca") {
      param2 = "Computers & Accessories";
    } else if (cat === "va") {
      param2 = "Video-Audios";
    } else if (cat === "caa") {
      param2 = "Cameras & Accessories";
    } else if (cat === "ge") {
      param2 = "Games & Entertainment";
    } else if (cat === "rf") {
      param2 = "Refrigerators & Freezers";
    } else if (cat === "ac") {
      param2 = "AC & Coolers";
    } else if (cat === "ta") {
      param2 = "Televisions & Accessories";
    } else if (cat === "hg") {
      param2 = "Heaters & Geysers";
    } else if (cat === "mo") {
      param2 = "Microwaves & Ovens";
    } else if (cat === "f") {
      param2 = "Fans";
    } else if (cat === "sm") {
      param2 = "Sewing Machines";
    } else if (cat === "wd") {
      param2 = "Water Dispensers";
    } else if (cat === "is") {
      param2 = "Irons & Steamers";
    }
  } else if (main === "fb") {
    param1 = "Fashion & Beauty";
    if (cat === "cc") {
      param2 = "Clothes & Coats";
    } else if (cat === "wd") {
      param2 = "Wedding ";
    } else if (cat === "wb") {
      param2 = "Watches";
    } else if (cat === "fw") {
      param2 = "Footwear";
    } else if (cat === "ja") {
      param2 = "Jewellery";
    } else if (cat === "bc") {
      param2 = "Bags";
    } else if (cat === "fa") {
      param2 = "Fashion Accessories";
    }
  } else if (main === "bhs") {
    param1 = "Books, Hobbies & Sports";
    if (cat === "b") {
      param2 = "Books";
    } else if (cat === "m") {
      param2 = "Magazines";
    } else if (cat === "se") {
      param2 = "Sports Equipment";
    } else if (cat === "gf") {
      param2 = "Gym & Fitness";
    } else if (cat === "mi") {
      param2 = "Musical Instruments";
    }
  } else if (main === "k") {
    param1 = "Kids";
    if (cat === "kt") {
      param2 = "Kids Toys";
    } else if (cat === "kv") {
      param2 = "Kids Vehicles";
    } else if (cat === "ka") {
      param2 = "Kids Accessories";
    } else if (cat === "kf") {
      param2 = "Kids Furniture";
    } else if (cat === "bg") {
      param2 = "Baby Gear";
    } else if (cat === "kc") {
      param2 = "Kids Clothing";
    } else if (cat === "ss") {
      param2 = "Swings & Slides";
    }
  }

  pool.query(
    itemQueries.getItemsBySubCategory,
    [param1, param2],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error fetching users" });
      } else {
        res.json(results);
      }
    }
  );
};

const getTypeIdAndType = (req, res) => {
  const subCate = req.params.subcat;
  console.log(subCate);
  var param = subCate;
  if (subCate !== "Video-Audios") {
    param = subCate.replace(/-/g, " ");
  }

  console.log(param);
  pool.query(itemQueries.getTypeIdAndType, [param], (error, results) => {
    if (error) {
      res.status(500).json({ error: "Error fetching users" });
    } else {
      console.log(results);
      res.json(results);
    }
  });
};

const deleteItemById = (req, res) => {
  const itemId = req.params.id; // Assuming itemId is provided as a parameter

  pool.query(
    "DELETE FROM items WHERE itemId = ?",
    [itemId],
    (error, results) => {
      if (error) {
        console.error("Error deleting item:", error);
        res.status(500).json({ error: "Error deleting item" });
      } else {
        if (results.affectedRows > 0) {
          res.json({ message: "Item deleted successfully" });
        } else {
          res.status(404).json({ error: "Item not found" });
        }
      }
    }
  );
};

const addItemWithDetails = (req, res) => {
  var Id = 0;
  pool.query(
    `SELECT (MAX(itemId)+1) as id FROM rentitschema.items;`,
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error inserting item" });
      } else {
        Id = results[0].id;
      }
    }
  );
  const isAvailable = 1;
  const itemLikes = 0;
  const {
    itemName,
    itemDescription,
    itemCondition,
    ownerId,
    itemRent,
    itemLocation,
    itemTermsConditions,
    itemUsageDetails,
    itemKeywords,
    itemType,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = req.body;

  console.log("body:", req.body);

  pool.query(
    addItemQueries.insertItem,
    [
      Id,
      itemName,
      itemDescription,

      isAvailable,
      itemCondition,
      ownerId,
      itemLikes,

      itemRent,
      itemLocation,
      itemTermsConditions,

      itemUsageDetails,
      itemType,
      image1,

      image2,
      image3,
      image4,

      image5,
      itemKeywords,
    ],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: "Error inserting item" });
        console.log(error);
      } else {
        console.log(results[0]);
        console.log("Sta");
        res
          .status(200)
          .json({ success: "Item inserted successfully", Id_: Id });
      }
    }
  );
};

const updateItemWithDetails = (req, res) => {
  const itemId = req.params.id; // Assuming itemId is provided in the request parameters

  const {
    itemName,
    itemDescription,
    itemCondition,
    itemRent,
    itemLocation,
    itemTermsConditions,
    itemUsageDetails,
    itemKeywords,
    itemType,
    image1,
    image2,
    image3,
    image4,
    image5,
  } = req.body;

  pool.query(
    `UPDATE rentitschema.items
    SET
    itemName = ?,
    itemDescription = ?,
    itemCondition = ?,
    itemRent = ?,
    itemLocation = ?,
    itemTermsConditions = ?,
    itemUsageDetails = ?,
    keywords = ?,
    itemCategory = ?,
    image1 = ?,
    image2 = ?,
    image3 = ?,
    image4 = ?,
    image5 = ?
    WHERE itemId = ? `,
    [
      itemName,
      itemDescription,
      itemCondition,
      itemRent,
      itemLocation,
      itemTermsConditions,
      itemUsageDetails,
      itemKeywords,
      itemType,
      image1,
      image2,
      image3,
      image4,
      image5,
      itemId, // Adding itemId as the last parameter for the WHERE clause
    ],
    (error, results) => {
      if (error) {
        console.error("Error updating item:", error);
        res.status(500).json({ error: "Error updating item" });
      } else {
        console.log(results[0]);
        res.status(200).json({ success: "Item updated successfully" });
      }
    }
  );
};

const getItemByCity = (req, res) => {
  const city = req.params.city;
  const param = `%${city}%`;
  console.log(city);
  pool.query(itemQueries.getItemsByCity, [param], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error fetching Item" });
    } else {
      res.json(results);
    }
  });
};

const getItemBySearchQuery = (req, res) => {
  const query = req.params.query;
  const query_ = query.replace(/-/g, " ");
  const query__ = query_.replace(/fff/g, "-");
  const param = `%${query__}%`;
  console.log(param);
  pool.query(itemQueries.getItemBySearchQuery, [param], (error, results) => {
    if (error) {
      console.log("rr", error);
      res.status(500).json({ error: "Error fetching Item" });
    } else {
      res.json(results);
    }
  });
};

const insertRenting = (req, res) => {
  const { renter, item, day } = req.params;

  pool.query(
    "INSERT INTO Rentings (renterId, itemId, forDays, rentedOn) VALUES (?, ?,?,NOW())",
    [renter, item, day],
    (error, results) => {
      if (error) {
        console.error("Error inserting renting:", error);
        res.status(500).json({ error: "Error inserting renting" });
      } else {
        res.status(201).json({ message: "Renting inserted successfully" });
      }
    }
  );
};

const getRentingsByRenterId = (req, res) => {
  const renter = req.params.renter; // Assuming renterId is provided in the request parameters

  pool.query(
    "select * from items join rentings on items.itemId = rentings.itemId WHERE rentings.renterId = ?",
    [renter],
    (error, results) => {
      if (error) {
        console.error("Error fetching rentings by renterId:", error);
        res.status(500).json({ error: "Error fetching rentings by renterId" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

const getRentingsByItem = (req, res) => {
  const item = req.params.item; // Assuming renterId is provided in the request parameters

  pool.query(
    "SELECT * FROM Rentings WHERE itemId = ?",
    [item],
    (error, results) => {
      if (error) {
        console.error("Error fetching rentings by itemId:", error);
        res.status(500).json({ error: "Error fetching rentings by itemId" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

const delRentingsByItem = (req, res) => {
  const item = req.params.itemId; // Assuming renterId is provided in the request parameters

  pool.query(
    "DELETE FROM Rentings WHERE itemId = ?",
    [item],
    (error, results) => {
      if (error) {
        console.error("Error fetching deleting by itemId:", error);
        res.status(500).json({ error: "Error deleteing rentings by itemId" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

const addReviewItem = (req, res) => {
  // Extract parameters from the request body
  const {
    itemId,
    givenBy,
    reviewText,
    communicationRating,
    accuracyRating,
    itemQualityRating,
    convenienceRating,
  } = req.body;

  // Construct the SQL INSERT statement
  const sql = `INSERT INTO rentitschema.reviews
  ( itemId, givenBy, reviewText, communicationRating, accuracyRating, itemQualityRating, convenienceRating)
  VALUES (?, ?, ?, ?, ?, ?, ?)`;

  // Execute the SQL query with the parameters
  pool.query(
    sql,
    [
      itemId,
      givenBy,
      reviewText,
      communicationRating,
      accuracyRating,
      itemQualityRating,
      convenienceRating,
    ],
    (error, results) => {
      if (error) {
        console.error("Error adding review:", error);
        res.status(500).json({ error: "Error adding review" });
      } else {
        res.status(200).json(results);
      }
    }
  );
};

const getReviews = (req, res) => {
  const item = req.params.itemId;

  const sql = `select * from rentitschema.reviews join users on reviews.givenBy =users.userId where itemId = ?`;

  pool.query(sql, [item], (error, results) => {
    if (error) {
      console.error("Error getting review:", error);
      res.status(500).json({ error: "Error getting review" });
    } else {
      res.status(200).json(results);
    }
  });
};

const getRatings = (req, res) => {
  const item = req.params.itemId;
  const sql = `SELECT Avg(communicationRating) as CR, Avg(accuracyRating) as AR, Avg(itemQualityRating) as QR, Avg(convenienceRating) as CoR FROM rentitschema.reviews where itemId = ?;`;
  pool.query(sql, [item], (error, results) => {
    if (error) {
      console.error("Error getting review:", error);
      res.status(500).json({ error: "Error getting review" });
    } else {
      res.status(200).json(results);
    }
  });
};

const getRecommendations = (req, res) => {
  const userId = req.params.userId;
  const sql = `
  
  
  SELECT 
                related_pairs.related AS related,
                related_items.*,
                user__.*
                
FROM (
    SELECT itemId
    FROM items
    JOIN user_search_history ON items.keywords LIKE CONCAT('%', user_search_history.searchQuery, '%') 
                              OR items.itemName LIKE CONCAT('%', user_search_history.searchQuery, '%')
                              OR items.itemDescription LIKE CONCAT('%', user_search_history.searchQuery, '%')
    WHERE user_search_history.userId = ?
    
    UNION
    
    SELECT itemOfInterest
    FROM user_interests
    WHERE userId = ?
    
    UNION
    
    SELECT itemId
    FROM rentings
    WHERE renterId = ?
) AS result 
JOIN related_pairs ON result.itemId = related_pairs.itemId 
JOIN items ON related_pairs.itemId = items.itemId 
JOIN items AS related_items ON related_pairs.related = related_items.itemId
JOIN users AS user__ ON related_items.OwnerId = user__.userId
WHERE related_pairs.itemId != related_pairs.related AND related_pairs.related Not in (



  SELECT itemId
    FROM items
    JOIN user_search_history ON items.keywords LIKE CONCAT('%', user_search_history.searchQuery, '%') 
                              OR items.itemName LIKE CONCAT('%', user_search_history.searchQuery, '%')
                              OR items.itemDescription LIKE CONCAT('%', user_search_history.searchQuery, '%')
    WHERE user_search_history.userId = ?
    
    UNION
    
    SELECT itemOfInterest
    FROM user_interests
    WHERE userId = ?
    
    UNION
    
    SELECT itemId
    FROM rentings
    WHERE renterId = ?
)
    
  `;
  pool.query(
    sql,
    [userId, userId, userId, userId, userId, userId],
    (error, results) => {
      if (error) {
        console.error("Error getting review:", error);
        res.status(500).json({ error: "Error getting review" });
      } else {
        // Object to store unique values of the 'related' attribute
        let uniqueRelated = {};

        // Array to store unique dictionaries
        let uniqueDicts = [];

        // Iterate over the array of dictionaries
        results.forEach((d) => {
          // Check if the 'related' attribute is unique
          if (!uniqueRelated[d.related]) {
            // Add the 'related' attribute to the object
            uniqueRelated[d.related] = true;
            // Add the dictionary to the array of unique dictionaries
            uniqueDicts.push(d);
          }
        });

        console.log(uniqueDicts);
        res.status(200).json(uniqueDicts);
      }
    }
  );
};

module.exports = {
  getAllItems,
  getItemByMainCat,
  getItemBySubCat,
  getTypeIdAndType,
  addItemWithDetails,
  getItemByID,
  getItemByCity,
  getItemBySearchQuery,
  deleteItemById,
  updateItemWithDetails,
  insertRenting,
  getRentingsByRenterId,
  getRentingsByItem,
  availabilityOfItem,
  delRentingsByItem,
  addReviewItem,
  getReviews,
  getRatings,
  getRecommendations,
};
