// models/userModel.js
const mongoose = require('mongoose');

const AbonnementSchema = new mongoose.Schema({
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

const Abonnement = mongoose.model('Abonnement', AbonnementSchema);

module.exports = Abonnement;
