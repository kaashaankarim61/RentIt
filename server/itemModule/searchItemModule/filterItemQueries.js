const getAllItems = `
SELECT items.*, 
       itemcategories.mainCategory, 
       itemcategories.subCategory, 
       itemcategories.type

FROM items
JOIN itemcategories ON items.itemCategory = itemcategories.categoryID
`;

const getItemsByMainCategory = `
SELECT items.*, 
       itemcategories.mainCategory, 
       itemcategories.subCategory, 
       itemcategories.type
FROM items
JOIN itemcategories ON items.itemCategory = itemcategories.categoryID
WHERE itemcategories.mainCategory LIKE ?
`;


const getItemsBySubCategory = `
SELECT items.*, 
       itemcategories.mainCategory, 
       itemcategories.subCategory, 
       itemcategories.type
FROM items
JOIN itemcategories ON items.itemCategory = itemcategories.categoryID
WHERE itemcategories.mainCategory LIKE ? AND itemcategories.subCategory LIKE ?
`;


const getItemsByLocation= `
SELECT items.*, 
       itemcategories.mainCategory, 
       itemcategories.subCategory, 
       itemcategories.type
FROM items
JOIN itemcategories ON items.itemCategory = itemcategories.categoryID
WHERE items.location LIKE ?
`;


const getItemsByCity = `SELECT items.*, 
itemcategories.mainCategory, 
itemcategories.subCategory, 
itemcategories.type
FROM items
JOIN itemcategories ON items.itemCategory = itemcategories.categoryID
WHERE LOWER(items.itemLocation) LIKE LOWER( ? );`


const getItemBySearchQuery = `SELECT items.*, 
itemcategories.mainCategory, 
itemcategories.subCategory, 
itemcategories.type
FROM items
JOIN itemcategories ON items.itemCategory = itemcategories.categoryID
WHERE CONCAT(
 LOWER(items.itemName),
 LOWER(itemcategories.mainCategory),
 LOWER(itemcategories.subCategory),
 LOWER(itemcategories.type),
 LOWER(items.itemLocation),
 LOWER(items.itemDescription)
) LIKE LOWER( ? );`






const getTypeIdAndType= `
SELECT itemcategories.categoryID, 
       itemcategories.type
FROM itemcategories
WHERE itemcategories.subCategory  LIKE ?
`;


const getItemById = `

SELECT *
FROM items
JOIN users ON items.OwnerId = users.userId
JOIN itemCategories ON items.itemCategory = itemCategories.categoryID
WHERE items.itemId = ?
LIMIT 1;


`

module.exports = {
 getItemsBySubCategory,
 getItemsByMainCategory,
 getAllItems,
 getItemsByLocation,
 getTypeIdAndType,
 getItemById,
 getItemsByCity,
 getItemBySearchQuery
};
