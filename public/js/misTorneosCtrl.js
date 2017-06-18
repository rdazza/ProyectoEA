/**
 * Created by Ruben on 11/06/2017.
 */
var myApp = angular.module('angularRoutingApp');

myApp.controller('misTorneosCtrl', ['$scope','$rootScope','$http','$location','$route', function ($scope, $rootScope, $http,$location,$route){
    $scope.pageSize=10;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/torneos/alltorneos'
    }).then(function successCallback(response) {
        console.log (response)
        var mistorneos=[]
        for (var i=0; i<response.data.length; i++){
            for (var j=0; j<response.data[i].participantes.length; j++){
                if (response.data[i].participantes[j].participante._id== $rootScope.idplayer){
                    console.log ("encontrado");
                    mistorneos.push(response.data[i])
                }
            }
        }
        $scope.torneos = mistorneos;
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