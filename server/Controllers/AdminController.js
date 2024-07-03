const pool = require("../dbConfig");

const getAllMetrics = (req, res) => {
  pool.query(
    `SELECT (SELECT COUNT(*) FROM users) AS userCount, (SELECT COUNT(*) FROM items) AS itemCount,   (SELECT COUNT(*) FROM rentings) AS itemsOnRent, (SELECT COUNT(*) FROM users where status like 'verified') AS verifiedUsers,  (SELECT COUNT(*) FROM users where status like 'banned') AS BannedUsers, (SELECT COUNT(*) FROM users where isOnline=1) AS OnlineUsers ,(SELECT COUNT(*) FROM report) AS NumberOfReports`,
    (error, results) => {
      if (error) {
        console.error("Error fetching metrics:", error);
        res.status(500).json({ error: "Error fetching metrics" });
      } else {
        res.json(results);
      }
    }
  );
};

const banUser = (req, res) => {
 console.log("Called")
  const userId = req.params.userId;
  console.log(userId)
  pool.query(
    "UPDATE users SET status = ? WHERE userId = ?",
    ["blocked", userId],
    (error, results) => {
      if (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ error: "Error updating user status" });
      } else {
        if (results.affectedRows > 0) {
          console.log("Done")
          res.json({
            message: `User with ID ${userId} has been banned successfully`,
          });
        } else {
          res.status(404).json({ error: `User with ID ${userId} not found` });
        }
      }
    }
  );
};

const unbanUser = (req, res) => {
  const userId = req.params.userId;
  pool.query(
    "UPDATE users SET status = ? WHERE userId = ?",
    ["verified", userId],
    (error, results) => {
      if (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ error: "Error updating user status" });
      } else {
        if (results.affectedRows > 0) {
          res.json({
            message: `User with ID ${userId} has been unbanned successfully`,
          });
        } else {
          res.status(404).json({ error: `User with ID ${userId} not found` });
        }
      }
    }
  );
};


const getAllReports = (req, res) => {
    pool.query(
      `SELECT 
      r.victim AS victim,
      r.filer AS filer,
      r.reportText AS reportText,
      u1.name AS victimName,
      u1.email AS victimEmail,
      u1.status AS victimStatus,
      u2.name AS filerName,
      u2.email AS filerEmail,
      u2.status AS filerStatus
  FROM 
      rentitschema.report AS r
  JOIN 
      users AS u1 ON r.victim = u1.userId
  JOIN 
      users AS u2 ON r.filer = u2.userId;
  `,
      (error, results) => {
        if (error) {
          console.error("Error fetching metrics:", error);
          res.status(500).json({ error: "Error fetching metrics" });
        } else {
          res.json(results);
        }
      }
    );
  };

const verifyUser = (req, res) => {
  const userId = req.params.userId;
  pool.query(
    "UPDATE users SET status = ? WHERE userId = ?",
    ["verified", userId],
    (error, results) => {
      if (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({ error: "Error updating user status" });
      } else {
        if (results.affectedRows > 0) {
          res.json({
            message: `User with ID ${userId} has been verified successfully`,
          });
        } else {
          res.status(404).json({ error: `User with ID ${userId} not found` });
        }
      }
    }
  );
};

module.exports = {
  getAllMetrics,
  banUser,
  unbanUser,
  verifyUser,
  getAllReports
};
