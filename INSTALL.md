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

Optional for jessie and up:

`apt-get install asterisk-core-sounds-es-gsm asterisk-core-sounds-es-g722 asterisk-core-sounds-es-wav`

Testing asterisk

```
asterisk -rvvv
```

### 2. Configuracion asterisk
