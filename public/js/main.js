var angularRoutingApp = angular.module('angularRoutingApp', [
    'ngRoute','angularUtils.directives.dirPagination']).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider.when('/profile', {templateUrl: 'partials/profile.html'});
    $routeProvider.when('/clasificacion', {templateUrl: 'partials/clasificacion.html', controller:'clasificacionCtrl'});
    $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/', {templateUrl: 'partials/login.html',controller:'loginCtrl'});
    $routeProvider.when('/users', {templateUrl: 'partials/listadouser.html',controller:'usersCtrl'});
    $routeProvider.when('/new_user', {templateUrl: 'partials/newuser.html',controller:'usersCtrl'});
    $routeProvider.when('/update_user', {templateUrl: 'partials/updateuser.html',controller:'usersCtrl'});
   // $routeProvider.when('/principal', {templateUrl: 'principal.html'});
    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});

}]);



/*

// Creación del módulo
var angularRoutingApp = angular.module('angularRoutingApp', ['ngRoute']);

// Configuración de las rutas
angularRoutingApp.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl : 'partials/home.html',
            //controller  : 'homeController'
        })
        .when('/Profile', {
            templateUrl : 'partials/profile.html',
            //controller  : 'profileController'
        })
        .when('/Clasificacion', {
            templateUrl : 'partials/clasificacion.html',
            //controller  : 'clasifController'
        })
        .otherwise({
            redirectTo: '/'
        });
});



angularRoutingApp.controller('homeController', function($scope) {
    $scope.message = 'Hola, Mundo!';
});

angularRoutingApp.controller('profileController', function($scope) {
    $scope.message = 'Esta es la página "perfil"';
});

angularRoutingApp.controller('clasifController', function($scope) {
    $scope.message = 'Esta es la página de "Clasif"';
});

*/