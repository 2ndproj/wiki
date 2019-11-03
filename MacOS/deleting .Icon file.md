# Icon\r 파일 삭제하기
맥 오에스의 각 폴더마다 `Icon\r`이라는 숨김파일이 생겨나 자꾸 귀찮게 한다.
git을 사용해 버전관리 할때 꼬이거나, 코드를 컴파일할때 에러를 뱉어내는 원인이 된다.

주어진 폴더의 (하위 폴더 포함) 모든 Icon\r 파일을 찾아 지우는 방법은 다음과 같다.

```bash
$ find ./myFolder -type f -name 'Icon?' -print -delete;
```
참고: https://superuser.com/questions/298785/icon-file-on-os-x-desktop  
