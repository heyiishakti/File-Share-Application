require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
const path = require('path');
const cors = require('cors')

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

//Cors

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
}
app.use(cors(corsOptions));


//Template engine

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

// app.get('', (req, res) => {
//     res.render ('download')
// })

//routes

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})