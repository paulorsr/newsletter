newsletter.controller('loginController', function ($scope, $rootScope, $http, $location, $cookieStore) {

  // verificar se o objecto user esta inicializado
if (!$scope.user) {
  $scope.user = {
    "username":"",
    "password":""
  }
}

$scope.login = function() {
// proceder ao login através de um post
$http({
  method: "POST",
  url: "api/login",
  data: $scope.user,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }}).
success(function(data, status, headers, config) {
  $cookieStore.put('name', data.name);
  $cookieStore.put('token', data.token);
  $location.path("admin");
});
}
// Limpa os campos uername e password
$scope.reset = function() {
  if($scope.user) {
    $scope.user.username = "";
    $scope.user.password = "";
  }
}
}
);
