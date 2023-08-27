const mongoose = require('mongoose');

const paiementSchema = new mongoose.Schema({
  paiementUserId: {
    type: Number,
    required: true,
  },
  paiementId: {
    type: Number,
    required: true,
    unique: true,
  },
  paiementDuree: {
    type: Number,
    required: true,
  },
  paiementMontant: {
    type: Number,
    required: true,
  },
  paiementStatus: {
    type: [String],
  },
});

const Paiement = mongoose.model('Paiement', paiementSchema);
module.exports = Paiement;