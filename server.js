const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname + '/client/src')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

app.use('/api', require('./routes/posts.routes'));

mongoose.connect(`mongodb+srv://wallzack:YYvSXMNbCJv7PcIh@cluster0-ksbbn.mongodb.net/bulletinBoard?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error' + err));