
var session;

var endButton = document.getElementById('endCall');

endButton.addEventListener("click", function () {
    session.bye();
    alert("Call Ended");
}, false);


var config = {
    displayName: 'Sergey',
    uri: '1060@192.168.1.37',
    wsServers: 'ws://192.168.1.37:8088/ws',
    authorizationUser: '1060',
    password: 'password',
    register: true,
    hackIpInContact: true,
    stunServers: "stun.iptel.org",
    traceSip: true,
    hackViaTcp: true,
    noAnswerTimeout: 120,
    log: {
        builtinEnabled: true,
    }
};


var userAgent = new SIP.UA(config);

var options = {
    media: {
        constraints: {
            audio: true,
            video: false,
        },
    },
};


userAgent.on('invite', function (session2) {
    session2.accept();
});


var callStartButton = document.getElementById('callStartButton');

callStartButton.addEventListener("click", function () {
    session = userAgent.invite('1061', options);
    alert("make call");
}, false);