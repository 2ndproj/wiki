# raspberry pi용 adafruit motor hat 제어
![||600](https://cdn-shop.adafruit.com/970x728/2348-01.jpg)
Raspberri pi와 i2c 제어를 통해 연결되어 다수의 dc모터, 서보를 조작할 수 있도록 해준다.
여기에서는 Adafruit에서 제공되는 라이브러리를 사용해 python과 scratch로 모터제어 해보자.

* 4개의 DC motor 연결가능. 256단계 speed 제어.
* 2개의 Stepper motor 연결가능. (unipolar or bipolar) with single coil, double coil, interleaved or micro-stepping.
* 4 H-Bridges: TB6612 chipset provides 1.2A per bridge with thermal shutdown protection, internal kickback protection diodes. Can run motors on 4.5VDC to 13.5VDC.
* 5~12VDC 외부전원
* 최대 32층으로 쌓아 최대 128개의 dc 모터를 제어할 수 있다.
* 각 모터당 공급가능한 전류량은 1.2A, 순간최대 3A.

제품소개페이지 참고: https://www.adafruit.com/product/2348

## rpi에 연결
rpi의 소켓에 잘 꽂기만 하면 i2c 와 파워 모두 배선완  된 것이다.
모터에 공급할 외부 전원만 연결하면 된다. (5~12V)
나는 휴대용 usb 배터리에 연결했다. 초록색 불이 들어온다.
![||600](https://cl.ly/29612d93f087/20180930_094237.jpg)

## i2c 활성화하기
무엇보다 먼저, 라즈베리가 i2c 통신을 사용하도록 설정해 주어야 한다.
1. [시작] > [기본설정] >  [Raspberry Pi Configuration]
![||600](https://cl.ly/4bc079d68421/Image%202018-09-30%20at%2010.04.00%20AM.png)

2. [interfaces] > I2C 항목에 Enable  체크
![||600](https://cl.ly/ee158a73f70a/Image%202018-09-30%20at%2010.05.03%20AM.png)

3. I2C 유틸리티를 설치한다. (사실 대부분 기본 설치되어있다.)
```bash
$ sudo apt-get install python-smbus i2c-tools
```
4. rpi에 연결된 i2c 디바이스를 검색해보자.
``` bash
$ sudo i2cdetect -y 1
```
![||600](https://cl.ly/7ecda566a681/Image%202018-09-30%20at%2010.30.28%20AM.png)
위 나의 경우를 보면 두개의 i2c 디바이스가 address 0x60(motor HAT)과 0x70(아마도 라즈베리 내부적으로 사용중...)에서 발견되었다.

** 구형 라즈베리(pi2,3 이전 아주 초기형)의 경우 '-y 1'옵션 대신 '-y 0'옵션을 사용한다. **

## Adafruit motor HAT 라이브러리 설치하기
참고: https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/installing-software

1. github repository(https://github.com/adafruit/Adafruit-Motor-HAT-Python-Library)에서 소스를 다운로드해 라즈베리의 '/home/pi'위치에 압축을 푼다.
![||600](https://cl.ly/b67b501b289a/Image%202018-10-01%20at%208.20.31%20AM.png)

2. terminal을 열고 방금 압축을 푼 디렉토리로 이동한 후 `setup.py`를 실행시킨다.
```bash
$ cd Adafruit-Motor-HAT-Python-Library-master
~/ Adafruit-Motor-HAT-Python-Library-master $ sudo python setup.py install
```
python3를 사용한다면 `python3 setup.py`...

3. test
설치가 잘 되었는지 DCTest.py 예제를 실행시켜보자.
motorHAT의 M3 터미널에 DCmotor를 연결한 후 예제 실행
![||600](https://cl.ly/a5bdc9645e3a/Image%202018-10-01%20at%209.16.03%20AM.png)
```bash
$ cd examples
$ python DCTest.py
OR
$ python3 DCTest.py
```
잘 된다.

## DC motor 제어방법
1. 라이브러리 임포트

 ```python
from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor
import atexit
```

2. motorHat 오브젝트 생성 (i2c address 확인)
```python
mh = Adafruit_MotorHAT(addr=0x60)
```
3. 프로그램 마칠 때 DCmotor 멈추기<br>
파이썬 코드가 끝나거나, 심지어 리눅서 커널이 먹통이 되도 DCMotor는 자동으로 멈추지 않는다. 그러므로 atexit 모듈을 사용해 프로그램 종료시 모터 멈추도록 하자.
(atexit 참고: https://docs.python.org/ko/3/library/atexit.html)

```python
# recommended for auto-disabling motors on shutdown!
def turnOffMotors():
  # adafruit motor hat에 dc 모터 4개 연결 가능.
	mh.getMotor(1).run(Adafruit_MotorHAT.RELEASE)
	mh.getMotor(2).run(Adafruit_MotorHAT.RELEASE)
	mh.getMotor(3).run(Adafruit_MotorHAT.RELEASE)
	mh.getMotor(4).run(Adafruit_MotorHAT.RELEASE)

atexit.register(turnOffMotors)
```

4. DC motor 오브젝트 가져오  
M1, M2, M3, M4 터미널에 각각1개 씩, 4개의 dc모터 연결 가능하다.
``` python
myMotor = mh.getMotor(3)
```
5. 속도 세팅 (0~255)<br>
모터가 운행중 속도 세팅 변경하면 바로 적용된다.
```python
myMotor.setSpeed(150)
```

6. 모터 작동/정지 <br>
`run(direction)` 명령어를 사용. 방향은 3가지 중 선택<br>

|direction|뜻|
|---|---|
|Adafruit_MotorHAT.FORWARD | DC motor spins forward|
|Adafruit_MotorHAT.BACKWARD | DC motor spins forward |
|Adafruit_MotorHAT.RELEASE | DC motor is 'off', not spinning but will also not hold its place.|

 ```python
import time
print "Forward! "
myMotor.run(Adafruit_MotorHAT.FORWARD)

print "\tSpeed up..."
for i in range(255):
	myMotor.setSpeed(i)
	time.sleep(0.01)

print "\tSlow down..."
for i in reversed(range(255)):
	myMotor.setSpeed(i)
	time.sleep(0.01)

print "Backward! "
myMotor.run(Adafruit_MotorHAT.BACKWARD)

print "\tSpeed up..."
for i in range(255):
	myMotor.setSpeed(i)
	time.sleep(0.01)

print "\tSlow down..."
for i in reversed(range(255)):
	myMotor.setSpeed(i)
	time.sleep(0.01)
```

## Stepper motor 제어방법
Adafruit Motor HAT는 2개까지 Unipolar 및 Bipolar Stepper Moter를 연결해 제어할 수 있다. Unipolar와 Bipolar는 전선 연결방법만 조금 다를 뿐 (전선 갯수가 다르므로...) 제어방법은 동일하다.
참고: https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/using-stepper-motors

1. 전선작업

 * Unipolar: <br> 전선이 5개, 혹은 6개 나와있을 텐데, 5개라면 그 중 하나가, 6개라면 2개가 GND이다. 나머지 4는 어디서 나오는지 잘 봐서 같은데에서 나오는 것 끼리(같은 코일) 2개씩 짝지어 M1과 M2, 혹은 M3와 M4 터미널에 연결한다. 스텝모터의 데이터시트를 확인하면 어떤 전선끼리 짝인지 더 잘 알 수 있다.

 * BIpolar: <br> 전선이 4개 나와있을 텐데, GND를 비워둔 채, 2개씩 짝지어 M1과 M2, 혹은 M3와 M4 터미널에 연결한다. 스텝모터의 데이터시트를 확인하면 어떤 전선끼리 짝인지 더 잘 알 수 있다.

 ![||600](https://cl.ly/ceed43cf071d/Image%202018-10-02%20at%206.16.22%20PM.png)

2. 모듈 임포트

 ```python
# StepperTest.py
  from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

 ```
3. motorHat 오브젝트 생성 (i2c address 확인)
```python
mh = Adafruit_MotorHAT(addr=0x60)
```

4. 스텝모터 오브젝트 가져오기 <br>
`getStepper(스테퍼모터의 스텝수, 스텝모터가 연결된 포트)`로 스텝퍼 오브젝트를 가져온다. M1,M2 터미널로 연결되는 곳이 port1, M3,M4로 연결되는 터미널이 port2이다.<br>
```python
myStepper = mh.getStepper(200, 1)       # 200 steps/rev, motor port #1
```

5. 1 step 움직이기 <br>
`oneStep(방향,stepstyle)`함수로 1스텝씩 움직인다.
 ```python
myStepper.oneStep(Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.SINGLE)
```
방향은 `Adafruit_MotorHAT.FORWARD` or `Adafruit_MotorHAT.BACKWARD`

 stepstyle 은 4가지 방식이 있다.
 스텝스타일 참고자료: http://www.makewith.co/page/community/post/487

|stepstyle|설명|
|---|---|
|Adafruit_MotorHAT.SINGLE| 가장 기본이 되는 한 단계|
|Adafruit_MotorHAT.DOUBLE| 풀스텝. 싱글스텝과 스텝 간격은 같지만 토크가 크다. |
|Adafruit_MotorHAT.INTERLEAVE| 싱글과 더블 스텝을 교차로 진행. 코일에 전류를 순차적으로 흘려 싱글/더블 스텝의1/2보폭으로 더 정밀하고 토크도 더 큼.|
|Adafruit_MotorHAT.MICROSTEP| 한 스텝을 만드는데 관여하는 2개의 코일(앞,뒤)에 전류량을 순차적으로 증감시켜 미세조정함. 콘트롤러마다 분해능이 다른데, Adafruit motor HAT은 1/8 스텝까지 분해 가능. 즉 1.8°/step의 모터라면 0.225°까지 미세조정 가능. (매우 정밀하지만 토크는 약함)|

6. 여러 스텝 한번에 움직이기
먼저 `setSpeed(rpm)`으로 움직이는 속도를 지정한 후,
`step(스텝수, 방향, stepstyle)`로 움직임. raspberry 는 Arduino 만틈 delay가 정밀하지 않으므로 속도는완전히 정확하지는 않을 수 있다.

 ```Python
  myStepper.setSpeed(30) #rpm

  while (True):
  	print("Single coil steps")
  	myStepper.step(100, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.SINGLE)
  	myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.SINGLE)
  	print("Double coil steps")
  	myStepper.step(100, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.DOUBLE)
  	myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.DOUBLE)
  	print("Interleaved coil steps")
  	myStepper.step(100, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.INTERLEAVE)
  	myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.INTERLEAVE)
  	print("Microsteps")
  	myStepper.step(100, Adafruit_MotorHAT.FORWARD, Adafruit_MotorHAT.MICROSTEP)
  	myStepper.step(100, Adafruit_MotorHAT.BACKWARD, Adafruit_MotorHAT.MICROSTEP)
```
7. `step()`함수로 스텝모터가 움직이는 동안엔 파이선 코드 진행이 중지(blocking)되는데, 2개의 스텝모터가 동시에 작동하도록 하기 위해서는 쓰레드를 사용해야 한다. 예제에 포함된 `DualStepperTest.py`를 참고하자.
참고: https://learn.adafruit.com/adafruit-dc-and-stepper-motor-hat-for-raspberry-pi/using-stepper-motors

  ```Python
  def stepper_worker(stepper, numsteps, direction, style):
      #print("Steppin!")
      stepper.step(numsteps, direction, style)
      #print("Done")
  # 1번스테퍼 작동
  st1 = threading.Thread(target=stepper_worker, args=(myStepper1, numsteps, direction, stepping_style))
  st1.start()

  # 2번 스테퍼 작동
  st2 = threading.Thread(target=stepper_worker, args=(myStepper2, numsteps, direction, stepping_style))
  st2.start()
  ```
스테퍼모터가 작동중인지 `st1.isAlive()` or `st2.isAlive()` 를 사용해 알아볼 수 있다. `True`는 여전히 작동중임을, `False`는 쓰레드가 끝났음을 의미한다.
