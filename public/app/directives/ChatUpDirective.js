angular.module('chat-up.directives', ['ngMaterial', 'luegg.directives'])
    .directive('chatUpChat', function () {
        return {
            restrict: 'AE',
            templateUrl: '/app/partials/chat.html',
            controller: ['$scope', '$attrs', '$stateParams', function ($scope, $attrs, $stateParams) {

                var socket = io();

                $scope.title = $scope.title || $attrs.title || '';
                $scope.username = $scope.username || $attrs.username || 'User' + Math.floor(Math.random() * 2061032);

                $scope.chat = {
                    currentMessage: {
                        text: ''
                    },
                    messages: []
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
                        msg.user = {
                            name: $scope.username,
                            avatar: null
                        };

                        $scope.chat.messages.push(angular.copy(msg));
                        socket.emit('send', msg);
                        msg.text = '';
                    }
                }

                socket.emit('ready', {
                    user: $scope.username
                });
            }]
        }
    });