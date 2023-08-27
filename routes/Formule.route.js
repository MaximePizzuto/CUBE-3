const express = require('express');
const router = express.Router();
const FormuleModel = require('../models/Formule.model');

// Route pour ajouter une nouvelle formule (CREATE)
router.post('/formules', (req, res) => {
  const { Nom, Date_Crea, Date_modif, Description } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if (!Nom || !Date_Crea || !Date_modif || !Description) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  const nouvelleFormule = new FormuleModel({Nom,Date_Crea,Date_modif,Description,});

  // Sauvegarde d'une nouvelle dans la base de données
  nouvelleFormule.save()
    .then((formule) => {
      res.status(201).json(formule);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour récupérer toutes les formules (READ)
router.get('/formules', (req, res) => {
  FormuleModel.find()
    .then((formules) => {
      res.status(200).json(formules);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message },{ message: 'Aucune Formule dans la collection !' });
    });
});

// Route pour récupérer un Entreprise par ID (READ ID)
router.get('/formules/:id', (req, res) => {
  const formuleId = req.params.id;

  FormuleModel.findById(formuleId)
    .then((formule) => {
      if (!formule) {
        res.status(404).json({ message: 'Formule non trouvée' });
      } else {
        res.status(200).json(formule);
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// Route pour mettre à jour une formule par ID (UPDATE)
router.put('/formules/:id', (req, res) => {
  const formuleId = req.params.id;
  const updatedData = req.body;

  FormuleModel.findByIdAndUpdate(formuleId, updatedData, { new: true })
    .then((formule) => {
      if (!formule) {
        res.status(404).json({ message: 'Formule introuvable' });
      } else {
        res.status(200).json(formule);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour supprimer une formule par ID (DELETE)
router.delete('/formules/:id', (req, res) => {
  const formuleId = req.params.id;

  FormuleModel.findByIdAndDelete(formuleId)
    .then((formule) => {
      if (!formule) {
        res.status(404).json({ message: 'Formule introuvable' });
      } else {
        res.status(200).json({ message: 'Formule supprimée avec succès' });
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;