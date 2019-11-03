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

<s>## 줄바꿈 설정
윈도에서는 그렇지 않은 것 같은데, mac에서는 라인 끝에서 한글 입력시 글자 입력이 끝났는데도 글자 입력이 끝나지 않은 것으로 인식해 다른 곳에 커서를 가져가 글을 쓰려하는데 원래의 라인 끝으로 돌아와있는 현상이 있다. 말로하니 복잡한데 암튼 엄청 번거롭고 신경쓰인다. 아래와 같이 라인끝 처리를  CR+LF로 강제하면 해결된다.(**리눅스에서 코드 실행시 에러 발생하는 등 부작용 있으니 선택적으로 활용!**)
![](https://cl.ly/fd464a/Image%202019-08-02%20at%207.29.51%20PM.png)</s>


## 마크다운 미리보기 설정
원조 마크다운에서는 single-line break 는 줄바꿈 하지 않는 것이 디폴트. 그러나 이건 되게 불편하므로  github-favored 대로 줄바꿈 하는 것으로 설정하자.
![](https://cl.ly/78f0b9/Image%202019-07-30%20at%206.22.30%20PM.png)

before:![](https://cl.ly/9f5461/Image%202019-07-30%20at%206.23.34%20PM.png)
after:
![](https://cl.ly/b471c7/Image%202019-07-30%20at%206.23.59%20PM.png)

참고로 행 끝에서 스페이스x2는 줄 바꿈을 의미한다.
아톰이 아닌 다른 마크다운 뷰어에서도 예쁘게 보이려면 스페이스 두번을 사용하는 쪽이 좋다.

# 폭이 좁은 탭에서 글줄 자동으로 바꾸기 (soft wrap)
![](https://cl.ly/44dd89/Image%202019-08-01%20at%203.33.59%20PM.png)

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
