angular.module('myapp', ['timer'])

.controller('HomeCtrl', function($scope, $http) {
  $scope.name = "Marco";
  $scope.counter = {total: 0};

  $http.get('countries.json')
  .then(function(resp) {
    $scope.countries = resp.data
  });


  $scope.$watch('entry', function() {
    angular.forEach($scope.countries, function(country) {
      if ($scope.entry === country.name) {
        country.guessed = true;
        $scope.counter.total += 1;
        if ($scope.counter[country.continent]) {
          $scope.counter[country.continent] += 1;
        } else {
          $scope.counter[country.continent] = 1;
        };
        console.log($scope.counter);
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

