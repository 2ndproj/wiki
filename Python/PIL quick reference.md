# PIL (python Imaging library) Quick reference
python 에서 비트맵 이미지를 그리고 편집하고 등등 여러가지 할 수 있는 오픈소스 이미지 프로세싱 라이브러리. 간편해서 매우널리 쓰인다.

## PIL 설치
* 오리지날 PIL 은 개발중단 되었고,  pillow  프로젝트가 뒤를 잇고 있다. 대부분의 사용방법이 동일하다.
* 더 다양한 기능을 활용하기 위해 아래 외부 라이브러리를 먼저 설치해도 좋다.
(아래는 라즈베리파이에서  apt-get을 사용해 설치했으나 macos 에서는 homebrew사용해 설치 할 수 잇다.)
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
## Image class
PIL 의 가장 기본이 되는 클래스. 비트맵 이미지 데이터를 갖는다.
* Image.open() 을 사용해 비트맵 이미지를 불러들여 Image 오브젝트 만들 수 있다.

```python
form PIL import Image
im = Image.open("hopper.ppm")
```

* 혹은 Image.new(mode, size, color=0) 를 통해 수동으로 이미지 오브젝트를 만들 수도 있다.

|parameter|설명|
|-|-|
|mode| 1 (1-bit pixels, black and white, stored with one pixel per byte),
  ||L (8-bit pixels, black and white),
  ||P (8-bit pixels, mapped to any other mode using a color palette)
||RGB (3x8-bit pixels, true color)
||RGBA (4x8-bit pixels, true color with transparency mask)
||CMYK (4x8-bit pixels, color separation)
||YCbCr (3x8-bit pixels, color video format)
||Note that this refers to the JPEG, and not the ITU-R BT.2020, standard
||HSV (3x8-bit pixels, Hue, Saturation, Value color space)
||I (32-bit signed integer pixels)
||F (32-bit floating point pixels)|
|size| 2-tuple (width, height)|
|color|  배경색. RGB 모드인 경우 3-tuple|

* array 로부터 이미지를 만들 수도 있는데, Numpy 사용하는 경우 유용하다.

```python
from PIL import Image
import numpy as np

im = Image.open('hopper.jpg')
a = np.asarray(im)

im = Image.fromarray(a)
```

* image.show()를 사용해 이미지를 미리보기 할 수 있다.
os의 미리보기 유틸리티를 활용한다. macos에서 는 quicklook으로 이미지를 보여준다.

```python
im.show()
```
* image.save(filename) 으로 파일로 저장할 수 있다.
파일명에 따라 파일포맷을 자동으로 결정한다.

```python
import os, sys
from PIL import Image

 f,e = os,path.splitext(filename) # 파일명과 확장자로 나눔
outfile = f + ".jpg"
if filename != outfile:
  try:
    Image.open(filename).save(outfile) # .jpg로 save하면 자동으로 jpg 포맷으로 변환
  except:
    print("cannot convert", filename)
```

* crop(), transpose(), paste() 할 수 있다.

```python
box = (100,100,400,400)
region = im.crop(box)

region = region.transpose(Image.ROTATE_180)
im.paste(region, box)
```
|Parameters| 기능|
|-|-|
|PIL.Image.FLIP_LEFT_RIGHT|좌우반전|
|PIL.Image.FLIP_TOP_BOTTOM|상하반전|
| PIL.Image.ROTATE_90|90도 회전|
| PIL.Image.ROTATE_180|180도 회전 |
|PIL.Image.ROTATE_270|-90도 회전 |
| PIL.Image.TRANSPOSE||
|PIL.Image.TRANSVERSE|-|

## ImageDraw class
* Image  object 위에 간단한  2d drawing .
1. 빈 image를 만든다.
2. ImageDraw.Draw(image)로 drawing context를 득한다.
3. 여러가지 그림도 그리고 글씨도(!) 쓴다.
4. image.show()로 디스플레이한다.

```python
from PIL import Image, ImageDraw, ImageFont
# get an image
base = Image.open('Pillow/Tests/images/hopper.png').convert('RGBA')

# make a blank image for the text, initialized to transparent text color
txt = Image.new('RGBA', base.size, (255,255,255,0))

# get a font
fnt = ImageFont.truetype('Pillow/Tests/fonts/FreeMono.ttf', 40)
# get a drawing context
d = ImageDraw.Draw(txt)

# draw text, half opacity
d.text((10,10), "Hello", font=fnt, fill=(255,255,255,128))
# draw text, full opacity
d.text((10,60), "World", font=fnt, fill=(255,255,255,255))

out = Image.alpha_composite(base, txt)

out.show()
```
* ImageDraw.Draw(im, mode=None)
  im - 그림그릴 이미지 오브젝트
  mode - 흑백모드 '1',  grayscale모드 'L' , RGB, RGBA ...

* ImageDraw.ImageDraw.point(xy, fill=None)
  xy - 점들의 좌표. 2-tuples like [(x, y), (x, y), ...] or numeric values like [x, y, x, y, ...]
  fill - 점 색

* ImageDraw.ImageDraw.rectangle(xy, fill=None, outline=None, width=0)
  xy - 두 대각 꼭지점. [(x0, y0), (x1, y1)] or [x0, y0, x1, y1]
  outline - 선 색
  fill - 채움 색
  width - 라인 두께

* ImageDraw.ImageDraw.line(xy, fill=None, width=0, joint=None)
  xy - 선분을 이루는 점의 연속. [(x, y), (x, y), ...] or [x, y, x, y, ...]
  fill - 채움 색
  width - 라인 두께 (pixel)
  joint - None or "curve" 모서리 둥글리기

