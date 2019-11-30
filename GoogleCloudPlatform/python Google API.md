# Gmail / Google calendar API for python
 API 사용하기
라즈베리파이에서 gmail등의 구글 서비스를 확인하고 조작 할 수 있는 python 코드 사용법. 구글의 표준  api를 사용한다. 이하에서는 Gmail과 Google calendar 를 예로 사용한다.
참고: https://developers.google.com/gmail/api/quickstart/python

## Google OAuth2.0 을 통한 인증
참고:
* 구글 공식 개념설명: https://developers.google.com/identity/protocols/OAuth2
* 구글 샘플: https://developers.google.com/gmail/api/quickstart/python
* 라이브러리 도큐먼트: https://google-auth-oauthlib.readthedocs.io/en/latest/reference/google_auth_oauthlib.flow.html

gmail 데이터를 사용하는 웹 서비스나 어플리케이션, 혹은 기기를 만든다고 하면, 신뢰와 관련한 2가지 문제가 발생한다.
1. 이 사용자가 정말 본인인가?
2. 이 어플이 어디까지 민감한 정보를 다루도록 허용할 것인가?

1번 문제를 authentication의 문제라고하고, 두번째의 문제를 authorization의 문제라고 한다.
개인개발자가 해결하기에는 어려운 두가지 문제를 구글이라는 능력자에게 위탁해버리는 해결책이  OAuth2.0 이라는 프로토콜이다.

