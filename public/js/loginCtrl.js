/**
 * Created by Ruben on 02/04/2017.
 */
var myApp = angular.module('angularRoutingApp');

    myApp.controller('loginCtrl', ['$scope','$rootScope','$http','$location', function ($scope,$rootScope, $http,$location){
        $scope.alert=false;
        $rootScope.torbe=false;
        $rootScope.seeRegister=false;
        $scope.login={};

        $scope.newUser = function () {
            console.log("NEW USER!!!!!!!");
            $location.path('new_user')
        }

        $scope.addlogin = function (login) {
            console.log (login)
            $http({
                method: 'POST',
                data:login,
                url: '/users/login'
            }).then(function successCallback(response) {
                console.log (response)
                $rootScope.user= response.data.player
                console.log ($scope.user.imageUrl)
                if (response.data.player.rol=="admin"){
                    $rootScope.torbe=true;
                    $rootScope.idplayer= response.data.player._id
                    $location.path('/users');
                }
                else{
                    $rootScope.seeRegister= true;
                    $rootScope.idplayer= response.data.player._id
                    $rootScope.torneos_user= response.data.player.torneos
                    console.log ("register")
                    $location.path('/torneos_reg');
                }

            }, function errorCallback(response) {
                console.log (response.status)
                if (response.status=404){
                    $scope.alert=true;
                }
            });


        }
        $scope.goFacebook = function () {
            $http({
                method: 'GET',
                url: '/auth/facebook'
            }).then(function successCallback(response) {
                console.log (response)

            }, function errorCallback(response) {

            });


        }

    }]);