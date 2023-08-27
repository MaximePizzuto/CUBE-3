const express = require('express');
const router = express.Router();
const PaiementModel = require('../models/Paiement.model');

// Route pour créer un nouveau paiement (CREATE)
router.post('/paiements', (req, res) => {
  const {paiementUserId,paiementId,paiementDuree,paiementMontant,paiementStatus,} = req.body;

  if (!paiementUserId || !paiementId || !paiementDuree || !paiementMontant || !paiementStatus)
  {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const nouveauPaiement = new PaiementModel({paiementUserId,paiementId,paiementDuree,paiementMontant,paiementStatus,});

  nouveauPaiement.save()
    .then((paiement) => {
      res.status(201).json(paiement);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour récupérer tous les paiements (READ)
router.get('/paiements', (req, res) => {
  PaiementModel.find()
    .then((paiements) => {
      res.status(200).json(paiements);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// Route pour récupérer un paiement par ID (READ ID)
router.get('/paiements/:id', (req, res) => {
  const paiementId = req.params.id;

  PaiementModel.findById(paiementId)
    .then((paiement) => {
      if (!paiement) {
        res.status(404).json({ message: 'Paiement non trouvé' });
      } else {
        res.status(200).json(paiement);
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// Route pour mettre à jour un paiement par ID (UPDATE)
router.put('/paiements/:id', (req, res) => {
  const paiementId = req.params.id;
  const updatedData = req.body;

  PaiementModel.findByIdAndUpdate(paiementId, updatedData, { new: true })
    .then((paiement) => {
      if (!paiement) {
        res.status(404).json({ message: 'Paiement introuvable' });
      } else {
        res.status(200).json(paiement);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour supprimer un paiement par ID (Delete)
router.delete('/paiements/:id', (req, res) => {
  const paiementId = req.params.id;

  PaiementModel.findByIdAndDelete(paiementId)
    .then((paiement) => {
      if (!paiement) {
        res.status(404).json({ message: 'Paiement introuvable' });
      } else {
        res.status(200).json({ message: 'Paiement supprimé avec succès' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
