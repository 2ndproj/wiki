# aliexpress sound chip PX088A
**DIY 사운드 모듈 장난감 10 개/몫 크리스마스 노래 음악 음성 모듈 사운드 칩 루프 재생 DIY/장난감 징글 벨 3-4.5V**

구매링크: https://ko.aliexpress.com/item/32660622716.html?spm=a2g0s.9042311.0.0.271e4c4dQbkdYO
## 회로구성
알리익스프레스와 구글 검색을 통해 구한 수많은 회로도는 모두 것짓이다!!!! (tr의 연결 방향도 틀리니 주의하자)
아래 누군가 실제 작동하는 회로를 테스트 해 올려두었다.
이 사람 깃허브 페이지 가면 이 외에도 알리에서 파는 다른 사운드칩도 테스트 해 두었으니 참고하자.
참고: https://github.com/tardate/LittleArduinoProjects/tree/master/Audio/AudioEffectsChips/PX088A

![](https://i.imgur.com/rYFKxvX.jpg)
 * 'C'회로 -> 볼륨이 매우 작다. 버튼이 작동하지 않는다. 
 ![picture 2](https://i.imgur.com/Ydp5hjr.jpg)  
## 결론
* 작동한다. 그러나 소리가 작다. 다른 스피커를 써보자.
* 크리스마스 캐롤이 끊임없이 재생된다. 
* 피에조 버저로 스피커 대체 가능한지 테스트 해보자.
* 스위치는 별다른 역할을 하지 않는다. 빼버려도 지장없을듯.
* 트랜지스터의 연결방향에 주의하자. 위 회로도대로 collector-base-emitter 의 순서가 맞다. (판매자 페이지의 E-B-C 순서는 틀렸다.)