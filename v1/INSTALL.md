owo-phone.js INSTALL
====================

There are two ways to install this project, 
one is fast but requires a separate resource from websocket 
and another is deploying everything locally including websocket software

## QUICK INSTALL:

> is fast but requires a separate resource called websocket server

This repository can be quickly used if you have the following:
* a web server where to place these files
* the git program by which to obtain these files

These was the deployment requirements, the execution ones are:
* a websocket server which to use
* user / phone credentials on same server
* analog phone credentials on same server

The following procedure are for Debian based systems, 
open a console and type `su` to gain privilegies and run following commands steps:

#### 1. Install apache, git, curl nodejs and npm

```
apt-get install apache2 git git-core curl apt-transport-https

echo "deb http://ppa.launchpad.net/chris-lea/node.js/ubuntu lucid main" >> /etc/apt/sources.list.d/50nodejsnpm.list
apt-get update
apt-get install nodejs=0.10.37-1chl1~lucid1
```

#### 2. clone the project example of SIPjs owo-phone

```
cd /var/www/html/
git clone https://github.com/antirek/owo-phone.js.git sipjs
cd /var/www/html/sipjs
npm install bower
node_modules/bower/bin/bower install --allow-root
```

#### 3. Open your browser and try to start communication

Now point your browser to `http://localhost/sipjs/` 

Press the "wheel" button next to the "call" button and provide all the credentials 
as well as the "ws" service entry point uri to be able to use it. Please you must understand 
all the inputs to provide here...

Once this way you can make a "call" to a number of the same "ws" WebRTC service 
on that server prevously placed/configured, that means, you can perform voice/video 
streaming chat between two telephones, but at least one will be digital, the browser phone.

## ALL LOCAL INSTALL

> is deploying everything locally including websocket software

This document will **show how to setup, install and deploy asterisk with SIPjs 
by using the owo-phone example implementation**, please take in consideration that SIP 
implementation in asterisk have some notes: sip channel are only in asterisk 12, 13 and 14, 
since asterisk 15 sip was deprecated and a new module named pjsip are use for webrtc 
so to property setup this git example demo, we using Debian 8 or Debian 9 (and may work with Debian 7)
but will use debian qualitfy packages only, backported for wheeze/jessie or assumed available on strecht
that have asterisk 11/12, asterisk 13 and asterisk 14 respectively.

If you want a ready to use Debian based distro, try the VenenuX iso at 
https://sourceforge.net/projects/vegnuli/files/VenenuX-1.0/venenux-1.0-osposweb/debian-venenux-8-osposweb-i386.hybrid.iso/download
that already has some of the needs for deploy this implementation.

#### 1. Instalation asterisk

Debian wheeze and jessie have backported packages, but for jessie you can use venenux packages (still wheeze pending).

```
apt-get instal lsb-release apt-transport-https

cat > /etc/apt/sources.list.d/debianbackports.list << EOF
deb http://ftp.de.debian.org/debian $(lsb_release -s -c)-backports main contrib non-free
EOF
apt-get update
apt-get install wget less groff bzip2 lrzip lzop lsof linux-base ca-certificates curl nmap iproute2 netstat

wget -nv https://download.opensuse.org/repositories/home:vegnuli:voip/Debian_8.0/Release.key -O Release.key
apt-key add - < Release.key
cat > /etc/apt/sources.list.d/debianvenenuxvoip.list << EOF
deb http://download.opensuse.org/repositories/home:/vegnuli:/voip/Debian_$(lsb_release -r -s | cut -d '.'  -f1).0/ /
EOF
apt-get update

apt-get install asterisk 
```

**IMPORTANT** this will install asterisk from debian backport if available, in wheeze will install 11.14 that has limited support for streaming, in jessie will install asterisk 12 that have good support, but if vegnuli repo are enable, wil install in jessie asterisk 13.14 with complete streaming support. For most modern Debian will install lasted asterisk that have good complete streaming support.

#### 2. Configuration asterisk

Generates a selft signed certificate for the wss entry point, configure http and sip modules for webrtc >

```
export ipdefdev=$(netstat -rn | awk '/^0.0.0.0/ {thif=substr($0,74,10); print thif;} /^default.*UG/ {thif=substr($0,65,10);print thif;}' | head -1)
export ipdefval=$(/sbin/ifconfig $ipdefdev | grep 'Link ' -A 2 -B 2|grep 'inet' | grep -v 'inet6' | cut -d' ' -f12|cut -d'r' -f2|cut -d':' -f2)

openssl req -x509 -days 360 -nodes -newkey rsa:4096 \
   -subj "/C=VE/ST=Home/L=Home/O=Own/OU=Own/CN=$ipdefcal" \
   -keyout /etc/ssl/certs/$ipdefval.pem -out /etc/ssl/certs/$ipdefval.pem

sed "s|.*;enabled=.*|enabled=yes|g" -i /etc/asterisk/http.conf
sed "s|.*bindaddr=.*|bindaddr=0.0.0.0|g" -i /etc/asterisk/http.conf 
sed "s|.*;tlsenable=.*|tlsenable=yes          ; enable tls - default no.|g" -i /etc/asterisk/http.conf
sed "s|.*tlsbindaddr=.*|tlsbindaddr=0.0.0.0:8089|g" -i /etc/asterisk/http.conf 
sed "s|.*tlscertfile=.*|tlscertfile=/etc/ssl/certs/$ipdefval.pem|g" -i /etc/asterisk/http.conf
sed "s|.*tlsprivatekey=.*|tlsprivatekey=/etc/ssl/certs/$ipdefval.pem|g" -i /etc/asterisk/http.conf

sed "s|.*icesupport=.*|icesupport=true|g" -i /etc/asterisk/rtp.conf
sed "s|.*stunaddr=.*|stunaddr=stun.l.google.com:19302|g" -i /etc/asterisk/rtp.conf
sed "s|.*stunaddr =.*|stunaddr=stun.l.google.com:19302|g" -i /etc/asterisk/res_stun_monitor.conf
sed "s|.*stunrefresh =.*|stunrefresh = 30|g" -i /etc/asterisk/res_stun_monitor.conf

sed "s|;realm=.*|realm=$ipdefval             ; Realm for digest authentication|g" -i /etc/asterisk/sip.conf
sed "s|transport.*=.*|transport=udp,ws,wss|g" -i /etc/asterisk/sip.conf
sed "s|.*websocket_enabled.*=.*|websocket_enabled = true|g" -i /etc/asterisk/sip.conf
```

