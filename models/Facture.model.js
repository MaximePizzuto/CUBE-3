const mongoose = require('mongoose');

const factureSchema = new mongoose.Schema({
  Id: {
     type: Number,
     required: true,
     unique: true,
   },
  Id_Facture: {
    type: String,
    required: true,
    unique: true,
  },
  Id_user: {
    type: String,
    required: true,
    unique: true,
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
  Date_Payement: {
    type: Date,
    required: true,
  },
  Id_Abonnement: {
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
  pdf_facture: {
    type: String,
    required: true,
  },
  csv_facture: {
    type: String,
    required: true,
  },
});

const Facture = mongoose.model('Facture', factureSchema);
module.exports = Facture;