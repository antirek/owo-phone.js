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
                <a class="btn btn-primary col-12" v-if="!isCall" @click="call()">Call</a>
                <a class="btn btn-danger col-12" v-if="isCall" @click="endCall()">End</a>
                <a class="btn btn-success col-12" v-if="isRegistered">register</a>
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
              <label for="Name" class="form-label">Name</label>
              <input type="text" class="form-control" id="Name" v-model="Name" placeholder="Sergey">
            </div>
            <div class="mb-3">
              <label for="URI" class="form-label">URI</label>
              <input type="text" class="form-control" id="URI" v-model="URI" placeholder="sip:100@host">
            </div>
            <div class="mb-3">
              <label for="AuthName" class="form-label">Auth Name</label>
              <input type="text" class="form-control" id="AuthName" v-model="AuthName" placeholder="101">
            </div>
            <div class="mb-3">
              <label for="Password" class="form-label">Password</label>
              <input type="text" class="form-control" id="Password" v-model="Password" placeholder="SecretPassword">
            </div>
            <div class="mb-3">
              <label for="WSServer" class="form-label">WS Server</label>
              <input type="text" class="form-control" id="WSServer" v-model="WSServer" placeholder="wss://host:port/ws">
            </div>
            <div class="mb-3">
              <label for="stun" class="form-label">STUN / TURN</label>
              <textarea class="form-control" id="stun" rows="2" v-model="stun" placeholder="stun:stun.l.google.com:19302
    turn:turn_host:19302,user,password"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <a class="btn btn-secondary" @click="hideModal()" data-bs-dismiss="modal">Close</a>
            <a class="btn btn-primary" @click="saveSettings()">Save</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import JsSIP from "jssip";
import * as bootstrap from 'bootstrap';

import {splitStun, getHostFromURI} from './functions';


JsSIP.debug.enable('JsSIP:*');

function getCallEventHandlers () {
  return {
    'accepted': function (e) {
      console.log('call accepted', e);
    },
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
      console.log('peerconnection !!!!', e);
      e.peerconnection.onaddstream = function(event) {
        console.log(' *** addstream', event);
        var audioElement = document.createElement("audio");
        document.body.appendChild(audioElement);
        audioElement.srcObject = event.stream;
        audioElement.play();
      };
    },
  };
}

function getCallOptions (config) {
  return {
    mediaConstraints: {
      audio: true, // only audio calls
      video: false
    },
    pcConfig: {
      iceServers: splitStun(config.stun),
      iceTransportPolicy: "relay",
    },
    rtcpMuxPolicy: 'negotiate',
    rtcOfferConstraints: {
      offerToReceiveAudio: true,
    },
  };
}

function callOn(ua, phone, config) {
  if (!phone || phone === '') {
    return;
  }
  
  var callOptions = {
    eventHandlers: getCallEventHandlers(),
    ...getCallOptions(config),
  };
  console.log('call');
  var host = getHostFromURI(config.URI);
  console.log('host', host);
  var session = ua.call('sip:' + phone + '@' + host, callOptions);
  console.log('call', session);
  return session;
}

function onAnswerHandler(config, session) {
  const callOptions = getCallOptions(config);
  session.answer(callOptions);
}

function connect (config, cb) {
  var socket = new JsSIP.WebSocketInterface(config.WSServer);
  var configuration = {
    sockets: [ socket ],
    uri: config.URI,
    password : config.Password,
    register: true,
    register_expires: 120,
  };

  var ua = new JsSIP.UA(configuration);
  ua.start();
  
  ua.on('newRTCSession', function(data){ 
    console.log('new session', data);

    var session = data.session;
  
    const eventHandlers = getCallEventHandlers();
    console.log('session', session, session.direction);
    // if (session.direction === "incoming") {
    // incoming call here
    session.on("accepted", eventHandlers.accepted);
    session.on("confirmed", eventHandlers.confirmed);
    session.on("ended", eventHandlers.ended);
    session.on("failed", eventHandlers.failed);    
    session.on('icecandidate', function (e) {
      console.log('icecandidate', e);
    });
    session.on('peerconnection', eventHandlers.peerconnection);

    cb(session);
  });

  return ua;
}

export default {
  name: 'App',
  data() {
    return {
      phone: '',
      isCall: false,
      Name: '',
      URI: '',
      AuthName: '',
      Password: '',
      WSServer: '',
      stun: '',
      ua: '',
      config: null,
      session: null,
      isRegistered: null,
    };
  },
  mounted() {
    this.Name = localStorage.getItem('Name') !== '' ? localStorage.getItem('Name') : '';
    this.URI = localStorage.getItem('URI') !== '' ? localStorage.getItem('URI') : '';
    this.AuthName = localStorage.getItem('AuthName') !== '' ? localStorage.getItem('AuthName') : '';
    this.Password = localStorage.getItem('Password') !== '' ? localStorage.getItem('Password') : '';
    this.WSServer = localStorage.getItem('WSServer') !== '' ? localStorage.getItem('WSServer') : '';
    this.stun = localStorage.getItem('stun') !== '' ? localStorage.getItem('stun') : '';

    this.config = {
      Name: this.Name,
      URI: this.URI,
      AuthName: this.AuthName,
      Password: this.Password,
      WSServer: this.WSServer,
      stun: this.stun,
    };
    var that = this;
    this.ua = connect(this.config, function (session) {
      that.session = session;

      if (session.direction === "incoming") {
        if(confirm('incoming call')) {
          console.log('incoming call, try answer');
          onAnswerHandler(that.config, session);
        } else {
          session.terminate();
        }
      }      
    });
  },
  methods: {
    saveSettings() {
      localStorage.setItem('Name', this.Name);
      localStorage.setItem('URI', this.URI);
      localStorage.setItem('AuthName', this.AuthName);
      localStorage.setItem('Password', this.Password);
      localStorage.setItem('WSServer', this.WSServer);
      localStorage.setItem('stun', this.stun);
    },
    call() {
      this.isCall = true;
      if (this.session) {return;}
      this.session = callOn(this.ua, this.phone, this.config);      
    },
    endCall() {
      this.isCall = false;
      if (!this.session) {return}
      this.session.terminate();      
    },
    hideModal() {
      //var exampleModal = document.getElementById('staticBackdrop');
      var myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
        backdrop: true,
        keyboard: true,
      });
      myModal.hide();
    }
  }
}

</script>

