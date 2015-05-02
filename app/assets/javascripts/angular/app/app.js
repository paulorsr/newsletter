var newsletter = angular.module('newsletter', ['ngRoute', 'ngCookies'])
.config(function($routeProvider){
  $routeProvider
  .when('/', {
    controller: 'loginController',
    templateUrl: 'assets/angular/views/login.html'
  })
  .when('/admin', {
    controller: 'adminController',
    templateUrl: 'assets/angular/views/admin.html'
  })
  .when('/newsletter', {
    controller: 'adminController',
    templateUrl: 'assets/angular/views/newsletter.html'
  })
  .when('/mailinglist', {
    controller: 'adminController',
    templateUrl: 'assets/angular/views/mailinglist.html'
  })
  .when('/logout', {
    controller: 'loginController',
    templateUrl: 'assets/angular/views/login.html'
  })
  .otherwise({
    redirectTo: '/'
  });
})
/*.run(function($rootScope, $location) {
  $rootScope.$on('$routeChangeStart', function(next, current) { 
    if(!$rootScope.user) {
      $location.path("/");
    }
  });
})*/