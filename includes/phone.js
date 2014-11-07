function Phone(){

    var eventEmitter = new EventEmitter();

    var phone = function(){

        this.line = null;
        this.number = '2410011';
        this.host = '';

        this.session = null;

        this.STATUS_IDLE  = 'idle';
        this.STATUS_RINGING  = 'ringing';
        this.STATUS_CALL = 'call';

        this.STATUS_MUTE_ON = 'on';
        this.STATUS_MUTE_OFF = 'off';

        this.status = this.STATUS_IDLE;
        this.callButton = 'Call';

        this.status_mute = this.STATUS_MUTE_OFF;


        this.display = 'nothing';
    }

    phone.prototype.emit = function(event, data){
        eventEmitter.emit(event, data);
    }

    phone.prototype.on = function(event, cb){
        eventEmitter.on(event, cb);
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


    phone.prototype.muteTrigger = function(){
        if(this.status == this.STATUS_CALL){
            if(this.status_mute == this.STATUS_MUTE_ON){
                this.session.unmute();
                this.status_mute = this.STATUS_MUTE_OFF;
            }else if(this.status_mute == this.STATUS_MUTE_OFF){
                this.session.mute();
                this.status_mute = this.STATUS_MUTE_ON;
            }
        }
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
        
        this.session.on('accepted', function(data){
            console.log('accepted', data);
            this.emit('changeStatus', this.STATUS_CALL);
        });

        this.session.on('failed', function(data){
            console.log('failed', data);
            alert('failed');
            this.emit('changeStatus', this.STATUS_IDLE);
        });
        
        this.session.on('progress', function(data){
            console.log('progress', data);
        });

        this.session.on('rejected', function(data){
            console.log('rejected', data);
            this.emit('changeStatus', this.STATUS_IDLE);
        });

        this.session.on('connecting', function(data){
            console.log('connecting', data);
        });

        this.session.on('cancel', function(data){
            console.log('cancel', data);
        });

        this.session.on('bye', function(data){
            console.log('bye', data);
        });

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