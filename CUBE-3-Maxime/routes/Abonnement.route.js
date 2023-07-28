/////////////////////////////////////////

////////////// PAS ENCORE FINI //////////

/////////////////////////////////////////
const express = require('express');
const router = express.Router();
const Abonnement = require('../models/Abonnement.model');

// Route pour récupérer tous les Abonnements
router.get('/Abonnements', (req, res) => {
    
    Abonnement.find()
      .then((Abonnement) => {
        res.status(200).json(Abonnement);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Abonnement dans la collection !' });
      });
  });



// Route pour récupérer un Abonnement par ID
router.get('/Abonnement/:id', (req, res) => {
    const userId = req.params.id;
    
    Abonnement.findById(userId)
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



// Route pour supprimer un Abonnement par ID
router.delete('/User/delete_Abonnement/:id', (req, res) => {
  const userId = req.params.id;

Abonnement.findByIdAndDelete(userId)
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



// Route pour ajouter un nouvel Abonnement
router.post('/Abonnement/add_Abonnement', (req, res) => {
  const { Nom, Prenom, Mail, Tel, Entreprise } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!Nom || !Prenom || !Mail || !Tel || !Entreprise) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Abonnement en utilisant le modèle User
  const newAbonnement = new Abonnement({Nom,Prenom,Mail,Tel,Entreprise,});

  // Sauvegarde du nouvel Abonnement dans la base de données
  newAbonnement.save()
    .then((Abonnement) => {
      res.status(201).json(Abonnement); // Renvoie l'Abonnement créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});


  module.exports = router;