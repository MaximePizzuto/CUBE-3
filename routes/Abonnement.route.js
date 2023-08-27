const express = require('express');
const router = express.Router();
const AbonnementModel = require('../models/Abonnement.model');

// Route pour ajouter un nouvel Abonnement (CREATE)
router.post('/abonnements', (req, res) => {
  const {id_abonnement,id_user,Nom_user,Tel_user,Date_Crea,Date_modif,Durée_souscription,Prix_TTC,} = req.body;

  if (!id_abonnement || !id_user || !Nom_user || !Tel_user || !Date_Crea || !Date_modif || !Durée_souscription || !Prix_TTC){
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const nouvelAbonnement = new AbonnementModel({id_abonnement,id_user,Nom_user,Tel_user,Date_Crea,Date_modif,Durée_souscription,Prix_TTC,});

  nouvelAbonnement.save()
    .then((abonnement) => {
      res.status(201).json(abonnement);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour récupérer tous les Abonnements (READ)
router.get('/Abonnements', (req, res) => {
  AbonnementModel.find()
      .then((Abonnement) => {
        res.status(200).json(Abonnement);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Abonnement dans la collection !' });
      });
  });

// Route pour récupérer un Abonnement par ID (READ ID)
router.get('/Abonnement/:id', (req, res) => {
    const userId = req.params.id;
    
    AbonnementModel.findById(userId)
      .then((Abonnement) => {
        if (!Abonnement) {
          res.status(404).json({ message: 'Abonnement non trouvé' });
        } else {
          res.status(200).json(Abonnement);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });

// Route pour mettre à jour un abonnement par ID (UPDATE)
router.put('/abonnements/:id', (req, res) => {
  const abonnementId = req.params.id;
  const updatedData = req.body;

  AbonnementModel.findByIdAndUpdate(abonnementId, updatedData, { new: true })
    .then((abonnement) => {
      if (!abonnement) {
        res.status(404).json({ message: 'Abonnement introuvable' });
      } else {
        res.status(200).json(abonnement);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour supprimer un Abonnement par ID (DELETE)
router.delete('/User/delete_Abonnement/:id', (req, res) => {
  const userId = req.params.id;

  AbonnementModel.findByIdAndDelete(userId)
  .then((Abonnement) => {
    if (!Abonnement) {
      res.status(404).json({ message: 'Abonnement introuvable' });
    } else {
      res.status(200).json({ message: 'Abonnement supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});

module.exports = router;