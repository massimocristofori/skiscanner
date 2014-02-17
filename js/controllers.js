'use strict';
/* Controllers */
angular.module('skiscanner.controllers', [])
    .controller('HomeCtrl', ['$scope', 'fbUser', 'fbSkiAreas', 'fbDeals', 'USER', '$location', '$log',
        function($scope, fbUser, fbSkiAreas, fbDeals, USER, $location, $log) {
            //$scope.user = fbUser(USER);
            $scope.skiAreas = fbSkiAreas();
            //$scope.deals = fbDeals();
            //
            
        }
    ])
    .controller('HeaderFooterCtrl', ['$scope', '$firebase', 'USER', '$location', '$log', 'FBURL', '$ionicActionSheet', 
        function($scope, $firebase, USER, $location, $log, FBURL, $ionicActionSheet) {
            $scope.requests = $firebase(new Firebase(FBURL + '/users/' + USER + '/requests'));
            $scope.activeDeals = 0;
            $scope.actionSheetButtons = new Array();
            $scope.requests.$on("loaded", function() {
                var keys = $scope.requests.$getIndex();
                keys.forEach(function(key, i) {
                    $scope.actionSheetButtons[i] = "{text: 'Delete " + $scope.requests[key].skiArea + "}";
                    var skiArea = $scope.requests[key].skiArea;
                    var type = "buy";
                    if(angular.equals($scope.requests[key].type, "buy")) {
                        type = "sell";
                    }
                    var deals = $firebase(new Firebase(FBURL + '/requests/' +
                        skiArea + '/' + type));
                    deals.$on("loaded", function() {
                        $scope.requests[key].activeDeals = deals.$getIndex().length;
                        $scope.activeDeals += deals.$getIndex().length;
                    });
                    $scope.requests[key].deals = deals;
                });
            });
            $scope.isHome = function() {
                return angular.equals($location.path(), '/home');
            }
            $scope.showFooter = function() {
                return angular.equals($location.path(), '/home') && $scope.activeDeals > 0;
            }
            $scope.leftButtonTo = function() {
                if(angular.equals($location.path(), '/home')) {
                    $location.path("/profile");
                } else if(angular.equals($location.path().substr(0, 10), '/dealsList')) {
                    $location.path("/requestsList");
                } else {
                    $location.path("/home");
                }
            }
            $scope.rightButtonTo = function() {
                if(angular.equals($location.path(), '/home')) {
                    $location.path("/addSkiArea");
                }
            }
            $scope.requestsList = function() {
                $location.path("/requestsList");
            }
            
            $scope.showActionSheet = function() {
                $ionicActionSheet.show({
                    buttons: [{
                        text: 'Delete Folgaria'
                    }, {
                        text: 'Delete Smartino'
                    }, ],
                    titleText: 'what do u wanna do? ;)',
                    destructiveText: 'Cancel',
                    cancel: function() {},
                    buttonClicked: function(index) {
                        alert("r u sure?");
                        return true;
                    },
                    destructiveButtonClicked: function() {
                        return true;
                    }
                });
            };
        }
    ])
    .controller('RequestCtrl', ['$scope', 'fbUser', 'fbRequestById', 'fbSaveRequest', '$location', '$routeParams', 'USER',
        function($scope, fbUser, fbRequestById, fbSaveRequest, $location, $routeParams, USER) {
            $scope.request = fbRequestById($routeParams.area, $routeParams.type, $routeParams.id);
            $scope.request.skiArea = $routeParams.skiArea;
            $scope.request.user = USER;
            $scope.saveBuyRequest = function() {
                $scope.request.type = "buy";
                fbSaveRequest(USER, $scope.request);
                $location.path("/requestList/" + $scope.request.skiArea + "/" + $scope.request.type);
                $scope.request = "";
            };
            $scope.saveSellRequest = function() {
                $scope.request.type = "sell";
                fbSaveRequest(USER, $scope.request);
                $location.path("/requestList/" + $scope.request.skiArea + "/" + $scope.request.type);
                $scope.request = "";
            };
            /*$scope.loadRequests = function() {
                    alert("/requestList/" + $scope.request.area + "/" + $scope.request.type);
                    var type = "buy";
                    if(angular.equals($scope.request.type, "buy")) {
                        type = "sell";
                    }
                    $scope.requestList = fbRequestsByAreaType($scope.request.area, type);
                    alert($scope.requestList);
                    angular.forEach($scope.requestList, function(value, key){
                        alert(key + ': ' + value);
                    });
                    $location.path("/requestList");
                };*/
        }
    ])
    .controller('RequestsListCtrl', ['$scope', '$log', '$location', '$routeParams', 'fbUser', 'USER', 'fbDealsCountBySkiArea', 'fbDealsBySkiArea',
        function($scope, $log, $location, $routeParams, fbUser, USER, fbDealsCountBySkiArea, fbDealsBySkiArea) {}
    ])
    .controller('DealsListCtrl', ['$scope', '$log', 'fbDealsBySkiArea', '$location', '$routeParams', 'USER',
        function($scope, $log, fbDealsBySkiArea, $location, $routeParams, USER) {}
    ])
    .controller('AreaCtrl', ['$scope', 'fbUser', 'fbAddSkiArea', '$location', '$routeParams', 'USER',
        function($scope, fbUser, fbAddSkiArea, $location, $routeParams, USER) {
            $scope.errorMsg = "";
            $scope.skiArea = "";
            $scope.country = "";
            $scope.city = "";
            $scope.skipassPrice = "";
            $scope.addSkiArea = function() {
                var added = fbAddSkiArea($scope.skiArea, $scope.country, $scope.city, $scope.skipassPrice, USER);
                if(added) {
                    $location.path("/");
                } else {
                    $scope.errorMsg = $scope.skiArea + " already exists!";
                }
            };
        }
    ])
    .controller('ProfileCtrl', ['$scope', 'fbUser', 'fbSaveProfile', '$location', '$routeParams', 'USER',
        function($scope, fbUser, fbSaveProfile, $location, $routeParams, USER) {
            $scope.profile = fbUser(USER);
            $scope.saveProfile = function() {
                fbSaveProfile(USER, $scope.profile.name, $scope.profile.gender, $scope.profile.type, $scope.profile.jacket, $scope.profile.pants);
                $location.path("/");
            };
        }
    ]);
            
            