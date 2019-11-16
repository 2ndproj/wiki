# littleBits 만능모듈 with Attiny85
## perf bit 사용해 모듈 만들기

* 프로그램시 번거로움때문에 usb가 달려있는 digispark보드로 일단 진행. 그러나 attiny85로 더 단순하고 저렴하게 만들수도...
* 뒷면의 배선![||600](https://cl.ly/s6nK/Image%202018-06-08%20at%204.25.01%20AM.png)
* 정면에서 보았을 때 오른쪽의 헤더핀에 i2c활용할 수 있도록 핀 구성함.
* 리틀비츠 출력에 p5를 사용했다가 p4로 수정했는데, 이유는 중국산 싸구려 digispark 클론은 p5를 곧바로 사용할 수 없기 때문.(귀찮아서) 자세한 내용은 아래에 다시 기록.
* 앞면 ![||600](https://cl.ly/s7nD/Image%202018-06-08%20at%204.26.36%20AM.png)

## pin 할당
![||600](https://cl.ly/s7Zq/Image%202018-06-08%20at%204.27.51%20AM.png)
digispark p1 = 리틀비츠 아웃풋 (on/off만 가능. analog X)
digispark p4 = 리틀비츠 인풋은 아날로그 인풋가능.
우측의 p0, 5v, p2, gnd 헤더핀을 사용해 i2c통신 가능.

## 다음 도전과제
리틀비츠 출력p1에 pwm신호를 주어도 뒤따르는 리틀비츠 모듈은 아날로그값으로 인식하지 못한다. 리틀비츠 아두이노 모듈처럼 아날로그 <->pwm스위치가 달려있다면 좋겠다. 혹은 아예 아날로그 출력으로 고정.
리틀비츠 아두이노 비츠를 보면 로패스필터로 pwm을 아날로그 신호로 만들고 있다.

# 참고
[Digispark Attiny85 사용법](/Circuitry/Arduino/Attiny85/Digispark Attiny85.md)
