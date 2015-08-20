angular.module('chat-up', ['chat-up.services', 'chat-up.directives', 'ui.router', 'ngMaterial', 'luegg.directives'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/chat/global');

        $stateProvider
            .state('app', {
                url: '',
                templateUrl: 'app/partials/base.html',
                controller: 'MainCtrl'
            });
    }])
    .controller('MainCtrl', ['$scope', '$mdSidenav', 'cupChat', function ($scope, $mdSidenav, cupChat) {}]);