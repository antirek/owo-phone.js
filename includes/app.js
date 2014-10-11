
var session;

var endButton = document.getElementById('callEndButton');

endButton.addEventListener("click", function () {
    session.bye();  
}, false);


var host = '192.168.1.37';

var config = {
    uri: '1060@' + host,
    wsServers: 'ws://'+ host +':8088/ws',
    authorizationUser: '1060',
    password: 'password',
    hackIpInContact: true,
    log:{
        builtinEnabled: false,
    }
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
    console.log(session.data);
    if(confirm('ok?')){
        session.accept();   
    }else{
        session.reject();
    }
});


var callStartButton = document.getElementById('callStartButton');

callStartButton.addEventListener("click", function () {
    var number = $('#inputNumber').val();
    session = userAgent.invite('sip:'+ number + '@' + host, options);
    console.log('call start');
    
    session.on('progress', function(response){
        console.log('progress');
        console.log(response);
    });

    session.on('accepted', function(data){
        console.log('accepted');
        console.log(data);
    });

    session.on('rejected', function(data){
        console.log('rejected');
        console.log(data);
    });

    session.on('connecting', function () {
        console.log('connecting');
    });

    session.on('cancel', function(data){
        console.log('cancel');
        console.log(data);
    });

    session.on('bye', function(data){
        console.log('bye');
        console.log(data);
    });

}, false);



var muteButton = document.getElementById('muteButton');

muteButton.addEventListener("click", function () {
    session.mute();
}, false);

var unmuteButton = document.getElementById('unmuteButton');

unmuteButton.addEventListener("click", function () {
    session.unmute();
}, false);

