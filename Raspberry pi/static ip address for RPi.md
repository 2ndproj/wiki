# 라즈베리파이에 고정 IP Address 부여하기
참고: https://pimylifeup.com/raspberry-pi-static-ip-address/

## 라우터 주소와 사용할 ip address 알기
 ip 충돌을 방지하기 위해 현재 유동 ip방식으로 연결되어있는 ip 주소를 사용하는 것을 추천한다.
 'ip r' 명령어를 통해 현재 ip와 라우터 주소 알아낸다.
 ```bash
 $ ip r
 ```
 ![](https://p195.p4.n0.cdn.getcloudapp.com/items/Z4u5DYPK/Image%202020-03-17%20at%205.49.06%20PM.png?v=a962e1be80cd87eb3286033dc4ea7f3e)

 'default via 192.168.0.1 dev wlan0 proto dhcp scr 192.168.0.105 metric 303' -> wifi연결에서 라우터 주소(192.168.0.1)와 현재의 ip(192.168.0.105)를 알 수 있다.

 ## DNS 서버 주소 알기
 대부분의 경우 라우터와 네임서버 동일하겠지만...
 ```bash
 $ nano /etc/resolv.conf
 ```
 ![](https://p195.p4.n0.cdn.getcloudapp.com/items/YEuAWpdw/Image%202020-03-17%20at%205.54.56%20PM.png?v=c194cbcbd4a657370d6bd8b1f2d7ecbe)
 192.168.0.1  가 네임서버다.

 ## dhcpcd.conf 설정파일 수정
 ```bash
 $ sudo nano /etc/dhcpcd.conf
 ```
 조금 아래쪽에 보면 주석처리 되어있는 static ip 설정 example이 있다. 여기에 사용할 각각의 주소를 집어넣어준다.
 ![](https://p195.p4.n0.cdn.getcloudapp.com/items/KouW1Bw1/Image%202020-03-17%20at%206.01.48%20PM.png?v=55089fd764775701867ad53e46874f5e)

> interface *NETWORK*
static ip_address=*STATICIP*/24
static routers=*ROUTERIP*
static domain_name_servers=*DNSIP*

* *NETWORK* : eth0 / wlan0 / usb0... 무선연결 사용한다면  wlan0.
* *STATICIP* : 사용할 고정IP 주소
* *ROUTERIP* : 라우터 주소
* *DNSIP* : 네임서버주소. 구글(8.8.8.8) 이나 Cloudflare(1.1.1.1) 사용해도 좋다.

## 리부팅후 테스트
```bash
$ hostname -I
```
![](https://p195.p4.n0.cdn.getcloudapp.com/items/2NuB75eD/Image%202020-03-17%20at%206.26.00%20PM.png?v=ccbd62f81babac095e86262a8ea1d521)
