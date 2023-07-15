var app = angular.module('MyApp', []);

app.controller('homeController', ['$scope', '$window', '$http', function($scope, $window, $http) {
  $scope.isLoggedIn = sessionStorage.getItem('isLoggedIn') ? true : false;
  $scope.user = null;

  if ($scope.isLoggedIn) {
      var token = sessionStorage.getItem('token');
      $http.get('/users/me', { headers: { 'Authorization': 'Bearer ' + token }})
          .then(function(response) {
              $scope.user = response.data;
          }).catch(function(error) {
              console.error('Error retrieving user data', error);
          });
  }

  $scope.logout = function() {
      sessionStorage.clear();
      $scope.isLoggedIn = false;
      $window.location.href = "/login.html";
  };
}]);

