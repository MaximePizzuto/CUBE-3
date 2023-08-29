// models/userModel.js
const mongoose = require('mongoose');

const AbonnementSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
  },
  Nom_user: {
    type: String,
    required: true,
  },
  Tel_user: {
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
  Durée_souscription: {
    type: String,
    required: true,
  },
  Prix_TTC: {
    type: Number,
    required: true,
  },
  Type_formule : {
    type: String,
    required: true,
  },
});

const AbonnementModel = mongoose.model('Abonnement', AbonnementSchema);

module.exports = AbonnementModel;

