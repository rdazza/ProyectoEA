/**
 * Created by Ruben on 18/06/2017.
 */
/**
 * Created by Ruben on 11/06/2017.
 */
var myApp = angular.module('angularRoutingApp');

myApp.controller('misReservasCtrl', ['$scope','$rootScope','$http','$location','$route', function ($scope, $rootScope, $http,$location,$route){
    $scope.pageSize=10;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/reservas/allreservas'
    }).then(function successCallback(response) {
        console.log (response)
        response.data= response.data.filter(function(obj){

            console.log (obj.nombre)
            return obj.nombre._id==$rootScope.idplayer;
        })

        $scope.reservas = response.data;
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });



    $scope.goRanking = function (torneo) {
        $rootScope.idtorneo= torneo._id
        $location.path('ranking')
    }



}]);