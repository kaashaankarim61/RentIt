const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/AdminController');
router.get('/getall/metrics', adminController.getAllMetrics);
router.get('/getall/reports', adminController.getAllReports);
router.put('/status/update/verify/:userId', adminController.verifyUser);
router.put('/status/update/ban/:userId', adminController.banUser);
router.put('/status/update/unban/:userId', adminController.unbanUser);
module.exports = router;
