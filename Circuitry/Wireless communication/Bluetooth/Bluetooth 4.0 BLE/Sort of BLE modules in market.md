# BLE 모듈 제품명 알아보기
흔히 쓰이는  BLE 모듈로 HM-10이 있다. 그리고 수많은 유사품들(HC-08 등)과 CC41등  같은 BLE 모듈이라고 다 같은 BLE  모듈이 아니다. (대부분 동일하게 TI의 CC2541chip에 기반하고있지만) 사용가능한 명령어 셋이라든지, 초기 설정등이 조금씩 다르기 때문이다.
아예 모양이 확연히 다르다면, 그리고 라벨이 명확히 인쇄되어있다면 좋겠지만 비슷비슷한 모양에 라벨링도 안되어있는 제품들이 서랍에 쌓여있는 것이 현실.

**그래서 누군가 만들었다. 지금 연결된 것이 어떤 BLE 모듈인지 알아내는 아두이노 스케치.**

## 다운로드
[파일:Arduino-ble-ident-n-set-master.zip](/Volumes/data/Users/sh/Google 드라이브/wiki/Circuitry/Wireless communication/Bluetooth/Bluetooth 4.0 BLE/Arduino-ble-ident-n-set-master.zip)

1. 압축풀고 폴더 안에있는  .ino파일을 아두이노에 업로드하고
2. 시리얼모니터를 켜고 살펴본다. (115200baud로 연결.)
3. 시키는대로 BLE모듈의 rx / tx  를 아두이노의 임의의 핀에 꽂고 어디에 꽂았는지를 시리얼 모니터에 입력해준다. (ble의 rx가 아두이노의 tx, ble의 tx가 아두이노의 rx라는 점 주의!)
4. 기다린다.

## 참고
[제작자 홈페이지](https://blog.yavilevich.com/2016/12/hm-10-or-cc41-a-module-automatic-arduino-ble-module-identification/)
