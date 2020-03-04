# Eagle pcb에 logo image 넣기
이글 pcb에 일러스트레이터 등으로 만든 벡터 이미지를 삽입하는 방법

## 1. 일러스트에서 이미지를 그린다.
크기도 이 때 맞쳐주자. (파일 > 문서설정에서 단위를  mm로 맞춰준다.)
![](https://cl.ly/803ac9/Image%202020-01-12%20at%208.15.55%20%EC%98%A4%EC%A0%84.png)

## 2. create outline
일러스트의 오브젝트 > 패스 > 윤곽선 (outline) 명령으로 아웃라인으로 만든다.

![](https://cl.ly/026e6b/Image%202020-01-12%20at%208.19.38%20%EC%98%A4%EC%A0%84.png)

패스파인더를 사용해 겹친 부분은 모두 하나의 오브젝트로 만든다. (합치기)  
이 때 베지에 곡선은 모두 콘트롤 포인트로 전환된다.           
![](https://cl.ly/995ed2/Image%202020-01-12%20at%208.21.04%20%EC%98%A4%EC%A0%84.png)

## 3. export SVG
내보낼 개체를 선택한 후 파일 > 선택항목 내보내기 로 .SVG로 내보낸다.
![](https://cl.ly/96cee7/Image%202020-01-12%20at%209.10.02%20%EC%98%A4%EC%A0%84.png)

## 4. fill="black"
.svg 파일을 텍스트 에디터로 열어서 'path'태그 다음에 fill="black" 이라는 문구가 있는지 확인하고, 없다면 직접 써 넣는다. 저장한다.
![](https://cl.ly/336b04/Image%202020-01-12%20at%209.11.23%20%EC%98%A4%EC%A0%84.png)

## 5. svg -> eagle polyline converter
편리한 올라인 컨버터를 누군가 만들어두었다.
https://gfwilliams.github.io/svgtoeagle/
소스코드: https://github.com/gfwilliams/svgtoeagle

로고가 올라갈 레이어를 정하고, (보통 tPlace가 적당..)
output format은 library가 이후 활용이 편리하다.
파일을 업로드하고 convert!  버튼을 누른다.
![](https://cl.ly/230928/Image%202020-01-12%20at%209.19.26%20%EC%98%A4%EC%A0%84.png)

맨 아래쪽의 download eagle script 버튼을 눌러 스크립트를 받는다.

## 6. 스크립트 실행
이글을 열고 새로운 라이브러리를 연다.
새로운 footprint를 추가하고 앞서 저장한 스크립트를 실행한다.
혹은 콤맨드라인에 명령어를 복사-붙여넣기 한다.

![](https://p195.p4.n0.cdn.getcloudapp.com/items/8LuwYeWw/Image+2020-01-17+at+3.17.22+PM.png?v=728ed10c2873c9e3a1179f6de9ce4d65)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/kpumlvZq/Image+2020-01-17+at+3.14.31+PM.png?v=2d4b13d9616711bde0d9dc7458e2c537)

## 7. 라이브러리 저장
새로운 디바이스를 만들어 footprint와 심볼을 추가하고 저장.
