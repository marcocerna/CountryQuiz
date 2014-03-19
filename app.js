angular.module('myapp', ['timer', 'ngRoute'])

.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/templates/default.html',
    controller: "DefaultCtrl"
  })
  .when('/continents', {
    templateUrl: '/templates/continents.html',
    controller: 'ContinentsCtrl'
  })
  .otherwise({
    redirectTo: '/'
  })
})

.controller('HomeCtrl', function($scope, $http, $location) {
  $scope.counter = {
    total: 0,
    Europe: 0,
    Asia: 0,
    Africa: 0,
    Oceania: 0,
    "North America": 0,
    "South America": 0
  };

  $http.get('countries.json')
  .then(function(resp) {
    $scope.countries = resp.data
  });


  $scope.$watch('entry', function() {
    angular.forEach($scope.countries, function(country) {
      if ($scope.entry === country.name) {
        country.guessed = true;
        $scope.counter.total += 1;
        $scope.counter[country.continent] += 1;
        $scope.entry = '';
        console.log($scope.counter)
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

  $scope.goToContinents = function() {
    $location.path('/continents');
    $scope.showContinents = true
  };

  $scope.goToMain = function() {
    $location.path('/');
    $scope.showContinents = false;
  };

})

.controller('DefaultCtrl', function($scope) {})
.controller('ContinentsCtrl', function($scope) {})