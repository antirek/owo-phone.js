function Phone(){

    var phone = function(){

        this.line = null;
        this.number = '2410011';
        this.host = '';

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

    phone.prototype.initEventsLine = function(){        

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
    }
    

    phone.prototype.call = function() {
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

        this.session = this.line.invite('sip:'+ this.number + '@' + this.host, options);
        this.status = this.STATUS_RINGING;
    };

    phone.prototype.release = function() {
        this.session.bye();
        this.status = this.STATUS_IDLE;
    };

    phone.prototype.init = function(host, config){
        this.host = host;
        this.initLine(config);
        this.initEventsLine();
        this.line.register();
    }

    return phone;
}