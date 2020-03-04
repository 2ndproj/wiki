# GPS

## gps module
Neo-6m gps 모듈을 사용한다.
대부분의 gps 모듈이 serial UART 통신을 사용한다. 참고자료가 많은 쪽이 좋으므로  시리얼 통신방식 부품을 고른다.
구매링크: https://www.devicemart.co.kr/goods/view?no=1321968
![](https://www.makerlab-electronics.com/my_uploads/2017/06/GPS-Module-01.jpg)
* 동작전원 3.3v
* serial UART (9600 baud)
* 타 제품에 비해 저렴

## GPS+RPi 회로 구성
라즈베리의 8번째, 10번째 핀이  시리얼 통신용이다.
![](https://cdn.instructables.com/FP7/CQBO/ICJLZ1TL/FP7CQBOICJLZ1TL.LARGE.jpg?auto=webp&frame=1&width=664&fit=bounds)  

![](https://cl.ly/49839d/Image%202019-08-30%20at%204.54.46%20PM.png)

## 라즈베리파이 시리얼 포트 설정
참고: https://spellfoundry.com/2016/05/29/configuring-gpio-serial-port-raspbian-jessie-including-pi-3/  

### 시리얼 포트 확인
* 가장 먼저, 라스베리파이에서 시리얼 포트가 어디에 있는지 알아야한다. GPIO상 BCM 14,15번 핀이 시리얼통신용 (각각 TX, RX)인데, 라스비안에서 /dev/serial0으로 불린다. (ls 명령어로 찾아보자)

* 원래 시리얼통신 포트 이름은 /dev/ttyAMA0이다. 그런데 파이3에서는, 이전까지 /dev/ttyAMA0에 할당되어있던 시리얼포트가 블루투스에 할당되었다. 시리얼포트는 /dev/ttyS0로 옮겨졌다.

* 위와같은 이유로 rpi3와 그 이전 기계에서 함께쓰는 코드를 쓰려면 /dev/ttyAMA0라는 이름을 쓰면 안된다. 대신 /dev/serial0라는 이름-일종의 바로가기(aliase)-를 사용하면 된다. 즉 rpi1,2에서는 시리얼 == /dev/ttyAMA0 == /dev/serial0 그리고 rpi3에서는 시리얼 == /dev/ttyS0 == /dev/serial0 터미널에서 확인해보자.
```
$ ls -l /dev
```
![](https://cl.ly/3U0d47274025/Image%202017-10-27%20at%2011.01.08%20%EC%98%A4%EC%A0%84.png)

 **결론적으로 이것저것 골치아프게 생각하지 말로 시리얼포트는  '/dev/serial0'을 사용하면 된다.**

* rpi3에서 /dev/ttyS0포트는 UART(병렬<>직렬 컨버터 하드웨어)가 아닌, UART를 모사한 소프트웨어시리얼이다. 때문에 CPU상태에 따라 시리얼통신이 안정적이지 않은 경우가 있을 수 있다. 만약 블루투스를 소프트시리얼로 돌리고(혹은 사용하지 않고) 시리얼통신을 하드웨어 UART를 사용해 안정적으로 하고자한다면 GPIO 시리얼을 /dev/ttyAMA0에 할당할 수도 있다. 구체적인 방법은 위 자료 참고.


### UART 활성화 & 시리얼 콘솔 연결 (getty service) 비활성화
* 예전 컴퓨터라는게 막 생겨난 시기, 다른 컴퓨터에 접속해 콘솔창을 띄우는 용도로 시리얼 포트를 사용하곤 했었는데, rpi에서 시리얼 포트를 그런 용도로 사용하는 것을 기본으로 설정해 두었다. (getty 서비스라고 함).
* 시리얼 포트를 다른 하드웨어와 연결해 우리 마음대로 다루고 싶다면 콘솔 연결을 비활성화 시켜야 한다.
* 콘솔연결은 비활성화하더라도 시리얼포트는 사용가능하게 두어야 한다.

* raspi-config  프로그램으로 간단히 할 수 있다.  
터미널에서
```bash
$ sudo raspi-config
```
![](https://cl.ly/2e1b57/Image%202019-08-31%20at%201.33.08%20PM.png)
![](https://cl.ly/167455/Image%202019-08-31%20at%201.33.39%20PM.png)
![](https://cl.ly/d81b49/Image%202019-08-31%20at%201.34.02%20PM.png)
![](https://cl.ly/59471d/Image%202019-08-31%20at%201.34.27%20PM.png)

* 재부팅한다.

* 혹은 GUI에서는  Raspberry Pi Configuration 창을 열어서
![](https://cl.ly/272s331I3o1c/download/[f885f30a8379f4df9a197b839fb7a5c8]_Image%202017-10-27%20at%2011.57.24%20%EC%98%A4%EC%A0%84.png)


### 시리얼 연결
시리얼로 들어오는 rawdata 확인해보자
* 먼저 시리얼 포트 설정
```bash
$ stty -F /dev/serial0 raw 9600 cs8 clocal -cstopb
```
* 시리얼포트로 들어오는 값을 살펴보자
```bash
$ cat /dev/serial0
```
![](https://cl.ly/563e3c/Image%202019-09-04%20at%2011.47.27%20AM.png)

##  GPS FIX
* gps에서 사용되는 중요한 개념중에  FIX라는 것이 있다.
디바이스를 부팅하고나서도 위성으로부터 전파를 받아 디바이스의 위치를 계산할 수 았으려면 조금 시간이 걸리는데, 이렇게 충분한 데이터를 모아 자신의 위치를 계산할 수 있게되면 fix되었다라고 이야기한다. 더 구체적인 내용은 공부를 더 해보자.

* neo-6m gps는 유난히  fix 하는데 시간이 오래 걸리는 듯 하다. 위성 신호가 잘 잡혀도 길게는 10분정도 걸리는 경우가 있다.  
* fix 되면 회로 위의 led가 깜빡거려서  fix되었음을 알려준다.

## NMEA 프로토콜
gps 통신 표준을 관리하는 곳은 재미있게도 NMEA, 'National Marine Electronics Association' 해양전자협회? 이다. 그래서 gps표준 프로토콜 이름도 'NMEA-0183' 이다.  
잘 정리된 한글자료: https://techlog.gurucat.net/239 [하얀쿠아의 이것저것 만들기 Blog]
nmea 표준 레퍼런스: https://www.sparkfun.com/datasheets/GPS/NMEA%20Reference%20Manual-Rev2.1-Dec07.pdf  

NMEA 데이터 형태
 ``` $GPGGA,141113.999,3730.0308,N,12655.2369,E,1,06,1.7,98.9,M,,,,0000*3E

$GPGSA,A,3,02,07,01,20,04,13,,,,,,,3.7,1.7,3.2*31

$GPRMC,141113.999,A,3730.0308,N,12655.2369,E,19.77,195.23,101200,,*3C

$GPGGA,141114.999,3730.0264,N,12655.2351,E,1,07,1.2,98.8,M,,,,0000*3C

$GPGSA,A,3,02,07,01,20,24,04,13,,,,,,2.3,1.2,1.9*3E

$GPRMC,141114.999,A,3730.0264,N,12655.2351,E,15.51,202.12,101200,,*3C

$GPGGA,141115.999,3730.0231,N,12655.2345,E,1,07,1.2,98.7,M,,,,0000*37

$GPGSA,A,3,02,07,01,20,24,04,13,,,,,,2.3,1.2,1.9*3E

$GPGSV,2,1,07,07,84,025,47,04,51,289,48,20,40,048,47,02,32,203,46*74

$GPGSV,2,2,07,01,23,101,47,13,20,131,32,24,19,268,40*49

$GPRMC,141115.999,A,3730.0231,N,12655.2345,E,12.14,194.75,101200,,*33

$GPGGA,141116.999,3730.0210,N,12655.2330,E,1,07,1.2,98.5,M,,,,0000*37

$GPGSA,A,3,02,07,01,20,24,04,13,,,,,,2.3,1.2,1.9*3E

$GPRMC,141116.999,A,3730.0210,N,12655.2330,E,8.01,194.65,101200,,*0F

$GPGGA,141117.998,3730.0199,N,12655.2320,E,1,06,1.3,98.2,M,,,,0000*33

$GPGSA,A,3,02,07,01,20,24,04,,,,,,,2.4,1.3,2.0*30
```
* $ : 각 문장의 시작
* \n (CR/LF) : 각 문장의 끝
* sentence id : $다음에 오는 다섯 글자로,디바이스 종류를 밝히는두자(예를들어 GP) 와 이어지는 데이터 종류를 밝히는 3글자(예를들어 GGA)로 구성됨.
* 데이터: 콤마로 구분된 데이터들은  앞의 sentence id에 따라 해석하게 된다.
가장 기본적인 몇가지만 읽는 방법을 알아보자
### GPGGA
GPGGA는 'Global Positioning System Fix Data'를 의미한다.  아래의 GPGGA 예제 sentence를 살펴보자.

 GPGGA는 총 17개의 field를 가진다.
![](https://cl.ly/de0df9/Image%202019-09-04%20at%203.10.19%20PM.png)
![](https://cl.ly/69bb04/Image%202019-09-04%20at%203.10.36%20PM.png)

### GPRMC
GPRMC는 'Recommended Minimum Specific GNSS Data'로 정의되어있다.
NMEA에는 GPS에서 필수적인 PVT(Position, Velocity, Time) 데이터의 고유한 버전이 있다.
그것을 RMC라고 부른다. 'RMC'에서 RM이 Recommended Minimum의 약자이고, C는 GNSS를 의미한다. RMA, RMB도 있으며 각각 LORAN-C와 Navigation을 의미한다. 상식으로 알아두자.
![](https://cl.ly/fc6b5f/Image%202019-09-04%20at%203.11.51%20PM.png)
![](https://cl.ly/f09f14/Image%202019-09-04%20at%203.12.04%20PM.png)

### GPGSV
GSV는 'GNSS Satellite in View' 를 의미한다. 각각 위성의 상태에 대해 나와있는 문장이다.
![](https://cl.ly/50a166/Image%202019-09-04%20at%203.13.52%20PM.png)

### checksum
NMEA checksum 계산방법 및 예제코드
지금까지 예제로 보여준 NMEA sentence들을 살펴보면 알겠지만, checksum은 * 뒤에 16진수 두자리로 표시한다.

checksum의 계산은 $, * 의 사이에 있는 각 문자를 exclusive-or (XOR) 연산한 값을 표시한다.

어떤 NMEA sentence가 주어지면, * 뒤에 있는 16진수 두자리의 checksum과 직접 XOR연산한 값이 일치하는지를 검사해야 한다. 일치하지 않는다면, 그 sentence는 통신상의 문제 등의 이유로, 결함이 있는 것으로 간주해야 하며, 사용하면 안된다.
예를 들어보자.

>$GPRMC,155123.000,A,4043.8432,N,07359.7653,W,0.15,83.25,200407,,\*28

이와 같은 NMEA sentence가 주어졌을때, checksum계산을 위한 XOR연산은 아래 각 문자들에 대해서 수행하면 된다.

>GPRMC,155123.000,A,4043.8432,N,07359.7653,W,0.15,83.25,200407,,


## python 에서  NMEA 데이터 사용 예제
### manually
참고: http://ozzmaker.com/using-python-with-a-gps-receiver-on-a-raspberry-pi/

```python
import serial

port = "/dev/serial0"

def parseGPS(data):
#    print "raw:", data #prints raw data
    if data[0:6] == "$GPRMC":
        sdata = data.split(",")
        if sdata[2] == 'V':
            print "no satellite data available"
            return
        print "---Parsing GPRMC---",
        time = sdata[1][0:2] + ":" + sdata[1][2:4] + ":" + sdata[1][4:6]
        lat = decode(sdata[3]) #latitude
        dirLat = sdata[4]      #latitude direction N/S
        lon = decode(sdata[5]) #longitute
        dirLon = sdata[6]      #longitude direction E/W
        speed = sdata[7]       #Speed in knots
        trCourse = sdata[8]    #True course
        date = sdata[9][0:2] + "/" + sdata[9][2:4] + "/" + sdata[9][4:6]#date

        print "time : %s, latitude : %s(%s), longitude : %s(%s), speed : %s, True Course : %s, Date : %s" %  (time,lat,dirLat,lon,dirLon,speed,trCourse,date)

def decode(coord):
    #Converts DDDMM.MMMMM > DD deg MM.MMMMM min
    x = coord.split(".")
    head = x[0]
    tail = x[1]
    deg = head[0:-2]
    min = head[-2:]
    return deg + " deg " + min + "." + tail + " min"


print "Receiving GPS data"
ser = serial.Serial(port, baudrate = 9600, timeout = 0.5)
while True:
   data = ser.readline()
   parseGPS(data)
 ```

### pynmea2 library 사용
NMEA 데이터 파싱을 도와주는 pynmea2 라이브러리를 사용할 수 있다.
* 라이브러리 설치
```bash
$ pip install pynmea2
```
* 예제

```python
import serial
import pynmea2

port = "/dev/serial0"

def parseGPS(str):
    if str.find('GGA') > 0:
        msg = pynmea2.parse(str)
        print "Timestamp: %s -- Lat: %s %s -- Lon: %s %s -- Altitude: %s %s -- Satellites: %s" % (msg.timestamp,msg.lat,msg.lat_dir,msg.lon,msg.lon_dir,msg.altitude,msg.altitude_units,msg.num_sats)

serialPort = serial.Serial(port, baudrate = 9600, timeout = 0.5)
while True:
    str = serialPort.readline()
    parseGPS(str)
```

## GPSD
gpsd 는 GPS daemon의 약자로, 백그라운드에서 동작하면서  gps 사용을 도와주는 프로그램이다. 시리얼포트에서 들어오는 로데이터를 바로 사용할 수도 있지만, gpsd과, 이와 연계된 라이브러리를 사용하면 더 쉽게  gps가 제공하는 정보를 활용할 수 있다.
Adafruit 참고자료: https://learn.adafruit.com/adafruit-ultimate-gps-hat-for-raspberry-pi/use-gpsd
gpsd 공식문서:https://gpsd.gitlab.io/gpsd/index.html

### gpsd 와 파이썬 라이브러리 설치
```bash
$ sudo apt-get update
$ sudo apt-get install gpsd gpsd-clients python-gps
```

### 라즈비안의 디폴트 서비스 제거
라즈비안에서는 라즈베리파이에 USB를 통해 외부 gps장치를 연결이 감지되면 gpsd가 실행되도록하는 systemd 서비스가 기본 켜져있다. 이 부분이 간섭일으키므로  disable 시킨다.
```bash
$ sudo systemctl stop gpsd.socket
$ sudo systemctl disable gpsd.socket
```
#### 부팅시 gpsd 자동으로 시작하기
* [ ] systemd를 죽이는 대신에 usb가 아닌 serial0에 연결된 gps 가 부팅과 동시에 실행되도록 하려면, /etc/default/gpsd 를 수정토록 한다.
```bash
$ sudo nano /etc/default/gpsd
```
 from:
 >DEVICES=""  

 to:
 >DEVICES="/dev/serial0"

 그리고  systemd  서비스는 다시 켜준다.
 ```bash
 $ sudo systemctl enable gpsd.socket
 $ sudo systemctl start gpsdsocket
 ```

### gpsd 실행
```bash
$ sudo gpsd /dev/serial0 -F /var/run/gpsd.sock
```
끌 때는
``` bash
$ sudo killall gpsd
```

### test: cgps
gpsd가 제공하는 데이터를 실시간으로 확인할 수 있다.
```bash
$ cgps
```
![](https://cl.ly/dc6e40/Image%202019-09-04%20at%2012.36.37%20PM.png)

### gpsd 가 제공하는 데이터 구조
gpsd의 데이터는 json 형식으로,  'class' attribute 에 따라 해석한다.
gpsd 프로토콜 공식문서: https://gpsd.gitlab.io/gpsd/gpsd_json.html

####  gpsd + python 예제
* gpsd로부터  TPV (time, position, velocity) 기본정보 가져오기

```python
#! /usr/bin/python

from gps import *
import time

gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE)
print 'latitude\tlongitude\ttime utc\t\t\taltitude\tepv\tept\tspeed\tclimb' # '\t' = TAB to try and output the data in columns.

try:


    while True:
        report = gpsd.next() #
        if report['class'] == 'TPV':

            print  getattr(report,'lat',0.0),"\t",
            print  getattr(report,'lon',0.0),"\t",
            print getattr(report,'time',''),"\t",
            print  getattr(report,'alt','nan'),"\t\t",
            print  getattr(report,'epv','nan'),"\t",
            print  getattr(report,'ept','nan'),"\t",
            print  getattr(report,'speed','nan'),"\t",
            print getattr(report,'climb','nan'),"\t"

        time.sleep(1)

except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
    print "Done.\nExiting."
```
* 인공위성 정보 가져오기

```python
#! /usr/bin/python

from gps import *
import time
import os

gpsd = gps(mode=WATCH_ENABLE|WATCH_NEWSTYLE)

try:
    while True:

        report = gpsd.next() #
        if report['class'] == 'SKY':
            os.system('clear')
            print ' Satellites (total of', len(gpsd.satellites) , ' in view)'
            for i in gpsd.satellites:
                print 't', i


            print '\n\n'
            print 'PRN = PRN ID of the satellite. 1-63 are GNSS satellites, 64-96 are GLONASS satellites, 100-164 are SBAS satellites'
            print 'E = Elevation in degrees'
            print 'As = Azimuth, degrees from true north'
            print 'ss = Signal stength in dB'
            print 'used = Used in current solution?'

        time.sleep(1)


except (KeyboardInterrupt, SystemExit): #when you press ctrl+c
    print "Done.\nExiting."
```

## kakao api로 좌표변환
gps는 위경도를 값으로 사용하는데반해, airkorea api 는 x,y  좌표계인 tm좌표를 사용한다. 이들 사이에 좌표변환이 필요한데, 공식을 찾아 프로그래밍 하는 것도 가능하겠지만,   
참고: http://cfile227.uf.daum.net/attach/115A0B4E4E730D4F33E863  
간단한 방법으로
카카오에서 제공하는  api를 사용할 수 있다.  
참고: https://developers.kakao.com/docs/restapi/local#%EC%A2%8C%ED%91%9C%EA%B3%84-%EB%B3%80%ED%99%98

### kakao 개발자 계정 만들기
developers.kakao.com 에서 개발자 계정을 등록한다. 바로 승인된다.

### 카카오 api로 좌표변환

```python
# 카카오 api에서 제공하는 좌표변환기능 사용해  위경도> tm좌표로 바꾸어준다.
    if self.longitude is not None and self.latitude is not None: # 위경도 값이 있을 때만..
        url = 'https://dapi.kakao.com/v2/local/geo/transcoord.json' #좌표계-변환
        params = {'x':self.longitude, 'y':self.latitude, 'input_coord':'WGS84', 'output_coord':'TM'}
        headers = {'Authorization': 'KakaoAK '+ KakaoAK}
        resp = requests.get(url, params = params, headers = headers)
        if resp.status_code == 200: # OK
            #test
            print(resp.json())

            self.tmX = resp.json()['documents'][0]['x']
            self.tmY = resp.json()['documents'][0]['y']

            #test
            print('tmX: %s, tmY: %s' %(self.tmX, self.tmY))

        else:
            print('kakao Error: %s' %resp.status_code)
```
### 위경도 표시방법
그런데 이 때에 주의할점!  
gps의 경위도 데이터는 dddmm.mmm (degree.minute)형식으로, 도(정수)+분(실수)로 구성된다.
그런데 kakao api나 구글맵 등에서 요청하는 경위도 데이터는 ddd.ddddd 형식으로 도(실수) 로 변환되어야 한다.
참고: https://m.blog.naver.com/PostView.nhn?blogId=caolympiad&logNo=220855909060&proxyReferer=https%3A%2F%2Fwww.google.com%2F

```python
gpslat = sdata[3] # 시리얼 데이터중 4번째항목이 위도
            degree = gpslat[0:2]
            minute = gpslat[2:]
            self.latitude = float(degree)+float(minute)/60

            gpslon = sdata[5] #데이터중 6번째 항목이 경도
            degree = gpslon[0:3]
            minute = gpslon[3:]
            self.longitude = float(degree)+float(minute)/60
```

## 특정지역의 미세먼지값 알기 (data.go.kr)
### 공공데이터 포탈 data.go.kr
정부에서 제공하는 갖가지 데이터 api로 혹은 차트로 제공.
특정 좌표를 사용해 지역의 미세먼지값을 알기 위해서는 두개의 서비스를 사용해야한다.
1. 측정소정보 조회 서비스
2. 대기오염정보 조회 서비스  
대기오염정보조회 서비스에 좌표를 바로 사용하도록 되어있지 않아, 먼저 측정서정보 조회 서비스로 근처의 가까운 측정소 이름을 알아낸 후, 그 이름으로 대기오염정보조회 서비스에 리퀘스트를 보내야한다.
### 서비스키 발급
data.go.kr  에 계정만든 후에 사용하고자 하는 서비스를 선택해 (여기서는 측정소 조회서비스 & 대기오염정보 조회 서비스) 활용신청
![](https://cl.ly/bf32bb/Image%202019-09-07%20at%2010.09.15%20AM.png)
활용신청하면 서비스키를 발급 받는다.
![](https://cl.ly/9a6576/Image%202019-09-07%20at%2010.17.09%20AM.png)
### 가까운 측정소 알아보기

```python
# 가까운 측정소 알아보기 (에어코리아 측정소정보 조회 서비스)
if self.tmX is not None and self.tmY is not None:
    url = 'http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?serviceKey=' + DataGoKrKey
    # serviceKey 파라메터를 url에 직접넣은이유? -> requests 의 버그로여겨짐. %2F -> %252F로 비뀌는 현상... 참고: http://tkurek.blogspot.com/2013/06/252f-instead-of-2f-in-url-apache.html
    params = {'_returnType':'json',
            'tmX': self.tmX,
            'tmY': self.tmY,
            }
    resp = requests.get(url, params=params)

    if resp.status_code == 200:

        #test
        print('근처 측정소 response: %s /n url: %s' %(resp.text,resp.url))

    else:
        print('data.go.kr Error: %s' %resp.status_code)
```
* [ ] serviceKey 파라메터를 url에 직접넣은이유? -> requests 의 버그로여겨짐. %2F -> %252F로 비뀌는 현상... 참고: http://tkurek.blogspot.com/2013/06/252f-instead-of-2f-in-url-apache.html
