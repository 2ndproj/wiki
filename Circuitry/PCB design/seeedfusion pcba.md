# seeed fusion pcb(a) 서비스로 pcb 제작주문하기
seeed fusion은 중국의 seeed studio에서 운영하는 원스톱-소규모생산 서비스로, 3d 프린팅, CNC가공 등을 온라인으로 주문할 수 있다. 상당히 저렴하다.
eagle로 완성한  pcb 디자인은 seeed fusion서비스에 보내면 pcb제작해 보내주거나(pcb service) 납땜까지 해서 보내준다(pcba service)
https://www.seeedstudio.com/

[seeedstudio fusion PCBA official manual](wiki/Circuitry/PCB design/PCB DFM V1.1.pdf)

## ERC, DRC 체크
eagle pcb디자인이 완성되었다면 erc, drc 버튼을 눌러 에러가 없는지 확인하고 처리한다.
![](https://cl.ly/2fd4f0/Image%202020-01-18%20at%208.35.52%20%EC%98%A4%EC%A0%84.png)

## gerber 및 drill data 내보내기
![](https://cl.ly/832dd1/Image%202020-01-18%20at%209.58.05%20%EC%98%A4%EC%A0%84.png)

보드모드에서 오른쪽 'manufacturing'탭을 선택하고 보드 상태를 확인한 후  CAM...을 누른다.
![](https://cl.ly/78aaf7/Image%202020-01-18%20at%2010.12.20%20%EC%98%A4%EC%A0%84.png)
'Process Job'버튼을 눌러 거버와 드릴파일을 비롯한 필요한 파일들을 생성한다.

이와같이 cam파일 내보내기를 하면
거버파일, 드릴링파일, BOM, PnP정보, drawing파일이 모두 포함되게 된다. 그런데 seeed에서는 거버와 드릴링을 제외한, BOM, PnP, drawing에 있어서 자신들만의 양식을 가지고 있다. 때문에 아래에서 한번 더 각각의 파일을 적당한 형태로 가공해 내보내 주어야 한다.

## 거버파일 업로드
앞서 내보내기한 거버파일과 드릴데이터 파일을 .zip으로 압축해 seeedfusion 서비스에 업로드한다.
![](https://cl.ly/2cff61/Image%202020-01-18%20at%2010.23.34%20%EC%98%A4%ED%9B%84.png)
업로드 후에는 온라인 거버뷰어로 이상이 없는지 확인한다.
pcb 갯수, 컬러 등등 선택한다.

부품 조립은 하지 않고 pcb만 주문한다면 여기까지 하고 'Add to Cart'버튼을 눌러 결재하면 된다. 부품 조립까지 해주는 pcba 서비스를 원한다면 아래 Assembly 데이터도 추가한다.

## Assembly data 업로드
### PnP data
PnP (Pick And Place) data란 어느부품을 어느 위치에 어느 각도로 가져다 놓을지를 기계에 알려주기 위한 자료이다. autodesk Eagle에서는 .mnt(앞면) .mnb(뒷면) 파일형식을 갖는다.
참고: http://support.seeedstudio.com/knowledgebase/articles/1911202-how-do-i-export-pcb-pick-and-place-xy-files-for

보드모드에서 'file' > 'export' > 'mount SMT' 를 선택하면 두번 저장 경로를 물어보는데, 첫번째가 .mnt, 두번째가 .mnb 파일을 저장한다.
![](https://seeed.uservoice.com/assets/211124956/Eagle%20Export%20Mount%20SMD.PNG)

note: 앞서 CAM파일 내보내기를 하면 'CAMOutputs/Assembly'폴더 아래에 'PnP_front.txt','PnP_back.txt' 라는 이름으로 PnP 데이터를 내보내는데 사실상 .mnt, .mnb와 동일하다.

### Assembly drawing
사람이 읽을 수 있는 아래와 같은 도면을 이야기한다. pcb외곽선, 부품의 위치, 부품번호 가 꼭 기입되어있어야한다.
![](https://seeed.uservoice.com/assets/211122115/Print%20Preview.png)
참고: http://support.seeedstudio.com/knowledgebase/articles/1911127-how-do-i-export-pcb-assembly-drawings-fabrication

Eagle 보드 모드에서,
layer setting을 눌러,   tPlace (21), tNames (25), tDocu (51) 3개 레이어만 보이고 나머지는 감춘 상태에서,
file > print > PDF로 저장 한다.

마찬가지로 뒷면 (bPlace, bNames, bDocu) 를 pdf로 저장한다.

### BOM (Bill Of Materials)
BOM은 재료목록이다. seeed 에서는 자기네 양식에 맞게 엑셀파일로 업로드하도록 하고있다.
양식은 이곳:https://statics3.seeedstudio.com/files/20194/BOM%20Template.xlsx 에서 받을 수 있다.
note: MPN은 제조사 부품번호, 혹은 OPL부품인 경우 Seeed sku로, mouser나 digikey의 부품번호를 쓰면 안된다.

참고: http://support.seeedstudio.com/knowledgebase/articles/1886734-how-do-i-prepare-the-bill-of-materials-bom-file

스키매틱 모드에서, Run ULP > BOM 선택 > OK 로 자동 BOM 제작 ULP를 실행한다.
![](https://cl.ly/0adfe9/Image%202020-01-19%20at%206.55.38%20%EC%98%A4%EC%A0%84.png)
![](https://cl.ly/348953/Image%202020-01-19%20at%207.00.07%20%EC%98%A4%EC%A0%84.png)
리스트를 참고하여 seeed의 양식에 맞게 엑셀파일 작성한다.

### Assembly data 업로드
* 앞뒷면 PnP 파일 (.mnt, .mnb)와 앞뒷면 drawing파일(.pdf)는 한꺼번에 .zip으로 압축해 업로드한다.
* BOM은 압축하지 않고 별도로 업로드한다.
bom을 올리면 바로 시스템이 읽어서 목록을 보여준다. 시스템이 알지 못하는 부품은 별도로 표시되므로 적절한 조치를 하도록 한다. (부품을 교체한다거나...?)
![](https://cl.ly/aaf4fa/Image%202020-01-19%20at%207.37.48%20%EC%98%A4%EC%A0%84.png)

### 결재
결재하고 기다린다. 약 한달 생각하면 맘이 편하다. 부품을 모두  OPL에서 주문하면 제작이 훨씬 빠르다고 한다.
