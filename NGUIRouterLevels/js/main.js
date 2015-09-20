var app = angular.module('demo', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('users', {
            url: '/users',
            templateUrl: 'templates/users.html'
        })
        .state('users.profile', {
            url: '/profile',
            templateUrl: 'templates/profile.html'
        })
        .state('users.profile.photo', {
            url: '/photo',
            templateUrl: 'templates/photo.html'
        })
        .state('users.account', {
            url: '/account',
            templateUrl: 'templates/account.html'
        });
}])

app.controller('demoCtrl', function ($scope, $state) {
    $scope.goto = function (page) {
        $state.go(page, {location: true});
    }

    $scope.commands = ['users', 'users.profile', 'users.profile.photo', 'users.account'];
    $scope.currentIndex = 0;
    $scope.command = $scope.commands[$scope.currentIndex];

    $scope.$watch('command', function (newValue, oldValue) {
        //console.log('new and old commands: ', newValue, oldValue);
        if (newValue != oldValue) {
            $scope.goto(newValue);
        }
    })

    $scope.sendCommand = function() {

        setInterval(function(){
            //console.log("current command and index", $scope.command, $scope.currentIndex);
            $scope.currentIndex = ($scope.currentIndex++) < $scope.commands.length-1?$scope.currentIndex++:0;
            $scope.command = $scope.commands[$scope.currentIndex];
            //console.log("new command and index", $scope.command, $scope.currentIndex);
            $scope.$digest();
        }, 3000);
    }
    $scope.sendCommand();
})
