angular.module('owo-phone', ['ngRoute'])

.factory('Phone', function(){
    return Phone();
})
 

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      controller:'ListCtrl',
      templateUrl:'/includes/list.html'
    })
    .otherwise({
      redirectTo:'/'
    });
})
 
.controller('ListCtrl', function($scope, Phone) {

    var host = 'localhost';

    var config = {
        uri: '1060@' + host,
        wsServers: 'ws://'+ host +':8088/ws',
        authorizationUser: '1060',
        password: 'password',
        hackIpInContact: true,
        register: false,
        log: {
            builtinEnabled: false,
        },
        stunServers: [
            "stun.ideasip.com",
            "stun.iptel.org",
            "stun.rixtelecom.se",
            "stun.schlund.de",
            "stunserver.org",
            "stun.stunprotocol.org:3478",
            "stun.voiparound.com",
            "stun.voipbuster.com",
            "stun.voipstunt.com",
            "stun.turnservers.com:3478"
        ],    
    };

    var phone = new Phone();

    phone.init(host, config);

    phone.line.on('registered', function(){
        $scope.$apply(function(){
            $scope.phone.line.isRegistered();
        });            
    });

    phone.line.on('connected', function(){
        $scope.$apply(function(){
            $scope.phone.line.isConnected();
        });            
    });
    
    $scope.phone = phone;
    $scope.line = phone.line;
})