```python
from PIL import Image, ImageDraw

im = Image.open("hopper.jpg")

draw = ImageDraw.Draw(im)
draw.line((0, 0) + im.size, fill=128)
draw.line((0, im.size[1], im.size[0], 0), fill=128)

# write to stdout
im.save(sys.stdout, "PNG")
```

* ImageDraw.ImageDraw.arc(xy, start, end, fill=None, width=0)
  xy - 아크 외접 사각형. [(x0, y0), (x1, y1)] or [x0, y0, x1, y1]
  start - 출발각(degree), 3시방향이 0˚부터 시작해서 시계방향으로 증가.
  end - 도착각
  fill - 도형의 색
  width - 라인 두께 (pixel)

* ImageDraw.ImageDraw.ellipse(xy, fill=None, outline=None, width=0)
  xy - 타원 외접 사각형. [(x0, y0), (x1, y1)] or [x0, y0, x1, y1]
  outline - 선 색
  fill - 채움 색
  width - 라인 두께(pixel)

## ImageText class -  text 표시하기
폰트를 로딩한 후, ImageDraw.text() 를 사용해 텍스트를 표시할 수 있다.

*  ImageFont.truetype(font=None, size=10, index=0, encoding='', layout_engine=None)
font - truetype font  파일.
size - 폰트 크기. piont 단위
index - light, bold  등 fontface  선택. 디폴트는 index=0
encoding - 'unic'(unicode. default), 'symb'(Microsoft Symbol), 'ADOB'(Adobe Standard), 'ADBE'(Adobe Export), 'armn'(Apple Roman)

  ```python
  from PIL import Image, ImageDraw, ImageFont

  im = Image.new('RGB', (128,64),0)
  draw = ImageDraw.Draw(im)

  font = ImageFont.truetype("Arial.ttf",15)

  draw.text((10,10), "hello world\n I'm a boy \n You are a girl", font=font)
  im.show()

  ```

* ImageDraw.ImageDraw.text(xy, text, fill=None, font=None, anchor=None, spacing=0, align="left", direction=None, features=None, language=None)
텍스트를 표시한다.
xy - 텍스트 위치. 텍스트 상자의 좌상단위치임.
text - 표시할 텍스트.
fill - 텍스트 컬러
font - ImageFont instance
spacing - 줄 간격,(pixel)
align - "left", "center" or "right"
direction - 'rtl'(right to left) or 'ltr' or 'ttb'(top to bottom). libraqm 라이브러리 필요함.
features - opentype의 다양한 기능
language - https://www.w3.org/International/articles/language-tags/

* ImageDraw.ImageDraw.textsize(text, font=None, spacing=4, direction=None, features=None, language=None)
 표시될 text의 크기를 (가로, 세로)(pixel) 로 리턴한다.
text - 표시할 텍스트
font - ImageFont instance
spacing - 행 간격

### 한글표시
* 한글폰트가 잘 표시되지 않는다는 리포트가 많이 있었으나 테스트 결과 별다른 조작 없이 잘 된다.
python2에서 유니코드 지원이 원활치 않아 있었던 문제로 생각된다. python3에서는 잘 된다.
* 폰트파일의 위치는 중요하다. 기본적으로 cwd(currunt working directory - 디폴트는 실행중인 스크립트와 같은 위치) 에서 폰트를 찾고, 못찾으면 os에 설치된 폰트 파일을 찾아서 사용한다.(똑똑한데?) 그럼에도 내가 한참 헤맨 이유는 atom editor의 script  package가 편집중인 스크립트의 위치가 아닌 프로젝트의 위치를  cwd 로 하도록 설정되어있었기 때문... script package 설정변경으로 간단히 해결됨.

```python
from PIL import Image, ImageDraw, ImageFont

im = Image.new('RGB', (128,64),0)
draw = ImageDraw.Draw(im)

font = ImageFont.truetype("malgun.ttf",15,0)

draw.text(
(10,10),
'''세종대왕
만만세''',
font=font)

im.show()
```

![](https://cl.ly/5d93f4/Image%202019-07-30%20at%2010.13.53%20PM.png)

## Image sequences (GIF animation)
* Image.open("....gif") 로 여러 프레임이 있는 이미지를 열었다면, image.seek() 과 image.tell()로 특정 프레임을 로드하고 볼 수 있다.  파일 끝에서는  EOFError 발생한다.

```python
from PIL import Image
im = Image.open("source.gif")
im.seek(1)

try:
    while 1:
        im.seek(im.tell()+1)
        im.show()
except EOFError:
    pass
```
* ImageSequence.Iterator 를 사용하면 좀 더 편하게 프레임을 조작 할 수 있다.

```python
from PIL import Image
from PIL import ImageSequence

im = Image.open("source.gif")
for frame in ImageSequence.Iterator(im):
    frame.show()
```

## 두개의 image 합치기
* Image.paste(im, box= None, mask= None)  
함수를 사용해서 원래의 이미지 위해 다른 이미지를 덧씌울 수 있다.
 * im : 덧씌울 Image  object
 * box: 2-tuple or 4-tuple 로, 덧씌울 이미지의 위치
 * mask: 원한다면  mask적용할 수도 있다('1'mode 이미지, 혹은  RGBA 모드 이미지가 사용되면  A channel). 255 값을 갖는 점은 이미지가 덧씌워지고, 0값을 갖는 점은 원래의 이미지가 그대로 사용된다.
