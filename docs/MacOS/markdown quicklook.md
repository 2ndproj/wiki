# 마크다운(markdown) 문서 미리보기(quicklook)
'qlmarkdown' 프로그램을  homebrew를 사용해 설치하면 된다.
이때, GUI 환경에서 작동하는 프로그램을 brew를 사용해 설치할 때는  'cask' 라는 확장 프로그램이 필요하다.

## brew 설치
이미 설치되어있는 것으로...

## cask 설치
cask는 consol용 어플리케이션만 관리할 수 있는 homebrew의 기능을 확장해 GUI 어플리케이션도 관리하도록 하는 확장 프로그램이다. 말하자면 macOS app store의 opensource 버전이라고 할 수 있다.
```bash
$ brew install cask
```

## qlmarkdown 설치
```bash
$ brew cask install qlmarkdown
```

![||600](https://cl.ly/5ae186b952b2/download/Image%202019-02-22%20at%208.44.27%20%EC%98%A4%EC%A0%84.png)
잘된다 ^^

note: catalina에서 실행되지 않는 경우-> 참고: https://github.com/toland/qlmarkdown/pull/91
>Download QLMarkdown.qlgenerator.zip and unzip
>
```$ mv ~/Downloads/QLMarkdown.qlgenerator ~/Library/QuickLook/QLMarkdown.qlgenerator
$ xattr -rd com.apple.quarantine  ~/Library/QuickLook/QLMarkdown.qlgenerator
$ qlmanage -r
```
>try xattr without sudo, but you can use it if needed
>Tell me if this process work fine to you, or if you need to use sudo or not, if you need to do extra work
