const express = require('express');
const router = express.Router();
const Facture = require('../models/Facture.model');

// Route pour récupérer tous les Factures
router.get('/Factures', (req, res) => {
    
    Facture.find()
      .then((Facture) => {
        res.status(200).json(Facture);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucune Facture dans la collection !' });
      });
  });


// Route pour récupérer un Facture par ID
router.get('/Facture/:id', (req, res) => {
    const FactureId = req.params.id;
    
    Entreprise.findById(userId)
      .then((Facture) => {
        if (!Facture) {
          res.status(404).json({ message: 'Facture non trouvé' });
        } else {
          res.status(200).json(Facture);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });


// Route pour supprimer un Facture par ID
router.delete('/Facture/delete_Facture/:id', (req, res) => {
  const FactureId = req.params.id;

Facture.findByIdAndDelete(FactureId)
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


// Route pour ajouter un nouvel Facture
router.post('/Facture/add_Facture', (req, res) => {
  const { Id_user, Montant_HT, Montant_TTC, Formule, Date_payement, Id_Abonnement, Description, Date_Creation, Date_Modification, pdf_facture, csv_facture } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if ( !Id_user || !Montant_HT || !Montant_TTC || !Formule || !Date_payement || !Id_Abonnement || !Description || !Date_Creation || !Date_Modification || !pdf_facture || !csv_facture) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'un nouvel Facture en utilisant le modèle User
  const Facture = new Facture({ Id_user, Montant_HT, Montant_TTC, Formule, Date_payement, Id_Abonnement, Description, Date_Creation, Date_Modification, pdf_facture, csv_facture });

  // Sauvegarde du nouvel Facture dans la base de données
  newFacture.save()
    .then((Facture) => {
      res.status(201).json(Facture); // Renvoie la Facture créé avec le statut 201 (Created)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
    });
});

router.get('/Facture/byUsers/:id_user', async (req, res) => {
  try {
      const facture = await Facture.findOne({ id_user: req.params.id_user });
      if (facture) {
          res.json(facture);
      } else {
          res.status(404).send('Aucune facture trouvée pour cet utilisateur.');
      }
  } catch (error) {
      res.status(500).send('Erreur du serveur.');
  }
});

module.exports = router;