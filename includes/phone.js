
var phone = function(){

    this.line = null;
    this.number = null;
    this.host = null;

    this.session = null;

    this.STATUS_IDLE  = 'idle';
    this.STATUS_RINGING  = 'ringing';
    this.STATUS_CALL = 'call';

    this.status = this.STATUS_IDLE;
    this.callButton = 'Call';
}

phone.prototype.isIdle = function() {
    return (this.status == this.STATUS_IDLE);
};

phone.prototype.initLine = function(config){
    this.line = new SIP.UA(config);
}

phone.prototype.getStatus = function(){
    return this.status;
}

phone.prototype.setStatus = function(status){
    this.status = status;
    $("#status").html(status);
}   

phone.prototype.initEventsLine = function(){    

    this.line.on('registered', function(data){
        $("#registered").html('registered!');
    });

    this.line.on('invite', function (incomingSession) {
        this.status = this.STATUS_RINGING;
        this.session = incomingSession;

        if(confirm('ok?')){
            this.session.accept();   
            this.status = this.STATUS_CALL;
        }else{
            this.session.reject();
        }

    });

    
};


phone.prototype.invite = function(number){
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

    this.session = this.line.invite('sip:'+ number + '@' + this.host, options);
    
    this.session.on('accepted', function(data){
        console.log('accepted', data);  
    });

    this.session.on('failed', function(data){
        console.log('failed', data);
        $("#call").show();
        $("#end").hide();
        //this.showCallHideEnd();
    });
    
    this.session.on('progress', function(data){
        console.log('progress', data);
    });

    this.session.on('rejected', function(data){
        console.log('rejected', data);
        //this.showCallHideEnd();   
    });

    this.session.on('connecting', function(data){
        console.log('connecting', data);
    });

    this.session.on('cancel', function(data){
        console.log('cancel', data);        
        this.showCallHideEnd();
    });

    this.session.on('bye', function(data){
        console.log('bye', data);
        this.showCallHideEnd();
    });
}

phone.prototype.call = function(number) {
    
    this.invite(number);

    $("#call").hide();
    $("#end").show();

};

phone.prototype.end = function(){
    
    this.release();
    this.showCallHideEnd();
}

phone.prototype.showCallHideEnd = function(){
    $("#call").show();
    $("#end").hide();
}


phone.prototype.release = function() {
    if(this.session){
        if(this.session.hasAnswer){
            this.session.bye();
        }else{
            this.session.cancel();
        }
    }
};

phone.prototype.init = function(host, config){
    this.host = host;
    this.initLine(config);
    this.initEventsLine();
    this.line.register();
};
