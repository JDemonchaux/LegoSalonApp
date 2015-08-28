

var socket = io("http://127.0.0.1");
try {
    socket = io("http://1654654654654:3000", {reconnect: false});
}
catch (err) {
}
angular.module('starter.controllers', [])

    // CONTROLLER HOME
    .controller('HomeCtrl', function ($scope, $rootScope) {
        $scope.nombre = "";
        $scope.error = "";
        socket.on("countVisiteur", function (msg) {
            $rootScope.$apply(function () {
                $scope.nombre = msg + " Visiteurs";
            });
        });

        if (socket == "") {
            $scope.error = "Impossible de contacter le serveur!";
        };
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
        $scope.serveur = {ip: ""};
        $scope.connectTo = function() {
            socket.disconnect();

            $scope.ip = "http://" + $scope.serveur.ip + ":3000";
            socket = io($scope.ip);


        };

        socket.on('disconnect', function() {
            $scope.ip = "http://" + $scope.serveur.ip + ":3000";
            socket = io($scope.ip);
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
