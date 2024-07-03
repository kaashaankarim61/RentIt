const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const itemRoutes = require('./Routes/itemRoutes');
const chatRoutes = require('./Routes/chatRoute')
const adminRoutes =require('./Routes/AdminRoutes')
const app = express();

app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use('/', userRoutes);
app.use('/item', itemRoutes)
app.use('/chat',chatRoutes )
app.use('/admin',adminRoutes )
app.use('/test', (req, res) => {
  res.send('Hello, world!');
});


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
