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
