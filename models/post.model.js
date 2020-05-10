const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String },
  location: { type: String },
  email: { type: String, required: true },
  phone: { type: String },
  price: { type: String },
  published: { type: Date, required: true },
  updated: { type: Date, required: true },
  user: { type: String, required: true, ref: 'User' },
},
  { versionKey: false }
);

module.exports = mongoose.model('Post', postSchema);