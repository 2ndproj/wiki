# 네오픽셀 NeoPixel
![](https://cdn-learn.adafruit.com/guides/cropped_images/000/000/730/medium640/DSC00518_scaled.jpg?1535050191)
Adafruit 에서 공급하는 led strip. 하나의 신호선을 사용해 led 하나하나의 컬러, 휘도 등등을 자유롭게 조작할 수 있다.  원형, 직선형, 매트릭트형 등등 매우 다양한 제품군.
![http://d.pr/i/scsCq.jpg](http://d.pr/i/scsCq.jpg)

## 회로 연결

![](http://d.pr/i/5BQjV.jpg)

  - neopixel 부품의 volt 규격 확인해 전원 연결. 연결된 led 가 많다면 큰 전류 공급 가능해야함. led한개당 약20mA, RGBW가 동시에 full 출력을 낼 수 있으려면 60mA 가 확보되어야 함.(연결된 led 가 많지 않다면 아두이노 자체전원 사용해도 됨.)
  - 전원에 연결하는 캐패시터는 선택사항. 갑작스런 전류로 led 손상되는 것을 방지하기 위함.
  - 신호선에 연결하는 저항은 선택사항. 300\~500옴 사이 적당한 값으로. 역시 회로 보호 역할.
  - 신호선은 모든 디지털 핀 사용가능.
  - 아두이노와 외부전원 GND 연결하는 것 잊지않도록 주의
  -

## 아두이노에서

  - 라이브러리 설치

아두이노 IDE의 library manager에서 바로 설치 가능하다. ![](http://d.pr/i/5eEtb.jpg)

### 미니멀 코드

``` arduino
  // NeoPixel_minimal.ino

    #include <Adafruit_NeoPixel.h>
    #define NeoPixelPin 9

    Adafruit_NeoPixel strip = Adafruit_NeoPixel(60, NeoPixelPin, NEO_GRB + NEO_KHZ800);

    void setup(){
        strip.begin();
        strip.show(); //초기상태 off
    }

    void loop()
        strip.setPixelColor(3, 255, 0, 0); //4번째(0부터 세기 시작) led를 빨간색으로
        strip.show();
    }
```

#### step1. 라이브러리 포함시키기

`\#include \<Adafruit\_NeoPixel.h\>`로 라이브러리 포함시키기

#### step2. 연결핀 정의

`\#define PIN 9` 네오픽셀 연결된 핀 정의 ( 꼭 필요하진 않지만 편의를 위해 define)

#### step3. 네오픽셀 오브젝트 만들기

`Adafruit\_NeoPixel strip = Adafruit\_NeoPixel( 60, PIN, NEO\_GRB +
NEO\_KHZ800);`

여기에서

  - 60 -\> led갯수,  
  - PIN -\> 신호핀,  
  - NEO\_GRB -\> Pixels are wired for GRB bitstream (most NeoPixel
    products),  
  - NEO\_RGB -\> Pixels are wired for RGB bitstream (v1 FLORA pixels,
    not v2),  
  - NEO\_GRBW -\> 어떤 엘이디들은
  - NEO\_RGBW -\> W채널을 별도로 가지고 있다.
  - NEO\_KHZ800 -\> 800 KHz bitstream (most NeoPixel products w/WS2812
    LEDs),  
  - NEO\_KHZ400 -\> 400 KHz (classic 'v1' (not v2) FLORA pixels, WS2811
    drivers)  

#### step4. setup()

strip.begin(); //작동시작  
strip.show(); //초기값(모두 꺼짐) 적용

#### step5. 색 설정

'strip.setPixelColor(n, red, green, blue);'에서

  - n 은 n번째 led (첫번째 led가 0번째임.)  
  - red, gree, blue은 0\~255 사이 값.  
  - W채널이 있는 led의 경우 'strip.setPixelColr(n, red, green, blue, white);'로
    사용.

#### step 6. 설정한 색 적용

strip.show() 로 설정한 변경 적용.

### 라이브러리

|함수|역할
| - | - |
| setPixelColor(n, r,g,b,[w])             | n = led 번호 (0부터...) r, g, b, w = 0\~255 사이 각 컬러채널 값                        |
| setPixelColor(n, color)                    | n = led 번호 color = 32bit 컬러 값 (아래 Color()함수 참고)                            |
| utin32\_t Color(r,g,b);                    | 32bit 컬러값을 만들 수 있음. 예를 들어, 'uint32\_t magenta = strip.Color(255, 0, 255);' |
| show()                                     | 색 설정후에는 언제나 'show();'를 해 주어야 비로소 적용이 된다.                                   |
| uint32\_t color = strip.getPixelColor(27); | 27번 led의 컬러를 알아볼 수있다.                                                      |
| uint16\_t n = strip.numPixels();           | 몇개의 led를 가진 스트립인지 알아볼 수 있다.                                                |
| strip.setBrightness(64);                   | 전체적인 밝기를 조절 (0\~255)할 수 있다. setup()에서 최초 사용하는 용도로 만들어진 함수.                 |

## snap4arduino 에서

![](https://www.youtube.com/watch?v=anOZcTTpj4w)
B.Romagosa가 snap4arduino용 neopixel 라이브러리를 만들어두었다. neopixel strip,circle과 neomatrix 를 모두 지원한다.

### step1. 아두이노 네오픽셀 라이브러리 설치

아두이노 개발환경에서 직접 설치할 수 있다. library manager에서

  - Adafruit GFX
  - Adafruit NeoPixel
  - Adafruit NeoMatrix

를 찾아 설치한다.

### step2. snap4arduino + neopixel 용 아두이노 스케치 업로드

standardFirmata의 modification이다. B.Romagosa의 깃허브페이지: https://github.com/bromagosa/Snap4Arduino 에서 받는다.

[참고자료 링크](https://github.com/bromagosa/Snap4Arduino/wiki/Firmata-Modifications#using-an-adafruit-neopixel-stripe)

#### StandardFirmata-NeoPixel.ino 중요부분 (심화)

```c
...

/* NEOPIXELS */
#include <Adafruit_GFX.h>
#include <Adafruit_NeoMatrix.h>
#include <Adafruit_NeoPixel.h>
#define NEOPIXEL 0x72
#define NEOMATRIX 0x73
#define NEOPIXEL_REGISTER 0x74
#define NEOMATRIX_REGISTER 0x75
#define MAX_NEO 1

Adafruit_NeoPixel *neopixels = NULL;
Adafruit_NeoMatrix *neomatrix = NULL;

...
```

  - sysex명령어 0x72는 NEOPIXEL 컬러설정에 할당.
  - sysex명령어 0x73은 NEOMATRIX 컬러설정에 할당.
  - sysex명령어 0x74는 NEOPIXEL 초기화에 할당.
  - sysex명령어 0x75는 NEOMATRIX 초기화에 할당.


```cpp
...

  switch (command) {

   ...

    case NEOPIXEL_REGISTER:
      {
        int pin = argv[0];
        int count = argv[1];

        if (neopixels != NULL) {
          delete neopixels;
        }
        neopixels = new Adafruit_NeoPixel(count, pin, NEO_GRB + NEO_KHZ800);
        neopixels->begin();
      }
      break;
    case NEOPIXEL:
      {
        int index = argv[0];
        int red = argv[1];
        int green = argv[2];
        int blue = argv[3];
        neopixels->setPixelColor(index, red, green, blue);
        neopixels->show();
      }
      break;
    case NEOMATRIX_REGISTER:
      {
        int pin = argv[0];
        int width = argv[1];
        int height = argv[2];

        if (neomatrix != NULL) {
          delete neomatrix;
        }
        neomatrix = new Adafruit_NeoMatrix(width, height, pin,
          NEO_MATRIX_TOP     + NEO_MATRIX_RIGHT +
          NEO_MATRIX_COLUMNS + NEO_MATRIX_PROGRESSIVE,
          NEO_GRB            + NEO_KHZ800);
        neomatrix->begin();
      }
      break;
    case NEOMATRIX:
      {
        int id = 0;
        int x = argv[0];
        int y = argv[1];
        int red = argv[2];
        int green = argv[3];
        int blue = argv[4];
        neomatrix->drawPixel(x, y, neomatrix->Color(red, green, blue));
        neomatrix->show();
      }
      break;

}

...
```

### step 3. snap4arduino 블록 정의파일 불러오기

"파일메뉴 \> Import..." 메뉴로 블록정의파일 불러온다. 블록정의파일은 아래에서 다운받거나 B.Romagosa의 github페이지에서 받을 수 있다.
[snap4arduino + neopixel용 블럭 다운로드](LCD,LED Display/NeoPixel/snap4arduino block-NeoPixel 2.xml)

불러오기 이후 Arduino 명령어 모음에서 아래 두개의 블럭이 추가된 것을 확인한다.  
![](https://cl.ly/46193R3x1i0h/Image%202017-05-19%20at%2010.36.56%20AM.png)

#### 블록정의파일 중요부분 (심화)
![](https://cl.ly/1S2E0c443u3E/Image%202017-05-19%20at%2010.51.29%20AM.png)

  - neomatrix를 사용하는 경우는 0x74 를 0x75로 수정하고
  - parseInt(amount) 대신 parseInt(x), parseInt(y)를 추가한다.

![](https://cl.ly/1z1G232o2K3G/Image%202017-05-19%20at%2010.52.27%20AM.png)

  - neomatrix를 사용하는 경우는 0x72 를 0x73으로 수정하고
  - parseInt(ledNum) 대신 parseInt(x), parseInt(y)를 추가한다.

### step 4. 미니멈 코드

![](https://cl.ly/2A2v1x243o28/Image%202017-05-19%20at%2010.50.38%20AM.png)

  - attach 60 - led의 갯수
  - pin 9 - neopixel이 연결된 아두이노 핀.
  - set LED 3 - 3번째 led
  - R: G: B: - 0\~255사이 red, green, blue 값.

## 참고

adafruit 네오픽셀 예제: [파일:Adafruit\_NeoPixel-master.zip](LCD,LED Display/NeoPixel/Adafruit_NeoPixel-master.zip)

adafruit 네오픽셀 교육자료: https://learn.adafruit.com/adafruit-neopixel-uberguide/overview

snap4arduino 용 네오픽셀 라이브러리: https://github.com/bromagosa/Snap4Arduino/wiki/Firmata-Modifications#using-an-adafruit-neopixel-stripe

## fastLed 라이브러리
fastled 라이브러리를 사용하면 더 다양한 시각효과를 더 정교하게 조작할 수 있다고 한다.
시도해보자.
https://github.com/FastLED/FastLED/wiki/Overview
