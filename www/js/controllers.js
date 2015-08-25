var ws = "http://192.168.0.12:8080/";
var socket = io("http://192.168.0.17:3000");

angular.module('starter.controllers', [])

    // CONTROLLER HOME
    .controller('HomeCtrl', function ($scope, $rootScope) {
        $scope.nombre;
        socket.on("countVisiteur", function (msg) {
            $rootScope.$apply(function () {
                $scope.nombre = msg + " Visiteurs";
            });
        });

    })

    // CONTROLLER ENTREE
    .controller('EntreeCtrl', function ($scope, $rootScope) {
        $scope.titre = "Gestion des entrees";
        $scope.nombre;

        $scope.addVisiteur = function (nb) {
            socket.emit('addVisiteur', nb);
        };

        socket.on("countVisiteur", function msg(msg) {
            $rootScope.$apply(function () {
                $scope.nombre = msg + " Visiteurs";
            });
        });
    })

    // CONTROLLER SORTIE
    .controller('SortieCtrl', function ($scope, $rootScope) {
        $scope.titre = "Gestion des sorties";
        $scope.nombre;

        $scope.removeVisiteur = function (nb) {
            socket.emit('removeVisiteur', nb);
        };

        socket.on("countVisiteur", function (msg) {
            $rootScope.$apply(function () {
                $scope.nombre = msg + " Visiteurs";
            });
        })
    })

    // CONTROLLER CONF
    .controller('ConfCtrl', function($scope) {
        $scope.connectTo = function(server) {
            socket = io("http://" + server + ":3000");
        }
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
