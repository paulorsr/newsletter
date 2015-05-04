newsletter.controller('adminController', function ($scope, $rootScope, $http, $location, $cookieStore) {

// Verificar session id
if ($cookieStore.get('token')) {
  $rootScope.name = $cookieStore.get('name');
} else {
  $location.path("login");
  return;
}

// Obter da api as newsletters
$http.get('api/newsletters/show?token=' + $cookieStore.get('token')).
// Callback para ligaçao bem sucedida
success(function(data, status, headers, config) {
  $scope.newsletters = data;
}).
// Callback para ligaçao mal sucedida
error(function(data, status, headers, config) { 
	
});
 
 // Obter da api as mailing lists
 $http.get('api/mailinglists/show?token=' + $cookieStore.get('token')).
 success(function(data, status, headers, config) {
 	$scope.mailinglists = data;
 }).
 error(function(data, status, headers, config) { 
 	
 });
 
 // Listener para o logout
 $scope.logout = function() {
  $cookieStore.remove('token');
  $cookieStore.remove('name');
  $location.path("login");
}

 // Listener para criar uma nova newsletter
 $scope.newNewsletter = function() {
 	$rootScope.newsletter = {};
 	$location.path("newsletter");
 }
 // Listener para guardar newsletter
 $scope.saveNewsletter = function() {
  if(!$rootScope.newsletter) {
    return;
  }
 	$http({
  method: "POST",
  url: "api/newsletters/save?token=" + $cookieStore.get('token'),
  data: $rootScope.newsletter,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }}).
 	success(function(data, status, headers, config) {
    $rootScope.newsletter = {}
 		$location.path("admin");
 	}).
 	error(function(data, status, headers, config) { 
 		
 	});
 }
 // Listener para editar newsletter
 $scope.editNewsletter = function(id) {
 	$http.get('api/newsletters/get?id=' + id + "&token=" + $cookieStore.get('token')).
 	success(function(data, status, headers, config) {
 		$rootScope.newsletter = data;
 		$location.path("newsletter");
 	}).
 	error(function(data, status, headers, config) {
 	});
 }
 // Listener para eliminar newsletter
 $scope.deleteNewsletter = function(id) {
 	$http.get('api/newsletters/delete?id=' + id + "&token=" + $cookieStore.get('token')).
 	success(function(data, status, headers, config) {
 		$scope.newsletters = data;
 	}).
 	error(function(data, status, headers, config) { 
 		
 	});
 }


 // Listener para criar uma nova mailinglist
 $scope.newMailinglist = function() {
  $rootScope.mailinglist = {};
  $location.path("mailinglist");
 }
 // Listener para guardar mailinglist
 $scope.saveMailinglist = function() {
  if(!$rootScope.mailinglist) {
    return;
  }
  $http({
  method: "POST",
  url: "api/mailinglists/save?token=" + $cookieStore.get('token'),
  data: $rootScope.mailinglist,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }}).
  success(function(data, status, headers, config) {
    $rootScope.mailinglist = {}
    $location.path("admin");
  });
 }
 // Listener para editar mailinglist
 $scope.editMailinglist = function(id) {
  $http.get('api/mailinglists/get?id=' + id + "&token=" + $cookieStore.get('token')).
  success(function(data, status, headers, config) {
    $rootScope.mailinglist = data;
    $location.path("mailinglist");
  });
 }
 // Listener para eliminar mailinglist
 $scope.deleteMailinglist = function(id) {
  $http.get('api/mailinglists/delete?id=' + id + "&token=" + $cookieStore.get('token')).
  success(function(data, status, headers, config) {
    $scope.mailinglists = data;
  });
 }

// Verifica as alteraçoes às checkboxs das mailing lists
var checkedMailinglists = [];
$scope.checkMailinglists = function($event, id) {
  var present = false;
  for(i = 0; i < checkedMailinglists.length; i++) {
    if(checkedMailinglists[i].id == id) {
      checkedMailinglists[i].value = $event.target.checked
      present = true;
    }
  }
  if (!present) {
    checkedMailinglists.push({"id":id, "value":$event.target.checked})
  }
}

 // Listener para enviar emails
 $scope.send = function(id) {

  var selectedMailinglists =  [];
  for(i = 0; i < checkedMailinglists.length; i++) {
    if (checkedMailinglists[i].value) {
      selectedMailinglists.push(checkedMailinglists[i].id);
    }
  }
  
  if (selectedMailinglists.length == 0) {
    console.log("mailinglist not selected");
    return;
  }

  // Cria o object a enviar por post
  var email = {
    "newsletter": id,
    "mailinglists": selectedMailinglists
  }
  
  // Envia o email
  $http({
  method: "POST",
  url: "api/emails/post?token=" + $cookieStore.get('token'),
  data: email,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }}).
  success(function(data, status, headers, config) {
    console.log("Newsletter sent.");
  });
 }
 
 // Listener para cancelar a presente acçao
 $scope.cancel = function() {
  $rootScope.newsletter = {};
 	$location.path("/admin");
 }
}
);