/**
 * Created by Ruben on 05/06/2017.
 */

var myApp = angular.module('angularRoutingApp');

myApp.controller('rankingCtrl', ['$scope','$rootScope','$http','$location','$route', function ($scope, $rootScope, $http,$location,$route){
    $scope.pageSize=10;
    $http({
        method: 'GET',
        url: 'http://localhost:3000/users/allusers'
    }).then(function successCallback(response) {
        console.log (response);
        console.log ($rootScope.idtorneo);
        var datos=[];
        for (var i=0; i<response.data.length; i++){
            var data= response.data[i].torneos.filter(function(obj){
                console.log (obj.torneo._id)
                return obj.torneo._id==$rootScope.idtorneo;
            })
            if (data.length>0){
                if (data[0].resultado!=undefined){
                    var user={
                        nombre: response.data[i].nombre,
                        apellidos: response.data[i].apellidos,
                        email:response.data[i].email,
                        resultado: data[0].resultado,
                    }
                    datos.push(user);
                 }
                 else{
                    var user={
                        nombre: response.data[i].nombre,
                        apellidos: response.data[i].apellidos,
                        email:response.data[i].email,
                        resultado: 0,
                    }
                    datos.push(user);
                 }
            }


        }

        $scope.rankings= datos
// filtrados es [12, 130, 44]
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    $scope.goBack= function () {
        if ($rootScope.torbe==true){
            $location.path('torneos')
        }
        else{
            $location.path('mis_torneos')
        }

    }



}]);
