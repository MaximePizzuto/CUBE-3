const express = require('express');
const router = express.Router();
const Paiement = require('../models/Paiement.model');

// Route pour récupérer tous les Paiements
router.get('/Paiements', (req, res) => {
    
    Paiement.find()
      .then((Paiement) => {
        res.status(200).json(Paiement);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Paiement dans la collection !' });
      });
  });



// Route pour récupérer un Paiement par ID
router.get('/Paiement/:id', (req, res) => {
    const id_Paiement = req.params.id;
    
    Paiement.findById(id_Paiement)
      .then((Paiement) => {
        if (!Paiement) {
          res.status(404).json({ message: 'Paiement non trouvé' });
        } else {
          res.status(200).json(Paiement);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });



// Route pour supprimer un Paiement par ID
router.delete('/Paiement/delete_Paiement/:id', (req, res) => {
  const id_Paiement = req.params.id;

Paiement.findByIdAndDelete(id_Paiement)
  .then((Paiement) => {
    if (!Paiement) {
      res.status(404).json({ message: 'Paiement introuvable' });
    } else {
      res.status(200).json({ message: 'Paiement supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});



// Route pour ajouter un nouvel Paiement
router.post('/Paiement/add_Paiement', (req, res) => {
  const { paiementUserId, paiementId, paiementDuree, paiementMontant, paiementStatus } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!paiementUserId || !paiementId || !paiementDuree || !paiementMontant || !paiementStatus) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Paiement en utilisant le modèle User
  const newPaiement = new Paiement({paiementUserId, paiementId, paiementDuree, paiementMontant, paiementStatus});

  // Sauvegarde du nouvel Paiement dans la base de données
  newPaiement.save()
    .then((Paiement) => {
      res.status(201).json(Paiement); // Renvoie l'Paiement créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});


  module.exports = router;