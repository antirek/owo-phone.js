<template>

    <div id="app" class="container" style="height:100%">
      <div class="row"  style="height:200px">

      </div>
      <div class="row"  style="height:100%">
        <div class="col-3">
          
        </div>
        <div class="col-6 well">
          <div class="card">
            <div class="card-body">
              <form class="row g-3">
                <div class="col-6">
                  <label for="staticEmail2" class="visually-hidden">Phone</label>
                  <input type="text" class="form-control" id="phone" v-model="phone" placeholder="phone number">
                </div>
                <div class="col-3">
                  <a class="btn btn-primary col-12" v-if="isIdle" @click="call()">Call</a>
                  <button type="submit" class="btn btn-danger col-12" v-if="isCall">End</button>
                </div>
                <div class="col-3">
                  <!-- Button trigger modal -->
                  <button type="button" class="btn btn-outline-secondary col-12" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-3">
          
        </div>
      </div>


      <!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Settings</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script>
import JsSIP from "jssip";
JsSIP.debug.enable('JsSIP:*');

var pcConfig = {
  iceServers: [
    {
      urls: ["turn:62.109.24.81:3478"],
      username: "user1",
      credential: "password1",
    },
  ],
  iceTransportPolicy: "relay",
};


function callOn(phone) {
  if (!phone || phone === '') {
    return;
  }
  var eventHandlers = {
    'progress': function(e) {
      console.log('call is in progress', e);
    },
    'failed': function(e) {
      console.log('call failed with cause: ', e);
    },
    'ended': function(e) {
      console.log('call ended with cause: ', e);
    },
    'confirmed': function(e) {
      console.log('call confirmed', e);
    },
    'peerconnection': function(e) {
      console.log('peerconnection', e);
      e.peerconnection.onaddstream = function(event) {
        console.log(' *** addstream', event);
        var audioElement = document.createElement("audio");
        document.body.appendChild(audioElement);
        audioElement.srcObject = event.stream;
        audioElement.play();
      }
    }
  };
  var options = {
    eventHandlers: eventHandlers,
    mediaConstraints: {
      audio: true,
      video: false,
    },
    rtcpMuxPolicy: 'negotiate',
    rtcOfferConstraints: {
      offerToReceiveAudio: true
    },
    pcConfig: pcConfig,
  };
  console.log('call');
  var session = ua.call('sip:' + phone + '@62.109.24.81', options);
  console.log('call', session);
}

var socket = new JsSIP.WebSocketInterface('wss://serge.dmitriev.fvds.ru:8089/ws');
var configuration = {
  sockets: [ socket ],
  uri: 'sip:103@62.109.24.81',
  password : 'zxcv1234',
  register: true,
  register_expires: 120,
};

var ua = new JsSIP.UA(configuration);
ua.start();
        
ua.on('newRTCSession', function(data){ 
  console.log('new session', data);

  var callOptions = {
    mediaConstraints: {
      audio: true, // only audio calls
      video: false
    },
    pcConfig: pcConfig,
  };

  var session = data.session;
  
  console.log('session', session, session.direction);
  // if (session.direction === "incoming") {
  // incoming call here
  session.on("accepted", function(e){
    // the call has answered
    console.log('accepted', e);
  });
  session.on("confirmed",function(e){
    // this handler will be called for incoming calls too
    console.log('confirmed', e);
  });
  session.on("ended",function(){
      // the call has ended
      console.log('ended');
  });
  session.on("failed",function(){
      // unable to establish the call
      console.log('failed');
  });
  session.on('peerconnection:createanswerfailed', function (e) {
    console.log('peerconnection:createanswerfailed', e);
  });

  session.on('icecandidate', function (e) {
    console.log('icecandidate', e);
  });

  session.on('getusermediafailed', function (e) {
    console.log('getusermediafailed', e);
  });

  session.on('peerconnection', function(e) {
    console.log('peerconnection', e);
    e.peerconnection.onaddstream = function(event) {
      console.log(' *** addstream', event);
      var audioElement = document.createElement("audio");
      document.body.appendChild(audioElement);
      audioElement.srcObject = event.stream;
      audioElement.play();
    }
  })



  // Answer call
  if (session.direction === "incoming") {
    console.log('incoming call, try answer');
    session.answer(callOptions);
  }
  // Reject call (or hang up it)
  // session.terminate();

});

export default {
  name: 'App',
  data() {
    return {
      phone: '',
      isCall: false,
      isIdle: true,
    };
  },
  methods: {
    call() {
      callOn(this.phone);
    }
  }
}

</script>

