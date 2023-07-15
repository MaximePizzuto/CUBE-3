var app = angular.module('MyApp', []);

app.controller('registerController', function ($scope, $http) {
  $scope.nom = '';
  $scope.prenom = '';
  $scope.email = '';
  $scope.mot_de_passe = '';

  $scope.register = function () {
    $http.post('/users/register', {
      nom: $scope.nom,
      prenom: $scope.prenom,
      email: $scope.email,
      mot_de_passe: $scope.mot_de_passe
    }).then(function (response) {
      if (response.data.auth) {
        window.location.href = '/login.html';
      } else {
        alert('Registration failed');
      }
    }, function (error) {
      console.error(error);
    });
  };
});