angular.module('skiscanner.service.firebase', ['firebase'])
    .factory('fbUser', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(id) {
                return $firebase(new Firebase(pathRef([FBURL, 'users', id])));
            }
        }
    ])
.factory('fbUserRequests', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(id) {
                return new Firebase(pathRef([FBURL, 'users', id, 'requests']));
            }
        }
    ])
    .factory('fbSkiAreas', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function() {
                return $firebase(new Firebase(pathRef([FBURL, 'skiareas'])));
            }
        }
    ])
.factory('fbDeals', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function() {
                return $firebase(new Firebase(pathRef([FBURL, 'requests'])));
            }
        }
    ])
    .factory('fbRequestById', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(skiArea, type, id) {
                return $firebase(new Firebase(pathRef([FBURL, 'requests', skiArea, type, id])));
            }
        }
    ])
    .factory('fbDealsBySkiArea', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(skiArea, type) {
                return $firebase(new Firebase(pathRef([FBURL, 'requests', skiArea, type])));
                
            }
        }
    ])
.factory('fbDealsCountBySkiArea', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(skiArea, type) {
                
                var ref = $firebase(new Firebase(pathRef([FBURL, 'requests', skiArea, type])));
                //var ref = $firebase(new Firebase(pathRef([FBURL, 'areas'])));
                //alert(ref.$getIndex());
                return ref;
            }
        }
    ])
    .service('fbSaveRequest', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(userId, request) {
                if (!angular.isDefined(request.id)) {
                    request.id = createId(new Date(), userId);
                }
                
                
                var ref = $firebase(new Firebase(pathRef([FBURL, 'requests', request.skiArea, request.type, request.id])));
                ref.$set({skiArea: request.skiArea, user: request.user, type: request.type, id: request.id, 
                          day: request.day, time: request.time, where: request.where, skipass: request.skipass}); 
                ref = $firebase(new Firebase(pathRef([FBURL, 'users', userId, 'requests', request.id])));
                ref.$set({skiArea: request.skiArea, user: request.user, type: request.type, id: request.id, 
                          day: request.day, time: request.time, where: request.where, skipass: request.skipass}); 
                return true;
            }
        }
    ])
    .service('fbAddSkiArea', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(skiArea, country, city, skipassPrice, user) {
                var ref = $firebase(new Firebase(pathRef([FBURL, 'skiareas'])));
                if (ref.$getIndex().indexOf(skiArea) == -1) {
                    var img = "img/cypress.jpg";
                    ref = $firebase(new Firebase(pathRef([FBURL, 'skiareas', skiArea])));
                    ref.$set({skiArea: skiArea, country: country, city: city, skipassPrice: skipassPrice, user: user, img: img}); 
                    return true;
                }
                return false;
            }
        }
    ])
    .service('fbSaveProfile', ['$firebase', 'FBURL',
        function($firebase, FBURL) {
            return function(id, name, gender, type, jacket, pants) {
                var ref = $firebase(new Firebase(pathRef([FBURL, 'users', id])));
                ref.$set({id: id, name: name, gender: gender, type: type, jacket: jacket, pants: pants}); 
                return true;
            }
        }
    ])
    .service('fbUserActiveRequests', ['$firebase', 'FBURL', '$log',
        function($firebase, FBURL, $log) {
            return function(user) {
                return $firebase(new Firebase(pathRef([FBURL, 'users', user, 'requests'])));
            }
        }
    ])
.service('fbGenericRef', ['$firebase', 'FBURL', '$log',
        function($firebase, FBURL, $log) {
            return function(path) {
                return new Firebase(pathRef([FBURL, 'path']));
                /*refUAR.once('value', function(dataSnapshot) {
                    var count =  0;
                    dataSnapshot.forEach(function(childSnapshot) {
                        count++;
                    
                    });
                    $log.log("count:" + count);
                    return count;
                });*/
            }
        }
    ]);


    function pathRef(args) {
        for(var i = 0; i < args.length; i++) {
            if(typeof(args[i]) === 'object') {
                args[i] = pathRef(args[i]);
            }
        }
        return args.join('/');
    }

function createId(date, user) {
    return date.getTime() + "-" + user;
}

function getDateFromId(id) {
    return null;
}
