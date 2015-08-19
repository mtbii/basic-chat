angular.module('chat-up', ['chat-up.services', 'ui.router', 'ngMaterial', 'luegg.directives'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/chat/global');

        $stateProvider
            .state('app', {
                url: '',
                abstract: true,
                templateUrl: 'app/partials/base.html',
                controller: 'MainCtrl'
            })
            .state('app.chat', {
                url: '/chat/:id',
                templateUrl: 'app/partials/chat.html',
                controller: 'ChatCtrl'
            });
    }])
    .controller('MainCtrl', ['$scope', '$mdSidenav', 'cupChat', function ($scope, $mdSidenav, cupChat) {

        $scope.username = '';

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        }

        $scope.generateUserId = function () {
            $scope.username = 'User' + Math.floor(Math.random() * 1000);
            return $scope.username;
        }

        $scope.generateUserId();
    }])
    .controller('ChatCtrl', ['$scope', '$log', '$location', '$state', '$stateParams', '$anchorScroll', '$mdSidenav', 'socket', function ($scope, $log, $location, $state, $stateParams, $anchorScroll, $mdSidenav, socket) {

        $log.debug($stateParams.id);

        $scope.chat = {
            title: 'Test',
            currentMessage: {
                text: ''
            },
            messages: []
        }

        $scope.isMobile = function () {
            return !$mdSidenav('left').isLockedOpen();
        }

        socket.on('message', receiveMessage);

        function receiveMessage(msg) {
            $scope.$apply(function () {
                $scope.chat.messages.push(angular.copy(msg));
            });
        }

        $scope.sendMessage = function (msg) {
            if (msg.text) {
                msg.date = new Date();
                msg.user = $scope.$parent.username;
                $log.log(msg);
                $scope.chat.messages.push(angular.copy(msg));
                socket.emit('send', msg);
                msg.text = '';
            }
        }

        socket.emit('ready', {
            user: $scope.$parent.username
        });
            }]);