간단히 요약하자면, 구글의 인증을 받은 프로젝트(구글인증서버에 대해 클라이언트)는 클라이언트 인증정보(Oauth2.0 client ID, Pass 등) 을 발급받아 가지고 있다가  Gmail 데이터가 필요한 순간에 사용자가 직접 어플에 구글 아이디를 입력하는 대신 구글의 로그인 창(consent screen)을 띄워주고, 구글측에서 사용자가 확인되면 사용자에게 '이러이러한 앱에서 너의  gmail 데이터에 접근하도록 허락할래?'라고 물어본 후, 허락들 받으면 어플에 gmil api에 리퀘스트를 보낼때 꼭 필요한 Access Token을 발급해주는 절차이다.
![](https://cl.ly/333ddb/Screen%20Recording%202019-08-07%20at%2012.55%20PM-Animated%20Image%20(Small).gif)

Oauth2.0의 개념에 대한 설명은 다양한 자료에서 다루고 있으므로 참고하도록 하고, 여기서는 Raspberry pi 상에서  Gmail 정보를 가져오은 python 스크립트를 구현하기 위한 실제적인 내용들만 확인하자.

### 1. google cloud platform 가입
gmail api 는 구글 클라우드 플랫폼이라는 서비스의 일부이다. 먼저 구글 계정을 만들어 google cloud platform에 가입하고 프로젝트를 새로 생성한다.
http://www.google.com/cloud
기존의  gmail 계정을 사용해도 되며, 무료로 가입해도 대부분의 기본 기능을 마음껏 사용할 수 있다.(신용카드 등록을 해도 결제가 되지는 않는다. 신용카드 등록하지 않고 창을 닫아도 작동되는 듯 하다.)

### 2. 새 프로젝트 생성
구글 클라우드 플랫폼 콘솔화면에서 새로운 프로젝트를 생성한다.
![](https://cl.ly/ab0ad7/Image%202019-08-05%20at%205.45.31%20PM.png)
Gmail-test라고 이름지었다.

### 3. Gmail API 켜기
API 및 서비스 > 대시보드 ( https://console.developers.google.com/apis )에서 Gamil api를 Enabled 시켜준다.
![](https://cl.ly/a8753e/Image%202019-08-05%20at%205.49.35%20PM.png)

![](https://cl.ly/3e7ee6/Image%202019-08-05%20at%205.59.36%20PM.png)

![](https://cl.ly/24249b/Image%202019-08-05%20at%206.04.18%20PM.png)

![](https://cl.ly/2017ec/Image%202019-08-02%20at%206.40.18%20PM.png)

### 4. 인증정보 (OAuth Client ID, PASS) 생성
"이 프로그램은 너의 구글 계정에서 이러이러한 개인정보를 가져다가 쓸거야. 허용할래?" 라고 물어보는 화면을 consent screen이라고 한다. 메뉴 > APIs & Services > 사용자 인증정보 에서 인증 정보를 만든다. 3가지 방식 중 고를 수 있도록 되어있는데, 어떤 방식을 골라야 할지 잘 모른다면 마지막의 '사용자 인증정보 선택 도움말'을 활용한다. 우리는 OAuth 클라이언트 ID를 선택.
![](https://cl.ly/9cd427/Image%202019-08-05%20at%206.23.17%20PM.png)
동의 화면 (구글 로그인창) 구성
![](https://cl.ly/1c08c7/Image%202019-08-05%20at%206.28.06%20PM.png)
프로젝트 이름, 로고, 문의사항 보낼 수 있는 지원 이메일 등등 넣을 수 있다.
![](https://cl.ly/9f43dd/Image%202019-08-05%20at%206.32.38%20PM.png)
만들고 있는 프로젝트 유형에 따라 애플리케이션 유형을 선택한다.
우리는 raspberry pi 의 cli 환경에서 사용할 예정이므로 구글에서 제공하는 동의화면을 바로 디바이스에 띄울 수가 없고, 제3의 디바이스를 통해 접근토록 해야한다.
이런경우 반드시 **'기타'** 를 선택한다.
'OAuth 클라이언트 이름'은 프로젝트명과는 별개로, 나는 gmail_test라고 지었다.
![](https://cl.ly/4b1766/Image%202019-08-05%20at%206.35.38%20PM.png)
인증정보 생성 완료!
![](https://cl.ly/4e7818/Image%202019-08-05%20at%206.36.31%20PM.png)

인증정보 (credentials)를 다운로드 해 두면 번거롭게 한자씩 타이핑해 넣지 않아도 되므로 편하다.
![](https://cl.ly/6972be/Image%202019-08-05%20at%206.37.49%20PM.png)
다운받은  .json 파일은 실행시킬 파이선 코드와 같은 위치에 넣어둔다.

### 2. Google Client Library 를 설치한다.
* [x] *나는 이런저런 모듈로 작업환경이 복잡해지는게 꺼려져서 virtualenv 로 GmailAPI라는 가상환경을 만들어서 테스트했다.*

```bash
$pip install --upgrade google-api-python-client google-auth-httplib2 google-auth-oauthlib
```
* [x] 라즈베리에서 설치하려니  sudo 권한이 필요한데, 이게  라즈베리이기 때문인지 혹은  virtualenv 내에 설치 하지 않아서인지는 확인 필요하다.


### 3. Gmail api 공식 샘플 코드를 실행시켜 잘 작동하는지 확인
참고: https://developers.google.com/gmail/api/quickstart/python
* 27행의 'credentials.json' 은 앞서 받아둔 클라이언트 인증 정보파일로 파일명 바꾼다.

* 우리는 라즈베리파이의 콘솔환경에서 실행시키고 있으므로, consent screen을 디바이스에 바로 띄울 수 없다. 제3의 디바이스에서 브라우저를 열고 consent screen 을 찾아가서 확인 코드를 받고 콘솔 창에 입력하는 방식으로 해야하는데, 이를 위해서는 28행의 'flow.run_local_server(port=0)' 은 'flow.run_console()'로 교체되어야 한다.  
참고: https://google-auth-oauthlib.readthedocs.io/en/latest/reference/google_auth_oauthlib.flow.html

* 예제는 gmail에서 데이터를 읽어오는 것까지만 권한 요청한다. 만일 프로젝트에서 필요로하는 권한의 범위가 달라진다면 행8의  SCOPES = [...]를 수정, 혹은 추가 해야 한다.   
참고: https://developers.google.com/gmail/api/auth/scopes

```python
# gmail-test.py
# raspberry pi 콘솔용.  gmail label 목록을 불러온다.

import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']

def main():
    """Shows basic usage of the Gmail API.
    Lists the user's Gmail labels.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'client_secret_497460368822-l2vljgso619t68g4nnfbej5i9kel4767.apps.googleusercontent.com.json', SCOPES)
            creds = flow.run_console()
            print(creds)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('gmail', 'v1', credentials=creds)

    # Call the Gmail API
    results = service.users().labels().list(userId='me').execute()
    labels = results.get('labels', [])

    if not labels:
        print('No labels found.')
    else:
        print('Labels:')
        for label in labels:
            print(label['name'])

if __name__ == '__main__':
    main()

```

![]( https://cl.ly/8829db/Screen%20Recording%202019-08-07%20at%2003.23%20PM-Animated%20Image%20(Large).gif )

## Google api python library 사용법
구글 공식 문서: https://github.com/googleapis/google-api-python-client/blob/master/docs/start.md#building-and-calling-a-service  
google python 라이브러리가 지원하는 모든 google api 리스트와 사용법 reference: https://github.com/googleapis/google-api-python-client/blob/c977304a1af233058f572787538edafc2ef122e6/docs/dyn/index.md

구글의 모든 서비스 api는 비슷한 구조를 가지고 있다. gmail도 마찬가지.
### 1. 구글 서비스 객체 만들기
* apiclient.discovery.build()사용해 서비스 객체 만든다.  
* 어떤 서비스 api를 사용할 것인지,  api버전은 어느 것 사용하는지, [link](https://github.com/googleapis/google-api-python-client/blob/c977304a1af233058f572787538edafc2ef122e6/docs/dyn/index.md) 중에서 선택한다.  
* 앞서 획득한 access token도 이때 전달한다.
```python
from apiclient.discovery import build
service = build('api_name', 'api_version', credencials='아까얻은 AcessToken')
```

### 2. collection
구글 서비스의 모든 데이터는 계층적인 집합을 이루고 있는데, 이 한 단위의 계층을 collection이라고 부른다.
gmail 같으면 user 콜렉션 아래에는 여러개의 message 콜렉션이 있고, 그 아래에는.... 하는 식이다.
이들 콜렉션에 아래와 같이 접근할 수 있다.
```python
collection = service.users().messages()
```

### 3. request and response
어떤 특정한 collection에 대해 구글에 요청할 수 있는 명령어는 콜렉션마다 다 다르다. [이곳](https://developers.google.com/gmail/api/v1/reference/) 에서 검색 할 수 있다.
gmail의 message 콜렉션이 list()명령을 가지고 있다면,
```python
request = service.users().messages().list(userId='me')
```
실제 request를 구글 api 서버에 보내고 응답을 받아오는 건  execute() 함수를 사용.
```python
response = request.execute()
# or
response = servie.users().mesages().list(userId='me').execute()
```
* 구글로부터의 답장은 원래는  JSON형식으로 온다. 그렇지만 우리가 사용하는 python api가 자동으로 사용하기 쉽게  python 데이터 타입(dict)로 바꾸어주기 때문에 get()함수로 원하는 항목을 쉽게 뽑아 쓸 수 있다.

## 구글 캘린더 예제
구글 캘린더 api소개자료의 가장 기본 예제.  
참고: https://developers.google.com/calendar/quickstart/python
```python
# quickstart.py
# 사용자의 기본캘린더 (primary)에서
# 지금이후(timeMin=now)로 시작하는
# 10개의 이벤트(maxResult-10)를 가져와 표시하기

from __future__ import print_function
import datetime
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

def main():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)

    service = build('calendar', 'v3', credentials=creds)

    # Call the Calendar API
    now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
    print('Getting the upcoming 10 events')
    events_result = service.events().list(calendarId='primary', timeMin=now,
                                        maxResults=10, singleEvents=True,
                                        orderBy='startTime').execute()
    events = events_result.get('items', [])

    if not events:
        print('No upcoming events found.')
    for event in events:
        start = event['start'].get('dateTime', event['start'].get('date'))
        print(start, event['summary'])

if __name__ == '__main__':
    main()
```




## json module  for python
참고: https://www.w3schools.com/python/python_json.asp  

Json 데이터를 다루어야 하는 경우, 파이썬에 기본 포함 되어있는 json모듈을 사용하면 JSON 파일/string을 파이썬  dictionary 나  list 로 만들어 사용할 수 있어 편리하다. 더우기 indent=  아규먼트를 사용하면 print() 로 표시할 때 줄 맞추어 주므로 보기에도 편하다.

```python
import json
...
print json.dumps(response, sort_keys=True, indent=4)
"""
For example, if the printed JSON is the following:
{
    "count": 2,
    "items": [
        {
            "cents": 5,
            "name": "#586 1923-26 5-cent blue Theodore Roosevelt MLH perf 10"
        },
        {
            "cents": 5,
            "name": "#628 1926 5-cent Ericsson Memorial MLH"
        }
    ]
}
"""
# You can access the data like this:
print 'Num 5 cent stamps: %d' % response['count']
print 'First stamp name: %s' % response['items'][0]['name']
```
|method|용도 |
|-|-|
|json.load(json) / json.load**s**(json_string)|JSON 파일을 python dictionary 로 바꾸어 읽어들임 / json 문자열을 파이썬 데이타로 변환 |
|json.dump(puthon_object) / json.dump**s**(python_object)|python 데이터를 JSON으로 바꾸어 파일로 저장/ python 데이터를 json 형식 문자열로 변환.  <br><br>   parameter: sort_keys=(True/False), <br> parameter: indent= 들여쓰기칸수|
