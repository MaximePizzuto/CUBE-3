const express = require('express');
const router = express.Router();
const EntrepriseModel = require('../models/Entreprise.model');

// Route pour ajouter un nouvel Entreprise (CREATE)
router.post('/Entreprise/add_Entreprise', (req, res) => {
  const {Nom,Localisation,Employes,Date_Crea,Date_modif,Tel,} = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!Nom || !Localisation || !Employes || !Date_Crea || !Date_modif || !Tel) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Entreprise en utilisant le modèle Entreprise
  const nouvelleEntreprise = new EntrepriseModel({Nom, Localisation, Employes, Date_Crea, Date_modif, Tel,});

  // Sauvegarde du nouvel Entreprise dans la base de données
  nouvelleEntreprise.save()
    .then((Entreprise) => {
      res.status(201).json(Entreprise); // Renvoie l'Entreprise créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});

// Route pour récupérer tous les Entreprises (READ)
router.get('/Entreprises', (req, res) => {
  EntrepriseModel.find()
      .then((Entreprise) => {
        res.status(200).json(Entreprise);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Entreprise dans la collection !' });
      });
  });

// Route pour récupérer un Entreprise par ID (READ ID)
router.get('/Entreprise/:id', (req, res) => {
    const userId = req.params.id;
    
    EntrepriseModel.findById(userId)
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

// Route pour mettre à jour une entreprise par ID (UPDATE)
router.put('/entreprises/:id', (req, res) => {
  const entrepriseId = req.params.id;
  const updatedData = req.body;

  if (!updatedData.Nom || !updatedData.Localisation || !updatedData.Employes || !updatedData.Date_Crea || !updatedData.Date_modif || !updatedData.Tel) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  EntrepriseModel.findByIdAndUpdate(entrepriseId, updatedData, { new: true })
    .then((entreprise) => {
      if (!entreprise) {
        res.status(404).json({ message: 'Entreprise introuvable' });
      } else {
        res.status(200).json(entreprise);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour supprimer un Entreprise par ID
router.delete('/User/delete_Entreprise/:id', (req, res) => {
  const userId = req.params.id;

  EntrepriseModel.findByIdAndDelete(userId)
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

  module.exports = router;