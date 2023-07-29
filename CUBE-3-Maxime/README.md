# CUBE-3
# API V 0.0.5

#Connexion / config serveur :

- Adresse : http://localhost:5000

#Pour les tests POSTMAN
  
- Visualisation des Users :

  Tous les Users => http://localhost:5000/Users
  Un User par l'id => http://localhost:5000/User/:id

- Suppression d'un User par l'id => http://localhost:5000/User/delete/64ba8aa4accacb38d4707d15
  
- Ajout d'un utilisateur ( POSTMAN ) => http://localhost:5000/User/adduser => aller dans json puis ajouter les éléments d'un user =>

 {
  "Nom": "Maxime",
  "Prenom": "Snow",
  "Mail": "john.doe@example.com",
  "Tel": "000000000000000000789",
  "Entreprise": "ExampleCorp",
  "Mdp": "TESTMDP"
}

=> cliquer sur " Send "

24/07/2023 

#AJOUT DES ROUTES ABONNEMENT + ENTREPRISE ( voir routes )


#Installer les dépendences et le dotenv correctement

ATTENTION !!! Pour que les verifications à l'inscription fonctionnent j'ai ajouté le package express-validator
A installer avec npm install express-validator en BackEnd