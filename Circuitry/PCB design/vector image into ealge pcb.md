# Eagle pcb에 logo image 넣기
이글 pcb에 inkscape (일러스트레이터) 등으로 만든 벡터 이미지를 삽입하는 방법
참고: https://learn.sparkfun.com/tutorials/importing-custom-images-into-eagle/all 

## inkscape > adobe illustrator
adobe 일러스트레이터에서 인코딩한 svg 파일보다 inkscape 에서 만든 svg파일이 아래 eagle polyline converter와 궁합이 더 좋다. 일러스트레이터보다는 inkscape를 사용한다. (일러스트에서 그리고  inkscape에서 import한다.)

### 1. inkscape (or illustrator)에서 이미지를 그린다.
* 혹은 일러스트에서 그린 .ai 파일을 불러온다. (!! 일러스트레이터에서 .svg로 내보내지 않는다!!)
이 때 이미지는 outline-stroke로 윤곽선이 확정되고, 또한 pathfinder - union으로 중첩이 없도록 처리되어있도록 한다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/yAub2Qzd/Image%202020-08-12%20at%2012.01.52%20PM.png?v=f3e9386a35d5f1082a8ed077cc52085f)

* 크기도 맞춰주자. (파일 > 문서설정에서 단위를  mm로 맞춰준다.)
eagle에서 top silk/ bottom silk 레이어들면 활성화한 후 export > dfx로 내보내면 일러스트레이터에서 보드의 실제 사이즈와 배치를 보며 작업하기에 수월하다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/mXuyB2z9/Image%202020-08-12%20at%2011.59.22%20AM.png?v=87c694d8233bd2e85fcba6aee71e5abd)

<del>
### 2. 곡선 -> 직선화
eagle은 예쁜 그래픽 툴이 아니기 때문에 곡선에 취약하다. 그래픽 툴로 그린 bezier곡선은 되도록 직선화한다.
* extensions > modify path > add nodes 명령으로 중간중간 포인트를 추가한다.
* extensions > modify path > flattern  beziers 명령으로 곡선을 직선화한다.

before:
![](https://p195.p4.n0.cdn.getcloudapp.com/items/v1u2D98Z/Image%202020-08-12%20at%206.26.57%20PM.png?v=805402fd0421557cdbaaaf07758a9248)
after:
![](https://p195.p4.n0.cdn.getcloudapp.com/items/X6uNOvwN/Image%202020-08-12%20at%206.29.08%20PM.png?v=bf766d5068054047f969cce7a7036721)

</del>

### 3. 폐곡선 끊기
eagle에서는 도넛과 같은 중복된 폐곡선을 처리하지 못한다. 중복된 폐곡선은 하나씩 찾아서 끊어 준다.
* draw bezier 명령으로 폐곡선을 가로지르는 도형을 그린다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/2Nuyy9Kd/Image%202020-08-14%20at%202.15.19%20PM.png?v=f2540a6fb0c51ccf81a3a9be5da768fd)
* 방금 그린 자르는 오브젝트와 잘릴 오브젝트를 모두 선택한 후 path > division 명령으로 조각낸다. (일러스트의 패스파인더 기능)
* node 편집 모드에서 모든 오브젝트를 선택하고 path > break apart 명령을 실행한다. (이 단계 건너뛰어도 되는듯...)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/4gu99W5e/Image%202020-08-14%20at%202.21.10%20PM.png?v=6bce078e8733d97da52373aaafd09b78)

* '0', 'ㅇ', 'd' , 'P' , 등 글자를 포함한 모든 폐곡선에 대해 이렇게 해준다.

### 3. export SVG
파일 > save as로  `plain SVG`로 내보낸다.(드롭다운메뉴에서 선택)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/geuzWKpr/Image%202020-08-12%20at%206.55.18%20PM.png?v=cc2cb662f423656359f34dbe82207238)

<del>
### 4. fill="black"
.svg 파일을 텍스트 에디터로 열어서 'path'태그 다음에 fill="black" 이라는 문구가 있는지 확인하고, 없다면 직접 써 넣는다. (inkscape로 만든 svg파일은 이 과정 건너뛰어도 된다.) 저장한다.
![](https://cl.ly/336b04/Image%202020-01-12%20at%209.11.23%20%EC%98%A4%EC%A0%84.png)
</del>

### 5. svg -> eagle polyline converter
편리한 온라인 컨버터를 누군가 만들어두었다.
https://gfwilliams.github.io/svgtoeagle/
소스코드: https://github.com/gfwilliams/svgtoeagle

trace width는 0.01로 설정한다.

미리보기 이미지가 너무 각지게 나와 형태가 뭉개진다면  subsampling값을 키워본다.

로고가 올라갈 레이어를 정하고, (보통 tPlace가 적당..)
output format은 library가 이후 활용이 편리하다.
파일을 업로드하고 convert!  버튼을 누른다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/P8ubEO70/Image%202020-08-12%20at%206.58.57%20PM.png?v=f57b1200235e6ab4e656056e330bac48)

맨 아래쪽의 download eagle script 버튼을 눌러 스크립트를 받는다. / 혹은 Script output을 복사해둔다.

### 6. footprint 화면에서 스크립트 실행
eagle에서 새로운 라이브러리를 만들거나 기존 라이브러리를 연다.
새로운 footprint를 추가하고 앞서 저장한 스크립트를 실행한다.
/혹은 콤맨드라인에 복사해둔 script output을 붙여넣기 한다.

![](https://p195.p4.n0.cdn.getcloudapp.com/items/5zuG1oOy/Image%202020-08-12%20at%207.02.25%20PM.png?v=df5ecee54292ff5a891c2686d4e4aa6d)

### 7. symbol 만들기
schematic에서 보일 symbol을 그린다. 대충 텍스트와 상자로 만든다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/4gu9yG8N/Image%202020-08-12%20at%207.05.57%20PM.png?v=00b83487355100f6a9914ce55d73ad72)

### 8. 라이브러리 저장
새로운 디바이스를 만들어 footprint와 심볼을 추가하고 저장.
(add part 아이콘으로 심볼추가./ new버튼으로 footprint 추가)

새로 만든 라이브러리라면 활성화 (초록색 동그라미) 켜주어야 사용할 수 있다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/12uJyjX4/Image%202020-08-12%20at%207.16.37%20PM.png?v=29af3c807e6960959e7a2d0ae532b4fd)

### 9. 라이브러리에서 불러 사용
다른 부품들처럼 라이브러리에서 불러 사용한다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/xQuLWkWY/Image%202020-08-12%20at%207.29.49%20PM.png?v=f9aef30163eff93bbdee9e676e3798ee)



