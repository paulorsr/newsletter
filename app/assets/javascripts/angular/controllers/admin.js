newsletter.controller('adminController', function ($scope, $rootScope, $http, $location) {

  // Get newsletters
  $http.get('api/newsletters.json').
  success(function(data, status, headers, config) {
  	$scope.newsletters = data.newsletters;
  }).
  error(function(data, status, headers, config) { 
  	alert("Error getting newsletters.");
  });
   // Get mailing lists
   $http.get('api/mailinglists.json').
   success(function(data, status, headers, config) {
   	$scope.mailinglists = data.mailinglists;
   }).
   error(function(data, status, headers, config) { 
   	alert("Error getting newsletters.");
   });
   // Listener for new newsletter
   $scope.newNewsletter = function() {
   	$scope.newsletter = {};
   	$location.path("/newsletter");
   }
   // Listener for saving new newsletter
   $scope.saveNewsletter = function() {
   	$http.put('api/newsletter/get/' + id + '.json').
   	success(function(data, status, headers, config) {
   		$scope.newsletters = data.newsletters;
   	}).
   	error(function(data, status, headers, config) { 
   		alert("Error creating newsletter");
   	});
   }
   // Listener for edit newsletter
   $scope.editNewsletter = function(id) {
   	$http.get('api/' + id + '.json').
   	success(function(data, status, headers, config) {
   		$rootScope.newsletter = data;
   		$location.path("/newsletter");
   	}).
   	error(function(data, status, headers, config) { 
   		alert("Error getting newsletter with id " + id);
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