# RPi.GPIO 라이브러리 사용법
파이썬에서 라즈베리파이의 gpio핀을 제어할 수 있도록 해주는 라이브러리. 라즈비안에 기본 설치 되어있다.
참고: https://sourceforge.net/p/raspberry-gpio-python/wiki/Home/

## 기본 사용법1(순서)
### 1. 먼저 모듈을 임포트한다. (필수)
* *RPi.GPIO 모듈은 하드웨어를 건드리기 때문에 슈퍼유저 권한이 필요하다. 실행할 때 `$sudo python3 my-gpio-project.py`해야한다.*

``` python
import RPi.GPIO as GPIO
```

### 2. 핀 넘버를 부르는 방식을 선택한다.(필수)
``` python
GPIO.setmode(GPIO.BOARD)
#or
GPIO.setmode(GPIO.BCM)
```
GPIO.BOARD 는 라즈베리파이에 배열된 순서대로 핀 이름을 부르겠다는 의미이고, GPIO.BCM은 (Broadcom chip-specific pin numbers) 로  Broadcom SOC 칩에서 사용하는 핀이름을 사용하겠다는 의미.
즉, GPIO.BOARD 모드에서 8번핀은 GPIO.BCM  모드에서 14번 핀과 동일하다.
![Raspberry Pi GPIO 배치](https://cdn.sparkfun.com/r/600-600/assets/learn_tutorials/4/2/4/header_pinout.jpg)

* tip: 위 그림에 나온 BCM 핀 배치도는 라즈비안에 기본 설치된 pinout  명령으로 언제든 확인 할 수 있다. (i2c 핀이라든가... 가 표시되지 않아 아쉬움이 있다.)
 ![](https://cl.ly/cf40ac/Image%202019-08-01%20at%203.42.06%20PM.png) raspberry pi zero 에서 실행한 경우

### 3.  핀 모드를 설정한다 (입력핀 or 출력핀...). 아두이노에서 `pinMode()` 와 같은 역할.(필수)
 ```python
 GPIO.setup(18, GPIO.OUT)
 #or
 GPIO.setup(18, GPIO.IN)
 ```
 list를 사용해 한번에 여러 핀을 설정 할 수도 있고, output 모드로 설정하는 경우 초기값을 줄 수도 있다.
 ``` python
 GPIO.setup([18, 19, 20], GPIO.OUT, initial=GPIO.HIGH)
 ```

### 4.  input, output 등등 원하는대로 사용한다.
### 5. 프로그램을 종료하기전, 리소스를 반납한다. (필수)

```python
GPIO.cleanup()
```
### 결론
종합하자면, 일반적으로 무한루프를 돌며 사용자와 인터렉션 하는 GPIO 활용 프로그램의 특성상 아래와 같은 구조를 갖는 경우가 많다.

``` python
# 라이브러리 임포트
import RPi.GPIO as GPIO
...
# GPIO setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.IN)
GPIO.setup(18, GPIO.OUT)
...
# 메인 쓰레드
try:
    while 1:
        button = GPIO.input(12)
        ...
        GPIO.output(18, GPIO.HIGH)
        ...
# 반드시 클린업
finally:
    GPIO.cleanup()
```

## 기본 사용법 2
### Digital Output
 ``` python
 import time

 GPIO.output(18, GPIO.HIGH)
 time.sleep(0.1)	# 100 millisecond 딜레이
 GPIO.output(18,GPIO.LOW)
 ```
 `GPIO.HIGH` 대신 `True `나 `1`을 써도 좋다. `GPIO.LOW` 대신에는 `False`나 `0`

### Analog Output (PWM)
RPi는 기본적으로 2개의 hardware PWM 채널을 가지고 있는데, 아쉽게도 RPi.GPIO에서는 사용할 방법이 없다. (C로 wiringPi를 사용하는경우 1개 채널(GPIO18) 사용가능.) 대신 software PWM을 어느 핀에서든 사용할 수 있다. 동시에 여러개도 가능하다.
(참고:https://www.raspberrypi.org/forums/viewtopic.php?f=44&t=31714)
``` python
#swPWM 초기화
myPwm = GPIO.PWM(18, 1000) # pin, frequency
myPwm.start(50) #dutycycle (0~100사이 값). 아두이노로 치면 analogWrite(18, 128)과 동일.

# 출력값 변경 (0~100%)
myPwm.ChangeDutyCycle(75)

# Frequency  변경 (Hz)
myPwm.ChangeFrequency(1500)

#swPWM 정지
myPwm.stop()
```

### Digital Input
``` python
pin_read = GPIO.input(18)	#True / False
```
* tip: 출력핀에 GPIO.input(outputPin) 함수를 사용할 수도 있는데, 현재 GPIO.HIGH가 출력되고 있는지, GPIO.LOW가 출력되고 있는지 알아보는 용도.

```python
# toggle button
# 12 번 핀이 GPIO.OUT으로 setup 되어있는 상태에서...
GPIO.output(12, not GPIO.input(12))
```

### Analog Input
안타깝게도 라즈베리파이는 analog input이 불가능하다. ADC(analog-digital converter)회로가 필요하다. **MCP3008** 을 사용하도록 하자. (참고: https://learn.adafruit.com/reading-a-analog-in-and-controlling-audio-volume-with-the-raspberry-pi/overview) 혹은 간이로 만들수도 있다(참고: https://www.allaboutcircuits.com/projects/building-raspberry-pi-controllers-part-5-reading-analog-data-with-an-rpi/)

## 고급 사용법
### 내장 pull-down, pull-up 저항 사용
스위치에  pull-down, pull-up 회로를 만들어주는게 별 거아니지만 귀찮을 때가 많다. 그럴 줄 알고 라즈베리파이 내부에 풀다운/풀업 저항을 만들어 놓고 sw로 활성화 할 수 있도록 되어있다.

``` python
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_UP) # 스위치 안눌렸을 때 on, 눌렸을 때 off
#or
GPIO.setup(18, GPIO.IN, pull_up_down = GPIO.PUD_DOWN) # 스위치 안눌렸을 때 off, 눌렸을 때 on
```
### interrupt 사용
전체 코드 중 'GPIO.input(channel)'이 실행되는 그 순간에만 스위치가 눌렸는지를 알 수 있기 때문에 코드의 다른 부분이 실행되는 때에 스위치를 누르면 컴퓨터가 감지하지 못하고 넘어가버리는 일이 종종 있다. 이럴 때 사용하는게 인터럽트.
인터럽트라는게 별게 아니고 별도의 쓰레드에서 스위치가 눌렸는지만 아주 짧은 주기로 계속 보고있다가 스위치가 눌리면 메인 스레드로 이를 알려주어 callback 함수가 동작하도록 하는 것. GUI sw 개발할 때의 event-driven 과 같은 것이라고 보면 된다.

RPi.GPIO에서는 인터럽트 구현을 위해 GPIO.wait_for_edge(channel, edge_type) 함수와 GPIO.add_event_detect(channel, edge_type), GPIO.event_detected(channel) 함수가 준비되어있다.

**GPIO.RISING, GPIO.FALLING, GPIO.BOTH** 를 감지할 수 있다.

대표적인 사용법:
```python
def my_callback(channel):
    print('Edge detected on channel %s'%channel)

GPIO.add_event_detect(channel, GPIO.RISING, callback=my_callback)  # add rising edge detection on a channel
...the rest of your program...
```

```python
# gpio-interrupt-test.py
# GPIO12에 입력이 들어오면 문장을 출력한다.

# 라이브러리 불러오기
import RPi.GPIO as GPIO
import time

# 스위치 눌렸을 때 콜백함수
def switchPressed(channel):
    print('channel %s pressed!!'%channel)

# GPIO setup
GPIO.setmode(GPIO.BCM)
GPIO.setup(12, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
# interrupt 선언
GPIO.add_event_detect(12, GPIO.RISING, callback=switchPressed)
# 메인 쓰레드
try:
    while 1:
        print(".")
        time.sleep(0.1)
finally:
    GPIO.cleanup()
```

## 스위치  debounce
버튼을 한번 눌렀는데 두번 눌린 것으로 인식하는 현상을 '튐, bounce' 라고 한다.
![](http://www.electronics-lab.com/wp-content/uploads/2018/03/graph.jpg)
위 그림은 스위치 눌리는 순간의 전류흐름을 보여주는 것인데, 기대처럼 한번에 깔금하게 0v -> 3.3v 가 되지는 않음을 보여준다. 이 때문에 바운스 현상 발생한다.
해결책으로는...
* add a 0.1uF capacitor across your switch.
* software debouncing (기본적으로 스위치가 눌린 직후의 수 millisecond 를 무시하는 것이다.)
* a combination of both

RPi.GPIO에서 software debouncing을 활성화 하기 위ㅡ해서는,
```python
GPIO.add_event_detect(channel, GPIO.RISING, callback=my_callback, bouncetime=200)
#or
GPIO.add_event_callback(channel, my_callback, bouncetime=200)
```

## 참고
RPi.GPIO wiki: https://sourceforge.net/p/raspberry-gpio-python/wiki/BasicUsage/
https://learn.sparkfun.com/tutorials/raspberry-gpio
http://studymake.tistory.com/498
