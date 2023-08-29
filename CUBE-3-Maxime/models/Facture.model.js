const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  id_user: {
    type: String,
    required: true,
  },
  Montant_HT: {
    type: Number,
    required: true,
  },
  Montant_TTC: {
    type: Number,
    required: true,
  },
  Formule: {
    type: String,
    required: true,
  },
  Entreprise: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Date_Creation: {
    type: Date,
    required: true,
  },
  Date_Modification: {
    type: Date,
    required: true,
  },
});

const FactureModel = mongoose.model('Facture', factureSchema);
module.exports = FactureModel;