var angularRoutingApp = angular.module('angularRoutingApp', [
    'ngRoute','angularUtils.directives.dirPagination']).
    run(function ($rootScope,$location) {
    $rootScope.exit_app = function () {
        $location.path('login')
    }
}).
config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $routeProvider.when('/login', {templateUrl: 'partials/login.html',controller:'loginCtrl'});
    //$routeProvider.when('/profile', {templateUrl: 'partials/profile.html'});
    $routeProvider.when('/torneos', {templateUrl: 'partials/torneos.html', controller:'torneosCtrl'});
    $routeProvider.when('/new_torneo', {templateUrl: 'partials/new_torneo.html',controller:'torneosCtrl'});
    $routeProvider.when('/registers', {templateUrl: 'partials/registers.html',controller:'registerCtrl'});
    $routeProvider.when('/ranking', {templateUrl: 'partials/classification.html',controller:'rankingCtrl'});
    $routeProvider.when('/users', {templateUrl: 'partials/listadouser.html',controller:'usersCtrl'});
    $routeProvider.when('/reservas', {templateUrl: 'partials/reservas.html',controller:'reservaCtrl'});
    $routeProvider.when('/mis_reservas', {templateUrl: 'partials/mis_reservas.html',controller:'misReservasCtrl'});
    $routeProvider.when('/new_user', {templateUrl: 'partials/new_user.html',controller:'usersCtrl'});
    $routeProvider.when('/update_user', {templateUrl: 'partials/update_user.html',controller:'usersCtrl'});
    $routeProvider.when('/torneos_reg', {templateUrl: 'partials/torneos_reg.html',controller:'torneosCtrl'});
    $routeProvider.when('/mis_torneos', {templateUrl: 'partials/mis_torneos.html',controller:'misTorneosCtrl'});
   // $routeProvider.when('/principal', {templateUrl: 'principal.html'});
    $routeProvider.otherwise({redirectTo: '/login'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});

}]);



