(function(e){function t(t){for(var o,r,i=t[0],l=t[1],c=t[2],u=0,m=[];u<i.length;u++)r=i[u],Object.prototype.hasOwnProperty.call(s,r)&&s[r]&&m.push(s[r][0]),s[r]=0;for(o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o]);d&&d(t);while(m.length)m.shift()();return n.push.apply(n,c||[]),a()}function a(){for(var e,t=0;t<n.length;t++){for(var a=n[t],o=!0,i=1;i<a.length;i++){var l=a[i];0!==s[l]&&(o=!1)}o&&(n.splice(t--,1),e=r(r.s=a[0]))}return e}var o={},s={app:0},n=[];function r(t){if(o[t])return o[t].exports;var a=o[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=e,r.c=o,r.d=function(e,t,a){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(a,o,function(t){return e[t]}.bind(null,o));return a},r.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/owo-phone.js/v2/dist/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=t,i=i.slice();for(var c=0;c<i.length;c++)t(i[c]);var d=l;n.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"56d7":function(e,t,a){"use strict";a.r(t);var o=a("2b0e"),s=(a("ab8b"),a("7b17")),n=function(){var e=this,t=e._self._c;return t("div",{staticClass:"container",staticStyle:{height:"100%"},attrs:{id:"app"}},[t("div",{staticClass:"row",staticStyle:{height:"200px"}}),t("div",{staticClass:"row",staticStyle:{height:"100%"}},[t("div",{staticClass:"col-3"}),t("div",{staticClass:"col-6 well"},[t("div",{staticClass:"card"},[t("div",{staticClass:"card-body"},[t("form",{staticClass:"row g-3"},[t("div",{staticClass:"col-6"},[t("label",{staticClass:"visually-hidden",attrs:{for:"staticEmail2"}},[e._v("Phone")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.phone,expression:"phone"}],staticClass:"form-control",attrs:{type:"text",id:"phone",placeholder:"phone number"},domProps:{value:e.phone},on:{input:function(t){t.target.composing||(e.phone=t.target.value)}}})]),t("div",{staticClass:"col-3"},[e.isCall?e._e():t("a",{staticClass:"btn btn-primary col-12",on:{click:function(t){return e.call()}}},[e._v("Call")]),e.isCall?t("a",{staticClass:"btn btn-danger col-12",on:{click:function(t){return e.endCall()}}},[e._v("End")]):e._e(),e.isRegistered?t("a",{staticClass:"btn btn-success col-12"},[e._v("register")]):e._e()]),e._m(0)])])])]),t("div",{staticClass:"col-3"})]),t("div",{staticClass:"modal fade",attrs:{id:"staticBackdrop","data-bs-backdrop":"static","data-bs-keyboard":"false",tabindex:"-1","aria-labelledby":"staticBackdropLabel","aria-hidden":"true"}},[t("div",{staticClass:"modal-dialog modal-dialog-centered modal-dialog-scrollable"},[t("div",{staticClass:"modal-content"},[e._m(1),t("div",{staticClass:"modal-body"},[t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"Name"}},[e._v("Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.Name,expression:"Name"}],staticClass:"form-control",attrs:{type:"text",id:"Name",placeholder:"Sergey"},domProps:{value:e.Name},on:{input:function(t){t.target.composing||(e.Name=t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"URI"}},[e._v("URI")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.URI,expression:"URI"}],staticClass:"form-control",attrs:{type:"text",id:"URI",placeholder:"sip:100@host"},domProps:{value:e.URI},on:{input:function(t){t.target.composing||(e.URI=t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"AuthName"}},[e._v("Auth Name")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.AuthName,expression:"AuthName"}],staticClass:"form-control",attrs:{type:"text",id:"AuthName",placeholder:"101"},domProps:{value:e.AuthName},on:{input:function(t){t.target.composing||(e.AuthName=t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"Password"}},[e._v("Password")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.Password,expression:"Password"}],staticClass:"form-control",attrs:{type:"text",id:"Password",placeholder:"SecretPassword"},domProps:{value:e.Password},on:{input:function(t){t.target.composing||(e.Password=t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"WSServer"}},[e._v("WS Server")]),t("input",{directives:[{name:"model",rawName:"v-model",value:e.WSServer,expression:"WSServer"}],staticClass:"form-control",attrs:{type:"text",id:"WSServer",placeholder:"wss://host:port/ws"},domProps:{value:e.WSServer},on:{input:function(t){t.target.composing||(e.WSServer=t.target.value)}}})]),t("div",{staticClass:"mb-3"},[t("label",{staticClass:"form-label",attrs:{for:"stun"}},[e._v("STUN / TURN")]),t("textarea",{directives:[{name:"model",rawName:"v-model",value:e.stun,expression:"stun"}],staticClass:"form-control",attrs:{id:"stun",rows:"2",placeholder:"stun:stun.l.google.com:19302\n  turn:turn_host:19302,user,password"},domProps:{value:e.stun},on:{input:function(t){t.target.composing||(e.stun=t.target.value)}}})])]),t("div",{staticClass:"modal-footer"},[t("a",{staticClass:"btn btn-secondary",attrs:{"data-bs-dismiss":"modal"},on:{click:function(t){return e.hideModal()}}},[e._v("Close")]),t("a",{staticClass:"btn btn-primary",on:{click:function(t){return e.saveSettings()}}},[e._v("Save")])])])])])])},r=[function(){var e=this,t=e._self._c;return t("div",{staticClass:"col-3"},[t("button",{staticClass:"btn btn-outline-secondary col-12",attrs:{type:"button","data-bs-toggle":"modal","data-bs-target":"#staticBackdrop"}},[e._v(" Settings ")])])},function(){var e=this,t=e._self._c;return t("div",{staticClass:"modal-header"},[t("h1",{staticClass:"modal-title fs-5",attrs:{id:"staticBackdropLabel"}},[e._v("Settings")]),t("button",{staticClass:"btn-close",attrs:{type:"button","data-bs-dismiss":"modal","aria-label":"Close"}})])}],i=a("9715"),l=a.n(i);a("14d9");function c(e){const t=e.split("\n"),a=[];for(const o of t){const e=o.split(","),t={};e[1]&&e[2]&&(t.username=e[1],t.credential=e[2]),a.push({urls:[e[0]],...t})}return a}function d(e){const t=e.split("@"),a=t[1].split(":"),o=a[0];if(o&&""!==o)return o}function u(e,t,a){if(t&&""!==t){var o={progress:function(e){console.log("call is in progress",e)},failed:function(e){console.log("call failed with cause: ",e)},ended:function(e){console.log("call ended with cause: ",e)},confirmed:function(e){console.log("call confirmed",e)},peerconnection:function(e){console.log("peerconnection",e),e.peerconnection.onaddstream=function(e){console.log(" *** addstream",e);var t=document.createElement("audio");document.body.appendChild(t),t.srcObject=e.stream,t.play()}}},s={eventHandlers:o,mediaConstraints:{audio:!0,video:!1},rtcpMuxPolicy:"negotiate",rtcOfferConstraints:{offerToReceiveAudio:!0},pcConfig:{iceServers:c(a.stun),iceTransportPolicy:"relay"}};console.log("call");var n=d(a.URI);console.log("host",n);var r=e.call("sip:"+t+"@"+n,s);return console.log("call",r),r}}function m(e){function t(t){var a={iceServers:c(e.stun),iceTransportPolicy:"relay"},o={mediaConstraints:{audio:!0,video:!1},pcConfig:a};t.answer(o)}var a=new l.a.WebSocketInterface(e.WSServer),o={sockets:[a],uri:e.URI,password:e.Password,register:!0,register_expires:120},s=new l.a.UA(o);return s.start(),s.on("newRTCSession",(function(e){console.log("new session",e);var a=e.session;console.log("session",a,a.direction),a.on("accepted",(function(e){console.log("accepted",e)})),a.on("confirmed",(function(e){console.log("confirmed",e)})),a.on("ended",(function(){console.log("ended")})),a.on("failed",(function(){console.log("failed")})),a.on("peerconnection:createanswerfailed",(function(e){console.log("peerconnection:createanswerfailed",e)})),a.on("icecandidate",(function(e){console.log("icecandidate",e)})),a.on("getusermediafailed",(function(e){console.log("getusermediafailed",e)})),a.on("peerconnection",(function(e){console.log("peerconnection",e),e.peerconnection.onaddstream=function(e){console.log(" *** addstream",e);var t=document.createElement("audio");document.body.appendChild(t),t.srcObject=e.stream,t.play()}})),"incoming"===a.direction&&(console.log("incoming call, try answer"),t(a))})),s}l.a.debug.enable("JsSIP:*");var p={name:"App",data(){return{phone:"",isCall:!1,Name:"",URI:"",AuthName:"",Password:"",WSServer:"",stun:"",ua:"",config:null,session:null,isRegistered:null}},mounted(){this.Name=""!==localStorage.getItem("Name")?localStorage.getItem("Name"):"",this.URI=""!==localStorage.getItem("URI")?localStorage.getItem("URI"):"",this.AuthName=""!==localStorage.getItem("AuthName")?localStorage.getItem("AuthName"):"",this.Password=""!==localStorage.getItem("Password")?localStorage.getItem("Password"):"",this.WSServer=""!==localStorage.getItem("WSServer")?localStorage.getItem("WSServer"):"",this.stun=""!==localStorage.getItem("stun")?localStorage.getItem("stun"):"",this.config={Name:this.Name,URI:this.URI,AuthName:this.AuthName,Password:this.Password,WSServer:this.WSServer,stun:this.stun},this.ua=m(this.config),this.ua.on("registered",(function(){this.isRegistered=!0}))},methods:{saveSettings(){localStorage.setItem("Name",this.Name),localStorage.setItem("URI",this.URI),localStorage.setItem("AuthName",this.AuthName),localStorage.setItem("Password",this.Password),localStorage.setItem("WSServer",this.WSServer),localStorage.setItem("stun",this.stun)},call(){this.session||(this.session=u(this.ua,this.phone,this.config),this.isCall=!0)},endCall(){this.session&&(this.session.terminate(),this.isCall=!1)},hideModal(){var e=new s["a"](document.getElementById("staticBackdrop"),{backdrop:!0,keyboard:!0});e.hide()}}},v=p,f=a("2877"),g=Object(f["a"])(v,n,r,!1,null,null,null),h=g.exports;o["a"].config.productionTip=!1,new o["a"]({render:e=>e(h)}).$mount("#app")}});
//# sourceMappingURL=app.18baf52e.js.map