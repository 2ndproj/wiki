# mit app inventor + littleBits BLE

mit app inventor로 어플리케이션을 만들어 littleBits BLE모듈과 연결하고자 한다.
![](https://cl.ly/pZeY/appInventor-littleBIts_BLE.gif)

참고 littleBits forum:
<http://discuss.littlebits.cc/t/is-it-possible-to-control-a-w30-ble-bit-from-a-custom-made-app/25376/6>

## 활용법
[LittleBits\_w30\_BLE.aia.zip](Circuitry/LittleBits/littleBits_w30_BLE.aia)
위 app inventor 소스를 다운받아 app inventor에서 import 한 후, 각 프로젝트에 맞게 수정해 사용한다.

## 코드 분석
확대해서 보자

![](https://cl.ly/pXZV/Image%202018-02-15%20at%206.10.17%20AM.png)
![](https://cl.ly/pXPB/Image%202018-02-15%20at%206.03.49%20AM.png)

note: BLE extention의 버그: apk로 설치해 실행시 WriteByte 블록 에러 "Runtime error failed resolution Lcom/google/common/collect/List"발생. ->
**ble extention이 버전 업 (v.2.1)되면서 해결됨. extension의 버전을 확인하자!**

[writebyte block 버그 해결된 BLE extension 다운로드](Circuitry/LittleBits/BLE-v2.1-rc4.aix)

참고: <https://www.google.co.kr/search?q=failed+resolution+of:+Lcom/google/common/collect/Lists%3B+app+inventor&ei=VcGEWtv2OMzC0gSjxL3ICg&start=0&sa=N&biw=1920&bih=983>
참고: <https://groups.google.com/forum/#!msg/mitappinventortest/at_zp8d4E_w/P_nT8enqCAAJ>
참고: <https://groups.google.com/forum/#!searchin/mitappinventortest/failed$20resolution$20/mitappinventortest/zjnHBb_FK7c/3RG77w-gBgAJ>

## 심화학습: littleBits BLE의 reverse-engineering
### BLE scanner app으로 littleBits BLE 모듈이 어떻게 작동되는지 살펴보자
BLE scanner app으로 연결해 살펴보았다.
<img src="https://cl.ly/pWVO/IMG_20180214_123843.jpg" width="500">

### UUID
**CUSTOM SERVICE UUID: 0705d0c0c8d841c9ae1552fad5358b8a
Cstom Characteristic UUID: 0705d0c2c8d841c9ae1552fad5358b8a**

### appinventor 에서 littleBits BLE 로 데이터 보내기
Khanning의 scratchx용 BLE extention 코드를 참고하여...
[khanning의 scratchx-littleBits extension github](https://github.com/khanning/littlebits-ble-extension/blob/gh-pages/littleBitsBLE_extension.js)

![](https://cl.ly/pVSi/Image%202018-02-14%20at%202.46.00%20PM.png)

**BLE bit에 write할 때는 byteWrite[ 0, 2, 전달하려는 값(0~255) ] 하면 된다.**

<img src="https://cl.ly/pWnQ/Screenshot_2018-02-14-15-34-33.png" width="500">

### littleBits BLE 에서 appinventor 로 데이터 보내기
**BLE bit에 연결된 버튼을 누르면, 뭔지 잘 모르겠지만 하여간 HEX값 3번째 byte가 01 -\> 255(0xFF)로 NOTIFY받는다.**

<img src="https://cl.ly/pWrQ/Image%202018-02-14%20at%2012.51.17%20PM.png" width="500">

## app inventor BLE extension 참고
다운로드: <http://appinventor.mit.edu/extensions/>
도큐먼트: <http://iot.appinventor.mit.edu/#/bluetoothle/bluetoothleintro>

warning: extension의 버전이 2.1 이상인지 확인\! - 위쪽에 관련내용)
