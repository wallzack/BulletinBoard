const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  rights: { type: String, required: true },
  email: { type: String, required: true },
  authorized: { type: Boolean, required: true },
},
  { versionKey: false }
);

module.exports = mongoose.model('User', userSchema);