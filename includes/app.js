
var session;

var endButton = document.getElementById('callEndButton');

endButton.addEventListener("click", function () {
    session.bye();  
}, false);


var config = {
    displayName: 'Sergey',
    uri: '1060@192.168.1.37',
    wsServers: 'ws://192.168.1.37:8088/ws',
    authorizationUser: '1060',
    password: 'password',
    register: true,
    hackIpInContact: true,
    stunServers: "",
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


userAgent.on('invite', function (incomingSession) {
    session = incomingSession;
    session.accept();
});


var callStartButton = document.getElementById('callStartButton');

callStartButton.addEventListener("click", function () {
    var number = $('#inputNumber').val();
    session = userAgent.invite(number, options);
}, false);