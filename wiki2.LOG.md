# mkdocs - markdown 문서로 웹페이지 만들기
mkdocs를 사용하면 markdown 으로 만든 문서를 간단하게 빠르게 웹페이지로 만들 수 있다.  
* 이미 만들어져 제공되는 프레임웍에 .md 파일만 넣으면 되므로 정말 간편하다.
* 다양한 예쁜 테마를 골라 쓸 수 있다.
* docstring과 함께 사용해 코드 주석을 살려 도큐멘테이션 하는데에도 유용하다. [참고](https://realpython.com/python-project-documentation-with-mkdocs/#step-4-prepare-your-documentation-with-mkdocs)
  
## mkdocs 설치
```bash
$ python3 -m pip install mkdocs mkdocs-material
```
## mkdocs 기본 프레임웍 생성
문서화 하고자 하는 폴더(여기서는 ~/wiki2)로 이동해 그곳에서 mkdocs 기본 프레임웍을 생성한다.
```bash
$ mkdocs new .
```
![picture 82](https://cdn.jsdelivr.net/gh/lhdangerous/images@main/47ceba556b3a263f7c5471d112b2f8aad5a3b43724b68aa111a5881e764398cc.jpg)  
 
* mkdocs 페이지 설정파일 'mkdocs.yml'과
  .md 문서들이 놓이게될 'docs' 폴더가 생성되었다.
* 'docs' 폴더 아래엔 index.md 가 있다.

## docs 폴더 아래에 .md 문서들 넣기
* 문서들을 넣는다.
* 문서간 링크는 되도록 모두 상대경로로 설정한다.
  
## 테스트 실행
```bash
$ mkdocs serve
```

* 웹브라우저로 https://localhost:8000 에 접속
![picture 83](https://cdn.jsdelivr.net/gh/lhdangerous/images@main/e5100fc9227272843d0fe246d53e14ab9ec0a72503d75bf83e6741c084828267.png)  

## 사이트명과 테마 바꾸기
* 'mkdocs.yml' 파일을 수정한다.
```
# mkdocs.yml

site_name: mySite

theme:
  name: "material"
```

## 빌드
```bash
$ mkdocs build
```
* 빌드하면 /site 디렉토리 아래에 static page가 생성된다.


## github로 호스팅하기
[github page 만들기 도움말 문서](https://help.github.com/en/github/working-with-github-pages/creating-a-github-pages-site)  

### github 리포지토리 만들기
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

### 로컬 리포지토리 만들기
사이트로 발행하고자 하는 '~/wiki2' 폴더에 git 리포지토리 만든다.
```bash
$ git remote add origin https://github.com/myUserName/myRepoName
$ git add .
$ git commit -m "initial commit"
```
### github 리포지토리에 프로젝트 푸시하기
<del>
* github에서는 'gh-pages' 브랜치의 내용을 자동으로 웹페이지로 호스팅한다. 
* 웹페이지로 발행하고자 하는 내용을 gh-pages 브랜치로 만들어주어야 한다.
* mkdocs에서는 'gh-deploy'명령으로 자동으로 gh-pages 브랜치로 이동할 수 있다.
  ```bash
  $ mkdocs gh-deploy
  ```
</del>


- github에 푸시한다.
  ```bash
  $ git push origin master
  ```

## 웹페이지 확인
'https://myUserName.github.io/myRepoName/site' 에 접속해 확인한다.

## 페이지 업데이트
* 대문화면은 '/docs/index.md'파일로 만든다.
* 메뉴 목록이나 기타 다양하게 모디파이 할 수 있다. 자세한 내용은 [링크](https://www.mkdocs.org/) 참조.
* 페이지 업데이트 할 때마다 github에 적용해야 한다. 
1. mkdocs 빌드
   ```bash
   $ mkdocs build
   ```
2. github에 push
   ```bash
   $ git add .
   $ git commit -m "memo..."
   $ git push origin master
   ```
   