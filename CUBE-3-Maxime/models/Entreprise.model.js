// models/userModel.js
const mongoose = require('mongoose');

const EntrepriseSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
  },
  Nom_Entreprise: {
    type: String,
    required: true,
  },
  Adresse_Postale: {
    type: String,
    required: true,
  },
  Nom_Employes: {
    type: String,
    required: true,
  },
  Date_Crea: {
    type: Date,
    required: true,
  },
  Date_modif: {
    type: Date,
    required: true,
  },
  Tel: {
    type: String,
    required: true,
  },
});

const EntrepriseModel = mongoose.model('Entreprise', EntrepriseSchema);

module.exports = EntrepriseModel;
