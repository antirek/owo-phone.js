var phone = function () {
    this.line = null;
    this.host = null;

    this.session_time = 0;
    this.session_time_id = null;

    this.session = null;

    this.STATUS_IDLE = 'idle';
    this.STATUS_RINGING = 'ringing';
    this.STATUS_CALL = 'call';

    this.status = this.STATUS_IDLE;
    this.callButton = 'Call';
};

phone.prototype.isIdle = function () {
    return (this.status == this.STATUS_IDLE);
};

phone.prototype.initLine = function (config) {
    this.line = new SIP.UA(config);
};

phone.prototype.getStatus = function () {
    return this.status;
};

phone.prototype.setStatus = function (status) {
    this.status = status;
    $("#status").html(status);
};

phone.prototype.initEventsLine = function () {

    this.line.on('registered', function (data) {
        $("#registered").html('registered!');
    });

    this.line.on('registrationFailed', function (cause) {
        $("#registerStatus").html('register failed!');
    });

    this.line.on('unregistered', function (data) {
        $("#registerStatus").html('unregistered!');
    });

    this.line.on('invite', function (incomingSession) {
        this.session = incomingSession;

        var number_show = this.session.remoteIdentity.displayName;

        if (confirm(number_show + ' ok?')) {
            this.session.accept();

        } else {
            this.session.reject();
        }

    });
};

phone.prototype.startTime = function () {
    console.log('start time');
    session_time = this.session_time;
    this.session_time_id = setInterval(function () {
        session_time += 1;
        $('#display').html(session_time);
    }, 1000);
}

phone.prototype.invite = function (number) {
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

    var time = function () {
        console.log('time');
        session_time = this.session_time;
        that = this;
        this.session_time_id = setInterval(function () {
            that.session_time += 1;
            $('#display').html(that.session_time);
        }, 1000);
    }

    this.session = this.line.invite('sip:' + number + '@' + this.host, options);

    this.session.on('accepted', function (data) {
        console.log('accepted', data);
        time();
    });

    this.session.on('failed', function (data) {
        console.log('failed', data);
        $("#call").show();
        $("#end").hide();
    });

    this.session.on('progress', function (data) {
        console.log('progress', data);
    });

    this.session.on('rejected', function (data) {
        console.log('rejected', data);
    });

    this.session.on('connecting', function (data) {
        console.log('connecting', data);
    });

    this.session.on('cancel', function (data) {
        console.log('cancel', data);
        $("#call").show();
        $("#end").hide();
    });

    this.session.on('bye', function (data) {
        console.log('bye', data);
        $("#call").show();
        $("#end").hide();
    });
};

phone.prototype.call = function (number) {

    this.invite(number);

    $("#call").hide();
    $("#end").show();

};

phone.prototype.end = function () {

    this.release();
    $("#call").show();
    $("#end").hide();
};

phone.prototype.release = function () {
    if (this.session) {
        if (this.session.hasAnswer) {
            this.session.bye();
        } else {
            this.session.cancel();
        }
    }
};

phone.prototype.init = function (host, config) {
    this.host = host;
    this.initLine(config);
    this.initEventsLine();
    this.line.register();
};