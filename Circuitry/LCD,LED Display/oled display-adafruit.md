# 0.96" OLED
SSD1306 드라이버칩을 사용하는 Adafruit의 0.96" 128x64 monochrome oled 모듈을 사용한다.
![326-18](https://i.imgur.com/5bRIbau.jpg)
참고: https://learn.adafruit.com/ssd1306-oled-displays-with-raspberry-pi-and-beaglebone-black

## SPI 설정
### 통신 프로토콜 선택
* 우리가 사용하는 oled 모듈은 i2c 혹은 spi 프로토콜을 사용할 수 있는데, 우리는 속도가 더 빠른 spi를 사용하기로 한다.
* spi가 디폴트 이며, i2c를 사용하고자 한다면 뒷쪽의 sj1, sj2 패드를 연결 해 주어햐 한다.(soldering 필요)

### SPI
참고: https://www.mcublog.co.kr/1828
* SPI는
1. 클럭을 사용하는 동기통신
2. 마스터/ 슬레이브 있음
3. CS(chip select)핀을 사용해 여러개의 슬레이브 중 통신하고자 하는 장치 선택
4. 송신선과 수신선이 분리되어있음. 풀 듀플렉스
5. 아주 단순한, 짧은거리에서, 주로 칩간 통신에 사용.

* 4개의 핀 역할
![](https://cl.ly/c093ea/Image%202019-06-13%20at%206.54.34%20PM.png)

* DC 핀의 역할
우리의  oled 모듈에서는 일반적인 spi 연결에서 사용하지 않던 D/C라고 하는 또 다른 핀을 사용하는데, Data/Command의 약자로 마스터가 보내는 신호가 명령어인지, 화면 데이터인지를 구분하는데 사용한다.

#### 라즈베리파이의 SPI 핀
* 라즈베리 파이의 GPIO중 SPI를 위해 할당된 핀은 정해져있다.(붉은색 4개 )
여기에 DC핀은 GPIO25, Rst는 GPIO24에 연결토록 하자.
![](https://cl.ly/8281ae/Image%202019-06-13%20at%207.16.18%20PM.png)


* oled와 rpi를 연결하자. 물론 위 6개의 핀과 함께 vcc, gnd도 연결해야한다.
![](https://cl.ly/6179cf/Image%202019-07-29%20at%201.33.36%20PM.png)

## Adafruit SSD1306 Python library
참고: https://learn.adafruit.com/ssd1306-oled-displays-with-raspberry-pi-and-beaglebone-black

### 라이브러리 설치
```bash
$ sudo apt-get update
$ sudo apt-get install build-essential python-dev python-pip
$ sudo pip install RPi.GPIO

$ sudo apt-get install python-imaging python-smbus

$ sudo apt-get install git
$ git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
$ cd Adafruit_Python_SSD1306
$ sudo python3 setup.py install

```

### 라즈베리 SPI기능 활성화
1. ssh로 라즈베리파이 접속 후 'raspi-config' 실행
```bash
$ sudo raspi-config
```
2. 5.Interfacing Option 선택
![](https://cl.ly/402825/Image%202019-06-14%20at%205.39.07%20PM.png)
3. `P4 SPI` 선택해 'Enable'
![](https://cl.ly/a30ed7/Image%202019-06-14%20at%205.38.02%20PM.png)
![](https://cl.ly/1fb52d/Image%202019-06-14%20at%205.38.20%20PM.png)

## 예제 실행
~/Adafruit_Python_SSD1306/examples 디렉토리에 예제들이 들어있다.
shape.py로 테스트 해 본다.
설정에 맞게 조금씩 수정해야 하는 경우가 있는데,

* 우리의 핀 연결에 맞도록
line32 `RST = 24`로 수정한다.
line34 `DC = 25`로 수정한다.
* 예제는 디폴트로 i2c를 사용토록 되어있는데, spi로 바꾼다.
line46을 comment 하고,
line62 는 uncomment한다.

테스트 해보니 잘 된다!

## 기본 사용법
1. 라이브러리를 임포트한다.
```python
# oled 라이브러리
import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306
# PIL image 라이브러리
from PIL import Image
from PIL import ImageDraw
from PIL import ImgaeFont
```
2. oled display 오브젝트 셋업

```python
# oled display 오브젝트 셋업
RST = 24
DC = 25
SPI_PORT = 0
SPI_DEVICE = 0

disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=8000000))
disp.begin()
```
3. 이미지 표시하기
  1. 화면 지우기
  2. 빈 이미지 준비하기
  3. 빈 이미지 위에 PIL 사용해 그림 그리기
  4. 화면으로 보내기

```python
# oled 라이브러리
import Adafruit_GPIO.SPI as SPI
import Adafruit_SSD1306
# PIL image 라이브러리
from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

# oled display 오브젝트 셋업
RST = 24
DC = 25
SPI_PORT = 0
SPI_DEVICE = 0

disp = Adafruit_SSD1306.SSD1306_128_64(rst=RST, dc=DC, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE, max_speed_hz=8000000))
disp.begin()

# clear display
disp.clear()
disp.display()

# 빈 이미지 준비하기
width = disp.width
height = disp.height
image = Image.new('1',(width, height)) # 1bit-black&white  이미지이므로 1.
draw = ImageDraw.Draw(image)

#font 준비
font = ImageFont.truetype("malgun.ttf",15)

# draw a text
draw.text(
(10,10),
'''세종대왕
만만세''',
font=font, fill=255)

# oled에 보이기
disp.image(image)
disp.display()

```
