# matplotlib 사용해 jupyter notebook에서 이미지 표시하기
참고: https://matplotlib.org/stable/tutorials/introductory/usage.html#sphx-glr-tutorials-introductory-usage-py

## matplotlib basic
* plt.imshow(img) 로 이미지를 작성하고
* plt.show()로 화면에 표시한다.
  
```python
# matplotlib Basic
import cv2
import matplotlib.pyplot as plt

image = cv2.imread('kitty_image.jpeg')
plt.imshow(image)
plt.show()
```
![](https://p195.p4.n0.cdn.getcloudapp.com/items/YEur0mNX/cdb8c8ed-56c3-42a1-abcd-041412a2cb2f.jpg?v=95d131352b2c54706af2c938b9f2516b)

## openCV 이미지 컬러 수정
* openCV 이미지는 컬러표시를 위해 BGR의 순서를 사용하고, matplotlib은 RGB의 순서를 사용한다. 때문에 위에서와 같이 고양이가 푸르딩딩하게 이상하게 나오는 것이다.
* 이를 바로잡으려면 'cv2.cvtColor(source, code=cv2.COLOR_BGR2RGB)'를 사용해 컬러코드를 변환해 주어야 한다.
  
```python
image = cv2.imread('kitty_image.jpeg')
plt.imshow(image)
plt.show()

rgb = cv2.cvtColor(image, code=cv2.COLOR_BGR2RGB)
plt.imshow(rgb)
plt.show()
```
![](https://p195.p4.n0.cdn.getcloudapp.com/items/nOuRywEP/bac69a1f-0d6d-40cf-9f3f-aabb4805e6fe.jpg?v=56976f88ff66519980e0e0d98c805073)

## matplotlib 의 colormap (cmap)
* matplotlib에서 흑백이미지를 imshow()로 표시하면 흑백이 아닌 보라색 으로 보이는데, matplotlib 에서 대비가 잘 보이도록 0>노랑, 255>보라로 표시하는 것이 디폴트이기 때문.
* cmap (=color map)을 바꿈으로써 이를 조절 할 수 있다. 0>black 255>white 로 하고 싶다면 'cmap = "gray"' 를 사용하면 된다.
참고: https://stackoverflow.com/questions/25625952/matplotlib-what-is-the-function-of-cmap-in-imshow

```python
gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
plt.imshow(gray)
plt.show()
plt.imshow(gray, cmap='gray')
plt.show()
```
![](https://p195.p4.n0.cdn.getcloudapp.com/items/4guKpbAZ/9ab2ab2a-f1d3-4588-9a71-cdfb2d64d154.jpg?v=c324c5cff47bd41b1bafd248bb032524)

## 제목표시, 눈금(ticker) 제거
* 이미지 제목을 붙여주려면 'plt.title(str)'을 사용한다.
* x,y 라벨 표시를 위해 'plt.xlabel(str)', 'plt.ylable(str)'를 사용한다.
* plt.axis('off') 로 간단히 눈금 제거. 
  
```pyton
plt.title('Kitty')
# plt.xlabel('x label')
# plt.ylabel('y label')
plt.axis('off')
plt.imshow(image)
plt.show()
```
![](https://p195.p4.n0.cdn.getcloudapp.com/items/YEur0mNJ/0a6da708-cc48-4291-aee1-daa0ee47bfaa.jpg?v=311feaa035d11ce363bedbc52d888559)

## subplot 으로 여러개 이미지 표시
* 'plt.subplot(1,3,2)' 와 같은 방식으로 'subplot'을 정의할 수 있다. 1,3,2는 1행 3열중 2번째를 의미한다.
  
```python 
image1 = cv2.imread('kitty_image.jpeg')
image2 = cv2.imread('pencil.jpg')
image3 = cv2.imread('car.jpg')

plt.subplot(1,3,1)
plt.title('kitty')
plt.imshow(image1)

plt.subplot(1,3,2)
plt.title('pencil')
plt.imshow(image2)

plt.subplot(1,3,3)
plt.title('car')
plt.imshow(image3)

plt.show()
```
![](https://p195.p4.n0.cdn.getcloudapp.com/items/7KuQ9d1l/ac0afd91-bad0-4b9c-b6f0-34bbfa143f55.jpg?v=90de5e155566e9a6e1482bbb2036f140)

## 이미지 크기 조절
* plt.figure() 로 피겨를 만들면서 'figsize =' 파라메터를 사용해 표시되는 이미지 크기를 정할 수 있다. 단위는 inch. 디폴트 값은 (6,4)

```python
plt.figure(figsize=(8,5))
plt.imshow(image), plt.title('bigger')
plt.show
```
## Runtime configuration parameter
* 또 다른 방법으로는 plt.rcParams['figure.figsize']=(8,5) 와 같이 'Runtime Configuration Parameter'를 수정하는방법이 있다.
참고: https://jrc-park.tistory.com/274
* runtime backend란 matplotlib이 실행되는 플랫폼,여기서는 jupyter notebook을 가리키는 것으로, rcParams를 통해 그래프 표현방법을 다양하게 수정할 수 있다.
참고: https://matplotlib.org/stable/api/matplotlib_configuration_api.html?highlight=rcparams#matplotlib.rcParams
```python
plt.rcParams['figure.figsize'] = (12,10)  # 이미지 크기
plt.rcParams['figure.autolayout'] = True
# plt.rcParams['figure.constrained_layout.use'] = True
# plt.rcParams['figure.constrained_layout.w_pad'] = 100
plt.rcParams['font.size'] = 50  # 폰트크기

image1 = cv2.imread('kitty_image.jpeg')
image2 = cv2.imread('pencil.jpg')
image3 = cv2.imread('car.jpg')

plt.subplot(1,3,1)
plt.title('kitty')
plt.axis('off')
plt.imshow(image1)

plt.subplot(1,3,2)
plt.title('pencil')
plt.axis('off')
plt.imshow(image2)

plt.subplot(1,3,3)
plt.title('car')
plt.axis('off')
plt.imshow(image3)
plt.show()
```
![](https://p195.p4.n0.cdn.getcloudapp.com/items/KouA2Dzg/6afcf247-e553-4b89-9dbf-a616dbc9206e.jpg?v=afc6a57de80d9bf87cb4da42616824c9)
