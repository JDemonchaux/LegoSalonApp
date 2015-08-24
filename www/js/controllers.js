var ws = "http://192.168.0.12:8080/";
angular.module('starter.controllers', [])

    .controller('HomeCtrl', function ($scope, $http, $interval) {
        // Récupération de la date
        $scope.updateDate = function(){
            $http.get(ws + "getDate").then(function (resp) {
                $scope.date = resp.data;
            });
        };



        // On recup une première fois le nombre de visiteur
        $http.get(ws + "countVisiteur").then(function (resp) {
            $scope.nombreGens = resp.data.nombre;
        });
        // On définit le timer qui va checker toute les x millisecondes
        $scope.refreshNBVisitor = $interval(function () {
            $http.get(ws + "countVisiteur").then(function (resp) {
                $scope.nombreGens = resp.data.nombre;
            })
        }, 10000);

        // Refresh des datas
        $scope.$on('$ionicView.enter', function (e) {
            $scope.refreshNBVisitor();
            // Récupération de la date
            $scope.updateDate();
        });
    })
    .controller('EntreeCtrl', function ($scope, $http, $interval) {
        $scope.titre = "Gestion des entrees";
        $scope.addVisiteur = function (number) {
            $http.get(ws + "addVisiteur/" + number).then(function (resp) {
                // On refresh le nombre de visiteur
                $http.get(ws + "countVisiteur").then(function (resp) {
                    $scope.nombreGens = resp.data.nombre;
                })
            })
        };


        // On recup une première fois le nombre de visiteur
        $http.get(ws + "countVisiteur").then(function (resp) {
            $scope.nombreGens = resp.data.nombre;
        });
        // On définit le timer qui va checker toute les x millisecondes
        $scope.refreshNBVisitor = $interval(function () {
            $http.get(ws + "countVisiteur").then(function (resp) {
                $scope.nombreGens = resp.data.nombre;
            })
        }, 10000);
        // Refresh des datas
        $scope.$on('$ionicView.enter', function (e) {
            $scope.refreshNBVisitor();
        });
    })
    .controller('SortieCtrl', function ($scope, $http, $interval) {
        $scope.titre = "Gestion des sorties"
        $scope.removeVisiteur = function (number) {
            $http.get(ws + "removeVisiteur/" + number).then(function (resp) {
                // On refresh le nombre de visiteur
                $http.get(ws + "countVisiteur").then(function (resp) {
                    $scope.nombreGens = resp.data.nombre;
                })
            })
        };

        // On recup une première fois le nombre de visiteur
        $http.get(ws + "countVisiteur").then(function (resp) {
            $scope.nombreGens = resp.data.nombre;
        });
        // On définit le timer qui va checker toute les x millisecondes
        $scope.refreshNBVisitor = $interval(function () {
            $http.get(ws + "countVisiteur").then(function (resp) {
                $scope.nombreGens = resp.data.nombre;
            })
        }, 10000);
        // Refresh des datas
        $scope.$on('$ionicView.enter', function (e) {
            $scope.refreshNBVisitor();
        });
    })
    //.controller('ChatsCtrl', function ($scope, Chats) {
    //    // With the new view caching in Ionic, Controllers are only called
    //    // when they are recreated or on app start, instead of every page change.
    //    // To listen for when this page is active (for example, to refresh data),
    //    // listen for the $ionicView.enter event:
    //    //
    //    //$scope.$on('$ionicView.enter', function(e) {
    //    //});
    //
    //    $scope.chats = Chats.all();
    //    $scope.remove = function (chat) {
    //        Chats.remove(chat);
    //    };
    //})
    //
    //.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    //    $scope.chat = Chats.get($stateParams.chatId);
    //})
    //
    //.controller('AccountCtrl', function ($scope) {
    //    $scope.settings = {
    //        enableFriends: true
    //    };
    //})
;
