const express = require('express');
const router = express.Router();
const EntrepriseModel = require('../models/Entreprise.model');

// Route pour récupérer tous les Entreprises
router.get('/Entreprises', (req, res) => {
    
    EntrepriseModel.find()
      .then((Entreprise) => {
        res.status(200).json(Entreprise);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Entreprise dans la collection !' });
      });
  });



// Route pour récupérer un Entreprise par ID
router.get('/Entreprise/:id', (req, res) => {
    const Entreprise_id = req.params.id;
    
    EntrepriseModel.findById(Entreprise_id)
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
router.delete('/Entreprise/delete_Entreprise/:id', (req, res) => {
  const Entreprise_id = req.params.id;

EntrepriseModel.findByIdAndDelete(Entreprise_id)
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
  const { id_user, Nom_Entreprise, Adresse_Postale, Nom_Employes, Date_Crea, Date_modif, Tel } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!id_user || !Nom_Entreprise || !Adresse_Postale || !Nom_Employes || !Date_Crea || !Date_modif || !Tel) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Entreprise en utilisant le modèle User
  const newEntreprise = new EntrepriseModel({id_user, Nom_Entreprise, Adresse_Postale, Nom_Employes, Date_Crea, Date_modif, Tel});

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