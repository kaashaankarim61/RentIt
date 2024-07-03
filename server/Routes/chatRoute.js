const express = require('express');
const router = express.Router();
const chatController = require('../Controllers/chatController');

router.get('/getall/:id', chatController.getMessages);
router.post('/message', chatController.insertMessage)
router.get('/get/all/conv/:participantid', chatController.getConversations);
router.post('/addconv', chatController.addConversation)

module.exports = router;
