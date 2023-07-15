// Création du module AngularJS
var app = angular.module('MyApp', ['ngRoute']);

// Configuration des routes
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home.html',
            controller: 'homeController'
        })
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginController'
        })
        .when('/register', {
            templateUrl: 'index.html',
            controller: 'registerController'
        })
        .otherwise({
            redirectTo: '/login'
        });
});

// Service pour partager des informations entre les contrôleurs
app.factory('sharedService', function() {
    var user = {};
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
});
