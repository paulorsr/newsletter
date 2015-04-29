newsletter.controller('loginController', function ($scope, $rootScope, $http, $location) {

 $scope.login = function() {
   $http.get('api/login.json', $scope.user).
   success(function(data, status, headers, config) {
    $rootScope.token = data.token;
    $rootScope.user = {
      "name": data.name,
      "token": data.token
    };
    $location.path("admin");
  }).
   error(function(data, status, headers, config) { 
    console.log(status);
    $scope.reset;
  });
 }

 $scope.reset = function() {
  if($scope.user) {
    $scope.user.username = "";
    $scope.user.password = "";
  }
}
}
);
