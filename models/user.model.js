const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: {
    type: Object,
  },
  title: {
    type: String,
  },
  Descritption: {
    type: String,
  }
});

module.exports = mongoose.model('User', userSchema);
