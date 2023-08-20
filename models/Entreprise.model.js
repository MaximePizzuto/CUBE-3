// models/userModel.js
const mongoose = require('mongoose');

const EntrepriseSchema = new mongoose.Schema({
  Nom: {
    type: String,
    required: true,
  },
  Localisation: {
    type: String,
    required: true,
  },
  Employes: {
    type: String,
    required: true,
  },
  Date_Crea: {
    type: String,
    required: true,
  },
  Date_modif: {
    type: String,
    required: true,
  },
  Tel: {
    type: String,
    required: true,
  },
});

const Entreprise = mongoose.model('Entreprise', EntrepriseSchema);

module.exports = Entreprise;
