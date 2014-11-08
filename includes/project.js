
$(function(){

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

    Phone = new phone();

    Phone.init(host, config);

    $("#call").on('click', function(e){
        Phone.call($("#number").val());
    });

    $("#end").on('click', function(e){
        Phone.end();
    });
});
