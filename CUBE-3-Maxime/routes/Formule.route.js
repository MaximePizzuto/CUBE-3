const express = require('express');
const router = express.Router();
const Formule = require('../models/Formule.model');

// Route pour récupérer tous les Formules
router.get('/Formule', (req, res) => {
    
    Formule.find()
      .then((Formule) => {
        res.status(200).json(Formule);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Formule dans la collection !' });
      });
  });



// Route pour récupérer un Formule par ID
router.get('/Formule/:id', (req, res) => {
    const FormuleId = req.params.id;
    
    Formule.findById(FormuleId)
      .then((Formule) => {
        if (!Formule) {
          res.status(404).json({ message: 'Formule non trouvé' });
        } else {
          res.status(200).json(Formule);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });



// Route pour supprimer un Formule par ID
router.delete('/Formule/delete_Formule/:id', (req, res) => {
  const FormuleId = req.params.id;

Formule.findByIdAndDelete(FormuleId)
  .then((Formule) => {
    if (!Formule) {
      res.status(404).json({ message: 'Formule introuvable' });
    } else {
      res.status(200).json({ message: 'Formule supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});



// Route pour ajouter un nouvel Formule
router.post('/Formule/add_Formule', (req, res) => {
  const { Nom, Date_Crea, Date_modif, Description, PrixFormule } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!Nom || !Date_Crea || !Date_modif || !Description || !PrixFormule) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Formule en utilisant le modèle User
  const newFormule = new Formule({Nom, Date_Crea, Date_modif, Description, PrixFormule});

  // Sauvegarde du nouvel Formule dans la base de données
  newFormule.save()
    .then((Formule) => {
      res.status(201).json(Formule); // Renvoie l'Entreprise créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});


  module.exports = router;