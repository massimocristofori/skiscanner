"use strict";

angular.module('skiscanner.routes', ['ngRoute'])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
   .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'templates/home.html',
         controller: 'HomeCtrl'
      });
      $routeProvider.when('/addSkiArea', {
         templateUrl: 'templates/addSkiArea.html',
         controller: 'AreaCtrl'
      });
      $routeProvider.when('/profile', {
         templateUrl: 'templates/profile.html',
         controller: 'ProfileCtrl'
      });
      $routeProvider.when('/request/:skiArea', {
         templateUrl: 'templates/request.html',
         controller: 'RequestCtrl'
      });
      $routeProvider.when('/request/:skiArea/:type/:id', {
         templateUrl: 'templates/request.html',
         controller: 'RequestCtrl'
      });
       $routeProvider.when('/requestsList', {
         templateUrl: 'templates/requestsList.html',
           controller: 'RequestsListCtrl'
      });
       $routeProvider.when('/dealsList/:skiArea/:type', {
         templateUrl: 'templates/dealsList.html',
         controller: 'DealsListCtrl'
      });

      $routeProvider.otherwise({redirectTo: '/home'});
   }]);