**WARNING** at this point everything was done with simple commands, now we must open sip.conf and added the devices at end:

```
externaddr = $ipdefval ; WARNING this line in general section, later at end the devices section

[1001]
host=dynamic
secret=12345
context=websip
type=friend
encryption=yes
avpf=yes
;force_avp=yes
icesupport=yes
directmedia=no
disallow=all
dial = SIP/1001
disallow=all
allow=ulaw
allow=alaw
allow=speex
allow=gsm
dtlsenable=yes
dtlsverify=fingerprint
dtlscertfile=/etc/ssl/certs/<ipaddress>.pem
dtlssetup=actpass
nat=force_rport,comedia

[1060]
host=dynamic
secret=12345
context=websip
type=friend
encryption=yes
avpf=yes
;force_avp=yes
icesupport=yes
directmedia=no
disallow=all
dial = SIP/1060
disallow=all
allow=ulaw
allow=alaw
allow=speex
allow=gsm
dtlsenable=yes
dtlsverify=fingerprint
dtlscertfile=/etc/ssl/certs/<ipaddress>.pem
dtlssetup=actpass
nat=force_rport,comedia

[1061]
host=dynamic
username=1061
secret=12345
context=public
type=friend
dial = SIP/1061
```

**WARNING** now go to extensions.conf and added to "default" section the two users around line 671 in the file:

```
[websip]
include => default
; For Testing Audio
exten => 1111,1,Answer()
same => n,Playback(demo-thanks)
same => n,Hangup()
; For testing SIP to SIP calling
exten => _X.,1,Dial(SIP/${EXTEN})
exten => _X.,n,Hangup()
```

restart service and test:

```
service asterisk restart

asterisk -rvvv -x 'http show status' | grep 'Asterisk'
Server: Asterisk/13.14.1
/httpstatus => Asterisk HTTP General Status
/phoneprov/... => Asterisk HTTP Phone Provisioning Tool
/static/... => Asterisk HTTP Static Delivery
/ari/... => Asterisk RESTful API
/ws => Asterisk HTTP WebSocket

asterisk -rvvv -x 'sip show users'
Username                   Secret           Accountcode      Def.Context      ACL  Forcerport
1001                       12345                             websip           No   Yes       
1060                       12345                             websip           No   Yes       
1061                       12345                             public           No   No  
```

#### 3. Configure SIPjs

Here we have a problem, chrome/like browsers dont allow easyle to setup a exception to your new ws entry 
point self signed certificate, so maybe its recommended to use firefox/palemoon here next, for that, navigate 
to `https://127.0.0.1:8089/ws` and add the certificate exception by click on the @avanced@ button at the screen advertise.

**Install apache, git, curl nodejs and npm**

```
apt-get install apache2 git git-core curl apt-transport-https

wget --quiet -O - https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add 
echo "deb https://deb.nodesource.com/node_8.x jessie main" > /etc/apt/sources.list.d/50nodejsnpm.list
apt-get update
apt-get purge -y --force-yes nodejs* npm
apt-get install nodejs=8.12.0-1nodesource1
```
Si el ultimo comando falla simplemente `apt-get install nodejs`

**clone the project example of SIPjs owo-phone**

```
cd /var/www/html/
git clone https://github.com/antirek/owo-phone.js.git sipjs
cd /var/www/html/sipjs
npm install bower
node_modules/bower/bin/bower install --allow-root
```

**Open your browser and try to start communication**

Now point your browser to `http://localhost/sipjs/` 

Press the "wheel" button next to the "call" button and provide all the credentials 
as well as the "ws" service entry point uri to be able to use it.

* push the whell button aside to the "Call" button
* use the sip.conf configure device name 1001 or 1060 can be
* uri are the 1060@127.0.0.1 or 1001@127.0.0.1 or <devicename>@<ipaddress> like 1060@10.101.10.222
* auth name : 1060
* password of 1060 "12345" as was paste in the sip.conf
* ws server: `wss://127.0.0.1:8089/ws` or use ipaddress like `wss://10.101.10.222:8089/ws`


Once this way you can make a "call" to a number of the same "ws" WebRTC service 
on that server prevously placed/configured, that means, you can perform voice 
streaming chat between two telephones, but at least one will be digital, the browser phone, 
by example the "1060" device/number can call the "1001" if each one configured in 
different browsers, or any of those can make a call to the "1111" demo configured in extensions.

