/**
 * Created by Ruben on 02/04/2017.
 */
var myApp = angular.module('angularRoutingApp');

    myApp.controller('loginCtrl', ['$scope','$rootScope','$http','$location', function ($scope,$rootScope, $http,$location){
        $scope.alert=false;
        $rootScope.torbe=false;
        $scope.login={}
        $scope.addlogin = function (login) {
            console.log (login)
            $http({
                method: 'POST',
                data:login,
                url: '/users/login'
            }).then(function successCallback(response) {
                console.log (response)
                $location.path('/users');
            }, function errorCallback(response) {
                console.log (response.status)
                if (response.status=404){
                    $scope.alert=true;
                }
            });


        }


    }]);