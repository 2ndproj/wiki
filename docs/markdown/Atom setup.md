# Atom
github에서  오픈소스로 만들고 있는 텍스트 에디터.  sublime text 와 이념이 비슷. 단순하지만 무궁무진한 확장기능을 사용할 수 있다.

## 설치
https://atom.io/ 에서 다운받아 설치 할 수 있다. 윈도, 맥, 리눅스 다 지원된다.

## 자동완성 기능끄기
추천 단어가 하나일 때, 자동완성 추천 단어를 사용하고 싶지 않은데 자꾸 자동으로 입력이 되어버려서 곤란한 경우가 있다. 자동완성 기능을 끄자.
![](https://cl.ly/5fbb48/Image%202019-07-08%20at%202.53.17%20PM.png)
atom 메뉴 > preferences... > packages > core packages > auto complete plus >
 automatically confirm single suggestion 옵션을 끈다.
 짱 편해진다.

 ## 폭이 좁은 작업창에서 글줄 자동으로 바꾸기 (soft wrap)
 ![](https://cl.ly/44dd89/Image%202019-08-01%20at%203.33.59%20PM.png)

## 마크다운 미리보기 설정
markdown-preview 플러그인이 atom에 기본 포함되어있으나 좀 더 기능이 풍부한 **markdown-preview-enhanced** 를 사용하자.
* .md파일이 열릴 때 자동으로 미리보기 창 열림
* 편집창과 미리보기창 위치  sync됨. 매우 편리함!!
* 이미지 업로드기능 (아래에 상술)

### 줄바꿈 방식 변경
오리지널 마크다운에서는 문장끝에서 엔터를 두 번 눌러야지만 줄바꿈이된다.
이는 지금까지의 습관과는 다르기 때문에 githubfravored style에서는 엔터 한 번만 눌러도 줄바꿈이 되도록 한다.

![](https://p195.p4.n0.cdn.getcloudapp.com/items/4gu7v6bR/Image+2019-11-15+at+11.40.33+AM.png?v=5bb7e92219d1b507c1d208b327b12a79)
before:![](https://cl.ly/9f5461/Image%202019-07-30%20at%206.23.34%20PM.png)
after:
![](https://cl.ly/b471c7/Image%202019-07-30%20at%206.23.59%20PM.png)

참고로 행 끝에서 스페이스x2는 줄 바꿈을 의미한다.
깃허브스타일이 아닌 표준 렌더링을 사용하는 다른 마크다운 뷰어에서도 예쁘게 보이려면 스페이스 두번을 사용하는 쪽이 좋다.

### 문서에 이미지 넣기.
markdown-preview-enhanced의 가장 마음에드는 기능 중 하나는
이미지 업로드 기능이다. 이미지 파일을 드래그해 넣기만 하면  'imgur'와 같은 이미지 공유서비스에 자동으로 이미지를 업로드하고 링크를 생성한다.(가입필요없음)

![](https://p195.p4.n0.cdn.getcloudapp.com/items/xQuvmBPX/Screen+Recording+2019-11-15+at+11.28+AM.gif?v=76f338867c89b3c2ba4aa83b7e9efcb6)

package > markdown-preview-enhanced > image uploader와 drop image to editor 항목을 아래와 같이 체크한다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/bLup24pl/Image+2019-11-15+at+11.46.35+AM.png?v=0049ddf9d646a1c3463b8e521e83ee50)

### script 패키지 설치
* Atom > Preferences...> package > install
'script' 검색해서 설치. 아톰 편집창에서 바로 python 실행사켜줌
* (단축기 command+i)
* python2 가 아닌 python3가 기본 실행되도록  script 패키지의 내용을 수정한다.  
참고: https://stackoverflow.com/questions/35546627/how-to-configure-atom-to-run-python3-scripts
>i am using "script" package (3.18.1 by rgbkrk) to run code inside atom and this is how i fixed it
>
>open package settings -> view code
open lib -> grammars -> python.coffee
change from python to python3 in those two places 'Selection Based' and 'File Based'

* script 는 현재 한글 사용에 문제가 있다. unicode 문자를 원활히 사용하기 위해서는 + 여러가지 문제가 있어서 터미널에서 실행시키는 것을 권장한다. (그렇지 않으면  유니코드 어쩌고 하는 에러 발생함.)

###  atom-python-virtualenv  패키지 설치
* Atom > Preferences...> package > install
'atom-python-virtualenv' 검색해서 설치.
* shift-command-p  로 명령모드 들어가서 'virtualenv' 명령으로 새로운 가상환경 만들거나 선택, deavtivate 할 수 있다.
