
var session;

var endButton = document.getElementById('callEndButton');

endButton.addEventListener("click", function () {
    session.bye();  
}, false);


var host = '192.168.241.67';

var config = {
    uri: '1060@' + host,
    wsServers: 'ws://'+ host +':8088/ws',
    authorizationUser: '1060',
    password: 'password',    
    hackIpInContact: true    
};


var userAgent = new SIP.UA(config);

var options = {
    media: {
        constraints: {
            audio: true,
            video: false,
        },
        render: {
            remote: {
                audio: document.getElementById('localAudio'),
            },
            local: {
                audio: document.getElementById('localAudio'),
            }
        }
    },
};


userAgent.on('invite', function (incomingSession) {
    session = incomingSession;
    session.accept();
});


var callStartButton = document.getElementById('callStartButton');

callStartButton.addEventListener("click", function () {
    var number = $('#inputNumber').val();
    session = userAgent.invite('sip:'+ number + '@' + host, options);
}, false);
