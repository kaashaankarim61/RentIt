const getMessages = `
SELECT * 
FROM message 
WHERE conversationId = ?
ORDER BY timestamp;
`


const insertConversation = `INSERT INTO rentitschema.conversation
(participant1, participant2)
VALUES (?, ?);`

const insertMessage =`INSERT INTO rentitschema.message (text, conversationId, senderId) VALUES (?, ?, ?)`

module.exports = {
    getMessages,
    insertConversation,
    insertMessage
}