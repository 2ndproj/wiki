# python 개발 환경 셋업
## python3.6 설치
* 현재 파이썬 버전을 확인한다.
```bash
$ python3 --version
Python 3.5.3
```
* 파이썬3.6.5 설치한다.

```bash
$ sudo apt-get install python3-dev libffi-dev libssl-dev -y

$ wget https://www.python.org/ftp/python/3.6.5/Python-3.6.5.tar.xz

$ tar xJf Python-3.6.5.tar.xz

# ~/Python-3.6.5 디렉토리에서...
$ ./configure

$ make

$ sudo make install

$ sudo pip3 install --upgrade pip

$ cd ~

$ rm Python-3.6.5.tar.xz

# 설치가 잘 되었는지 확인해보자
$ python3 --version
Python 3.6.5
```

## 유용한 파이썬 모듈 설치
* RPi.GPIO 설치 : 라즈베리에서 GPIO사용할 수 있도록 해주는 모듈
```bash
sudo pip install RPi.GPIO
```

* SSD1360 python library : SSD1360컨트롤러를 사용하는 oled를 제어하는 모듈
``` bash
$ git clone https://github.com/adafruit/Adafruit_Python_SSD1306.git
$ cd Adafruit_Python_SSD1306
$ sudo python3 setup.py install
```

* Python Image Library (PIL / pillow) 설치 : 간단한 이미지 프로세싱용 모듈
참고: https://pillow.readthedocs.io/en/stable/installation.html#external-libraries
```bash
$ sudo apt-get install libjpeg-dev -y
$ sudo apt-get install zlib1g-dev -y
$ sudo apt-get install libfreetype6-dev -y
$ sudo apt-get install liblcms1-dev -y
$ sudo apt-get install libopenjp2-7 -y
$ sudo apt-get install libtiff5 -y
$ sudo pip3 install pillow
```

# 노트북 -  Raspberry 개발환경 구성하기
RPi 의 콘솔환경에서 코딩하는 것은 너무 힘들다. 물론 vim등을 능숙하게 다룬다면 좋겠지만... 21세기 현대인에게는 무리한 요구.
그래서  노트북에서 Atom 등의 손에 익은 에디터로 코드를 작성하고  FTP로 Rpi에 옮겨 실행하고 디버깅하는 작업프로세스를 택한다.

## Atom 설치
https://atom.io/ 에서 다운받아 설치 할 수 있다. 윈도, 맥, 리눅스 다 지원된다.


## FTP로 파일 전송하기
### 노트북에 ftp  client 설치.
많이들 사용하는 filezilla  사용키로 한다.
다운로드: https://filezilla-project.org/download.php?type=client
### SFTP를 사용해 raspberrypi 에 연결
filezilla  설치가 완료되면 실행시킨후,
파일 > 사이트 관리자  메뉴로 들어가 새로운 연결을 정의해준다.
[](https://cl.ly/b9262f/Image%202019-07-29%20at%2011.07.53%20AM.png)
* 프로토콜은  **SFTP** 선택.
* 호스트는 앞서  dns-sd  명령으로 찾은 라즈베리파이의 주소
* 사용자와 비밀번호는 pi, raspberrypi
### 노트북-라즈베리파이 파일 주고 받기
연결이 만들어지고 나면 drag-drop으로 간편하게 파일을 주고 받을 수 있따.
