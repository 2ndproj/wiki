# Visual Studio Code
microsoft에서 만드는 text editor. 
'Atom'과 같은 'electron'기반으로, 크롬웹브라우저로 만든 에디터라고 할 수 있다.
사실 마이크로 소프트에서 atom을 만드는 'github'인수 후에 내 놓은 atom의 형제 프로그램이다.
공식페이지: https://code.visualstudio.com/ 

## markdown style 바꾸기
'vs code'가 사용하는 기본 markdown 스타일은 제목과 본문이 구분이 잘 안되어 보기 좋지 않다. github에서 사용하는 스타일로 바꾸어준다.

'Markdown Preview Github Styling Extension'을 설치한다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/nOuNnWgX/Image+2020-03-03+at+11.55.35+AM.png?v=5c34a1c4850a562b8999ba230b8dd04a)

물론 css 코드를 추가해 나만의 스타일을 만들 수도 있다.

## checkbox  지원
github 표준에 포함된 checkbox <input type="checkbox" name="chk_info" value="HTML"> , <input type="checkbox" name="chk_info" value="CSS" checked="checked"> 를 vs code에서는 기본지원하지 않는다.
custom css를 추가하는 방법도 있을 것 같지만, 익스텐션을 사용하면 쉽게 쓸 수 있다.
 Markdown Checkboxes : https://marketplace.visualstudio.com/items?itemName=bierner.markdown-checkbox 
 ![](https://raw.githubusercontent.com/mjbvz/vscode-markdown-checkboxes/master/docs/example.png)

## imgur  이미지 자동 업로드
markdown image  플러그인을 설치하면 클립보드에 저장된 이미지를  `Alt + Shif + V` 키를 눌러 자동으로 imgur등에 업로드하고 마크다운 이미지 태그를 생성한다.
### 설정
* 업로드 위치를 imgur로 설정 (디폴트는 로컬파일로 저장)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/kpu6mxXx/108110e6-ba6c-430d-a25e-f793d9f5c081.jpg?v=9eed8ffb63e085f0dd6603b3ca6792f2)
* imgur client ID 발급받기
api를 사용하는 client마다 고유키를 발급받아야한다. here를 눌러 발급
![](https://p195.p4.n0.cdn.getcloudapp.com/items/v1ujm8oK/cdd5e889-2fdc-41d9-80db-392d97b3b918.jpg?v=7cabf302926832585cfb520b69da054a)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/7KuAy914/8808fa22-0600-4567-b73a-284ac2326ce0.jpg?v=d96ebe1d5f630c4285d2e1e7a2f4644e)
* 발급된 클라이언트아이디 입력
![](https://p195.p4.n0.cdn.getcloudapp.com/items/WnukEPzj/ab919ecc-de04-4ef9-a2ff-00f4bfa996d0.jpg?v=998fca9cf9e319c78e7b9315e742ff33)

### 이미지 붙여넣기
* 이미지 복사 후 alt+shift+v 하면 잘 입력된다. 같은 네트워크의 아이폰에서 복사해서 붙여 넣어도 아주 잘된다. ^^

* 아이폰 카메라로 바로 찍어 바로 넣으려면 아이폰에 '자동화'를 하나 만들어준다.
![picture 7](https://i.imgur.com/qj9EJHR.png)  
* iphone에서 사진찍고 바로 열리는 공유메뉴에서 '복사'를 선택하고 vscode에서 붙여넣기한다.



