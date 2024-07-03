const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'rentitschema'
});


// Check if the pool is connected
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('MySQL pool connected successfully!');
  connection.release(); // Release the connection
});

module.exports = pool;