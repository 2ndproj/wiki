# Google vision api 설치

## 카메라 연결하고 활성화
### 카메라 포트에 카메라 연결
![||600](https://projects-static.raspberrypi.org/projects/getting-started-with-picamera/76595bc53548f43cb74fe647dfd7a322022c7fe0/en/images/connect-camera.jpg)

pi-zero camera
![||600](https://cdn.shopify.com/s/files/1/0174/1800/products/Camera_module_3_of_4_1024x1024.JPG?v=1488988334)

### 카메라 활성화
- 부팅 후  시작메뉴 > preference > raspberry pi configuration > Interface > camera 항목을 활성화 (Enabled)

![||600](https://projects-static.raspberrypi.org/projects/getting-started-with-picamera/76595bc53548f43cb74fe647dfd7a322022c7fe0/en/images/raspi-config-menu.png)
![||600](https://cl.ly/sniO/Image%202018-07-09%20at%2011.00.40%20AM.png)

재부팅된다...

- 데스크탑GUI가 아닌 CLI환경이라면
```
$ sudo raspi-config
```
명령을 실행해
'5.Interfacing Option' > 'P1 Camera' 를 선택하고 카메라를 활성화한다.

## 테스트샷
`raspistill` 은 스틸 이미지, `raspivid`는 동영상을 찍는 프로그램이다.
### 사진
```
$ raspistill -o testImage.jpg
```
`-o` 옵션은 저장파일명 설정.

![||600](https://cl.ly/so23/Image%202018-07-09%20at%2011.14.36%20AM.png)

### 동영상

```
$ raspivid -t 10000 -o testVid.h264
$ omxplayer testVid.h264
```
10초동안 녹화 & 재생(omxplayer)

`-f` 나 `-p 0,0,1024,768`옵션을 사용하면 GUI화면에서 preview  할 수 있다.

## 파이썬으로 사진 찍기
라즈베리파이에서 기본으로 제공되는 카메라 모듈은  'picamera' 이다.  
공식레퍼런스: https://picamera.readthedocs.io/en/release-1.13/
### 기본 사용법- 파일로 저장
``` python
# takePhoto.py

from picamera import PiCamera
camera = PiCamera()
camera.capture('test.jpg')
camera.close()
```
### 기본 사용법 - PIL 이미지로 저장
이미지를 파일로 직접쓰는 대신 메모리상의 스트림 오브젝트로 기록한 후 이를  PIL 에서 사용한다.

```python
# takePIL.py

from io import BytesIO
from picamera import PiCamera
from PIL import Image

stream = BytesIO()
camera = PiCamera()
camera.capture(stream, format='jpeg')
stream.seek(0)
image = Image.open(stream)
...
camera.close()
```
### 기본 사용법 - video 촬영
``` python
# 1minVideo.py
# 10초간 녹화
from picamera import PiCamera

camera = PiCamera()
camera.resolution = (640, 480)
camera.start_recording('testvideo.h264')
camera.wait_recording(10)
camera.stop_recording()
camera.close()
```
* 카메라 해상도 조정: camera.resolution= (640,480)
* 카메라 회전: camera.rotation = 90  

## google vision api
머신러닝 코드와 데이터 축적은 구글에 맡기고 사용자가 딱 필요한 결과만 쉽게 사용할 수 있도록 구글이 제공하는 이미지 분석 툴.
rest api를 통해 임의의 이미지의 얼굴인식, 라벨링, 텍스트감지, 자르기 추천 등의 기능을 사용할 수 있다.
소개 페이지: https://cloud.google.com/vision/docs/drag-and-drop

### 1. 새 프로젝트 생성
구글 클라우드 플랫폼 콘솔화면에서 새로운 프로젝트를 생성한다.
![](https://cl.ly/ab0ad7/Image%202019-08-05%20at%205.45.31%20PM.png)
여기서는 이전에 만들어둔 'AR glass'프로젝트에 vision-api 서비스를 추가하는 것으로 진행한다.

### 2. 결제정보 넣기
  무료 사용량  limit을 넘지 않으면 무료이지만 결제정보는 넣어주어야 작동한다.
  ![](https://cl.ly/c702dc/Image%202019-10-09%20at%203.55.45%20PM.png)
  혹시라도 내가 모르는 새 결제되지 않을까 걱정된다면 아래를 참고한다.
  구글 api 사용량 상한 설정방법: https://cloud.google.com/apis/docs/capping-api-usage

### 3. vision API 켜기
API 및 서비스 > 대시보드 ( https://console.developers.google.com/apis )에서 vision api를 Enabled 시켜준다.
![](https://cl.ly/b9514c/Image%202019-10-09%20at%203.08.46%20PM.png)  

### 4. Service account key 생성
 메뉴 > APIs & Services > 사용자 인증정보 에서 Service account key 추가
 ![](https://cl.ly/e73ad5/Image%202019-10-09%20at%204.08.59%20PM.png)
 역할(role)은 project > Owner 를 선택(full access)
 ![](https://cl.ly/579753/Image%202019-10-09%20at%204.10.51%20PM.png)

 다운받은 .json파일을 /home/pi로 옮긴다.  

### 5. python 클라이언트 라이브러리 설치
google-cloud-vision python library 공식 레퍼런스: https://googleapis.dev/python/vision/latest/index.html

```bash
$ sudo pip3 install --upgrade google-cloud-vision
```
### 6. GOOGLE_APPLICATION_CREDENTIALS 환경변수 설정
```bash
export GOOGLE_APPLICATION_CREDENTIALS="/home/pi/filename.json"
```
물론 우리는 부팅과 함께 자동 실행되길 원하므로  '/etc/rc.local' 파일에 추가한다.

```bash
# /etc/rc.local
# By default this script does nothing.

# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi
# google vision api key
export GOOGLE_APPLICATION_CREDENTIALS="/home/pi/visionapiservicekey.json"
# ar glass 자동시작
cd /home/pi
/usr/bin/python3 /home/pi/arglass_day4.py > /home/pi/log.txt 2>&1
exit 0

```

### 6. 샘플 프로젝트 실행
구글의 공식 샘플을 실행해 작동하는지 확인한다.
참고: https://cloud.google.com/vision/docs/quickstart-client-libraries

![](https://cl.ly/87b631/test.jpg)
![](https://cl.ly/c3ca0c/Image%202019-10-09%20at%206.12.03%20PM.png)

hint:실행시 위와같은 에러가 발생한다면  grpcio를 다운그레이드한다(1.24.1 -> 1.23.0)
>...
in <module>
    from grpc._cython import cygrpc as _cygrpc
ImportError: /home/pi/.local/lib/python3.7/site-packages/grpc/_cython/cygrpc.cpython-37m-arm-linux-gnueabihf.so: undefined symbol: __atomic_exchange_8
```bash
$ sudo pip3 install 'grpcio==1.23.0' --force-reinstall
```
