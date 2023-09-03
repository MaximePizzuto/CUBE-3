const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');




// Route pour récupérer tous les utilisateurs
router.get('/Users', (req, res) => {
    
  UserModel.find()
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message },{ message: 'Aucun utilisateurs dans la collection !' });
      });
  });



// Route pour récupérer un utilisateur par ID
router.get('/User/:id', (req, res) => {
    const userId = req.params.id;
    
    UserModel.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'Utilisateur non trouvé' });
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  });



// Route pour supprimer un utilisateur par ID
router.delete('/User/delete/:id', (req, res) => {
  const userId = req.params.id;

  UserModel.findByIdAndDelete(userId)
  .then((user) => {
    if (!user) {
      res.status(404).json({ message: 'Utilisateur introuvable' });
    } else {
      res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
    }
  })
  .catch((err) => {
    res.status(400).json({ error: err.message });
  });
});



// Route pour ajouter un nouvel utilisateur
router.post('/User/signup', async (req, res) => {
  const { Nom, Prenom, Mail, Tel, Entreprise, Mdp } = req.body;

  try {
    // Vérification que les champs requis sont présents dans la requête
    if (!Nom || !Prenom || !Mail || !Tel || !Entreprise || !Mdp) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const existingUser = await UserModel.findOne({ Mail: Mail }); // Adaptez cette ligne à la façon dont vous avez défini votre modèle
    if (existingUser) {
      return res.status(409).json({ message: 'Email déjà utilisé' }); // 409 est le code HTTP pour "Conflit"
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(Mdp, 10);

    // Création d'un nouvel utilisateur en utilisant le modèle User
    const newUser = new UserModel({
      Nom,
      Prenom,
      Mail,
      Tel,
      Entreprise,
      Mdp: hashedPassword,
      is_Admin: false,
    });

    // Sauvegarde du nouvel utilisateur dans la base de données
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Renvoie l'utilisateur créé avec le statut 201 (Created)
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de sauvegarde
  }
});

// Route pour la connexion
router.post('/User/login', async (req, res) => {
  const { Mail, Mdp } = req.body;

  // Convertir l'adresse e-mail en minuscules
  const normalizedMail = Mail.toLowerCase();

  const user = await UserModel.findOne({ Mail: normalizedMail });
  if (!user) {
    return res.status(400).json({ message: 'Email incorrect' });
  }

  const isPasswordCorrect = await bcrypt.compare(Mdp, user.Mdp);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  // Ajouter une réponse réussie
  res.status(200).json({ message: 'Connexion réussie', user: user });
});




// Route pour la modification d'un utilisateur par ID
router.put('/User/update/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const { Nom, Prenom, Mail, Tel, Entreprise, Mdp } = req.body;

    // Vérification que les champs requis sont présents dans la requête
    if (!Nom || !Prenom ||  !Mail ||  !Tel ||  !Entreprise || !Mdp) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Hasher le nouveau mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(Mdp, 10);

    // Mettre à jour l'utilisateur dans la base de données
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        Nom,
        Prenom,
        Mail,
        Tel,
        Entreprise,
        Mdp: hashedPassword,
      },
      { new: true } // Renvoie le document mis à jour plutôt que l'ancien
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.status(200).json(updatedUser); // Renvoie l'utilisateur mis à jour
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de mise à jour
  }
});


// Vous pouvez appeler cette route via une requête HTTP PUT en fournissant l'ID de l'utilisateur dans l'URL et en incluant les nouvelles données dans le corps de la requête au format JSON. Par exemple :

// URL : http://localhost:5000/User/update/ID_DE_L_UTILISATEUR
// Méthode : PUT
// Corps en JSON :

// json

// {
//   "Nom": "NouveauNom",
//   "Prenom": "NouveauPrenom",
//   "Mail": "nouveau@mail.com",
//   "Tel": "NouveauNumTel",
//   "Entreprise": "NouvelleEntreprise",
//   "Mdp": "nouveaumotdepasse"
// }



// Route pour la modification d'un champ spécifique d'un utilisateur par ID
router.patch('/User/unique_update/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body; // Les données de mise à jour

  try {
    // Si le mot de passe est inclus dans les données de mise à jour, le hacher
    if (updateData.Mdp) {
      const hashedPassword = await bcrypt.hash(updateData.Mdp, 10);
      updateData.Mdp = hashedPassword;
    }
    // Mettre à jour l'utilisateur dans la base de données
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true } // Renvoie le document mis à jour plutôt que l'ancien
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.status(200).json(updatedUser); // Renvoie l'utilisateur mis à jour
  } catch (err) {
    res.status(500).json({ error: err.message }); // Erreur de serveur en cas de problème de mise à jour
  }
});
module.exports = router;

// Dans cette version, vous n'avez pas besoin de spécifier tous les champs à mettre à jour dans le corps de la requête. Au lieu de cela, vous pouvez fournir uniquement les champs que vous souhaitez mettre à jour. Par exemple, si vous voulez simplement mettre à jour le champ "Nom", vous pouvez envoyer une requête HTTP PATCH comme suit :

// URL : http://localhost:5000/User/update/ID_DE_L_UTILISATEUR
// Méthode : PATCH
// Corps en JSON :

// json

// {
//   "Nom": "NouveauNom"
// }

// L'objet JSON que vous envoyez dans le corps de la requête détermine quels champs seront mis à jour dans l'utilisateur.