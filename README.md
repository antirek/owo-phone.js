owo-phone.js
============

`sip.js` based webphone implementation. 
Its a **WebRTC** implementation of the JavaScript https://github.com/onsip/sip.js library.

Once this way you can make a "call" using WebRTC service on a websocket server, 
that means: you can perform voice/video streaming chat between two telephones, 
but at least one will be digital, as the browser phone at your side using owo-phone.js.

Demo
====

Easyle directly implemented at http://antirek.github.io/owo-phone.js and, 
take in consideration that for work you must provide a working **Web Socket entry point server** (ws)
with proper credentials.

Install
=======

Please see [INSTALL.md](INSTALL.md) for a really quick run and install local own deploy, for 
**others cases keep in mind that knowledge in "WebRTC" is required to be able to continue and deploy customized** 
this implementation of SIP.js called `owo-phone.js`

Links
=====
1. http://sipjs.com/
2. http://sipjs.com/demo-phone/
3. https://github.com/onsip/sipjs-examples

Notes
=====

This implementation of websockets (ws) and signals for sessions (SIP) requires a full knowledge of WebRTC and SIP, 
a good reading of these technologies are highly required before trying to develop with this SIPjs library, 
this project owo-phone.js try to make more easy by a fully complete minimal implementation of SIPjs.
