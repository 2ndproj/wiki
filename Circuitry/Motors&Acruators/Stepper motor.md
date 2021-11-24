# Stepper motor
## step motor - NEMA17
현재 가지고 있는 OUKEDA 17HS4401 stepper motor 를  사용한다.

Bipolar, 2상, size 42x42x40, shaft ø5, step angle 1.8˚
![](https://i.imgur.com/oiGJjoy.gif)

## Stepper motor  알아보기
참고: https://learn.adafruit.com/all-about-stepper-motors

![](https://i.imgur.com/bezY82N.jpg)
여려개의 코일을 순차적으로 여자시킴으로써 (활성화 시킴으로써) 영구자석으로 만들어진 회전자가 특정한 각도만큼 돌아가도록 섬세하게 제어할 수 있는 모터.
CNC 머신 등 정교한 제어가 필요한 경우 사용한다. 
일반 DC모터의 경우 일정정도 가속 된 이후에 최대 토크가 나오는 반면 스텝모터는 구동 시작할 때부터 토크가 강하다는 점도 강점.

스텝모터의 내부구조는 BLDC 모터와 매우 유사하지만, 결정적인 차이는 위 그림에서 볼 수 있는 톱니바퀴이다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/JrunkRqQ/4b873407-4a83-412f-bbda-7a3a7f601086.jpg?v=28d6752386875dc37c4dd9ee457efc68)
재미있게도 코일의 각 극과 회전자의 톱니가 반칸 어긋나게 만들어져 있어, 1번 코일의 톱니가 안과 밖이 정렬되면 그 바로 옆 2번 코일은 톱니가 정렬되지 않는다. 이 때 2번 코일을 여자시켜주면 반칸 어긋나있던 톱니가 정렬되면서 1step  회전하게 된다.

### 상 / phase
몇개(or 쌍)의 코일이 있는지를 '~상 / phase' 라 한다. (모터가 가질 수 있는 상태의 가짓수)
![](https://i.imgur.com/X7osRbT.jpg)

### 크기
참고: https://www.zikodrive.com/ufaqs/nema-motor-frame-sizes-mean/ 

정면의 크기에 따라 NEMA 17~ NEMA 57 등으로 커지고, 일반적으로 정면 크기가  커질 수도록 모터 파워도 커진다. 
NEMA17 이 데스크턉 3d printer에서 사용하는 크기. 같은 NEMA 17 모터라도 최대 토크등 다른 프로퍼티는 당연히 모델마다 다 다르다.

### 스텝수 / Resolution
한 바퀴를 몇 스텝에 나누어 진행 할 수 있는지 (일반적으로 24/ 48/ 200 step /revolution)  또는 역으로 한 스텝이 몇도(˚) 인지를 나타낸다.( 200 step/rev. == 1.8˚)

### unipolar / bipolar
하나의 코일의 N/S 극성이 바뀔 수 있는지에 따라 'unipolar / bipolar'라고 한다.
참고: https://learn.adafruit.com/all-about-stepper-motors/types-of-steppers#unipolar-vs-bipolar-663567-15 

#### Unipolar:
![](https://p195.p4.n0.cdn.getcloudapp.com/items/nOu5dx0O/ec2a3e02-9ebd-447a-aa8a-90af9e475194.jpg?v=edeb4d13d0af3649292771080b95a206)
unipolar 모터는 각 코일에 순서대로 전류를 보내기만 하면 되므로 제어가 비교적 단순하다.
전선이 5개라면 아마도 4phase를 가진 모터일 것이다. 1개가 GND이다. 나머지 4개는 데이터시트를 잘 보고 순서에 따라 pulse를 주면 된다. 물론 MCU와 바로 연결해 신호레벨 pulse를 주면 힘이 부족할테니 트랜지스터 등을 사용해 전류가 충분히 공급되도록 한다.
전선이 6개라면 아마도 2쌍의 코일이 2-phase를 가진 unipolar일 가능성이 높으며, 데이터시트를 잘 보고 한쌍의 코일에 동시에 pulse를 준다. ( 고급: step style에 따라 제어방법이 다양해질 수 있다.)

#### Bipolar:
![](https://p195.p4.n0.cdn.getcloudapp.com/items/5zu9ZExe/aaffee37-19db-4c21-89c9-04ecbfa8d204.jpg?v=165c387fc64e4863bb75feea87ca31f8)
코일에 전류 방향이 계속 바뀌어야 하기 때문에 제어가 조금 까다로와진다. H-Bridge를 만들어 쓰거나 stepper motor driver를 사용한다.

### step style
stepstyle 은 4가지 방식이 있다.
 스텝스타일 참고자료: http://www.makewith.co/page/community/post/487

|stepstyle|설명|
|---|---|
|Adafruit_MotorHAT.SINGLE| 가장 기본이 되는 한 단계|
|Adafruit_MotorHAT.DOUBLE| 풀스텝이라고도 함. 두개의 코일을 동시에 작동해 싱글스텝과 스텝 간격은 같지만 토크가 크다. |
|Adafruit_MotorHAT.INTERLEAVE| 싱글과 더블 스텝을 교차로 진행. 코일에 전류를 순차적으로 흘려 싱글/더블 스텝의1/2보폭으로 더 정밀하고 토크도 더 큼.|
|Adafruit_MotorHAT.MICROSTEP| 한 스텝을 만드는데 관여하는 2개의 코일(앞,뒤)에 전류량을 순차적으로 증감시켜 미세조정함. 콘트롤러마다 분해능이 다른데, Adafruit motor HAT은 1/8 스텝까지 분해 가능. 즉 1.8°/step의 모터라면 0.225°까지 미세조정 가능. (매우 정밀하지만 토크는 약함)|

### L293D shield
참고: https://www.ti.com/document-viewer/L293D/datasheet/abstract#SLRS0089570

참고: https://lastminuteengineers.com/l293d-motor-driver-shield-arduino-tutorial/

'L293D'는 h-bridge 2개를 IC로 만들어놓은 것이다. 
DC모터의 속도 및 회전방향 제어/ unipolar, bipolar 스텝퍼모터 제어에 사용할 수 있다. 
![](https://i.imgur.com/BSHaMSU.png)

*외부 전원 사용시 점퍼를 끊어주어야 하는 점 유의하자.*

* 스텝모터 데이터시트에서, 
![](https://p195.p4.n0.cdn.getcloudapp.com/items/mXuPdLGB/a451c72b-50e2-437d-80c2-6834a8375902.jpg?v=bd96b54143269702fa34ec8793b808e4)
순서대로 검-녹-빨-파 순서로 M1,M2에 연결한다. 주의할 점은 실드의 터미널 배치가 (A)(A-)(B)(B-) 가 아닌, (A)(A-)(B-)(B) 라는 점이다. 
bipolar 모터이므로 GND는 연결하지 않는다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/rRuWy245/5fea5acc-df79-43e0-a98c-00ddace0dccd.jpg?v=afbb3a98c6c319a82656e155ad6f00ff)

*NOTE: 왜인지 모르겠으나 외부전원 12V 연결하면 작동하지 않는다. 아두이노 내부전원 5V로도 작동하지 않는다. 외부전원 5V에서 작동하지만 모터 힘이 약하고, 외부 9V에서 가장 잘 작동한다.*

Adafruit Motor Shield library ver1. 라이브러리를 사용해 제어한다.
참고: https://github.com/adafruit/Adafruit-Motor-Shield-library
![](https://i.imgur.com/8F2WyTy.png)

```cpp
/* Adafruit-Motor-Shield-library_Stepper motor sample.ino */

#include <AFMotor.h>

// Number of steps per output rotation
// Change this as per your motor's specification
const int stepsPerRevolution = 200;

// connect motor to port #1 (M1 and M2)
AF_Stepper motor(stepsPerRevolution, 1);

void setup() {
  Serial.begin(9600);
  Serial.println("Stepper test!");

  motor.setSpeed(10);  // 10 rpm   
}

void loop() {
  Serial.println("Single coil steps");
  motor.step(100, FORWARD, SINGLE); 
  motor.step(100, BACKWARD, SINGLE); 

  Serial.println("Double coil steps");
  motor.step(100, FORWARD, DOUBLE); 
  motor.step(100, BACKWARD, DOUBLE);

  Serial.println("Interleave coil steps");
  motor.step(100, FORWARD, INTERLEAVE); 
  motor.step(100, BACKWARD, INTERLEAVE); 

  Serial.println("Micrsostep steps");
  motor.step(100, FORWARD, MICROSTEP); 
  motor.step(100, BACKWARD, MICROSTEP); 
}
```

* `AF_Stepper motor(stepsPerRevolution, 1);` 로 오브젝트 생성한 후,
* `motor.setSpeed(10);`으로 rpm 설정
* `motor.step(몇스텝, 어느방향, step style);`로 작동시킨다. 

