'use strict';

// Declare app level module which depends on filters, and services
angular.module('skiscanner',
      ['ionic', 'firebase', 'ngAnimate', 'ngTouch', 'skiscanner.config', 'skiscanner.routes',  'skiscanner.filters', 'skiscanner.services', 'skiscanner.directives', 'skiscanner.controllers']
   )


   .run(['$rootScope', 'FBURL', 'USER', function($rootScope, FBURL, USER) {
      // establish authentication
      //$rootScope.auth = loginService.init('/login');
      $rootScope.FBURL = FBURL;
       $rootScope.USER = USER;
   }]);
