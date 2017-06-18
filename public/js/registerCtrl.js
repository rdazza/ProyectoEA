/**
 * Created by Ruben on 05/06/2017.
 */

var myApp = angular.module('angularRoutingApp');

myApp.controller('registerCtrl', ['$scope','$rootScope','$http','$location','$route', function ($scope, $rootScope, $http,$location,$route){
    $scope.pageSize=10;
    $rootScope.torbe=true;
    $scope.value= 0;
    $scope.alert= false;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/torneos/'+$rootScope.idtorneo
    }).then(function successCallback(response) {
        console.log (response)
        $scope.registers =response.data.participantes;

        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    $scope.newTorneo = function () {
        $location.path('new_torneo')
    }
    $scope.cancel = function () {
        $location.path('/torneos')
    }
    var results=[];
    $scope.sendResult = function () {
        console.log (results);
        var locate=false;
        if (results.length>0) {
            for (var i=0; i<results.length; i++){
                if (results[i].resultado==0 || results[i].resultado>10){
                    $scope.alert=true;
                    locate=true;
                }
            }
        }
        else{
            $scope.alert=true;
            locate=true;
        }
        if (locate==false){
            $scope.alert=false;
            for (var i=0; i<results.length; i++){
                $http({
                    method: 'POST',
                    data: results[i],
                    url: 'http://localhost:3000/users/addresult/'+$rootScope.idtorneo
                }).then(function successCallback(response) {
                    // this callback will be called asynchronously
                    // when the response is available
                }, function errorCallback(response) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });

            }
            if (i= results.length-1){
                $location.path('torneos')
            }

        }
    }

    $scope.addpoints = function (posicion,value, player) {
       console.log (posicion);
       console.log (value);
       var locate=false;
       if (results.length>0&&value>0){
           for (var i=0; i<results.length; i++){
               if (results[i]._id==player._id&&results[i].resultado==value){
                   locate=true;
                   break;
               }
               else if (results[i]._id==player._id&&results[i].resultado!=value){
                   locate=true;
                   results[i].resultado= value;
               }
           }
           if (locate==false){
               var result={
                   _id: player._id,
                   resultado: value,
               }
               results.push(result)
           }
       }
       else if (results.length==0&&value>0){
           var result={
               _id: player._id,
               resultado: value,
           }
           results.push(result)
       }

    }


}]);