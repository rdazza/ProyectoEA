/**
 * Created by Ruben on 05/06/2017.
 */

var myApp = angular.module('angularRoutingApp');

myApp.controller('torneosCtrl', ['$scope','$rootScope','$http','$location','$route', function ($scope, $rootScope, $http,$location,$route){
    $scope.pageSize=10;

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
        url: 'http://localhost:3000/torneos/alltorneos'
    }).then(function successCallback(response) {
        console.log (response)
        $scope.torneos =response.data;
        for (var i=0; i<$scope.torneos.length; i++){
            var reserva= new Date($scope.torneos[i].reserva).getDate() + '/' + (new Date($scope.torneos[i].reserva).getMonth()+1) + '/' + new Date($scope.torneos[i].reserva).getFullYear()

            for (var j=0; j<days_reg.length; j++){
                var day= new Date(days_reg[i]).getDate() + '/' + (new Date(days_reg[i]).getMonth()+1) + '/' + new Date(days_reg[i]).getFullYear()
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
    $scope.newTorneo = function () {
        $location.path('new_torneo')
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
    $scope.cancelTorneo = function () {
        $location.path('/torneo')
    }
    $scope.goRegister = function (torneo) {
        $rootScope.torneo=torneo;
        var locate=false;
        console.log (torneo)
        console.log ($rootScope.torneos_user)
        for (var i=0; i<$rootScope.torneos_user.length; i++){
            if ($rootScope.torneos_user[i].torneo== torneo._id){
                locate=true;
            }
        }
        if (locate==true){
            swal(
                'Ups...',
                'Ya esta inscrito en este torneo!',
                'error'
            )
        }
        else{
            swal({
                title: '¿Deseas inscribirte en este torneo?',
                text:  torneo.nombre,
                type: 'info',
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> ¡Sí!',
                cancelButtonText:
                    '<i class="fa fa-thumbs-down"></i> ¡No!'
            }).then(function () {
                var torneo={
                    torneo: $rootScope.torneo
                }
                console.log (torneo)
                $http({
                    method: 'PUT',
                    data: torneo,
                    url: '/users/registro-torneo/' + $rootScope.idplayer
                }).then(function successCallback(response) {
                    var player={
                        idplayer:  $rootScope.idplayer
                    }
                    $http({
                        method: 'PUT',
                        data: player,
                        url: '/users/addparticipante-torneo/'+$rootScope.torneo._id,
                    }).then(function successCallback(response) {
                        swal(
                            'Te has inscrito correctamente!'
                        )
                        $location.path('/torneos_reg')
                        $route.reload()
                    }, function errorCallback(response) {
                    });
                }, function errorCallback(response) {
                });
            }, function (dismiss) {

            })
        }

    }

    $scope.deleteTorneo = function (torneo) {
        console.log (torneo);
        $http({
            method: 'DELETE',
            url: '/torneos/'+torneo._id
        }).then(function successCallback(response) {
            console.log(response);
            $location.path('/torneos');
            $route.reload()
        }, function errorCallback(response) {
        });
}


    $scope.addTorneo = function () {
        console.log($scope.name);
        var creador={
            nombre: "Administrador",
            email: "admin@torbe.es"
        }
        var torneo={
            nombre: $scope.name,
            creador: creador,
            reserva: $rootScope.dayReg.getTime()
        }
        console.log ()
        $http({
            method: 'POST',
            data: torneo,
            url: '/torneos/addtorneo'
        }).then(function successCallback(response) {
            console.log(response);
            $location.path('/torneos')
        }, function errorCallback(response) {
        });

    }
    $scope.goRanking = function (torneo) {
        $rootScope.idtorneo= torneo._id
        $location.path('ranking')
    }

    $scope.see_registers = function (torneo) {
        $rootScope.idtorneo= torneo._id
        $location.path('registers')
    }

    $scope.cancelTorneo= function () {
        if ($rootScope.torbe==true){
            $location.path('torneos')
        }
        else{
            $location.path('mis_torneos')
        }

    }

}]);
