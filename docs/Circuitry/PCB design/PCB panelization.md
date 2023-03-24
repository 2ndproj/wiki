# PCB panelization
PCB를 생산할 때 작은 보드는 생산성을 높이기 위해 큰 판에 여러개를 한꺼번에 제작하게 되는데, 이를 panelization이라고 한다.
fab house에 따라 panelization을 해주는 곳도 있지만 안ㅇ해주는 곳도 있고, 특히 동일한 pcb를 여러개 panelize 하는 것이 아니라 한장에 여러 종류의 다른 보드를 얹어서 만들고자하면 (이렇게하면 가격이 싸지므로) 주문하는 측에서 panelized된 거버파일을 건네주어야한다.

## eagle에서 panelize 하기
기본적으로는 원본 보드를 copy & paste해서 원하는 크기의 큰 보드를 만들고 바깥쪽 외곽선과 route, cut line 들을 outline layer (GKO or GML)에 추가하면된다. 

그런데 copy & pasete할 때에 한가지 조심 해야 하는 부분이 있는데, 붙여넣기를 하게되면 Eagle에서 자동으로 part name을 기존과 중복되지 않게 새로 할당한다는 점이다. 
![](https://i.imgur.com/sDnXWKa.png) *이름이 자동으로 바뀐다*

이 문제를 해결하려면 `panelization.ulp`를 사용한다.
참고: https://diy.viktak.com/2013/02/tutorial-panelizing-pcbs-in-eagle.html 

1. 원본의 모든(필요한) 레이어를 켠다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/yAuyGxKO/90ecb4cc-79e7-46b7-9afa-c189ab303b52.jpg?v=4b8f2a96630f1693b99c76bc9f0204e2)
2. 전체선택 & copy한다.
3. 새로운 .brd 파일을 만든다
4. 복사한 도면을 붙여넣기한다. 
5. 'menu > tools > panelize...' 를 실행한다. 이 이후로는 복사할 때마다 `125 _tNames` 레이어에 이름이 중복되어 복사된다. (원래의 25 _tNames 레이어는 계속해서 새롭게 자동생성된다. 이건 pnp 장치를 사용해 자동으로 smt 공정을 시행하려면 필요하다.)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/bLuq1Jxx/45d0380e-377c-4873-85a6-81d19c565884.jpg?v=3fb89fdf523ec6978045a5f6615501b8)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/9ZuQvYgy/507c1e00-8ab9-4f7f-91ec-fb3356be73c3.jpg?v=57ef8de74f94ad713aae8f3785bb4099)

6. `ctrl-x`로 잘라낸 후 계속 붙여넣기 해서 큰 판을 만든다 (0 0), (20 0), (40 0)... 하는 식으로 일정한 간격으로 배치할 수 있다. 이렇게 만들어진 복사본들은 레이어25의 part name은 모두 다르지만, 레이어 125의 part name은 모두 같다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/7KuE42Gj/fd9c1bfa-98a6-458a-a266-991bb17426df.jpg?v=b48c29f327463e1318ceb8f53b01bbcc)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/5zuNgD6m/de039621-7a62-4736-9a1c-46edd1d459a5.jpg?v=7aa559e6638bb66e352c3d8e3f53bf9b)


7. v-groove  or tab&route 방법으로 pcb 조각 낼 수 있도록 설계완료한 후 gerber로 export 한다.
이 때, 원래의 레이어25는 실크인쇄에서 빼고 대신 레이어125를 포함시키도록한다.
SMT를 위한 .mnt, .mnb 파일에는 부품명이 레이어25에서의 부품명대로 나타내어져있는데, 그대로 사용토록 한다. (smt 장치가 알아먹도록 하려면 당연하다)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/9ZuQvWvv/a6a5155d-5249-447e-9abd-29efd562afd6.jpg?v=0add46b03dfb48f3d3797bd8fa77067c)

## v-groove vs tab&route
각 조각을 어떻게 분리하는지에 따라 2가지 공법으로 panelize 할 수 있는데, V-Groove 방법과 Tab-route 방법이다.
참고: https://maker.pro/pcb/tutorial/types-of-pcb-panelization-v-groove-and-tab-route

## 1. v-groove 방법
v-groove사용해 panelize된 pcb:
![](https://maker.pro/storage/Q4gLJ5t/Q4gLJ5tleQGkVhNGccq4rRa6nozDWE6FSMkOv0qA.jpeg)
v-groove 단면:
![](https://i.imgur.com/XJZLrAw.jpg)

v-cut (v-groove)기계:
![](https://i.imgur.com/COJQuSf.jpg)
![](https://i.imgur.com/osUSBLV.jpg)

v-groove 유의사항 (Seeed Fusion 기준)
참고: https://www.seeedstudio.com/blog/tag/pcb-panelization-guidelines/

* cut line은 직선이어야한다.
* cut line은 보드를 완전히 가로질러야하며 중간에 멈췄다 다시 자를 수 없다.
* 톱날의 폭은 약 1mm이다. 
* cut line 양측 각 1mm 안에는 파트나 노출된 copper동박이 없도록한다.
![](https://i.imgur.com/5EXxMIX.jpg)
* cut line 근처(5mm) 에는 25mm 이상 높은 부품이 없도록 한다.
![](https://i.imgur.com/UmZtkd3.jpg)
* cut line은 외곽선레이어나 (dimension layer)나 milling 레이어에 그려주고 화살표와 함께 V-cut이라고 텍스트로 표시해준다.

## 2. tab and route 방법
![](https://i.imgur.com/F8DcUZW.png)
*tab and route 사례*
tab&route 권장사항 (seeed fusion 기준)
* groove 폭은 2mm (혹은 그 이상)
![](https://i.imgur.com/VWSMlwt.jpg)
* stamp hole의 직경은 1mm, stamp hole 간격은 1.5mm
