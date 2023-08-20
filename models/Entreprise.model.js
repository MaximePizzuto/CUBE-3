// models/userModel.js
const mongoose = require('mongoose');

const EntrepriseSchema = new mongoose.Schema({
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
  Mdp: {
    type: String,
    required: true,
  },
});

const Entreprise = mongoose.model('Entreprise', EntrepriseSchema);

module.exports = Entreprise;
