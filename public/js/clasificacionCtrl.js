/**
 * Created by Ruben on 14/03/2017.
 */
var myApp = angular.module('angularRoutingApp');

myApp.controller('clasificacionCtrl', ['$scope','$http', function ($scope, $http){

    $scope.loadClasificacion = function () {

        console.log("loadClassifications!!!!!!!!!")
        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/allusers'
        }).then(function successCallback(response) {
            console.log (response)
            $scope.clasificacion = response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        /*var positions = [];
        positions.push({"name":"Ruben", "puntos":200});
        positions.push({"name":"Toni", "puntos":50});
        positions.push({"name":"Toni", "puntos":50});
        positions.push({"name":"Toni", "puntos":50});
        positions.push({"name":"Toni", "puntos":50});
        positions.push({"name":"Juan", "puntos":50});
        positions.push({"name":"Toni", "puntos":50});
        positions.push({"name":"Toni", "puntos":50});*/
        //$scope.clasificacion = positions;

    }


}]);



