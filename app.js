angular.module('myapp', ['timer'])

.controller('HomeCtrl', function($scope, $http) {
  $scope.name = "Marco";
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

})

