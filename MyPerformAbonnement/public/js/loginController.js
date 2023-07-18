var app = angular.module('MyApp');

app.controller('loginController', ['$scope', '$http', '$window', function($scope, $http, $window) {
  $scope.email = '';
  $scope.mot_de_passe = '';
  $scope.isLoggedIn = sessionStorage.getItem('isLoggedIn') ? true : false;

  $scope.$watch('isLoggedIn', function(newVal, oldVal) {
      if (newVal !== oldVal) {
          sessionStorage.setItem('isLoggedIn', newVal);
      }
  });

  $scope.login = function() {
      $http.post('/users/login', {
          email: $scope.email,
          mot_de_passe: $scope.mot_de_passe
      }).then(function(response) {
          if (response.data.auth && response.data.token) {
              sessionStorage.setItem('token', response.data.token);
              sessionStorage.setItem('isLoggedIn', true);
              $scope.isLoggedIn = true;
              $window.location.href = "/home.html";
          } else {
              alert('Invalid credentials');
          }
      }).catch(function(error) {
          console.error('Error during login', error);
      });
  };
}]);