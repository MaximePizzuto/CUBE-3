const express = require('express');
const router = express.Router();
const FactureModel = require('../models/Facture.model');
const PDFDocument = require('pdfkit');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');

// Route pour ajouter un nouvel Facture (CREATE)
router.post('/Factures/addFacture', (req, res) => {
  const { id_user, Montant_HT, Montant_TTC, Formule, Entreprise, Description, Date_Creation, Date_Modification } = req.body;

  // Vérification que les champs requis sont présents dans la requête
  if ( !id_user || !Montant_HT || !Montant_TTC || !Formule || !Entreprise || !Description || !Date_Creation || !Date_Modification) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
  }

  // Création d'une nouvelle Facture en utilisant le modèle Facture
  const nouvelleFacture = new FactureModel({ id_user, Montant_HT, Montant_TTC, Formule, Entreprise, Description, Date_Creation, Date_Modification });

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


//Recupérer une facture par id utilisateur
router.get('/Factures/byUsers/:id_user', async (req, res) => {
  try {
      const facture = await FactureModel.findOne({ id_user: req.params.id_user });
      if (facture) {
          res.json(facture);
      } else {
          res.status(404).send('Aucune facture trouvée pour cet utilisateur.');
      }
  } catch (error) {
      res.status(500).send('Erreur du serveur.');
  }
});

          // Route pour générer et télécharger un fichier PDF

          router.get('/download/facture/:id', (req, res) => {
            
            //recuprération de l'id
            const id = req.params._id;

          // Crée un nouveau document PDF
          const doc = new PDFDocument();

          // Paramètres du document
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `inline; filename=invoice_${id}.pdf`);

          // Pipe le document PDF dans la réponse HTTP
          doc.pipe(res);

          // Charger l'image (assurez-vous d'ajuster le chemin)
          // const imagePath = '../imgs/Cogelis.png'; // Mettez le chemin correct ici

          // Insérer l'image en haut du document
          // doc.image(imagePath, {
          //   fit: [500, 100], // Largeur et hauteur de l'image
          //   align: 'right',
          //   valign: 'top'
          // });

          // Contenu du document (facture)
          doc.moveDown(); // Déplacer un peu vers le bas après l'image

          // Contenu du document (facture)
          doc.fontSize(25).text('Facture du 05/09/2023', { align: 'center' });
          doc.moveDown(3);

          doc.fontSize(15).text(`Numéro de facture : 12789346`, { align: 'center' });
          doc.moveDown(5);

          // Informations du destinataire et vendeur
          const column1X = 80;
          const column2X = 380;
          const yPos = doc.y;

          doc.font('Helvetica-Bold').text('Destinataire :', column1X, yPos);
          doc.font('Helvetica').text('ALVERNHE Quentin', column2X, yPos);
          doc.text('123 Rue de la Facturation', column2X, doc.y);
          doc.text('54 000, NANCY', column2X, doc.y);
          doc.text('FRANCE', column2X, doc.y);
          doc.moveDown(2);

          doc.font('Helvetica-Bold').text('Vendeur :', column1X, doc.y);
          doc.font('Helvetica').text('MYPERFORM', column2X, doc.y);
          doc.text('456 Rue de la Vente', column2X, doc.y);
          doc.text('57 000, METZ', column2X, doc.y);
          doc.text('FRANCE', column2X, doc.y);
          doc.moveDown(5);

          // Tableau des produits/services
          const table = {
            headers: ['Formule', 'Quantité', 'Prix unitaire', 'Total TTC'],
            rows: [
              ['PRIMO', '1', '1200,00 €', '1440,00 €'],
            ],
          };
          const tableTop = doc.y;
          doc.font('Helvetica-Bold');
          table.headers.forEach((header, i) => {
            doc.text(header, 60 + i * 80, tableTop, { continued: true });
          });
          doc.moveDown(2);
          doc.font('Helvetica');
          table.rows.forEach((row) => {
            row.forEach((cell, i) => {
              doc.text(cell, -180 + i * 105, doc.y, { continued: true });
            });
            doc.moveDown();
          });


          // Finalise le document PDF
          doc.end();
          });


          //ROUTE POUR CRER L'EXPORT CSV DE LA FACTURE        
// Route pour télécharger un fichier CSV à partir de l'ID de l'utilisateur
router.get('/download/facture-csv/:id', (req, res) => {
  const id = req.params.id;

  // Définir le chemin et le nom du fichier CSV
  const csvFilePath = `facture_${id}.csv`;

  // Définir les informations du vendeur et du destinataire
  const vendeur = {
    nom: 'Mon Entreprise',
    adresse: '456 Rue de la Vente',
    villeCodePostal: 'Ville Vendeur, Code Postal',
    pays: 'Pays Vendeur'
  };

  const destinataire = {
    nom: 'John Doe',
    adresse: '123 Rue de la Facture',
    villeCodePostal: 'Ville, Code Postal',
    pays: 'Pays'
  };

  // Définir le contenu des lignes CSV
  const data = [
    { champ: 'Facture', valeur: id },
    { champ: 'Destinataire', valeur: destinataire.nom },
    { champ: 'Adresse', valeur: destinataire.adresse },
    { champ: 'Ville et Code Postal', valeur: destinataire.villeCodePostal },
    { champ: 'Pays', valeur: destinataire.pays },
    { champ: 'Vendeur', valeur: vendeur.nom },
    { champ: 'Adresse', valeur: vendeur.adresse },
    { champ: 'Ville et Code Postal', valeur: vendeur.villeCodePostal },
    { champ: 'Pays', valeur: vendeur.pays },
    // Ajoutez les autres lignes de produits ici
  ];

  // Créer un écrivain CSV
  const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
      { id: 'champ', title: 'Champ' },
      { id: 'valeur', title: 'Valeur' }
    ]
  });

  // Écrire les données dans le fichier CSV
  csvWriter.writeRecords(data)
    .then(() => {
      // Envoyer le fichier CSV comme réponse
      res.download(csvFilePath, `invoice_${id}.csv`, (err) => {
        if (err) {
          console.error('Erreur lors du téléchargement du fichier :', err);
        } else {
          // Supprimer le fichier CSV après l'envoi
          fs.unlinkSync(csvFilePath);
        }
      });
    })
    .catch(err => {
      console.error('Erreur lors de l\'écriture du fichier CSV :', err);
      res.status(500).send('Erreur lors de la génération du fichier.');
    });
});

module.exports = router;