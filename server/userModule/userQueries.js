const getAllUsersQuery = 'SELECT * FROM Users';
const getUserByIdQuery = 'SELECT * FROM Users WHERE userId = ?';
const getUserByEmailQuery = 'SELECT * FROM Users WHERE email = ?';
const authenticateQuery = 'SELECT * FROM Users WHERE email = ? && password= ? && status LIKE "verified"';
const registerUser  = 'INSERT INTO Users (userId, name, cnic, dateOfBirth, email, password, gender, phone, dateAccountCreated, status, profilePic, cnicFront, otp) VALUES (?, ?, ?, ?, ?, ?, ? , ? ,CURDATE(), ? , ?, ?, ?)'

module.exports = {
  getAllUsersQuery,
  getUserByIdQuery,
  getUserByEmailQuery,
  authenticateQuery,
  registerUser
};
