# Raspberry pi USB를 통한 network 설정
Pi-zero는 이더넷 소켓이 없으므로 USB 포트를 통해 pc와 네트웍 연결되도록 한다.
### 1. PC에서 `/boot` 디렉토리의 `config.txt`파일을 열어서 편집한다.

‘dtoverlay=dwc2’ 라는 항목이 있는지 살펴보고 없다면 추가한다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/kpuK8PnL/7b7528f8-c685-435d-b97d-3ed7d737eca9.jpg?v=bad8f004088e50d8d4c1ae4e93855f8b)

### 2. 또한 `cmdline.txt`파일을 열어서 아래와 같이 `rootwait` 뒤에 한 칸 띄고 `modules-load=dwc2,g_ether`를 추가한다. 
before:
```bash
console=serial0,115200 console=tty1 root=PARTUUID=ea7d04d6-02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait quiet init=/usr/lib/raspi-config/init_resize.sh splash plymouth.ignore-serial-consoles
```

after:
```bash
console=serial0,115200 console=tty1 root=PARTUUID=ea7d04d6-02 rootfstype=ext4 elevator=deadline fsck.repair=yes rootwait modules-load=dwc2,g_ether quiet init=/usr/lib/raspi-config/init_resize.sh splash plymouth.ignore-serial-consoles
```

### 3. Pc측에서 USB를 네트워크 포트로 사용할 수 있도록 windows에 RNDIS드라이버를 설치해야 한다. 아래 드라이버 파일을 받아 압축을 풀어둔다.
다운로드 1: [http://web1.moddevices.com/shared/mod-duo-rndis.zip](http://web1.moddevices.com/shared/mod-duo-rndis.zip)
OR 다운로드 2: [https://bit.ly/3xjDQh1](https://bit.ly/3xjDQh1)

### 4. sd 카드를 pi-zero에 삽입하고, pc와 usb로 연결한다. 이때, PWR가 아닌 USB에 연결한다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/yAuD17BG/e709a996-1285-4301-84d8-e0ddd3868fff.jpg?v=d465a98420f0db474cedc839587bb761)

### 5. 장치관리자를 열어 com&lpt 항목에 있는 라즈베리파이를 우클릭한다. (여기서는COM9)
<img src="https://p195.p4.n0.cdn.getcloudapp.com/items/mXuqX2yJ/%E1%84%80%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B71.png?v=f4195cbdd63bc58c555ee8149102238c" height =80>

### 6. 드라이버 업데이트 > 컴퓨터에서 드라이버 검색 > 압축 풀어둔 RNDIS 드라이버 폴더 선택
![](https://p195.p4.n0.cdn.getcloudapp.com/items/WnuNnDr1/%E1%84%80%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B71.png?v=6bd1478f0861f3043e8a824075750466)

### 7. 이제 장치관리자에서 ‘네트워크 어댑터’ 아래에 ‘USB Ethernet / RNDIS Gadget’이 보인다.
<img src="https://p195.p4.n0.cdn.getcloudapp.com/items/KouW61wZ/%E1%84%80%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B71.png?v=7b58fb715cdf82cb0ea6eda3a2aad69c" height=300>

### 8. 인터넷 연결 공유
라즈베리파이에서 인터넷 사용할 수 있도록 pc의 인터넷 연결(이더넷 혹은 wifi)을 공유 허용해준다.
시작메뉴 우클릭 > 네트워크 연결 > 어댑터 옵션 변경 > 현재 인터넷 연결된 네트워크(이더넷 or wifi) 선택 우클릭 > 속성 > 공유 > ‘다른 네트워크 사용자가 이 컴퓨터의 인터넷 연결을 통해 연결할 수 있도록 허용’ 선택 > 확인
![](https://p195.p4.n0.cdn.getcloudapp.com/items/9ZuApgBJ/%E1%84%80%E1%85%B3%E1%84%85%E1%85%B5%E1%86%B71.png?v=25cfef9f4dfcf3fa9e9f3a4df404650c)