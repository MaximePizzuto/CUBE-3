// models/userModel.js
const mongoose = require('mongoose');

const FormuleSchema = new mongoose.Schema({
  Nom: {
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
  Description: {
    type: String,
    required: true,
  },
  PrixFormule: {
    type: Number,
    required: true,
  },
});

const Formule = mongoose.model('Formule', FormuleSchema);

module.exports = Formule;
