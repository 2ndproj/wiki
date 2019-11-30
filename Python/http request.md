# HTTP request in Python : 'requests' module
python의 requests 모듈을 사용해  REST 프로토콜을 쉽게 다룰 수 있다. 너무 널리사용되는, 사실상의 파이선 내장모듈이라고 볼 수 있다.
참고: https://realpython.com/api-integration-in-python/
공식문서: https://2.python-requests.org/en/master/  

## 설치
```bash
$ pip install requests
```
* 아마도 대부분의 경우 기본으로 설치되어있음

## 기본 사용법
### basic get
get(), post(), put() 메소드를 가지고 있고 서버의 응답이 이들 메소드의 리턴이 된다. 심플하다.

```python
import requests

URL = ''https://todolist.example.com/tasks/''
resp = requests.get(URL)
if resp.status_code == 200: # OK
  for item in resp.json():
    print(item)
else :  # something wrong
  raise ApiError(resp.status_code)
```
* resp.json()의 리턴은 파이썬 오브젝트다 일반 딕셔너리나 리스트처럼 간편하게 다룰 수 있다.
* raw data를 그대로 보려면  'resp.text' 프로퍼티를 사용하면 된다.

### parameter  전달
get() 메소드에 'params=' 아규먼트를 추가해 보낸다

```python
params = {'key':'value'}
res = requests.get('http://www.tistoty.com', params=params)
print(res.url)
# http:./www.tistody.com/?key=value
```

### header 전달
get(), post() 메소드에 'headers=' 아규먼트를 추가해 보낸다.

### data 전달
post() 메소드에 'data=' 아규먼트를 추가해 보낸다.

```python
body = {"key1": "value1", "key2": "value2" }
resp = requests.post(URL,
                     data=json.dumps(body),
                     headers={'Content-Type':'application/json'},
                     )
```
혹은 'data=' 대신에 'json='아규먼트를 사용하면 requests가 알아서 딕셔너리를 json으로 바꾸어준다. 아래 예는 위 코드와 동일하다.

```python
resp = requests.post(URL,json=body)
```

## 예: Kakao api
kakao api를 사용해 위경도 -> tm좌표로 변환해보자.
참고문서: https://developers.kakao.com/docs/restapi/local#%EC%A2%8C%ED%91%9C%EA%B3%84-%EB%B3%80%ED%99%98  

### kakao 계정만들기 & 개발자 등록
https:// developers.kakao.com 에서 앱 개발 시작하기로 개발자 등록하고 앱키를 부여받는다.
![](https://cl.ly/1d7b48/Image%202019-09-06%20at%203.05.37%20PM.png)

### 핵심 코드
```python
url = 'https://dapi.kakao.com/v2/local/geo/transcoord.json' #좌표계-변환
      params = {'x':longitude, 'y':latitude, 'input_coord':'WGS84', 'output_coord':'TM'}
      headers = {'Authorization': 'KakaoAK '+ KakaoAK}
      resp = requests.get(url, params = params, headers = headers)

      if resp.status_code == 200: # OK
          #test
          print(resp.json())

          tmX = resp.json()['documents'][0]['x']
          tmY = resp.json()['documents'][0]['y']

          #test
          print('tmX: %s, tmY: %s' %(tmX, tmY))

      else:
          print('kakao Error')
```
