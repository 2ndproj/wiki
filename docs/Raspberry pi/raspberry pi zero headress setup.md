# Raspberry pi zero w 셋업
## 킷트 내용물 확인
![](https://cl.ly/89bb93/Image%202019-06-07%20at%2011.03.03%20AM.png)
## 방열판 부착
![](https://cl.ly/010ca3/Image%202019-06-07%20at%2011.13.35%20AM.png)

## GPIO 연결이 쉽도록 핀헤더 납땜한다.
더 슬림하게 만들려면 핀헤더를 통으로 붙이지 않고 선택적으로 직접 와이어를 납땜하여도 좋다.

## raspbian 다운로드
https://www.raspberrypi.org/downloads/raspbian/

![](https://cl.ly/140bab/Screen%20Recording%202019-06-07%20at%2011.16%20AM.gif)
## 이미지 버닝 툴 사용해 sd카드에 os 담기
### etcher : 크로스 플랫폼 이미지 버닝 툴
다운로드: https://www.balena.io/etcher/
![](https://cl.ly/07dc25/Screen%20Recording%202019-06-07%20at%2011.36%20AM.gif)

## 네트워크 연결을 위한 사전작업
완성된 SD카드 뽑았다가 다시 꽂아보면, boot 라는 이름으로 라즈비안 이 설치되어있다. 여기에 몇개 파일을 수정해주어야 한다.
![||600](https://cl.ly/smt5/Image%202018-07-07%20at%202.59.16%20PM.png)

참고: https://medium.com/@aallan/setting-up-a-headless-raspberry-pi-zero-3ded0b83f274
참고: https://www.losant.com/blog/getting-started-with-the-raspberry-pi-zero-w-without-a-monitor

wifi를 사용하거나, 혹은 wifi동글이 없거나 공유기가 없다면 USB케이블을 사용할해 노트북에 연결할 수 있다.

### SSH 켜기 설정
SD카드의 루트 디렉토리 `/boot`에 `ssh`라는 이름의 빈 파일을 하나 새로 만든다.(확장자 없음) 그러면 부팅시 SSH가 켜진다.

#### mac
터미널을 연다.
```bash
$ touch /Volumes/boot/ssh
```
![](https://cl.ly/d1ca13/Image%202019-06-07%20at%2012.12.23%20PM.png)
#### windows
notepad(메모장)을 연다.
아무런 내용 없이 Save as...한다.
반드시 file type을 all로 선택하고 확장자 없이 저장한다.
![](https://cl.ly/c40175/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA(1).png)

### wifi 켜기 설정
마찬가지로 `/boot`에 `wpa_supplicant.conf`파일을 아래 내용으로 만든다. 일반적인 텍스트 에디터 사용한다.

```bash
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1

network={
	ssid="와이파이 이름(SSID)"
	psk="암호"
	key_mgmt=WPA-PSK
}
```
![](https://cl.ly/98fcb7/Image%202019-06-07%20at%2012.20.13%20PM.png)

#### tip. wifi 설정의 변경
 >/boot 에 만든 wap_supplicant.conf 파일은 부팅시 자동으로 `/etc/wpa_supplicant/wpa_supplicant.conf`위치로 옮겨진다.
>이후 wifi 설정을 수정해야 하는 경우가 생긴다면 (집에서 사용하던 라즈베리를 사무실로 옮긴다던지...) 이 위치에서 직접 수정하면 된다.
>```bash
>$ sudo nano /etc/wpa_supplicant/wap_supplicant.conf
>```


### USB OTG 켜기 설정
raspberry pi model A,B의 경우에는 ethernet 단자가 있으므로 wifi연결이 안되어있다고 해도 바로 연결해 사용할 수 있지만 이더넷 단자가 없는 zero 모델같으면 USB 포트에 IP address를 부여할 수 있도록 해 주어 usb를 통해 ssh나 VNC 연결을 할 수 있다.
zero의 경우에도 wifi나 usb otg 둘 중 하나만 작동되면 되지만 일단 둘 다 켜두자. 특히 집에서 사용하다가 사무실로 옮겼다던지 하는 상황에서 wifi 연결을 재설정하려면 필요하다.
`/boot` 디렉토리에 `config.txt`파일을 열어서 편집한다.
```
dtoverlay=dwc2
```
라는 항목이 있는지 살펴보고 (아마 아래쪽에 있을 것임) 만약 없다면 추가한다.
![](https://cl.ly/345dea/Image%202019-06-07%20at%2012.27.45%20PM.png)
또한 `cmdline.txt`파일을 열어서 (정확하게) 아래와 같이 `rootwait` 뒤에 한 칸 띄고
`modules-load=dwc2,g_ether`를 추가한다.

원래 cmdline.txt 내용:
```
dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=PARTUUID=020c3677–02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait quiet init=/usr/lib/raspi-config/init_resize.sh splash plymouth.ignore-serial-consoles
```

수정 후 cmdline.txt 내용:
```
dwc_otg.lpm_enable=0 console=serial0,115200 console=tty1 root=PARTUUID=020c3677–02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait modules-load=dwc2,g_ether quiet init=/usr/lib/raspi-config/init_resize.sh splash plymouth.ignore-serial-consoles
```

##  USB를 통해 노트북-라즈베리파이 네트워크 구성(RNDIS)
sd 카드를 삽입하고, 노트북과 usb로 연결한다. 이때,  PWR가 아닌  USB에 연결한다.
![](https://cl.ly/52ffbe/Image%202019-06-07%20at%2012.49.20%20PM.png)

#### 이 때! windows는 RNDIS 드라이버를 설치해야 usb를 네트워크 포트로 쓸 수 있다.
참고: https://www.factoryforward.com/pi-zero-w-headless-setup-windows10-rndis-driver-issue-resolved/

* 윈도우10 용 RNDIS 드라이버를 다운로드후 압축을 푼다. [여기에서](http://web1.moddevices.com/shared/mod-duo-rndis.zip)
* 라즈베리파이를 usb에 꽂는다.
* 장치관리자를 열어 com&port 항목에 있는 라즈베리파이를 우클릭한다.
![](https://cl.ly/b6080b/Image%2525202019-06-13%252520at%2525204.53.36%252520PM.png)

* 드라이버 업데이트 > 컴퓨터에서 드라이버 소프트웨어 검색 > 아까 압축 풀어둔 RNDIS 드라이버 폴더 선택
![](https://cl.ly/da4a5e/Image%2525202019-06-13%252520at%2525204.58.27%252520PM.png)

* 이제 장치관리자에서 '네트워크 어댑터' 아래에 'USB Ethernet/ RNDIS Gadget'이 보인다.
![](https://cl.ly/23c055/Image%202019-06-13%20at%204.59.38%20PM.png)

#### 인터넷 공유
##### mac
* usb 네트워크로 인터넷을 사용할 수 있도록 맥북에서 인터넷 공유를 켜준다.
* system 설정 -> 공유 -> 인터넷 공유
![](https://cl.ly/aec3ec/Image%202019-08-31%20at%2012.38.48%20PM.png)  

#### windows
* 시작메뉴 우클릭 > 네트워크 연결 > 어댑터 옵션 변경 > 현재 인터넷 연결된 네트워크(이더넷 or wifi) 선택. 우클릭 > 속성 > 공유탭 > '다른 네트워크 사용자가 이 컴퓨터의 인터넷 연결을 통해 연결할 수 있도록 허용' 선택 > 확인
![](https://cl.ly/474173/Image%202019-09-11%20at%203.40.39%20PM.png)


## ssh 접속
```bash
$ssh pi@raspberrypi.local
```
![](https://cl.ly/b12f8a/Image%2525202019-06-10%252520at%25252010.00.26%252520PM.png)
![](https://cl.ly/ebff11/Image%2525202019-06-10%252520at%25252010.11.31%252520PM.png)

### 위의 방법으로 안되는 경우...(raspberrypi.local이름이 충돌...)
도메인명이 아니라 ip주소를 직접 알아내 입력하자.
#### windows는 먼저 Bonjour를 설치한다.
https://support.apple.com/kb/DL999?locale=en_US&viewlocale=ko_KR
![](https://cl.ly/96c268/Image%2525202019-06-10%252520at%2525209.36.36%252520PM.png)
설치가 끝나면 이제 명령행에서 `dns-sd`명령어를 쓸 수 있다.
#### mac, windows 공통
* 윈도우는 `cmd`, 맥은 `terminal`을 실행시킨다.
* `dns-sd` 명령어의  `-G v4 <NAME>`  옵션을 사용하면 맨 마지막에 오는 것이 그 컴퓨터(<NAME>의 컴퓨터)가 사용하는 ip 주소이다. (dns-sd 프로그램을 끝낼 때에는 `ctrl+C`)
```bash
$ dns-sd -G v4 raspberrypi.local
```
![||600](https://cl.ly/skI6/Image%202018-07-06%20at%207.28.34%20PM.png)

이렇게 알아낸 주소로 ssh접속한다. ID: pi, PW: raspberry 가 디폴트이다.
```bash
$ ssh pi@위에서 알아낸 IP주소
```
![||600](https://cl.ly/sjtn/Image%202018-07-06%20at%207.35.16%20PM.png)
### 윈도우에 SSH가 설치되어있지 않는 경우
putty를 설치해 사용한다.

### warning: possible dns spoofing detected! 메시지 해결법
![](https://cl.ly/a0c94b/Image%202019-06-10%20at%2010.13.28%20PM.png)
ㅊㅏㅁㄱㅗ:http://www.coolio.so/ssh-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%A0%91%EC%86%8D%EC%8B%9C-known_hosts-%EC%B6%A9%EB%8F%8C-%EC%97%90%EB%9F%AC-%EB%B0%9C%EC%83%9D%EC%8B%9C/

가장 빠르고 쉬운 방법은 아래와 같이  ssh-keygen 명령으로 ip에 대해 유효한 연결을 업데이트 하는 것이다.
```bash
$ ssh-keygen -R 192.168.0.108 # 연결하려고하는  IP
```
### hostname  변경
여러대의 라즈베리가 동일한 네트워크에 있는 경우, 연결할 때 헷갈린다. 그러므로 네트워크에서 보이는 장치명을 변경해 구분할 수 있도록 해주자.
기본값은   raspberrypi 로 되어있는데, 이를 각자 마음에 드는 이름으로 바꾸어주면 된다.
* raspi-config  프로그램으로 간단히 할 수 있다.
```bash
$ raspi-config
```
raspi-config 프로그램실행 -> 2.Network Options
![](https://cl.ly/eb9ae8/Image%202019-09-04%20at%2011.15.48%20AM.png)
-> N1 Hostname
![](https://cl.ly/ac0143/Image%202019-09-04%20at%2011.17.04%20AM.png)
-> 원하는 이름으로 바꾸어준다.(여기서는 raspberrypi -> doguinpi 로 바꾸었다.)
![](https://cl.ly/6abd47/Screen%20Recording%202019-09-04%20at%2011.19%20AM.gif)
그다음부턴 새로운 이름으로 접속할 수 있다.
![](https://cl.ly/4ffc4a/Image%202019-09-04%20at%2011.20.54%20AM.png)

### USB를 통한 넷트워크 연결이 불안정한 경우
raspberrypi의 RNDIS (==dwc2) 가 연결을 만들 때마다 랜덤한 mac address를 만들어 사용하는데, 이것이 부팅 때마다 다른 장치로 인식을 한다던가 여러가지 불안정성의 한 이유가 된다. 
해결방법은 g_ether 모듈이 로딩될 때 미리 정해 둔 특정한 mac 주소를 사용하도록 설정하는 것.
참고: https://raspberrypi.stackexchange.com/questions/103750/how-can-i-make-a-pi-zero-appear-as-the-same-rndis-ethernet-gadget-device-to-the

1.  random MAC address generator (https://www.hellion.org.uk/cgi-bin/randmac.pl?scope=local&type=unicast) 를 사용해 임의의 mac 주소를 만들어둔다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/o0uvo4JA/Image%202020-06-02%20at%2010.32.03%20AM.png?v=04694f1d108a659acd7d913008f69b80)

2. /etc/modprobe.d/rndis.conf 파일을 만들고, 아래와 같이 작성한다.
```bash
$ sudo nano /etc/modprobe.d/rndis.conf
...
options g_ether dev_addr=고정하고픈 mac주소
```
* dev_addr : raspberrypi의 mac주소 "12:34:56:78:90"과 같은 형태

3. 재부팅. 


## GUI환경 사용(VNC로 화면 공유)
### 라이브러리 목록 업데이트 & 업그레이드

```bash
$ sudo apt-get update
```
```bash
$ sudo apt-get upgrade
```
업그레이드 완료되면 다운로드된 업데이트 파일을 지워 용량 확보
```bash
$ sudo apt-get clean
```

### VNC Server 설치
* 최근의 라즈비안에는 realVNC가 기본탑재되어있다. 새로인 install 할 필요는 없다. 구지 해야한다면
```bash
$ sudo apt-get update
$ sudo apt-get install realvnc-vnc-server realvnc-vnc-viewer
```
* 설치가 끝나면 `raspi-config`를 실행해 vnc 옵션을 켜준다.
```bash
$ sudo raspi-config
```
Interfacing Option -> P3 VNC -> YES를 선택.
![||600](https://cl.ly/sm1u/Image%202018-07-08%20at%207.56.01%20AM.png)

재부팅한다.
```bash
$ sudo reboot
```
### 노트북에 vnc viewer 설치 및 화면 공유 실행
* `dns-sd -G v4 raspberrypi.local` 명령어를 사용 RPI 의 IP address를 알 수 있다.

* 노트북에 VNC viewer를 설치한다. 여기에서 받을 수 있다. https://www.realvnc.com/en/connect/download/viewer/
주소창에 'raspberrypi.local' 혹은 위에서 얻은 라즈베리파이의 IP주소를 넣는다. 처음 연결할 때 뭐라고 경고가 뜬다. 연결해도 되겠냐고 확인하는 거다.

![](https://cl.ly/f088c7/Image%202019-06-10%20at%2010.49.50%20PM.png)

* 기본 로그인 아이디는 ‘pi’, 패스워드는 ’raspberry’이다.
* 최초 연결하면 언어와 타임존 등을 설정한다.
* 키보드와 마우스, 모니터 없이 노트북에서 잘 컨트롤 됨을 확인한다.

<img src="https://cl.ly/pxbP/Image%202018-03-06%20at%205.04.06%20AM.png" width=600>
</p></li>
* 해상도를 적절히 (작게)하면 속도가 만족스럽다. 1024x768정도면 괜찮은듯. (위에서 한 번 나온 configuration메뉴에서 설정할 수 있다.)
* 마지막으로, ip address는 보통 고정되어있지 않고 부팅할 때마다 바뀌기 때문에, 어느날 갑자기 VNC연결이 안 될 수도 있다.

* 노트북과 라즈베리파이 사이에 파일교환이 필요한 경우 VNC viewer의 화살표 아이콘을 누르거나, 라즈베리파이의 작업표시줄상 VNC아이콘을 누르면 된다.

<img src="https://cl.ly/2h333e1Z3R3X/Image%202017-10-24%20at%208.11.24%20%EC%98%A4%ED%9B%84.png" width=600>

## 한글설치

참고: http://cccding.tistory.com/96
1. 한글폰트 설치

```bash
sudo apt-get install fonts-unfonts-core
```

<img src="https://cl.ly/pxzH/Image%202018-03-06%20at%204.57.23%20AM.png" width=600>

2. ibus한글 입력기 설치

```bash
$ sudo apt-get install ibus-hangul
```

3. Raspberry Pi configuration의 Localisation 설정.
<img src="https://cl.ly/pxFi/Image%202018-03-06%20at%204.58.18%20AM.png" width=600>

<img src="https://cl.ly/pycS/Image%202018-03-06%20at%204.58.29%20AM.png" width=600>

<img src="https://cl.ly/pxkS/Image%202018-03-06%20at%204.58.40%20AM.png" width=600>

* Timezone은 Asia > Seoul로 …
OK를 누르면 재부팅~!

* 재부팅 후 우상단에 EN아이콘을 눌러 한글 입력기를 선택.
* 다시 한번 눌러 한글상태에 체크

<img src="https://cl.ly/pyTR/Image%202018-03-06%20at%204.59.14%20AM.png" width=600>

<img src="https://cl.ly/py45/Image%202018-03-06%20at%205.01.41%20AM.png" width=600>

* 메뉴도 한글로 되어있고 한글 입력도 잘 된다. 한<->영 변환키는 [shift]+[space]

<img src="https://cl.ly/pxVm/Image%202018-03-06%20at%205.02.15%20AM.png" width=600>
