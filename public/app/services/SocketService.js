angular.module('chat-up.services')
    .factory('socket', function () {
        return io();
    });
