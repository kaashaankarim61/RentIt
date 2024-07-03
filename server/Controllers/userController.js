const pool = require('../dbConfig');
const userQueries = require('../userModule/userQueries'); // Adjust path if needed


const nodemailer = require('nodemailer');
const crypto = require('crypto');

function generateAndHashOTP(email) {
    // Generate random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000);
    // Define email options
    const mailOptions = {
      from: 'RentIt <inocent.inocent.lover2011@gmail.com>',
      to: `${email}`,
      subject: 'OTP Verification System',
      html: `
        <html>
          <head>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                color: #333;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
              }
              p {
                margin-bottom: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>OTP Verification System</h1>
              <p>Hello,</p>
              <p>Your OTP for verification is: <strong>${otp}</strong></p>
              <p>Thank you for using RentIt!</p>
            </div>
          </body>
        </html>
      `
    };
    

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred while sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
  });
    
    // Convert OTP to string
    const otpString = otp.toString();

    // Create hash using SHA-256
    const hash = crypto.createHash('sha256').update(otpString).digest('hex');

    return hash;
}




function generateHash(otp) {
 
  // Convert OTP to string
  const otpString = otp.toString();

  // Create hash using SHA-256
  const hash = crypto.createHash('sha256').update(otpString).digest('hex');

  return hash;
}


// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'inocent.inocent.lover2011@gmail.com', // Your Gmail email address
        pass: 'ubbe cmal frag qzug' // Your app password or regular password if less secure app access is enabled
    }
});



const getAllUsers = (req, res) => {
  pool.query(userQueries.getAllUsersQuery, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching users' });
    } else {
      res.json(results);
    }
  });
};



const getUserById = (req, res) => {
  const userId = req.params.userId; // Get userId from URL params
  console.log(userId)
  pool.query(userQueries.getUserByIdQuery, [userId], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching user' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(results[0]);
      }
    }
  });
};


const getUserByEmailAndPassword = (req, res) => {
  const { email, password } = req.body; // Get email and password from request body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required in the request body' });
  }

  pool.query(userQueries.authenticateQuery, [email, password], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error fetching user' });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.json(results[0]);
      }
    }
  });
};

function generateRandomNumber() {
  const min = 100000000; // Minimum 9-digit number (100,000,000)
  const max = 999999999; // Maximum 9-digit number (999,999,999)
  
  // Generate a random number between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
  return randomNumber;
}

const registerUser = (req, res) => {
  const { email, password, cnic, dob, name,cnicImg, profileImg } = req.body; // Get email and password from request body
  console.log(cnicImg)
  console.log(profileImg)
  console.log(req.body)
  const id = generateRandomNumber(); // Assuming this is a predefined ID or generated elsewhere
  const formattedDate = new Date(dob).toISOString().split('T')[0];
  const otpHash =  generateAndHashOTP(email)
  pool.query(
   userQueries.registerUser,
    [id, name, cnic, formattedDate, email, password,null,null,null,profileImg,cnicImg,otpHash ],

    (error, results) => {
      if (error) {
        console.error('Error inserting user:', error); // Log the actual error
        res.status(500).json({ error: 'Error inserting user' });
      } else {
        res.json({ message: 'User inserted successfully' });
      }
    }
  );
};


const getUserWithItems = (req, res) => {
  const userId = req.params.id; // Assuming userId is provided in the request parameters

  pool.query(
    `SELECT *  FROM users
    JOIN items ON users.userId = items.OwnerId
    JOIN itemcategories ON items.itemCategory = itemcategories.categoryID 
    LEFT JOIN rentings ON items.itemId = rentings.itemId
    WHERE users.userId = ?`,
    [userId],
    (error, results) => {
      if (error) {
        console.error('Error fetching user with items:', error);
        res.status(500).json({ error: 'Error fetching user with items' });
      } else {
        res.json(results);
      }
    }
  );
};





