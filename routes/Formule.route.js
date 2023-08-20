/////////////////////////////////////////

////////////// PAS ENCORE FINI //////////

/////////////////////////////////////////
const express = require('express');
const router = express.Router();
const Entreprise = require('../models/Entreprise.model');

// Route pour récupérer tous les Entreprises
router.get('/Entreprises', (req, res) => {
    
    Entreprise.find()
      .then((Entreprise) => {
        res.status(200).json(Entreprise);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Entreprise dans la collection !' });
      });
  });



// Route pour récupérer un Entreprise par ID
router.get('/Entreprise/:id', (req, res) => {
    const userId = req.params.id;
    
    Entreprise.findById(userId)
      .then((Entreprise) => {
        if (!Entreprise) {
          res.status(404).json({ message: 'Entreprise non trouvé' });
        } else {
          res.status(200).json(Entreprise);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });



// Route pour supprimer un Entreprise par ID
router.delete('/User/delete_Entreprise/:id', (req, res) => {
  const userId = req.params.id;

Entreprise.findByIdAndDelete(userId)
  .then((Entreprise) => {
    if (!Entreprise) {
      res.status(404).json({ message: 'Entreprise introuvable' });
    } else {
      res.status(200).json({ message: 'Entreprise supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});



// Route pour ajouter un nouvel Entreprise
router.post('/Entreprise/add_Entreprise', (req, res) => {
  const { Nom, Prenom, Mail, Tel, Entreprise } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!Nom || !Prenom || !Mail || !Tel || !Entreprise) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Entreprise en utilisant le modèle User
  const newEntreprise = new Entreprise({Nom,Prenom,Mail,Tel,Entreprise,});

  // Sauvegarde du nouvel Entreprise dans la base de données
  newEntreprise.save()
    .then((Entreprise) => {
      res.status(201).json(Entreprise); // Renvoie l'Entreprise créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});


  module.exports = router;