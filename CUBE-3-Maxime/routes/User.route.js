const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcrypt');




// Route pour récupérer tous les utilisateurs
router.get('/Users', (req, res) => {
    
    User.find()
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
    
    User.findById(userId)
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

User.findByIdAndDelete(userId)
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

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(Mdp, 10);

    // Création d'un nouvel utilisateur en utilisant le modèle User
    const newUser = new User({
      Nom,
      Prenom,
      Mail,
      Tel,
      Entreprise,
      Mdp: hashedPassword,
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

  const user = await User.findOne({ Mail: normalizedMail });
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
    const updatedUser = await User.findByIdAndUpdate(
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

// Assurez-vous d'adapter cette fonctionnalité en fonction de vos besoins spécifiques et de la structure de votre base de données.



// Route pour la modification d'un champ spécifique d'un utilisateur par ID
router.patch('/User/unique_update/:id', async (req, res) => {
  const userId = req.params.id;
  const updateData = req.body; // Les données de mise à jour

  try {
    // Mettre à jour l'utilisateur dans la base de données
    const updatedUser = await User.findByIdAndUpdate(
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

// N'oubliez pas d'adapter cette approche en fonction de vos besoins spécifiques et de la structure de votre base de données.












/*------------------ANCIEN CODE -----------------------

// Route pour connecter un utilisateur

router.post('/User/login', async (req, res) => {
  const { Mail, Mdp } = req.body;

  try {
    const user = await User.findOne({ Mail });

    if (!user) {
      return res.status(401).json({ message: 'Adresse e-mail non trouvée' });
    }

    const isPasswordValid = await bcrypt.compare(Mdp, user.Mdp);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Adresse e-mail ou mot de passe incorrect' });
    }

    res.json({ message: 'Connexion réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});







const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const bcrypt = require('bcryptjs'); // Pour le hachage du mot de passe
const jwt = require('jsonwebtoken'); // Pour la création du token JWT
const { check, validationResult } = require('express-validator');

const jwtSecret = 'your_jwt_secret'; //


// Route pour l'inscription
router.post('/User/signup',
[
  // vérifiez que l'email n'est pas vide et qu'il a un format correct
  check('Mail').isEmail().withMessage('Invalid email format'),
  
  // vérifiez que le mot de passe n'est pas vide et qu'il a au moins 5 caractères
  check('Mdp').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  check('Nom').notEmpty().withMessage('Ce champs est requis'),
  check('Prenom').notEmpty().withMessage('Ce champs est requis'),
  check('Tel').notEmpty().withMessage('Ce champs est requis'),
  check('Entreprise').notEmpty().withMessage('Ce champs est requis'),
  // vous pouvez ajouter plus de vérifications ici pour les autres champs de votre formulaire
  
],
 async (req, res) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await User.findOne({ Mail: req.body.Mail });
    if (user) {
      return res.status(400).json({ message: 'Votre mail est déjà pris' });
    }

  const { Nom, Prenom, Mail, Tel, Entreprise, Mdp } = req.body;

  // Hachez le mot de passe avant de le stocker
  const hashedPassword = await bcrypt.hash(Mdp, 10);

  const newUser = new User({ Nom, Prenom, Mail, Tel, Entreprise, Mdp: hashedPassword });

  newUser.save()
    .then((user) => {
      // Créez un token pour le nouvel utilisateur
      const token = jwt.sign({ _id: user._id }, jwtSecret);

      res.status(201).json({ user, token });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// Route pour la connexion
router.post('/User/login', async (req, res) => {
  const { Mail, Mdp } = req.body;

  const user = await User.findOne({ Mail });
  if (!user) {
    return res.status(400).json({ message: 'Email incorrect' });
  }

  const isPasswordCorrect = await bcrypt.compare(Mdp, user.Mdp);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: 'Mot de passe incorrect' });
  }

  // Créez un token pour l'utilisateur connecté
  const token = jwt.sign({ _id: user._id }, jwtSecret);

  return res.json({ user, token });
});




  module.exports = router;
  
 */