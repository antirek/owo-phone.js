(function(t){function e(e){for(var o,r,l=e[0],i=e[1],c=e[2],u=0,m=[];u<l.length;u++)r=l[u],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&m.push(s[r][0]),s[r]=0;for(o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o]);d&&d(e);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var t,e=0;e<n.length;e++){for(var a=n[e],o=!0,l=1;l<a.length;l++){var i=a[l];0!==s[i]&&(o=!1)}o&&(n.splice(e--,1),t=r(r.s=a[0]))}return t}var o={},s={app:0},n=[];function r(e){if(o[e])return o[e].exports;var a=o[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=o,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(a,o,function(e){return t[e]}.bind(null,o));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/owo-phone.js/v2/dist/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],i=l.push.bind(l);l.push=e,l=l.slice();for(var c=0;c<l.length;c++)e(l[c]);var d=i;n.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"56d7":function(t,e,a){"use strict";a.r(e);var o=a("2b0e"),s=(a("ab8b"),a("7b17")),n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container",staticStyle:{height:"100%"},attrs:{id:"app"}},[e("div",{staticClass:"row",staticStyle:{height:"200px"}}),e("div",{staticClass:"row",staticStyle:{height:"100%"}},[e("div",{staticClass:"col-3"}),e("div",{staticClass:"col-6 well"},[e("div",{staticClass:"card"},[e("div",{staticClass:"card-body"},[e("form",{staticClass:"row g-3"},[e("div",{staticClass:"col-6"},[e("label",{staticClass:"visually-hidden",attrs:{for:"staticEmail2"}},[t._v("Phone")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],staticClass:"form-control",attrs:{type:"text",id:"phone",placeholder:"phone number"},domProps:{value:t.phone},on:{input:function(e){e.target.composing||(t.phone=e.target.value)}}})]),e("div",{staticClass:"col-3"},[t.isCall?t._e():e("a",{staticClass:"btn btn-primary col-12",on:{click:function(e){return t.call()}}},[t._v("Call")]),t.isCall?e("a",{staticClass:"btn btn-danger col-12",on:{click:function(e){return t.endCall()}}},[t._v("End")]):t._e()]),t._m(0)])])])]),e("div",{staticClass:"col-3"})]),e("div",{staticClass:"modal fade",attrs:{id:"staticBackdrop","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"}},[e("div",{staticClass:"modal-dialog modal-dialog-centered modal-dialog-scrollable"},[e("div",{staticClass:"modal-content"},[t._m(1),e("div",{staticClass:"modal-body"},[e("div",{staticClass:"mb-3"},[e("label",{staticClass:"form-label",attrs:{for:"Name"}},[t._v("Name")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.Name,expression:"Name"}],staticClass:"form-control",attrs:{type:"text",id:"Name",placeholder:"Sergey"},domProps:{value:t.Name},on:{input:function(e){e.target.composing||(t.Name=e.target.value)}}})]),e("div",{staticClass:"mb-3"},[e("label",{staticClass:"form-label",attrs:{for:"URI"}},[t._v("URI")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.URI,expression:"URI"}],staticClass:"form-control",attrs:{type:"text",id:"URI",placeholder:"sip:100@host"},domProps:{value:t.URI},on:{input:function(e){e.target.composing||(t.URI=e.target.value)}}})]),e("div",{staticClass:"mb-3"},[e("label",{staticClass:"form-label",attrs:{for:"AuthName"}},[t._v("Auth Name")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.AuthName,expression:"AuthName"}],staticClass:"form-control",attrs:{type:"text",id:"AuthName",placeholder:"101"},domProps:{value:t.AuthName},on:{input:function(e){e.target.composing||(t.AuthName=e.target.value)}}})]),e("div",{staticClass:"mb-3"},[e("label",{staticClass:"form-label",attrs:{for:"Password"}},[t._v("Password")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.Password,expression:"Password"}],staticClass:"form-control",attrs:{type:"text",id:"Password",placeholder:"SecretPassword"},domProps:{value:t.Password},on:{input:function(e){e.target.composing||(t.Password=e.target.value)}}})]),e("div",{staticClass:"mb-3"},[e("label",{staticClass:"form-label",attrs:{for:"WSServer"}},[t._v("WS Server")]),e("input",{directives:[{name:"model",rawName:"v-model",value:t.WSServer,expression:"WSServer"}],staticClass:"form-control",attrs:{type:"text",id:"WSServer",placeholder:"wss://host:port/ws"},domProps:{value:t.WSServer},on:{input:function(e){e.target.composing||(t.WSServer=e.target.value)}}})]),e("div",{staticClass:"mb-3"},[e("label",{staticClass:"form-label",attrs:{for:"stun"}},[t._v("STUN / TURN")]),e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.stun,expression:"stun"}],staticClass:"form-control",attrs:{id:"stun",rows:"2",placeholder:"stun:stun.l.google.com:19302\n  turn:turn_host:19302,user,password"},domProps:{value:t.stun},on:{input:function(e){e.target.composing||(t.stun=e.target.value)}}})])]),e("div",{staticClass:"modal-footer"},[e("a",{staticClass:"btn btn-secondary",attrs:{"data-bs-dismiss":"modal"},on:{click:function(e){return t.hideModal()}}},[t._v("Close")]),e("a",{staticClass:"btn btn-primary",on:{click:function(e){return t.saveSettings()}}},[t._v("Save")])])])])])])},r=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"col-3"},[e("button",{staticClass:"btn btn-outline-secondary col-12",attrs:{type:"button","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}},[t._v(" Settings ")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"modal-header"},[e("h1",{staticClass:"modal-title fs-5",attrs:{id:"staticBackdropLabel"}},[t._v("Settings")]),e("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"modal","aria-label":"Close"}})])}],l=a("9715"),i=a.n(l);a("14d9");function c(t){const e=t.split("\n"),a=[];for(const o of e){const t=o.split(","),e={};t[1]&&t[2]&&(e.username=t[1],e.credential=t[2]),a.push({urls:[t[0]],...e})}return a}function d(t){const e=t.split("@"),a=e[1].split(":"),o=a[0];if(o&&""!==o)return o}function u(t,e,a){if(e&&""!==e){var o={progress:function(t){console.log("call is in progress",t)},failed:function(t){console.log("call failed with cause: ",t)},ended:function(t){console.log("call ended with cause: ",t)},confirmed:function(t){console.log("call confirmed",t)},peerconnection:function(t){console.log("peerconnection",t),t.peerconnection.onaddstream=function(t){console.log(" *** addstream",t);var e=document.createElement("audio");document.body.appendChild(e),e.srcObject=t.stream,e.play()}}},s={eventHandlers:o,mediaConstraints:{audio:!0,video:!1},rtcpMuxPolicy:"negotiate",rtcOfferConstraints:{offerToReceiveAudio:!0},pcConfig:{iceServers:c(a.stun),iceTransportPolicy:"relay"}};console.log("call");var n=d(a.URI);console.log("host",n);var r=t.call("sip:"+e+"@"+n,s);console.log("call",r)}}function m(t){var e={iceServers:c(t.stun),iceTransportPolicy:"relay"},a=new i.a.WebSocketInterface(t.WSServer),o={sockets:[a],uri:t.URI,password:t.Password,register:!0,register_expires:120},s=new i.a.UA(o);return s.start(),s.on("newRTCSession",(function(t){console.log("new session",t);var a={mediaConstraints:{audio:!0,video:!1},pcConfig:e},o=t.session;console.log("session",o,o.direction),o.on("accepted",(function(t){console.log("accepted",t)})),o.on("confirmed",(function(t){console.log("confirmed",t)})),o.on("ended",(function(){console.log("ended")})),o.on("failed",(function(){console.log("failed")})),o.on("peerconnection:createanswerfailed",(function(t){console.log("peerconnection:createanswerfailed",t)})),o.on("icecandidate",(function(t){console.log("icecandidate",t)})),o.on("getusermediafailed",(function(t){console.log("getusermediafailed",t)})),o.on("peerconnection",(function(t){console.log("peerconnection",t),t.peerconnection.onaddstream=function(t){console.log(" *** addstream",t);var e=document.createElement("audio");document.body.appendChild(e),e.srcObject=t.stream,e.play()}})),"incoming"===o.direction&&(console.log("incoming call, try answer"),o.answer(a))})),s}i.a.debug.enable("JsSIP:*");var p={name:"App",data(){return{phone:"",isCall:!1,Name:"",URI:"",AuthName:"",Password:"",WSServer:"",stun:"",ua:"",config:null}},mounted(){this.Name=""!==localStorage.getItem("Name")?localStorage.getItem("Name"):"",this.URI=""!==localStorage.getItem("URI")?localStorage.getItem("URI"):"",this.AuthName=""!==localStorage.getItem("AuthName")?localStorage.getItem("AuthName"):"",this.Password=""!==localStorage.getItem("Password")?localStorage.getItem("Password"):"",this.WSServer=""!==localStorage.getItem("WSServer")?localStorage.getItem("WSServer"):"",this.stun=""!==localStorage.getItem("stun")?localStorage.getItem("stun"):"",this.config={Name:this.Name,URI:this.URI,AuthName:this.AuthName,Password:this.Password,WSServer:this.WSServer,stun:this.stun},this.ua=m(this.config)},methods:{saveSettings(){localStorage.setItem("Name",this.Name),localStorage.setItem("URI",this.URI),localStorage.setItem("AuthName",this.AuthName),localStorage.setItem("Password",this.Password),localStorage.setItem("WSServer",this.WSServer),localStorage.setItem("stun",this.stun)},call(){u(this.ua,this.phone,this.config),this.isCall=!0},endCall(){this.isCall=!1},hideModal(){var t=new s["a"](document.getElementById("staticBackdrop"),{backdrop:!0,keyboard:!0});t.hide()}}},v=p,f=a("2877"),g=Object(f["a"])(v,n,r,!1,null,null,null),h=g.exports;o["a"].config.productionTip=!1,new o["a"]({render:t=>t(h)}).$mount("#app")}});
//# sourceMappingURL=app.74d3c515.js.map