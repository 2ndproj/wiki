raspberry pi 용 scratch2.0에 python으로 custom block 만들기

# scratchX 용 extension 파일
참고: https://github.com/LLK/scratchx/wiki#contents
raspberry pi에 기본 탑재된 scratch2.0은 기본적으로 scratchX와 동일하다.
scratchX의 확장기능을 가져다 사용하거나 scratchx의 확장기능 개발 자료를 참고해 직접 만들수 있다.
extension은 java script로 만들며, java script로 구현 가능한 것이라면 무엇이든 - 즉 뭐든지 다 할 수 있다.

## raspberry pi용 scratch 2.0에서 extension 실행하기
1. scratch2.0을 실행한다.
![||600](https://cl.ly/75a47925120b/Image%202018-09-18%20at%204.20.29%20PM.png)

1. [file] 메뉴를 <shift> + click한다. 숨겨져있던 'experimental extension'을 선택한다.
![||600](https://cl.ly/9281eae26164/Image%202018-09-18%20at%204.24.01%20PM.png)

1. extension 파일의 위치를 정확하게 써준다. (잘못써도 경고메시지가 나오지 않는다. 그냥 조용히 안될 뿐...)
![||600](https://cl.ly/987e09df4f56/Image%202018-09-18%20at%204.26.37%20PM.png)

1. '추가블럭' 그룹아래에 확장 블록들이 생겨나있다.
![||600](https://cl.ly/7e2512393a78/Image%202018-09-18%20at%204.28.50%20PM.png)

## scratchx extension의 기본 뼈대 (boilerplate)
scratchx extension은 java script로 만들어져있다.
```js
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code. 자동으로 주기적으로 호출되어 연결상태를 나타내는 초록색 불을 켜는데 관여한다.
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'}; // status 1=> 연결 표시등 노랑색 status 2=> 녹색
                                          // msg 는 표시등에 마우스 가져다댔을 때 표시되는 메시
    };

    // Block and block menu descriptions  // 추가되는 명령어블록들이 여기서 정의됨.
    var descriptor = {
        blocks: [
        ]
    };

    // Register the extension
    ScratchExtensions.register('Sample extension', descriptor, ext);  //'Sample extension'연결상태 표시등 앞에 씌여질 확장기능의 이름이 들어감.
})({});
```
* status 에 따른 연결표시등 색깔

| Value	| Color	| Meaning |
|---|---|---|
|0	|red	|error
|1|	yellow|	not ready
|2|	green|	ready

![||600](https://cl.ly/8e807e99812f/Image%202018-09-18%20at%205.48.28%20PM.png)

## 새로운 명령어 블록 추가하기
1. js 소스 아래쪽의 `var descriptor ={ blocks: [  ]};` 에다가
 [`Block type`, `block name`, `function name`, `param1 default value`, `param2 default value`...], [...] 하는 식으로 형식을 맞추어 블럭을 정의한다.

2. 블럭에서 호출하는 콜백함수을 정의해주면 된다.

3. 예를 들어, 인터넷에서 날씨정보를 가져와 표시해주는 확장블럭을 추가해보자.
```js
(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.get_temp = function(location, callback) {
        // Make an AJAX call to the Open Weather Maps API
        $.ajax({
              url: 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=imperial',
              dataType: 'jsonp',
              success: function( weather_data ) {
                  // Got the data - parse it and return the temperature
                  temperature = weather_data['main']['temp'];
                  callback(temperature);
              }
        });
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('Weather extension', descriptor, ext);
})({});
```
 * ['R', 'current temperature in city %s', 'get_temp', 'Boston, MA'] 로 정의된 블럭정의를 추가한다.
  * 이 때, 'R'은 별도 쓰레드로 동작해 결과값을 리턴하는 블록(타원형 블록)이라는 뜻.

| Op Code  |	Meaning|
  | -------- | --------- |
  |' ' (space) |	Synchronous command |
  |'w'|Asynchronous command (메인쓰레드와 별도로 명령 수행)
  |'r'|Synchronous reporter (이 명령이 실행되는 동안 스크래치 블럭진행이 중지됨)
  |'R'|	Asynchronous reporter (메인 쓰레드와 별도로 명령 수행. Rest로 데이터 가져온다던지 하는 경우)
  |'h'|	Hat block (synchronous, returns Boolean, true = run stack) ('녹색깃발이 클릭되었을 때'와 같이 쓰레드를 새로 출발시킨다)
  |'b'|	Boolean reporter (like 'r' but returns only true or false)


   * 값을 리턴할 때는 `callback();`을 사용해도 되지만 `return();`을 사용할 수도 있다.
   *  '%s'는 문자열, '%n'는 숫자가 옴을 뜻함. '%m'은 드롭다운메뉴에서 선택 (아래 4번항목 예시 참고).

4. descriptor에는 선택가능한 드롭다운메뉴 extension에 대한 도움말 URL, DisplayName등을 지정할 수 있다.
예를 보면...
```js
var descriptor = {
    blocks: [
        ['w', 'turn motor on for %n secs',             'motorOnFor', 1],
        [' ', 'turn motor on',                         'allMotorsOn'],
        [' ', 'turn motor off',                        'allMotorsOff'],
        [' ', 'set motor power %n',                    'startMotorPower', 100],
        [' ', 'set motor direction %m.motorDirection', 'setMotorDirection', 'this way'],
        ['h', 'when distance %m.lessMore %n',          'whenDistance', '<', 20],
        ['h', 'when tilt %m.eNe %n',                   'whenTilt', '=', 1],
        ['r', 'distance',                              'getDistance'],
        ['r', 'tilt',                                  'getTilt']
    ],
    menus: {
        motorDirection: ['this way', 'that way', 'reverse'],
        lessMore: ['<', '>'],
        eNe: ['=','not =']
    },
    url: 'http://info.scratch.mit.edu/WeDo',
    displayName: 'LEGO WeDo 1.0'
};
```

** scratchx에 대해 더 알고싶다면 (raspberry pi나 python 사용하지 않고 하드웨어 연결한다던지...) scratchx 개발자 문서를 참고: https://github.com/LLK/scratchx/wiki#contents


# s2_pi 사용해 python 서버와 scratchx 연결하기
java script보다는 python이 조금 더 편하고 익숙하기도 하고, 무엇보다 GPIO를 직접제어하려면 현재로써는 java script 만으로는 방법이 마땅치 않기 때문에, scratch2.0의 자바스크립트 확장기능과 함께 python으로 만든 별도의 코드(웹소켓 서버)를 사용해서 스크래치에서 GPIO 제어가 가능하다.

Scratch 팀에서 공식적으로 문서화하지는 않았지만 내부에 websocket 클라이언트가 기본 탑재되어있으며, 우리는 이를 사용해 다른 어플리케이션(내가 파이썬으로만든...)과 통신토록 한다. 즉, 우리가 만들 것은 python에서 제공하는 `SimpleWebSocketServer`를 상속하고 `pigpio` 라이브러리를 사용해 gpio를 컨트롤 하거나 기타 카메라를 사용한다거나 영상처리 등등...하는 python 코드이다. `s2pi` 프로젝트에서 대부분의 것들이 다 구현 해 놓았기 때문에 's2pi'를 살펴보고 필요한 것을 더 추가하는 것으로 진행한다.

s2pi project 개발문서 참고: https://mryslab.github.io/s2-pi/
pigpio 라이브러리 개발문서 참고: http://abyz.me.uk/rpi/pigpio/python.html    
Websocket wikipedia 참고: https://en.wikipedia.org/wiki/WebSocket

## s2pi 테스트해보기
### s2pi 설치
1. s2pi 코드는 이곳:https://github.com/MrYsLab/s2-pi 에서 받을 수 있다. 라즈베리파이의 기본 디렉토리 '/home/pi'에다가 압축풀어놓는다.
2. '/home/pi/s2-pi-master'로 이동해 `setup.py install`을 실행한다.
```bash
pi@raspberrypi:~ $ cd s2-pi-master
pi@raspberrypi:~/s2-pi-master $ sudo python3 setup.py install
```

### s2pi 실행& extension로딩
1. 터미널에서 `s2pi`를 입력한다.
서버프로그램의 콘솔화면과 함께 scratch2.0이 자동으로 시작된다.
![||600](https://mryslab.github.io/s2-pi/images/start.png)

1. [file] 메뉴를 <shift> + click한다. 숨겨져있던 'experimental extension'을 선택한다.
![||600](https://cl.ly/9281eae26164/Image%202018-09-18%20at%204.24.01%20PM.png)

1. extension 파일의 위치 (/home/pi/s2_pi.js)를 정확하게 써준다. (잘못써도 경고메시지가 나오지 않는다. 그냥 조용히 안될 뿐...)
![||600](https://cl.ly/987e09df4f56/Image%202018-09-18%20at%204.26.37%20PM.png)

1. '추가블럭' 그룹아래에 확장 블록들이 생겨나있다.
![||600](https://cl.ly/7e2512393a78/Image%202018-09-18%20at%204.28.50%20PM.png)

### s2pi 사용
scratch2.0에서 raspberry pi의 GPIO를 컨트롤 하거나 입력값을 읽어올 수 있다.

## s2pi 코드 분석
* 스크래치에는  websocket이 기본 내장되어있으며, js extension에서 `window.socket`을 통해 접근할 수 있다. websocket이라는 프로토콜이 event driven의 비동기적 통신으므로, 아래 3개 콜백함수를 써주어야 한다.

|함수명|이벤트|
|---|---|
|window.socket.onopen| 웹소켓이 맨 처음 연결될 때|
|window.socket.onmessage| (서버로부터) 메시지를 받았을 때|
|window.socket.onclose| 웹소켓을 닫을 때|

* python에서 웹소켓을 사용하기 위해서는 `WebSocket` class를 상속해 구현하며, 아래 3개 콜백함수가 정의되어야 한다.

|함수명|이벤트|
|---|---|
|handleConnected| 맨 처음 연결될 때|
|handleMessage| (클라이언트로부터) 받은 메시지가 있을 때|
|handleClose|웹 소켓을 닫을 때|

* js extension에서 메시지를 보낼 때에는 window.socket.send(msg) 함수를, python 서버에서 보낼 때에는 WebSocket.sendMessage(msg) 를 사용한다.

### s2_pi.py & s2_pi.js 소 스
``` python
#!/usr/bin/env python3

"""
s2_pi.py
 Copyright (c) 2016, 2017 Alan Yorinks All right reserved.
 Python Banyan is free software; you can redistribute it and/or
 modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 Version 3 as published by the Free Software Foundation; either
 or (at your option) any later version.
 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 General Public License for more details.
 You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
 along with this library; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
"""
import json
import sys
import time
import os
import pigpio
import psutil
from subprocess import call
from SimpleWebSocketServer import SimpleWebSocketServer, WebSocket


# This class inherits from WebSocket.
# It receives messages from the Scratch and reports back for any digital input
# changes.
class S2Pi(WebSocket):

    def handleMessage(self):
        # get command from Scratch2
        payload = json.loads(self.data)
        print(payload)
        client_cmd = payload['command']
        # When the user wishes to set a pin as a digital Input
        if client_cmd == 'input':
            pin = int(payload['pin'])
            self.pi.set_glitch_filter(pin, 20000)
            self.pi.set_mode(pin, pigpio.INPUT)
            self.pi.callback(pin, pigpio.EITHER_EDGE, self.input_callback)
        # when a user wishes to set the state of a digital output pin
        elif client_cmd == 'digital_write':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)
            state = payload['state']
            if state == '0':
                self.pi.write(pin, 0)
            else:
                self.pi.write(pin, 1)
        # when a user wishes to set a pwm level for a digital input pin
        elif client_cmd == 'analog_write':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)
            value = int(payload['value'])
            self.pi.set_PWM_dutycycle(pin, value)
        # when a user wishes to output a tone
        elif client_cmd == 'tone':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)

            frequency = int(payload['frequency'])
            frequency = int((1000 / frequency) * 1000)
            tone = [pigpio.pulse(1 << pin, 0, frequency),
                    pigpio.pulse(0, 1 << pin, frequency)]

            self.pi.wave_add_generic(tone)
            wid = self.pi.wave_create()

            if wid >= 0:
                self.pi.wave_send_repeat(wid)
                time.sleep(1)
                self.pi.wave_tx_stop()
                self.pi.wave_delete(wid)
        elif client_cmd == 'ready':
            pass
        else:
            print("Unknown command received", client_cmd)

    # call back from pigpio when a digital input value changed
    # send info back up to scratch
    def input_callback(self, pin, level, tick):
        payload = {'report': 'digital_input_change', 'pin': str(pin), 'level': str(level)}
        print('callback', payload)
        msg = json.dumps(payload)
        self.sendMessage(msg)

    def handleConnected(self):
        self.pi = pigpio.pi()
        print(self.address, 'connected')

    def handleClose(self):
        print(self.address, 'closed')


def run_server():
    # checking running processes.
    # if the backplane is already running, just note that and move on.
    found_pigpio = False

    for pid in psutil.pids():
        p = psutil.Process(pid)
        if p.name() == "pigpiod":
            found_pigpio = True
            print("pigpiod is running")
        else:
            continue

    if not found_pigpio:
        call(['sudo', 'pigpiod'])
        print('pigpiod has been started')

    os.system('scratch2&')
    server = SimpleWebSocketServer('', 9000, S2Pi)
    server.serveforever()


if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:  # ctrl + C 를 눌러 프로그램 종료.
        sys.exit(0)
```

```js
/**
s2_pi.js

 Copyright (c) 2016, 2017 Alan Yorinks All right reserved.
 Python Banyan is free software; you can redistribute it and/or
 modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 Version 3 as published by the Free Software Foundation; either
 or (at your option) any later version.
 This library is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 General Public License for more details.
 You should have received a copy of the GNU AFFERO GENERAL PUBLIC LICENSE
 along with this library; if not, write to the Free Software
 Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */

(function (ext) {
    var socket = null;

    var connected = false;

    // an array to hold possible digital input values for the reporter block
    var digital_inputs = new Array(32);
    var myStatus = 1; // initially yellow
    var myMsg = 'not_ready';

    ext.cnct = function (callback) {
        window.socket = new WebSocket("ws://127.0.0.1:9000");
        window.socket.onopen = function () {
            var msg = JSON.stringify({
                "command": "ready"
            });
            window.socket.send(msg);
            myStatus = 2;

            // change status light from yellow to green
            myMsg = 'ready';
            connected = true;

            // initialize the reporter buffer
            digital_inputs.fill('0');

            // give the connection time establish
            window.setTimeout(function() {
            callback();
        }, 1000);

        };

        window.socket.onmessage = function (message) {
            var msg = JSON.parse(message.data);

            // handle the only reporter message from the server
            // for changes in digital input state
            var reporter = msg['report'];
            if(reporter === 'digital_input_change') {
                var pin = msg['pin'];
                digital_inputs[parseInt(pin)] = msg['level']
            }
            console.log(message.data)
        };
        window.socket.onclose = function (e) {
            console.log("Connection closed.");
            socket = null;
            connected = false;
            myStatus = 1;
            myMsg = 'not_ready'
        };
    };

    // Cleanup function when the extension is unloaded
    ext._shutdown = function () {
        var msg = JSON.stringify({
            "command": "shutdown"
        });
        window.socket.send(msg);
    };

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function (status, msg) {
        return {status: myStatus, msg: myMsg};
    };

    // when the connect to server block is executed
    ext.input = function (pin) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'input', 'pin': pin
            });
            window.socket.send(msg);
        }
    };

    // when the digital write block is executed
    ext.digital_write = function (pin, state) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        console.log("digital write");
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'digital_write', 'pin': pin, 'state': state
            });
            console.log(msg);
            window.socket.send(msg);
        }
    };

    // when the PWM block is executed
    ext.analog_write = function (pin, value) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        console.log("analog write");
        // validate the pin number for the mode
        if (validatePin(pin)) {
            // validate value to be between 0 and 255
            if (value === 'VAL') {
                alert("PWM Value must be in the range of 0 - 255");
            }
            else {
                value = parseInt(value);
                if (value < 0 || value > 255) {
                    alert("PWM Value must be in the range of 0 - 255");
                }
                else {
                    var msg = JSON.stringify({
                        "command": 'analog_write', 'pin': pin, 'value': value
                    });
                    console.log(msg);
                    window.socket.send(msg);
                }
            }
        }
    };

    // when the play tone block is executed
    ext.play_tone = function (pin, frequency) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'tone', 'pin': pin, 'frequency': frequency
            });
            console.log(msg);
            window.socket.send(msg);
        }
    };

    // when the digital read reporter block is executed
    ext.digital_read = function (pin) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        else {
                return digital_inputs[parseInt(pin)]

        }
    };

    // general function to validate the pin value
    function validatePin(pin) {
        var rValue = true;
        if (pin === 'PIN') {
            alert("Insert a valid BCM pin number.");
            rValue = false;
        }
        else {
            var pinInt = parseInt(pin);
            if (pinInt < 0 || pinInt > 31) {
                alert("BCM pin number must be in the range of 0-31.");
                rValue = false;
            }
        }
        return rValue;
    }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name
            ["w", 'Connect to s2_pi server.', 'cnct'],
            [" ", 'Set BCM %n as an Input', 'input','PIN'],
            [" ", "Set BCM %n Output to %m.high_low", "digital_write", "PIN", "0"],
            [" ", "Set BCM PWM Out %n to %n", "analog_write", "PIN", "VAL"],
            [" ", "Tone: BCM %n HZ: %n", "play_tone", "PIN", 1000],
            ["r", "Read Digital Pin %n", "digital_read", "PIN"]

        ],
        "menus": {
            "high_low": ["0", "1"]

        },
        url: 'http://MrYsLab.github.io/s2-pi'
    };

    // Register the extension
    ScratchExtensions.register('s2_pi', descriptor, ext);
})({});

```

1. s2_pi.py 코드를 실행하면 가장먼저 run_server()가 실행된다.
앞부분은 pigpio 데몬을 실행시키는 부분 (s2pi는 pigpio라이브러리를 사용한다. 참고: http://abyz.me.uk/rpi/pigpio/python.html),
``` python
os.system('scratch2&')
server = SimpleWebSocketServer('', 9000, S2PI) # (IP 주소, Port번호, 웹소켓이 구현된 class 이름)
server.serveforever()
```
이 부분에서 스크래치를 백그라운드로 실행시키고, 웹소켓서버객체를 만듬. 웹소켓서버 만들 때 ip주소가 ''이면 기본으로 127,0,0,1 즉 localhost인 자기자신을 가리키는 것으로 이해함.

2. js 클라이언트에서도 동일한 ip와 포트번호로 소켓을 오픈해 서버에 연결을 요청해야함.
'Connect to s2_pi server' block이 바로 이 일을 하는 블록. 이 블록이 실행되면 'ext.cnct()' 함수가 불려지고, 웹소켓연결을 요청한다.
```js
ext.cnct = function () {
        window.socket = new WebSocket("ws://127.0.0.1:9000");
        ...
      }
```

3. 웹소켓 연결이 무사히 이루어지면 (handshake) 파이썬 서버에서는 `handleConnected`가, js client에서는 `window.socket.onopen`가 실행된다. '연결되었습니다' 메시지를 표시해주는 따위...

4. js extension에서 메시지를 보낼 때에는 `window.socket.send(msg)` 함수를,
python 서버에서 보낼 때에는 `WebSocket.sendMessage(msg)` 를 사용함.

5. 상대로부터 메시지를 받으면 자동으로 `handleMessage(self)`(파이썬 서버 측) 혹은 `window.socket.onmessage()`(js 측)이 실행되어 적당한 동작을 취하도록 한다.

1. 이 때 주고받는 메시지는 쓰기편하게 JSON 을 사용하다. js의 해시와 python의 딕셔너리 데이터형은 json과 형태가 같으므로 쉽게 바꿀 수 있어 매우 편하다.
 * js에서 hash형 데이터를 json 문자열로 바꿀 때에는   
```js
var msg = JSON.stringify({
                "command": "ready"
            });
            window.socket.send(msg);
```
 * js에서 json 문자열을 hash로 빠꿀 때에는
```js
var msg = JSON.parse(message.data);
       var reporter = msg['report'];
```
 * python에서 dictionary형 데이터를 json문자열로 바꿀 때에는
```python
msg = json.dumps(payload)
self.sendMessage(msg)
```

 * python에서 json 문자열을 다시 dictionary로 바꿀 때에는
 ```python
 payload = json.loads(self.data)
 ```

# s2_pi 사용해 스크래치2.0으로 servo 제어
1. js 파일에 맨 아래쪽 descriptor에다가 새로운 블럭을 정의해준다.
```js
blocks:[...
        [" ", "Move Servo at BCM %n to %n degree", "moveServo", "PIN", 0],	// 실행명령, n번핀에 서보 n도로 움직이기. 기본표시값'PIN',0도
      ]
```
2. 블럭이 눌렸을 때 실행될 함수 'moveServo()'작성.
```js
ext.moveServo = function (pin, degree) {
        if (connected == false) {
            alert("Server Not Connected");
        }
        // validate the pin number for the mode
        if (validatePin(pin)) {
            var msg = JSON.stringify({
                "command": 'servo', 'pin': pin, 'degree': degree
            });
            console.log(msg);
            window.socket.send(msg);
        }
    };
```
3. python 서버측에 메시지 받았을 때 동작 정의
```python
elif client_cmd == 'servo':
            pin = int(payload['pin'])
            self.pi.set_mode(pin, pigpio.OUTPUT)
            degree = int(payload['degree'])
            pulseWidth = 500 + 2000 / 180 * degree # (0도~180도 => 500~2500)

            self.pi.set_servo_pulsewidth(pin, pulseWidth)
```
pigpio 라이브러리 서버 움직이는 법 참고: http://abyz.me.uk/rpi/pigpio/python.html#set_servo_pulsewidth

4. raspberry pi 에 수정한 코드 덮어씌우기 (복사)
 * s2_pi.js 파일은 '/home/pi' 디렉토리로,
 * s2_pi.py 파일은 setup.py를 통해 설치된 게 아니므로 직접 실행시켜준다.
 ```bash
 $ python3 s2_pi.py
 ```

# Adafruit motor HAT - 스크래치2.0
s2_pi  프로젝트를 확장해 motor hat을 제어한다. <br>
![||600](https://cdn-shop.adafruit.com/970x728/2348-01.jpg)
Adafruit motor HAT 제품소개페이지 참고: https://www.adafruit.com/product/2348
## Adafruit motor HAT 과 연동해 DC motor 제어

 ![||600](https://cl.ly/ad3455f54682/Image%202018-10-02%20at%2011.51.55%20AM.png)

### i2c 활성화하기
 무엇보다 먼저, 라즈베리가 i2c 통신을 사용하도록 설정해 주어야 한다.
 1. [시작] > [기본설정] >  [Raspberry Pi Configuration]
 ![||600](https://cl.ly/4bc079d68421/Image%202018-09-30%20at%2010.04.00%20AM.png)

 2. [interfaces] > I2C 항목에 Enable  체크
 ![||600](https://cl.ly/ee158a73f70a/Image%202018-09-30%20at%2010.05.03%20AM.png)

 3. I2C 유틸리티를 설치한다. (사실 대부분 기본 설치되어있다.)
 ```bash
 $ sudo apt-get install python-smbus i2c-tools
 ```

### s2_pi.js 수정
 ```js
 // 블럭 정``
 var descriptor = {
     blocks: [
         // Block type, block name, function name
         // 생략...
         [" ", "Run DCmotor %m.DC at speed %n","run_DC",1,"-255~255"]
     ],
     "menus": {
         // 생략...
         "DC": [1,2,3,4]

     },
 };

 // DC 모터 구동 블럭
 ext.run_DC = function (motorNum, speed){
   if (connected == false){
     alert("Server Not Connected");
   }
   var msg = JSON.stringify({
     "command":'run_DC', 'motorNum' : motorNum, 'speed' : speed
   });
   console.log(msg);
   window.socket.send(msg);
 };

 ```
### s2_pi.py 수정
 ```Python
 Class S2Pi(WebSocket):
   # 연결버튼을 눌러 웹서버가 연결될 때 motorhat 오브젝트 생성
   def handleConnected(self):
       self.pi = pigpio.pi()
       print(self.address, 'connected')
       # motor hat
       self.mh = Adafruit_MotorHAT(addr=0x60)
       print("motorHAT connected")

   # 클라이언트로부터 메시지 받아을 때
   def handleMessage(self):
       # get command from Scratch2
       payload = json.loads(self.data)
       print(payload)
       client_cmd = payload['command']
       # if....생략

       # 받은 명령이 DC 모터 제어 명령
       elif client_cmd == 'run_DC':
           motorNum = int(payload['motorNum'])
           speed = payload['speed']

           dc = self.mh.getMotor(motorNum)

           # 스피드 >0이면 정방향, < 0 이면 역방향 회전. 0은 정지.
           if (speed > 0):
               dc.setSpeed(speed)
               dc.run(Adafruit_MotorHAT.FORWARD)
           elif (speed < 0):
               dc.setSpeed(abs(speed))
               dc.run(Adafruit_MotorHAT.BACKWARD)
           else:
               dc.run(Adafruit_MotorHAT.RELEASE)
 ```

## Scratch2.0으로 Stepper motor 제어
 ![||600](https://cl.ly/39023bf0cb85/Image%202018-10-03%20at%2012.15.26%20PM.png)

### s2_pi.js
 ```js
 // Block and block menu descriptions
     var descriptor = {
         blocks: [
             // Block type, block name, function name
             ["w", 'Connect to s2_pi server.', 'cnct'],
             ...
             [" ", "Set Stepper port: %m.step_motor_port steps/turn: %n step style: %m.stepstyle speed: %n", "set_stepper", 1, 200, "INTERLEAVE", "RPM"], // 먼저 스텝모터 특성 설정 후
             [" ", "Run Stepper port: %m.step_motor_port direction: %m.direction steps: %n", "run_stepper", 1, "FORWARD", 0],							 // 스텝모터 작동

         ],
         "menus": {
             ...
             "step_motor_port": [1,2],
             "stepstyle": ["SINGLE","DOUBLE","INTERLEAVE","MICROSTEP"],
             "direction" : ["FORWARD", "BACKWARD"]

         },
         url: 'http://doguin.com'
     };

 // step 모터 세팅 블록
     ext.set_stepper = function (portNum, steps_per_turn, stepstyle, rpm){
     	if (connected == false){
     		alert("Server Not Connected");
     	}
     	var msg = JSON.stringify({
     		"command":'set_stepper', 'portNum' : portNum, 'steps_per_turn': steps_per_turn, 'stepstyle': stepstyle, 'rpm' : rpm
     	});
     	console.log(msg);
     	window.socket.send(msg);
     };

 // step 모터 작동 블록
     ext.run_stepper = function (portNum, direction, steps){
     	if (connected == false){
     		alert("Server Not Connected");
     	}
     	var msg = JSON.stringify({
     		"command":'run_stepper', 'portNum' : portNum, 'direction': direction, 'steps': steps,
     	});
     	console.log(msg);
     	window.socket.send(msg);
     };    
 ```

### s2_pi.py

 ```python
 # adafruit motor hat
 from Adafruit_MotorHAT import Adafruit_MotorHAT, Adafruit_DCMotor, Adafruit_StepperMotor

 class S2Pi(Websocket):
 def handleConnected(self):
       self.pi = pigpio.pi()
       print(self.address, 'connected')
       # motor hat
       self.mh = Adafruit_MotorHAT(addr=0x60)
       print("motorHAT connected")
       # 2개의 stepper 모터의 설정정보를 멤버변수로 기억해둠
       self.steps_per_turn = [None, None]
       self.stepper =[ None, None]
       self.stepstyle = [None, None]
       self.rpm = [None, None]

 def handleMessage(self):
       ...
       # Stepper 제어명령
       elif client_cmd == 'set_stepper':
           portNum = int(payload['portNum'])
           steps_per_turn = int(payload['steps_per_turn'])
           styleList =  ['SINGLE', 'DOUBLE', 'INTERLEAVE', 'MICROSTEP']
           stepStyleList = [Adafruit_MotorHAT.SINGLE, Adafruit_MotorHAT.DOUBLE, Adafruit_MotorHAT.INTERLEAVE, Adafruit_MotorHAT.MICROSTEP]
           stepstyle = stepStyleList[styleList.index(payload['stepstyle'])]
           rpm = int(payload['rpm'])

           self.steps_per_turn[portNum-1] = steps_per_turn
           # self.stepper[portNum-1] = self.mh.getStepper(steps_per_turn, portNum)
           self.stepstyle[portNum-1] = stepstyle
           self.rpm[portNum-1] = rpm

       elif client_cmd == 'run_stepper':
           portNum = int(payload['portNum'])
           direction = Adafruit_MotorHAT.BACKWARD if (payload['direction'] == 'BACKWARD' ) else Adafruit_MotorHAT.FORWARD
           print("direction: %s" %direction)
           steps = int(payload['steps'])

           stepper = self.mh.getStepper(self.steps_per_turn[portNum -1],portNum)
           stepper.setSpeed(self.rpm[portNum -1])
           stepper.step(steps, direction, self.stepstyle[portNum - 1])
 ```
# MCP3008 ADconverter - Scratch2.0 사용해 아날로그 입력받기
'Raspberry pi의 GPIO 에서 Analog input 받기 (A/D converter MCP3008)' 문서 참고

## spi 배선 연결하기. (하드웨어 SPI 사용.)
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

## analog_input 코드
오리지날 s2_pi 코드 중 digital_input을 다루는 부분을 잘 뜯어보면, js측에서 디지털 인풋 값을 요청하면 그 때마다 python 서버측에서 핀 값을 읽어 보내는 것이 아니라, 어떤 핀이 입력핀으로 설정 되면, 그 때부터 그 핀에 입력값에 변화가 감지될 때마다 pthon에서 메시지를 보내 js측에서 버퍼에 저장해 두었다가 digital_read 블럭이 클릭되면 버퍼에서 바로 꺼내 보여주는 방식이다.
analog_input도 이같은 방식으로 구현해보자.

### s2_pi.js 수정.
1. 블록 수정
```js
//s2_pi.js
var descriptor = {
  blocks:[
    ...
    ["r", "Read Analog at MCP3008 CH:%m.mcp3008_channel", 'analog_read','channel'],
    ...
  ],
  "menus": {
    ...
    "mcp3008_channel": [0,1,2,3,4,5,6,7],
    ...
  }
}
```

2. 아날로그 값 저장버퍼 선언
```js
//s2_pi.js
// 아날로그 인풋값 저장하기 위한 버퍼
    var analog_inputs = new Array(8);
```
3. python 서버에서 아날로그값 변경 메세지 오면 버퍼에 기록
```js
//s2_pi.js
...
window.socket.onmessage = function (message) {
  ...
  // 아날로그값 변경에 대응
  else if(reporter === 'analog_input_change') {
      var channel = msg['channel'];
      analog_inputs[parseInt(channel)] = msg['level']
      ...
}
```
4. 아날로그 리드 블록 눌렸을 때 콜백함수 analog_read()
```js
//s2_pi.js
...
// 아날로그 read 블록 reporter block is executed
  ext.analog_read = function (channel) {
      if (connected == false) {
          alert("Server Not Connected");
      }
      else {
              return analog_inputs[parseInt(channel)]

      }
  };
  ...
```

### s2_pi.py 서버측 수정
1. 라이브러리 임포트
```python
# s2_pi.py
...
import Adafruit_GPIO.SPI as SPI
import Adafruit_MCP3008
import threading
...
```
2. 웹소켓 시작할 때 MCP3008 오브젝트 만들고 (하드웨어SPI로 연결) updateAnalogInput 실행하기
```python
# s2_pi.py
...
def handleConnected(self):
      ...
      # MCP3008 ADconverter
      SPI_PORT   = 0
      SPI_DEVICE = 0
      self.mcp = Adafruit_MCP3008.MCP3008(spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE))
      self.updateAnalogValue()
      ...
```

3. 주기적으로 (0.3) 아날로그 값 읽어 업데이트해주는 updateAnalogValue() 정의. 파이썬의 threading모듈 사용
```python
#s2_pi.py
...
def updateAnalogValue(self):
      for ch in range(8):
          payload = {'report' : 'analog_input_change', 'channel': str(ch), 'level': str(self.mcp.read_adc(ch))}
          msg = json.dumps(payload)
          self.sendMessage(msg)
      threading.Timer(0.3, self.updateAnalogValue).start()
...
```

# HC-SR04 초음파 센서
참고 https://www.modmypi.com/blog/hc-sr04-ultrasonic-range-sensor-on-the-raspberry-pi
## 회로구성
초음파 센서의 vcc -> 5V, GND -> GND 연결하고, Triger와 Echo 핀은 아무 GPIO에 연결해도 좋다.
단 주의할 점은 HC-SR04는 5V 용으로 만들어져있으므로 Echo 에서 출력되는 신호도 5V이다. 라즈베리 파이에 ㅇㅕ!결할 때엔 두개의 저항으로 전압을 내려주거나  레벨 시프터를 사용토록 한다.
![||600](https://tutorials-raspberrypi.com/wp-content/uploads/2014/05/ultraschall_Steckplatine-768x952.png)

## 코드 수정

### s2_pi.js 코드수정
1. 블럭 두개 추가- 하나는 센서 연결 선언 블럭. 또 다른 하나는 센서값 읽어오기. analog_input 값읽어오는 것도 유사하게 작동한다. 차이점은 서버가 연결되면서 바로 값을 업데이트 하는 것이 아니라 set_sr04 블럭이 눌리면 그 때부터 값을 업데이트하기 시작하고, read_sr04블록이 눌리면 즉시 버퍼에서 값을 꺼내온다.

```js
//s2_pi.js
...
// 초음파센서 연결 설정
ext.set_sr04 = function (trig, echo) {
    if (connected == false) {
        alert("Server Not Connected");
    }
    // validate the pin number for the mode
    if (validatePin(trig) && validatePin(echo)) {
        var msg = JSON.stringify({
            "command": 'set_sr04', 'trig': trig, 'echo': echo
        });
        window.socket.send(msg);
    }
};
// 사운드트리거 블록 reporter block is executed
ext.read_sr04 = function () {
    if (connected == false) {
        alert("Server Not Connected");
    }
    else {
            return sr04_buffer;
    }
};
...

var descriptor = {
    blocks: [
      ...
      [" ", 'Set UltraSonic Sensor SR04 trig:%n, echo:%n',"set_sr04", "trig","echo"],
      ["r", "Read distance form UltraSonic Sensor","read_sr04"],
      ...    
    ]
}
```

2. 초음파센서값 저장하는 버퍼 전역 변수로 만들고, python 서버에서 메시지 올때마다 업데이트 해주기

```js
//s2_pi.js
...
// 초음파센서 값 저장버퍼
var sr04_buffer = 0;
...
ext.cnct = function (callback) {
  ...
  window.socket.onmessage = function (message) {
    ...
    else if (reporter == 'sr04_change') {
      sr04_buffer = msg['distance'];
    ...
    }
  ...  
  }
}
```

### s2_pi.py 코드 수정
1.  js측에서 set_sr04 버튼 눌리면  사운드 트리거 작동 시작
```python
# s2_pi.py
...
    # 초음파센서 셋업   
    elif client_cmd == 'set_sr04':
        trig = payload['trig']
        echo = payload['echo']
        self.pi.set_mode(trig, pigpio.OUTPUT)
        self.pi.set_mode(echo, pigpio.INPUT)
        self.calcDistance(trig, echo)
...
```
2. calcDistance 함수는 쓰레드 사용해 0.5초마다 주기적으로 실행.
```python
...
# 초음파 센서 작동 - 주기적으로 실행
  def calcDistance(self, triggerPin, echoPin):
      # 0.01ms간 음파 발사
      self.pi.write(triggerPin, 1)
      time.sleep(0.00001)
      self.pi.write(triggerPin, 0)

      # 음파가 발사된 시간 기록
      startTime = time.time()
      stopTime = time.time()

      while self.pi.read(echoPin) == 0:
          startTime = time.time()

      while self.pi.read(echoPin) == 1:
          stopTime = time.time()

      timeElapsed = stopTime - startTime
      distance = (timeElapsed * 34300) / 2

      payload = {'report': 'sr04_change', 'distance': distance}
      msg = json.dumps(payload)
      self.sendMessage(msg)

      threading.Timer(0.5, self.calcDistance).start()
...
```