const fileReport = (req, res) => {
  const victim = req.params.victim;
  const filer = req.params.filer;
  const reason =req.params.reason

  var text= ''
  if(reason==1){

    text = "Inappropiate Content"

  }else if(reason==2){
    text = "Harrasment By User"

  }else if(reason==3){
    text = "Spam"
    
  }else if(reason==4){
    text = "Fake Account"
    
  }
  pool.query(
    `
    INSERT INTO rentitschema.report
    (
    victim,
    filer,
    reportText,
    reason)
    VALUES
    (
    ?,
    ?,
    ?,
    ?);
    `,
    [victim,filer,text, reason],
    (error, results) => {
      if (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Error" });
      } else {
        if (results.affectedRows > 0) {
          res.json({
            message: `success `,
          });
        } else {
          res.status(404).json({ error: `failure` });
        }
      }
    }
  );
};

const updateUserStatus = (req, res) => {
  const em = req.params.em; // Assuming userId is provided in the request parameters
  const otp = req.params.otp;
  const hash = generateHash(otp)
  console.log("The hash : ", hash)
  // Assuming you have a status field in your users table
  const newStatus = 'verified'; // Or whatever status you want to update to

  pool.query(
    `UPDATE users SET status = ? WHERE email like ? AND otp = ? `,
    [newStatus, em, hash],
    (error, results) => {
      if (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Error updating user status' });
      } else {
        // Check if the update affected any rows
        if (results.affectedRows === 1) {
          res.json({ message: 'User status updated successfully.' });
        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      }
    }
  );
};

const updateProfile = (req, res) => {
  console.log(req.body)
  const id = req.params.id; // Assuming email is provided in the request parameters
  const newPhone = req.body.phone; // Assuming new phone number is provided in the request body
  const newBio = req.body.bio; // Assuming new bio is provided in the request body

  // Execute SQL query to update phone and bio for the user
  pool.query(
    `UPDATE users SET phone = ?, bio = ? WHERE userId = ?`,
    [newPhone, newBio, id],
    (error, results) => {
      if (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Error updating user profile' });
      } else {
        // Check if the update affected any rows
        if (results.affectedRows === 1) {
          res.json({ message: 'User profile updated successfully.' });
        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      }
    }
  );
};

const updateIsOnlineStatus = (req, res) => {
  const userId = req.params.id; // Assuming userId is provided in the request parameters
  const isOnline = req.params.bit === '1' ? 1 : 0; 
  pool.query(
    `UPDATE users SET isOnline = ? WHERE userId = ?`,
    [isOnline, userId],
    (error, results) => {
      if (error) {
        console.error('Error updating user isOnline status:', error);
        res.status(500).json({ error: 'Error updating user isOnline status' });
      } else {
        if (results.affectedRows === 1) {
          res.json({ message: 'User isOnline status updated successfully.' });
        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      }
    }
  );
};







const addIntrestItem = (req, res) => {
  const userId = req.params.userId; // Assuming userId is provided in the request parameters
  const itemId = req.params.itemId
  pool.query(
    `Insert into rentitschema.user_interests (userId, itemOfInterest) values (?,?)`,
    [userId,itemId],
    (error, results) => {
      if (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Error' });
      } else {
        if (results.affectedRows === 1) {
          res.json({ message: 'Added successfully.' });
        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      }
    }
  );
};



const addSearchQuery = (req, res) => {
  const userId = req.params.userId; // Assuming userId is provided in the request parameters
  const query = req.params.query

  console.log(query)
  pool.query(
    `Insert into rentitschema.user_search_history (userId, searchQuery ) values (?,?)`,
    [userId,query],
    (error, results) => {
      if (error) {
        console.error('Error', error);
        res.status(500).json({ error: 'Error' });
      } else {
        if (results.affectedRows === 1) {
          res.json({ message: 'Added successfully.' });
        } else {
          res.status(404).json({ error: 'User not found.' });
        }
      }
    }
  );
};


module.exports = {
  getAllUsers,
  getUserById,
  registerUser,
  getUserByEmailAndPassword,
  getUserWithItems,
  updateUserStatus,
  updateProfile,
  updateIsOnlineStatus,
  fileReport,
  addIntrestItem,
  addSearchQuery

};
