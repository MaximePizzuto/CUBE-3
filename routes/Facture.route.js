const express = require('express');
const router = express.Router();
const FactureModel = require('../models/Facture.model');

// Route pour ajouter un nouvel Facture (CREATE)
router.post('/Factures/addFacture', (req, res) => {
  const { Id, Id_Facture, Id_user, Montant_HT, Montant_TTC, Formule, Date_payement, Id_Abonnement, Description, Date_Creation, Date_Modification, pdf_facture, csv_facture } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if ( !Id || !Id_Facture || !Id_user || !Montant_HT || !Montant_TTC || !Formule || !Date_payement || !Id_Abonnement || !Description || !Date_Creation || !Date_Modification || !pdf_facture || !csv_facture) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'une nouvelle Facture en utilisant le modèle Facture
  const nouvelleFacture = new FactureModel({ Id, Id_Facture, Id_user, Montant_HT, Montant_TTC, Formule, Date_payement, Id_Abonnement, Description, Date_Creation, Date_Modification, pdf_facture, csv_facture });

  // Sauvegarde d'une nouvelle Facture dans la base de données
  nouvelleFacture.save()
    .then((Facture) => {
      res.status(201).json(Facture); // Renvoie la Facture créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});

// Route pour récupérer tous les Factures (READ)
router.get('/Factures', (req, res) => {
    
  FactureModel.find()
      .then((Facture) => {
        res.status(200).json(Facture);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Facture dans la collection !' });
      });
  });


// Route pour récupérer un Facture par ID (READ ID)
router.get('Factures/:id', (req, res) => {
  const factureId = req.params.id;

  FactureModel.findById(factureId)
    .then((facture) => {
      if (!facture) {
        res.status(404).json({ message: 'Facture non trouvée' });
      } else {
        res.status(200).json(facture);
      }
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

// Route pour mettre à jour une facture par ID (UPDATE)
router.put('/factures/:id', (req, res) => {
  const factureId = req.params.id;
  const updatedData = req.body;

  FactureModel.findByIdAndUpdate(factureId, updatedData, { new: true })
    .then((facture) => {
      if (!facture) {
        res.status(404).json({ message: 'Facture introuvable' });
      } else {
        res.status(200).json(facture);
      }
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour supprimer une Facture par ID
router.delete('/User/delete_Facture/:id', (req, res) => {
  const FactureId = req.params.id;

FactureModel.findByIdAndDelete(FactureId)
  .then((Facture) => {
    if (!Facture) {
      res.status(404).json({ message: 'Facture introuvable' });
    } else {
      res.status(200).json({ message: 'Facture supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});


module.exports = router;