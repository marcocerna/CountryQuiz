angular.module('myapp', ['timer', 'ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/',           {templateUrl: '/templates/default.html',    controller: "DefaultCtrl"})
  .when('/continents', {templateUrl: '/templates/continents.html', controller: 'ContinentsCtrl'})
  .otherwise(          {redirectTo: '/'})
}])

.service('countriesService', ['$http', function($http) {
  this.getJSON = function() {
    return $http.get('countries.json').then(function(resp) {
      return resp.data;
    });
  };
}])

.controller('HomeCtrl', ['$scope', '$http', 'countriesService', function($scope, $http, countriesService) {

  countriesService.getJSON().then(function(resp) {
    $scope.countries = resp
  });

  $scope.showContinents = {};
  $scope.correct = {total: 0};
  $scope.continents = {
    "Europe": 0,
    "Asia": 0,
    "Africa": 0,
    "Oceania": 0,
    "North America": 0,
    "South America": 0
  };

  $scope.$watch('entry', function() {
    angular.forEach($scope.countries, function(country) {
      if (angular.lowercase($scope.entry) === angular.lowercase(country.name) && country.guessed === false) {
        country.guessed = true;
        $scope.correct.total += 1;
        $scope.continents[country.continent] += 1;
        $scope.entry = '';
      }
    });
  });

  $scope.$watch('correct', function() {
    if ($scope.correct.total === 5) {
      $scope.gameWon = true;
      $scope.stopTimer();
    };
  }, true);

  $scope.startTimer = function (){
      $scope.timerRunning === false ? $scope.$broadcast('timer-resume') : $scope.$broadcast('timer-start');
      $scope.timerRunning = true;
  };

  $scope.stopTimer = function (){
      $scope.$broadcast('timer-stop');
      $scope.timerRunning = false;
  };
}])

.controller('DefaultCtrl', ['$scope', function($scope) {
  $scope.showContinents.status = false;
}])
.controller('ContinentsCtrl', ['$scope', function($scope) {
  $scope.showContinents.status = true;
}])