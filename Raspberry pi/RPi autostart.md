# Raspberry pi 프로그램 자동시작하기
## '/etc/rc.local' 파일 사용
부팅과정에서 사용자 로그인 직전단계에 실행된다. 즉, root계정으로 실행된다는 점 유의.
디렉토리 위치에 특히 주의한다.

```bash
$ sudo nano /etc/rc.local
...
```
* 맨 밑에 `fi`와 `exit 0`사이에 원하는 프로그램 실행 코드를 넣자.
* 모든 경로는 절대경로로...
* 뒤에 `&`을 붙여 백그라운드로 실행시키는 것을 추천. 만일 코드에 문제가 있어 부팅이 안되는 경우, 이러지도 저러지도 못하는 사태가 발생할 수 있다.
* 로그를 기록해서 무슨이 벌어지는지 확인하자 ( `2>&1` 참고: https://www.brianstorti.com/understanding-shell-script-idiom-redirect/)

```bash
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi
cd /home/pi
/usr/bin/python3 /home/pi/myCode.py & > /home/pi/log.txt 2>&1
exit 0
```

HINT: python 스크립트가 생각대로 시동시에 작동하지 않아 이래저래 시도 해보았더니, pip를 사용해 설치한 모듈이 root계정에서 읽히지 않기 때문인 경우가 있었다.  이 경우 `sudo pip ...`로 모듈 다시 설치하자 잘 되었다.

## systemd 사용
systemd에서 'd' 는 daemon 을 뜻하는 것으로, 리눅스에서 데몬 프로세스들을 관리하는 현대적이고 세련된 방법이라고 한다.
참고: https://stackoverflow.com/questions/45776003/fixing-a-systemd-service-203-exec-failure-no-such-file-or-directory

'autostart_cam.sh'스크립트를 부팅과 동시에 'pi'계정에서 자동실행하는 예제:

### 1. 'autostartcam.service'파일을 만든다.
만들고 내용을 아래와 같이 넣는다.
* multi-user 환경이 완성되면 (부팅이 모두 끝나고 pi 계정을 사용할 준비가 되면) autostartcam Service 를 시작하는 스크립트.
* 모든 경로는 결대경로로.
* type idle 은 부팅이 완료된 후 작동함을 의미.
* autostart_cam.sh가 셸 스크립트 이므로  / bin/bash를 사용해 실행시켜준다.

```bash
$ sudo nano /lib/systemd/system/autostartcam.service
...
[Unit]
Description=autostart camera when boot up
After=multi-user.target

[Service]
Type=idle
User=pi
ExecStart=/bin/bash /home/pi/autostart_cam.sh

[Install]
WantedBy=multi-user.target
```
### 2.  autostartcam.service 파일의 권한은 644로...
```bash
$ sudo chmod 644 /lib/systemd/system/autostartcam.service
```
### 3. systemd 에 방금만든 autostartcam service 등록
```bash
$ sudo systemctl daemon-reload
$ sudo systemctl enable autostartcam.service
```
### 4. 재부팅 후 테스트
```bash
$ sudo reboot
...
```
정상적이지 않은 것 같다면 서버스의 상태는 다음 명령으로 확인해 볼 수 있다.
```bash
$ sudo systemctl status myscript.service
```
