# Raspberry pi의 GPIO 에서 Analog input 받기 (A/D converter MCP3008)
라즈베리파이는 기본적으로 아날로그 입력은 읽지 못하기 때문에 아날로그 값을 내보내는 여러가지 센서류를 사용하기 위해서는 별도의 A/D 컨버터를 통해 아날로그 신호를 디지털로 바꾸어 라즈베리파이에 전달 해 주어야 한다.
가장 많이 사용회는 부품은 MCP3008과 ADS1x115이다. MCP3008은 아두이노 우노와 동일한 10bit의 해상도를 가지며,  ADS1x115는 보다 정교한 값을 리턴한다.

## MCP3008
SPI프로토콜을 통해 라즈베리파이로 0~1023 사이의 값을 전달한다. 3004는 4개 채널의 아날로그 센서, 3008은 8개 채널의 아날로그 센서를 연결할 수 있다.
작동전압 2.7v~5v로, 라즈베리파이에서도, 아두이노에서도 바로 연결해 사용할 수 있지만, 센서로부터 들어오는 전압이 MCP3008이 연결된 작동 전압과 다르다면 주의해야 한다. (레벨 시프터 사용)

![||600](https://cdn-learn.adafruit.com/assets/assets/000/030/456/medium800/sensors_raspberry_pi_mcp3008pin.gif?1455010861)

MCP3008 데이터시트: https://cdn-shop.adafruit.com/datasheets/MCP3008.pdf <br>
Adafruit 참고자료: https://learn.adafruit.com/raspberry-pi-analog-to-digital-converters/mcp3008
raspberry pi 홈페이지 참고자료: https://projects.raspberrypi.org/en/projects/physical-computing/15

## 라즈베리 - MCP3008 SPI연결
MCP3008는 SPI 프로토콜을 통해 라즈베리와 통신하는데,  라즈베리에서 SPI통신을 하는 방법은 하드웨어적인 방법과 소프트웨어로 SPI를 에뮬레이션 하는 방법이 있다. 하드웨어 방식은 조금 더 빠르지만 정해진 핀만 사용할 수 있고, 소프트웨어 방식은 살짝 느리지만 핀 사용에 융통성이 있다.

### 하드웨어 SPI연결
1. 하드웨어 SPI를 사용하기 위해서는 무엇보다 먼저 `raspi-config`에서 SPI 를 `enabled` 해주어야 한다.
```bash
$ sudo raspi-config
```
 `Interfacing Option` > `SPI` > `Yes`.<br>

 물론 GUI로 옵션 설정해도 된다.

2. 하드웨어 spi 핀 연결

  * MCP3008 VDD to Raspberry Pi 3.3V <br>
  * MCP3008 VREF to Raspberry Pi 3.3V <br>
  * MCP3008 AGND to Raspberry Pi GND <br>
  * MCP3008 DGND to Raspberry Pi GND <br>
  * MCP3008 CLK to Raspberry Pi SCLK <br>
  * MCP3008 DOUT to Raspberry Pi MISO <br>
  * MCP3008 DIN to Raspberry Pi MOSI <br>
  * MCP3008 CS/SHDN to Raspberry Pi CE0 <br>


  ![||600](https://projects-static.raspberrypi.org/projects/physical-computing/0cb2cbd34292a05a668aeea3f291ceb3c7d9cd83/en/images/mcp3008-pot.png)

### 소프트웨어 SPI 연결
1. 소프트웨어적으로 SPI를 구현한다면 'raspi-config'에서 설정할 필요없다.
2. 또한 핀 연결 역시 파워와 GND를 제외하고는 아무 GPIO에나 연결하고 파이썬 코드에서 지정해주면 된다.
예를 들어...

 * MCP3008 VDD to Raspberry Pi 3.3V <br>
 * MCP3008 VREF to Raspberry Pi 3.3V <br>
 * MCP3008 AGND to Raspberry Pi GND <br>
 * MCP3008 DGND to Raspberry Pi GND <br>
 * MCP3008 CLK to Raspberry Pi GPIO 5 <br>
 * MCP3008 DOUT to Raspberry Pi GPIO 6 <br>
 * MCP3008 DIN to Raspberry Pi GPIO 7 <br>
 * MCP3008 CS/SHDN to Raspberry Pi GPIO 8 <br>

## python library 설치
라이브러리가 다양하게 있지만, (스크래치 확장기능과의 호환성을 위해 ) `Adafruit-mcp3008`을 사용하였다.
```bash
$ sudo apt-get update
$ sudo apt-get install build-essential python-dev python-smbus python-pip
$ sudo pip install adafruit-mcp3008
```
**python3에서 사용하기 위해서는 `pip3...`**

## 아날로그 센서 연결
센서의 출력 단자를 mcp3008의 CH0 ~ CH7 중 하나에 연결한다. (위 이미지 참고)<br>
*** 주의!! 센서의 작동전압과 센서 출력값의 범위가 mcp3008의 작동전압, 기준전압(Vref)과 동일한지 확인!! 만약 센서의 출력범위는 0~5v라면 (라즈베리파이는 3.3v 입력만 받으므로) 반드시 3.3v-5v 레벨 시프터를 사용한다 ***

## 파이썬 코드
```python
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import time #예제에서 0.5초마다 업데이트하기위함.

# Software SPI configuration:
#CLK  = 5  # 소프트웨어 SPI를 사용하는 경우 연결된 핀 번호를 여기서 확인
#MISO = 6
#MOSI = 7
#CS   = 8
#mcp = Adafruit_MCP3008.MCP3008(clk=CLK, cs=CS, miso=MISO, mosi=MOSI)

# Hardware SPI configuration: 하드웨어 SPI를 사용하는 경우 아래를 주석 해제
SPI_PORT   = 0
SPI_DEVICE = 0
mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))

while True:
    value = mcp.read_adc(0)
    difference = mcp.read_adc_difference(0)

    print("value at CH:0 = %d" %value)
    print("difference between CH0 & CH1 = %d" %difference)
    time.sleep(0.5)
```
1. `import Adafruit_GPIO.SPI as SPI` 와 `import Adafruit_MCP3008` 구문으로 라이브러리 임포트

2. 소프트웨어/하드웨어 SPI 핀 설정
3. `mcp = Adafruit_MCP3008.MCP3008(clk=CLK, cs=CS, miso=MISO, mosi=MOSI)`구문으로 mcp3008 오브젝트 생성

4. `mcp.read_adc(채널)`함수로 센서값을 읽어오거나 (0~1023사이의 값),
`mcp.read_adc_difference(채널)`함수로 해당 채널과 그 다음 채널 의 값의 차이를 읽어옴. (여기서는 CH0의 값 - CH1의 값 )
