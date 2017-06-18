/**
 * Created by Ruben on 14/03/2017.
 */
var myApp = angular.module('angularRoutingApp');

myApp.controller('usersCtrl', ['$scope','$rootScope','$http','$location','$route', function ($scope, $rootScope, $http,$location,$route){
    $scope.pageSize=10;
        $http({
            method: 'GET',
            url: 'http://localhost:3000/users/allusers'
        }).then(function successCallback(response) {
            console.log (response)
            $scope.users =response.data;
            // this callback will be called asynchronously
            // when the response is available
        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    $scope.newUser = function () {
        $location.path('new_user')
    }
    $scope.cancelUser = function () {
        $location.path('/users')
    }
    $scope.updateUser = function (user) {
        console.log (user);
        $rootScope.user=user;
        $location.path('/update_user')
    }
    $scope.update = function () {
        console.log ($rootScope.user);
        $http({
            method: 'PUT',
            data: $rootScope.user,
            url: '/users/'+$rootScope.user._id

        }).then(function successCallback(response) {
            console.log(response);
            $location.path('/users')
        }, function errorCallback(response) {
        });
    }

    $scope.deleteUser = function (user) {
        console.log (user);
        $http({
            method: 'DELETE',
            url: '/users/'+user._id
        }).then(function successCallback(response) {
            console.log(response);
            $location.path('/users');
            $route.reload()
        }, function errorCallback(response) {
        });
        $location.path('/users')
    }


    $scope.addUser = function (user) {
        console.log(user);
        $scope.user = user;
        $http({
            method: 'POST',
            data: user,
            url: '/users/adduser'
        }).then(function successCallback(response) {
            console.log(response);
            $location.path('/users')
        }, function errorCallback(response) {
        });

    }



}]);



