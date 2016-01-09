var Phone = null;

$(function(){

    $("#call").on('click', function(e){
        Phone.call($("#number").val());
    });

    $("#end").on('click', function(e){
        Phone.end();
    });

    $("#saveSettings").on('click', function(){
        console.log('save!');
        $.jStorage.set('host', $('#host').val());
        $.jStorage.set('user', $('#user').val());
        $.jStorage.set('password', $('#password').val());

        $('#myModal').modal('hide');
        initPhone();      
    });
    
    function initFromStorage(){
        $("#host").val($.jStorage.get('host'));
        $("#user").val($.jStorage.get('user'));
        $("#password").val($.jStorage.get('password'));

        return {
            host: $.jStorage.get('host'),
            user: $.jStorage.get('user'),
            password: $.jStorage.get('password')
        };        
    }

    function initPhone(){
        var creds = initFromStorage();

        var host = creds.host || 'localhost';
        var user = creds.user || '1060';
        var password = creds.password || 'password';

        console.log(host, user, password);

        var config = {
            uri: user + '@' + host,
            wsServers: 'ws://'+ host +':5066',
            authorizationUser: user,
            password: password,
            hackIpInContact: true,
            register: false,
            log: {
                builtinEnabled: false,
            },
            stunServers: [                                
                "stun.stunprotocol.org:3478",
                "stun.voiparound.com",
                "stun.voipbuster.com",            
                "stun.turnservers.com:3478"
            ],
        };

        Phone = new phone();
        Phone.init(host, config);
    }
    
    initPhone();
});
