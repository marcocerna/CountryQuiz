angular.module('myapp', ['timer', 'ngRoute'])

.config(function($routeProvider) {
  $routeProvider
  .when('/',           {templateUrl: '/templates/default.html',    controller: "DefaultCtrl"})
  .when('/continents', {templateUrl: '/templates/continents.html', controller: 'ContinentsCtrl'})
  .otherwise(          {redirectTo: '/'})
})

.service('countries', function($http) {
  this.getJSON = function() {
    return $http.get('countries.json').then(function(resp) {
      return resp.data;
    });
  };
})

.controller('HomeCtrl', function($scope, $http, countries) {
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


  countries.getJSON().then(function(resp) {
    $scope.countries = resp
  });

  $scope.$watch('entry', function() {
    angular.forEach($scope.countries, function(country) {
      if (angular.lowercase($scope.entry) === angular.lowercase(country.name)) {
        country.guessed = true;
        $scope.correct.total += 1;
        $scope.continents[country.continent] += 1;
        $scope.entry = '';
      }
    });
  });

  $scope.startTimer = function (){
      $scope.timerRunning === false ? $scope.$broadcast('timer-resume') : $scope.$broadcast('timer-start');
      $scope.timerRunning = true;
  };

  $scope.stopTimer = function (){
      $scope.$broadcast('timer-stop');
      $scope.timerRunning = false;
  };
})

.controller('DefaultCtrl', function($scope) {
  $scope.showContinents.status = false;
})
.controller('ContinentsCtrl', function($scope) {
  $scope.showContinents.status = true;
})