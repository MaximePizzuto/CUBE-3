// models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true,
  },
  Prenom: {
    type: String,
    required: true,
  },
  Mail: {
    type: String,
    required: true,
    unique: true,
  },
  Tel: {
    type: String,
    required: true,
  },
  Entreprise: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
