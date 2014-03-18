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

  $scope.stopTimer = function() {
    document.getElementsByTagName('timer')[0].stop()
  };
})

