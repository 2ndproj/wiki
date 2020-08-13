# Linux 완전 기본 명령어
## 파일관리
* ls : 디렉토리 내용보기
  -ㅣ : 길게보기
  -a : 숨은파일 (.으로 시작하는 파일)보기
* cp : copy
* mv : move, 이름바꾸기
* rm : remove
  -r : recursive (하위 디렉토리도 삭제)
  -f : 묻지않고 바로 삭제
* touch 파일 생성

## 디렉토리
* / : 루트디렉토리
* ~ : 사용자 홈디렉토리
* . : 현재 디렉토리
* .. : 상위 디렉토리

* ls : 디렉토리 내용보기
  -ㅣ : 길게보기
  -a : 숨은파일 (.으로 시작하는 파일)보기
* echo qr* : qr로 시작하는 모든 파일 보기
            ( == $ ls | grep qr)

* cd : 현재디렉토리 변경
* mkdir : 디렉토리 생성
* rmdir : 디렉토리 제거 ( rm -rf과 비교)

## network
* ifconfig : ip 주소와 각 넥트웤 연결상태. lo는 로컬서버, eth0는 유선랜, wlan0는 wifi를 의미함. (새로운 'ip'명령어로 대체중..)
* route -n : 라우팅 테이블 / 이 컴퓨터에서 특정 주소로 연결하려 하면 어떤 경로를 통하게 되는지 / 를 보여준다.
* ping [host] : 특정 ip와 연결여부/ 통신 속도를 확인한다.
* traceroute [host] : 특정 host까지의 연결 경로와 소요시간을 보여준다. 이걸 보면  sk를 사용하는지  kt를 사용하는지 알 수 있다. 재미있다.
* host[host|ip] : 도메인명으로부터 ip주소를 알고자하거나  ip로부터 도메인 명을 알고자 할 때. (ip로부터 도메인명을 얻기는 힘들다)
* netstat : 현재 연결중인 포트 보기
    -t : TCP만 보기
* arp : tcp/ip프로토콜은 기본적으로 헤더에 송수신측 ip와 함께 송수신측의 mac주소도 포함하도록 하고있다. 컴퓨터에 보관중인 이 ip주소와  mac 주소의 쌍으로 이루어진 캐시를 확인하거나 업데이트 하기위해  arp를 사용한다. 즉, ip주소 <-> mac주소 관계를 확인하고 수정할 수 있다.
* scp : ssh 를 사용한 호스트간 파일 복사
    예를 들어 이쪽 컴퓨터의  myfile.txt파일을 라즈베리의 홈디렉토리 아래에 /dir/ 에 복사한다면...
    $ scp myfile.txt pi@192.168.0.108:~/dir/
* ssh-keygen : .ssh/known_hosts 파일에 저장된 암호키 설정 관련
    특히
    ```
    @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ECDSA key sent by the remote host is
SHA256:hPQ8TTIMyMGdoorWRDPbu4w19IdHd1561EA5+LdH4WM.
Please contact your system administrator.
Add correct host key in /Users/sh/.ssh/known_hosts to get rid of this message.
Offending ECDSA key in /Users/sh/.ssh/known_hosts:103
ECDSA host key for 192.168.0.108 has changed and you have requested strict checking.
Host key verification failed.
```
와 같은 메시지와 함께  ssh  연결이 안되는 경우, 동일한 ip의 이전과 다른 호스트에 연결하려하기 때문에 발생하는데,
```
$ ssh-keygen -R 192.168.0.108
```
과 같이 -R 옵션으로 목록상의 키값을 새롭게 수정하면 해결된다.
