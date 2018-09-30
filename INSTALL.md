# SIPjs + Asterisk > on Debian

This document will use asterisk debian qualitfy packages only, backported for wheeze/jessie or assumed available on strecht.

### 1. Instalation asterisk

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

### 2. Configuracion asterisk

Generates a selft signed certificate for the wss entry point, configure http and sip modules for webrtc >

```
export ipdefdev=$(netstat -rn | awk '/^0.0.0.0/ {thif=substr($0,74,10); print thif;} /^default.*UG/ {thif=substr($0,65,10);print thif;}' | head -1)
export ipdefval=$(/sbin/ifconfig $ipdefdev | grep 'Link ' -A 2 -B 2|grep 'inet' | grep -v 'inet6' | cut -d' ' -f12|cut -d'r' -f2|cut -d':' -f2)

openssl req -x509 -days 360 -nodes -newkey rsa:4096 \
   -subj "/C=VE/ST=Home/L=Home/O=Own/OU=Own/CN=$ipdefcal" \
   -keyout /etc/ssl/certs/$ipdefval.pem -out /etc/ssl/certs/$ipdefval.pem

sed "s|.*;enabled=.*|enabled=yes|g" -i /etc/asterisk/http.conf
sed "s|;bindaddr=127.0.0.1|bindaddr=$ipdefval|g" -i /etc/asterisk/http.conf 
sed "s|.*;tlsenable=.*|tlsenable=yes          ; enable tls - default no.|g" -i /etc/asterisk/http.conf
sed "s|.*tlscertfile=.*|tlscertfile=/etc/ssl/certs/$ipdefval.pem|g" -i /etc/asterisk/http.conf
sed "s|.*tlsprivatekey=.*|tlsprivatekey=/etc/ssl/certs/$ipdefval.pem|g" -i /etc/asterisk/http.conf

sed "s|;realm=.*|realm=$ipdefval             ; Realm for digest authentication|g" -i /etc/asterisk/sip.conf
```

**WARNING** at this point everything was done with simple commands, now we must open sip.conf and added two new sections:

```
[1060] ; This will be WebRTC client
type=friend
username=1060 ; The Auth user for SIP.js
host=dynamic ; Allows any host to register
secret=password ; The SIP Password for SIP.js
encryption=yes ; Tell Asterisk to use encryption for this peer
avpf=yes ; Tell Asterisk to use AVPF for this peer
icesupport=yes ; Tell Asterisk to use ICE for this peer
context=default ; Tell Asterisk which context to use when this peer is dialing
directmedia=no ; Asterisk will relay media for this peer
transport=udp,ws,wss ; Asterisk will allow this peer to register on UDP or WebSockets
force_avp=yes ; Force Asterisk to use avp. Introduced in Asterisk 11.11
dtlsenable=yes ; Tell Asterisk to enable DTLS for this peer
dtlsverify=fingerprint ; Tell Asterisk to verify DTLS fingerprint
dtlscertfile=/etc/asterisk/keys/asterisk.pem ; Tell Asterisk where your DTLS cert file is
dtlssetup=actpass ; Tell Asterisk to use actpass SDP parameter when setting up DTLS
rtcp_mux=yes ; Tell Asterisk to do RTCP mux

[1061] ; This will be the legacy SIP client
type=friend
username=1061
host=dynamic
secret=password
context=default
```

**WARNING** now go to extensions.conf and added to "default" section the two users around line 671 in the file:

```
exten => 1060,1,Dial(SIP/1060) ; Dialing 1060 will call the SIP client registered to 1060
exten => 1061,1,Dial(SIP/1061) ; Dialing 1061 will call the SIP client registered to 1061
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

asterisk -rvvv -x 'sip show peers'
Name/username             Host                                    Dyn Forcerport Comedia    ACL Port     Status      Description 
1060/1060                 (Unspecified)                            D  Auto (No)  No             0        Unmonitored
1061/1061                 (Unspecified)                            D  Auto (No)  No             0        Unmonitored
2 sip peers [Monitored: 0 online, 0 offline Unmonitored: 0 online, 2 offline]
```

### 3. Configure SIPjs

