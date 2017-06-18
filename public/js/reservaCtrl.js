/**
 * Created by Ruben on 18/06/2017.
 */
/**
 * Created by Ruben on 05/06/2017.
 */

var myApp = angular.module('angularRoutingApp');

myApp.controller('reservaCtrl', ['$scope','$rootScope','$http','$location','$route', function ($scope, $rootScope, $http,$location,$route){

    var days_reg=[];
    var today= new Date();
    var day_1 = new Date();
    day_1.setDate(today.getDate()+1);
    days_reg.push(day_1);
    var day_2 = new Date();
    day_2.setDate(day_1.getDate()+1);
    days_reg.push(day_2);
    var day_3 = new Date();
    day_3.setDate(day_2.getDate()+1);
    days_reg.push(day_3);
    var day_4 = new Date();
    day_4.setDate(day_3.getDate()+1);
    days_reg.push(day_4);
    var day_5 = new Date();
    day_5.setDate(day_4.getDate()+1);
    days_reg.push(day_5);
    var day_6 = new Date();
    day_6.setDate(day_5.getDate()+1);
    days_reg.push(day_6);
    var day_7 = new Date();
    day_7.setDate(day_6.getDate()+1);
    days_reg.push(day_7);
    for (var i=0; i<days_reg; i++){
        days_reg[i]["checked"]=false
    }
    $scope.days_reg= days_reg
    //console.log (tomorrow.getDate() + '/' + (tomorrow.getMonth()+1) + '/' + tomorrow.getFullYear())
    $http({
        method: 'GET',
        url: 'http://localhost:3000/reservas/allreservas'
    }).then(function successCallback(response) {
        console.log (response)
        $scope.reservas =response.data;
        for (var i=0; i<$scope.reservas.length; i++){
            var reserva= new Date($scope.reservas[i].fecha).getDate() + '/' + (new Date($scope.reservas[i].fecha).getMonth()+1) + '/' + new Date($scope.reservas[i].fecha).getFullYear()

            for (var j=0; j<days_reg.length; j++){
                var day= new Date(days_reg[j]).getDate() + '/' + (new Date(days_reg[j]).getMonth()+1) + '/' + new Date(days_reg[j]).getFullYear()
                if (reserva==day){
                    days_reg.splice(j,1)
                    break
                }
            }
        }
        // this callback will be called asynchronously
        // when the response is available
    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });
    $scope.selReserva = function (day) {
        $rootScope.dayReg= day;
        console.log ($rootScope.dayReg)
    }
    $scope.addReserva = function () {
        var reserva={
            nombre: $rootScope.idplayer,
            participantes: $scope.value,
            reserva: $rootScope.dayReg
        }
        $http({
            method: 'POST',
            data: reserva,
            url: '/reservas/addreserva'
        }).then(function successCallback(response) {
            $location.path('/torneos')
        }, function errorCallback(response) {
        });
    }
    $scope.updateSelection = function(position,checked) {
        for (var i=0; i<days_reg.length; i++){
            if (i==position){
                days_reg[position].checked= checked
                $scope.checked = checked;
                $rootScope.dayReg= days_reg[position];
            }
            else{
                days_reg[i].checked= false
            }
        }
    }
    $scope.cancel = function () {
        $location.path('/torneos')
    }


}]);
