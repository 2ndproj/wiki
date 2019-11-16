# github 와 mdwiki 사용해 wiki 서비스 만들기
[mdwiki 공식페이지](http://dynalon.github.io/mdwiki/#!index.md)  
 html 대신  markdown으로 웹페이지를 만들 수 있도록 해주는 툴. javascript를 사용해 완전하게 클라이언트쪽에서만 작동하도록 만들어져 있어 복잡한 서버 프로그래밍이 필요없다. 그냥 호스팅 공간에  'mdwiki.html'과 markdown으로 씌여진 페이지를 함께 넣어두는 것으로 끝.

note:
원래 계획은 ['drive2web'](https://drv.tw/)을 사용해 구글 드라이브에 파일을 올리면 자동으로 위키가 업데이트 되도록 하는 것이었으나 계획대로 잘 작동하지 않음. 구글 드라이브 대신 [github 호스팅 기능](https://pages.github.com/)을 사용하는 것으로 ...

## github 페이지 만들기
[github page 만들기 도움말 문서](https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site)  

1. 새로운 repository를 만든다.
![](https://help.github.com/assets/images/help/repository/repo-create.png)

2. 사용할 계정(혹은 조직)을 선택하고  repository 이름을 정한다.
![](https://help.github.com/assets/images/help/repository/create-repository-owner.png)
3. public/ private 를 정한다. 무료 계정은  public만 가능하다.
![](https://help.github.com/assets/images/help/repository/create-repository-public-private.png)

5. 'create repository'를 눌러  리포지토리만들기를 완료한다.
6. 자동으로 리포지토리 페이지로 넘어와 있을 것이다. 'settings'를 누른다.
![](https://help.github.com/assets/images/help/repository/repo-actions-settings.png)
7. 'github pages'섹션 아래에 'source'를 'master branch'로 선택한다.
8. 'github pages'섹션에 표시된대로 웹페이지에서 **https://<사용자이름>.github.io/<프로젝트명>/README.md** 로 접속해 페이지가 열리는지 확인한다.
9. 이제부터 리포지토리에 원하는 문서를 푸시하면 위 주소로 들어가 볼 수 있다. 특히  'index.html'문서를 만들어 넣어두면 구지 파일명을 쓰지 않아도 **https://<사용자이름>.github.io/<프로젝트명>** 으로 연결하면 자동으로  'index.html'문서가 열리게 된다.(웹 세계의 약속이다)

## 나만의 도메인사용하기
1. 여기서는  [gabia.com](gabia.com)을 통해 미리 확보해둔 '2ndproj.com' 도메인을 사용한다. [godaddy](https://godaddy.com)이나 [고도호스팅](https://godohosting.com)등등 맘에 드는 도메인 등록대행업체를 통해 도메인을 확보하도록 한다.

2. ~~가비아의 '포워드' 서비스를 사용해  '2ndproj.githun.io/wiki/' 주소를 '2ndproj.com' 도메인으로 연결한다.~~
 DNS 관리 툴을 사용해 A record를 추가한다. '@'와 'www', 'wiki'를 github의 주소'185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153'에 연결한다.
 참고: https://help.github.com/en/github/working-with-github-pages/managing-a-custom-domain-for-your-github-pages-site  
![](https://p195.p4.n0.cdn.getcloudapp.com/items/nOuWbJOJ/Image+2019-11-04+at+3.41.32+AM.png?v=3f92d0574ca685ec95fc6ad3f647d302)

3. github 페이지의 settings 탭에서
'Github pages' -> Custom domain 에 내 도메인(여기서는 2ndproj.com)을 입력하면 CNAME파일이 자동생성된다. 아래쪽의 HTTPS사용에도 체크한다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/Jruw859r/Image+2019-11-04+at+3.44.35+AM.png?v=63a509df7decf193bbacd02897857857)

Note: 서버측 변경사항이 바로바로 적용되지 않는 경우가 많은데, 네임서버에 전파되는데 시간이필요하기도 하고(24시간정도), 이도 아니라면 대부분 브라우저에 캐시가 업데이트 되지 않고 예전 페이지를 사용하기 때문이다. 캐시를 삭제한 후 페이지 리로드하면 잘 된다.
(맥os&크롬의 경우 -> [shift]+[command]+[delete] -> 캐시된 이미지 또는 파일 ->인터넷 사용기록 삭제)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/2NuA7wbn/Image+2019-11-02+at+9.58.10+AM.png?v=bf0b6d536a49161f1fea547b4c18d8af)

4. github에서 새로운 파일이 생겼으므로 로컬 저장소에소  pull해서 동기화 해준다.

## mdwiki github에 설치
[참고: mdwiki 공식 설치튜토리얼](http://dynalon.github.io/mdwiki/#!tutorials.md)
원래 계획은 구글드라이브를 사용하는 것이었으나 구글드라이브가 호스팅 기능 지원을 폐지하는 바람에 여기서는 github에 설치하는 것으로 진행한다.

### mdwidi-seed  복사
[링크](https://github.com/exalted/mdwiki-seed)에 mdwiki 개발자가 제공하는 가장 단순한 형태의 샘플페이지가 있다. 이를 내 리포지토리에 복사하는 것으로 시작한다.

 실질적인 내용은 모두 'll_CC' 폴더에 담겨있다. 루트의 index.html파일은 사실 텅 빈 채 ll_CC폴더의  index.html파일을 불러오도록만 되어있다.

 편리한 [sourcetree](https://www.sourcetreeapp.com/)를 사용해 git 저장소 관리한다.

  1. local에 앞으로 wiki내용을 담을 폴더를 새로 만든다. 여기서는 'wiki'라는 이름으로 만들었다.

  2. 원격 저장소로부터   'URL에서 복제''하여 새로운 local 저장소를 만들고 그 위치는 방금 만든 wiki폴더로 한다.
  ![](https://p195.p4.n0.cdn.getcloudapp.com/items/v1uyQ95D/Image+2019-11-04+at+4.04.40+AM.png?v=07977d4f14c752bbe2cd9d31f82a5927)

  3. [위 링크](https://github.com/exalted/mdwiki-seed) 의  mdwiki-seed를 복사하는 것으로 mdwiki를 최초 설치하면 되는데, 여기서는 디렉토리 구조를 심플하게 하고싶었기에 저장소를 그대로 clone하는 대신 파일을 직접 복사해 내 로컬 저장소에 옮기는 방식으로 다른 내용을 모두 지우고  ll_CC폴더 내용을 최 상위로 올렸다. 즉 아래와 같이 만들었다.  
![](https://p195.p4.n0.cdn.getcloudapp.com/items/NQueN7Oq/Image+2019-10-31+at+4.29.27+AM.png?v=0031ef13c15bcac6eeba10667d35741d)

 4. github 원격저장소에  push한다.
 4. 이제 https://2ndproj.com 에 접속하면 mdwiki 기본 페이지가 표시된다.

## 페이지 레이아웃
### mdwiki가 보여주는 .md 파일
![](https://p195.p4.n0.cdn.getcloudapp.com/items/wbuezzBE/Image+2019-10-31+at+5.27.44+AM.png?v=11227f520cac09e23c9225ce34eafb79)

A. 다른 페이지 (.md 파일)로 갈 수 있는 navigation bar. 폴더 내  navagation.md파일로 편집한다. [참고](http://dynalon.github.io/mdwiki/#!quickstart.md)
B. 문서 내 1단계 제목 (**#** blarblar)이 이곳에 온다
C. 문서 내 2단계 제목 (**##** blarblar)가 이곳에 온다
D. C.항의 섹션을 모아서 이곳에 보여준다. 문서내의 항목으로 빠르게 이동할 수 있는 내비게이션 제공.

### Theme
다양한 테마를 사용할 수 있다.  참고: http://dynalon.github.io/mdwiki/#!customizing.md
![](https://p195.p4.n0.cdn.getcloudapp.com/items/mXu7Yxy0/Image+2019-10-31+at+5.42.40+AM.png?v=252f8ae49b7eee4ead714e459d0c25e7)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/WnuAy7lv/Image+2019-10-31+at+5.43.42+AM.png?v=52e8b8db36296a136edf3ffc9442c1d4)
![](https://p195.p4.n0.cdn.getcloudapp.com/items/04ukEQAz/Image+2019-10-31+at+5.44.33+AM.png?v=6cade11ce698e68242664e7f2a00fb8d)

### 제목변경
config.json에서 제목 변경할 수 있다.
이 외에도  사이드메뉴 표시여부, 줄바꿈 설정, 푸터 텍스트 설정 등등을 위해  config.json파일을 사용한다.
자료에 의하면  아무 내용이 없더라도 config.json을 만들어 두는 것을 추천한다.
참고: http://dynalon.github.io/mdwiki/#!customizing.md

### 상단 navi 메뉴수정
navigation.md 문서를 통해 상단 메뉴를 커스텀 할 수 있다.

## 표지 index.md 자동생성
index.md는  mdwiki가 설치된 페이지가 열릴때 기본으로 보여지는 대문이다.  mdwiki.html (혹은 이름을 바꾸었다면 index.html)에의해 자동으로 불려진다.
이 페이지에 wiki의 내용이 모두 디렉토리 형식으로 쭉 나열되어있다면 처음 오는 사람도 쉽게 원하는 내용을 찾을 수 있을 것이다.
이렇게...
![](https://p195.p4.n0.cdn.getcloudapp.com/items/geuYD5Ox/Image+2019-11-14+at+12.47.25+PM.png?v=6791106026d33bafe695c3f6dbe812ef)

이를 위해 디렉토리 구조를 읽어 위와같은 형태로  index.md파일을 만들어주는 파이썬 스크립트를 사용한다.  
index-gen.py: https://github.com/2ndproj/wiki/blob/master/index-gen.py
* glob 모듈을 사용해 디렉토리 내용을 리스트로 만든다
* 각 리스트에 대해...
  * 항목이 폴더라면 재귀적으로 다시 glob을 사용해...
  * 항목이 .md파일이라면 첫줄을 제목으로 한 링크를 생성한다. 이때 링크는 mdwiki.html에 대한 상대경로로한다.
* 위 내용을 index.md파일로 쓴다. 기존에 파일이 있다면 덮어쓴다.
[gimmick:gist](cf36151a1b47fc61d22b05b49a6ceff2): https://gist.github.com/lhdangerous/cf36151a1b47fc61d22b05b49a6ceff2

note:
그러니까 wiki폴더에 새로운 항목이 추가되거나 폴더 구조가 바뀌거나 파일명이 바뀌거나 할 때마다 'index-gen.py'를 한 번씩 실행시켜 주어야 한다.

note:
장차 /wiki 내용이 수정되면 자동으로 index-gen을 실행하고 github에 커밋&푸시하도록하는 방법을 생각해보면 편리할 듯.

## disqus를 사용해 댓글 시스템 부착
디스커스에 가입& 페이지를 만들고 index.md에
```
[gimmick:disqus](2ndproj)
```
와 같이 넣어주기만 하면 된다. (여기에서 2ndproj는 disqus shortname)
...고 하는데, 실제 해보니 mdwiki.html이 dusqus시스템을 부를 때 https가 아닌 http를 사용하는 이유로 크롬등의 브라우저에서 제대로 로딩되지 않는 오류 발견.
때문에  mdwiki.html(혹은 index.html)내용을 조금 수정해 주어야 한다.
마찬가지 이유로 youtube 삽입도 잘 안된다. 한꺼번에 수정한다.

* mdwiki.html (이름 바꾸었다면 index.html)을 텍스트 에디터로 열고,
* "http"가 포함된 문장을 모두 찾아
* "https"로 바꾼다.
* github에 푸시하고 브라우저로 열어보면 이제 잘 된다.

![](https://p195.p4.n0.cdn.getcloudapp.com/items/kpudr9A2/Image+2019-11-14+at+2.33.54+PM.png?v=85349aaecf012af92715d51be4b001cd)

## 문서 작성
이제  /wiki 아래에 항목별로 디렉토리를 잘 만들고 .md문서를 작성하면 된다. 조금 더 구체적으로는
1. .md 문서 작성. 마크다운 문법에 맞추어 쓴다.
2. index-gen.py 실행. -> index.md문서가 위의 새로 작성한 문서 반영하여 자동으로 업데이트된다.
3. https://github.com/2ndproj/wiki 에 푸시
4. 브라우저로 https://2ndproj.com 에 접속해 문서 확인

note:
분명 문서를 업데이트 했는데 원격에서 잘 안 보이는 경우 브라우저에 저장된 캐시에서 읽어오기 때문이다. 인터넷 사용기록 삭제 -> 캐시이미지 또는 파일 삭제 후 다시 접속 해 보면 잘 된다.

note:
마크다운 표준 문법을 포함해 문서 작성법은 별도 페이지로 곧 만들자.

### 문법
자주 사용될 법한데 마크다운 표준이 아닌 용법들만 조금 정리하자면...
* 동일한 저장소 내의 파일 링크: `[표시되는문자](mdwiki.html의 위치를 기준으로한 상대위치)`   

  >예) [아두이노 블루투스 샘플코드](/Android/App Inventor/App inventor + Bluetooth/Arduino+appInventor_bluetoothTest.ino)

* youtube 영상 삽입: `[](유튜브링크)`
  >예) [[(http://www.youtube.com/watch?v=RMINSD7MmT4)

* 경고문구: `키워드: 어쩌구...`

  Type       | Trigger
  -----------|---------
  Warning    |warning, achtung, attention, warnung, atenci처n, guarda, advertimiento, attenzione
  Note       |note, beachte, nota
  Hint       |hint, tip, tipp, hinweis, suggerimento

Preview:

Attention: This text is important.

Note! This is a note.

Hint: This is a hint.
