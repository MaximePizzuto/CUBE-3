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
    const id_abonnement = req.params.id;
    
    Abonnement.findById(id_abonnement)
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
router.delete('/Abonnement/delete_Abonnement/:id', (req, res) => {
  const id_abonnement = req.params.id;

Abonnement.findByIdAndDelete(id_abonnement)
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
  const { id_abonnement, id_user, Nom_user, Tel_user, Date_Crea, Date_modif, Durée_souscription, Prix_TTC } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!id_abonnement || !id_user || !Nom_user || !Tel_user || !Date_Crea || !Date_modif || !Durée_souscription || !Prix_TTC) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Abonnement en utilisant le modèle User
  const newAbonnement = new Abonnement({id_abonnement, id_user, Nom_user, Tel_user, Date_Crea, Date_modif, Durée_souscription, Prix_TTC});

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