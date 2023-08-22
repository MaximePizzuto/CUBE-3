// models/userModel.js
const mongoose = require('mongoose');

const AbonnementSchema = new mongoose.Schema({
  id_abonnement: {
    type: String,
    required: true,
  },
  id_user: {
    type: String,
    required: true,
  },
  Nom_user: {
    type: String,
    required: true,
    unique: true,
  },
  Tel_user: {
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
  Durée_souscription: {
    type: String,
    required: true,
  },
  Prix_TTC: {
    type: String,
    required: true,
  },
});

const Abonnement = mongoose.model('Abonnement', AbonnementSchema);

module.exports = Abonnement;

