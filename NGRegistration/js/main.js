var app = angular.module('demo', ['ui.router']);
app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        })
        .state('terms', {
            url: '/terms',
            templateUrl: 'templates/terms.html',
            controller: 'TermsController'
        });
}]);

app.controller('HomeController', ['$scope', 'RegistrationService', function ($scope, RegistrationService) {
    $scope.shows = RegistrationService.list();
    $scope.tab = 1;
    $scope.accountSetup = function() {
        $scope.tab = 2;
    }

    $scope.socialProfiles = function() {
        $scope.tab = 3;
    }

}]);

app.controller('TermsController', ['$scope', '$stateParams', 'RegistrationService', function ($scope, $stateParams, RegistrationService) {
    $scope.selectedShow = RegistrationService.find($stateParams.id);
}]);

app.factory('RegistrationService', function () {
    var shows = [{
        id: 1,
        name: 'Walking Dead',
        description: 'The Walking Dead is an American post-apocalyptic horror drama television series developed by Frank Darabont. It is based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard. It stars Andrew Lincoln as sheriff\'s deputy Rick Grimes, who awakens from a coma to find a post-apocalyptic world dominated by flesh-eating zombies.'
    },
        {
            id: 2,
            name: 'Breaking Bad',
            description: 'Breaking Bad is an American crime drama television series created and produced by Vince Gilligan. The show originally aired on the AMC network for five seasons, from January 20, 2008 to September 29, 2013. The main character is Walter White (Bryan Cranston), a struggling high school chemistry teacher who is diagnosed with inoperable lung cancer at the beginning of the series.'
        },
        {
            id: 3,
            name: '7D',
            description: 'The 7D is an American animated television series produced by Disney Television Animation, and broadcast on Disney XD starting in July 7, 2014. It is a re-imagining of the titular characters from the 1937 film Snow White and the Seven Dwarfs by Walt Disney Productions'
        }];


    return {
        list: function () {
            return shows;
        },
        find: function (id) {
            return _.find(shows, function (show) {
                return show.id == id
            });
        }
    }
});