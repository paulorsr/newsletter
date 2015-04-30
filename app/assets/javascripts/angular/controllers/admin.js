newsletter.controller('adminController', function ($scope, $rootScope, $http, $location) {

  // Obter da api as newsletters
  $http.get('api/newsletters').
  // Callback para ligaçao bem sucedida
  success(function(data, status, headers, config) {
  	$scope.newsletters = data;
  }).
  // Callback para ligaçao mal sucedida
  error(function(data, status, headers, config) { 
  	alert("Erro ao obter as newsletters.");
  });
   // Obter da api as mailing lists
   $http.get('api/mailinglists').
   success(function(data, status, headers, config) {
   	$scope.mailinglists = data.mailinglists;
   }).
   error(function(data, status, headers, config) { 
   	alert("Error ao obter as mailinglists.");
   });
   // Listener para uma nova newsletter
   $scope.newNewsletter = function() {
   	$scope.newsletter = {};
   	$location.path("/newsletter");
   }
   // Listener para guardar newsletter
   $scope.saveNewsletter = function() {
   	$http.put('api/newsletter/create').
   	success(function(data, status, headers, config) {
   		$scope.newsletters = data.newsletters;
   	}).
   	error(function(data, status, headers, config) { 
   		alert("Erro ao guardar newsletter");
   	});
   }
   // Listener para editar newsletter
   $scope.editNewsletter = function(id) {
   	$http.get('api/' + id + '.json').
   	success(function(data, status, headers, config) {
   		$rootScope.newsletter = data;
   		$location.path("/newsletter");
   	}).
   	error(function(data, status, headers, config) { 
   		alert("Error ao editar newsletter com id " + id);
   	});
   }
   // Listener for delete newsletter
   $scope.deleteNewsletter = function(id) {
   	$http.get('api/newsletter/delete/' + id).
   	success(function(data, status, headers, config) {
   		$scope.newsletters = data.newsletters;
   	}).
   	error(function(data, status, headers, config) { 
   		alert("Error deleting newsletter with id " + id);
   	});
   }
   // Listener for cancel current action
   $scope.cancel = function() {
   	$location.path("/admin");
   }
}
);