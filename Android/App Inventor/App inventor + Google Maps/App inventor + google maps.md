# App inventor + Google Maps
앱인벤터([MIT app inventor](http://appinventor.mit.edu))을 사용하면 매우 쉽고 빠르게 구글 맵 서비스를 안드로이드 앱 안에 넣을 수 있다.
여기에서는 앱인벤터에서 독립해나온 상용 프로젝트인 썬커블([Thunkable](http://thunkable.com)) 을 사용해 구현해본다. 앱인벤터에서도 사용법은 동일하다.

## appInventor code

![](https://youtu.be/_cmSVWYVKtw)
[thunkable + Google Map
샘플코드](/Android/App Inventor/App inventor + Google Maps/GoogleMap_test.aia)

### 1\. 위도, 경도를 입력하면 앱 내의 구글 지도위에 보여주기

Visuallization 팔레트의 GoogleMap 요소를 사용한다.
![](https://cl.ly/3F1Y0j001K31/Image%202017-05-24%20at%203.46.08%20PM.png)
좌측 텍스트박스1에 위도를, 우측 텍스트박스2에 경도를 입력하고 go\! 버튼을 누르면 해당 위치로 이동한다. 블록코드는 다음과 같다.
![](https://cl.ly/2O3n1d2C1K0t/Image%202017-05-24%20at%203.49.36%20PM.png)

  - **Zoom Level** 은 표시되는 지도의 확대율. 1은 지구전체, 커질수록 자세한 지도가 된다.
  - **Move Map To Location** 은 지정한 위도(**lat**)과 경도(**lng**)로 이동한다.

### 2\. 지정한 위도와 경도에 핀 꽂기

정확한 위치에 핀을 꽂아 표시하면 더 좋을 것 같다. 이를 위한 블록 코드는 아래와 같다.
![](https://cl.ly/2L3y0g3x2F0T/Image%202017-05-24%20at%204.28.16%20PM.png)

  - **Add Standard Marker** 를 추가한다. 블록의 결합방향을 맞추기 위해 **evaluate but
    ignore result** 블록을 사용한다.
      - **lat** 는 위도
      - **lng** 는 경도
      - **color** 는 핀의 색상
      - **title** 는 핀 제목
      - **snippet** 는 짧은 설명을 쓰면 된다.
      - **draggable** 는 핀을 드래그 할 수 있는지인데, 휴대폰에서는 사용할 수 없다고한다.(확인필요함)

### 3\. 지역명으로 검색해 이동하기

**textBox3** 에 지역명을 입력하고 **go\!** 버튼을 누르면 해당 지역으로 이동토록 한다. 지역명을 검색해 위도와
경도로 바꾸기 위해 Location Sensor 요소가 필요하다.
![](https://cl.ly/1a3T3r1O241E/Image%202017-05-24%20at%204.45.13%20PM.public.png)
![](https://cl.ly/2g2y3j2g411i/Image%202017-05-24%20at%204.47.24%20PM.png)

  - **call Location\_Sensor1.Latitude From Address** 는 **location Name** 의
    입력을 받아 위도값을 리턴한다.
  - **call Location\_Sensor1.Longitude From Address** 는 **location
    Name** 의 입력을 받아 경도값을 리턴한다.

## 참고

[Thunkable의 GoogleMap
Document](https://thunkable.com/reference/components/visualization.html)
