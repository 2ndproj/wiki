# datetime 모듈
공식문서 참고: https://docs.python.org/ko/3/library/datetime.html
쉬운 한글자료: https://python.bakyeono.net/chapter-11-3.html
일상생활에서 사용하는 날짜와 시간을 다루기 위한 파이썬 기본 모듈.
날짜를 나타내는  datetime.date class, 시각을 나타내는 datetime.time class, 둘 모두를 나타내는 datetime.datetime class 를 가지고 있다.

당연하게도  OS에서 현재  timezone과 시간이 올바르게 셋팅되어있어야한다.
라즈베리파이에서는  raspi-config 프로그램으로 타임존을 셋팅해주면 된다.

OS 기반의 시간을 다루는 time 모듈도 있으니 참고.

## datetime.date class
* 특정날짜 객체 생성: datetime.date(1978,8,6)
* 오늘날짜 객체 생성: datetime.date.today()

```python
# datetime.date-test.py
from datetime import date

print(date(1978,8,6))
print(date.today())

# 1978-08-06
# 2019-08-14
```
|datetime.date class 속성 또는 메서드	|값 또는 기능|
|-|-|
year|	년
month	|월
day|	일
weekday()	|요일 (월요일=0, 일요일=6)
isoformat()	|ISO 표준 문자열 표현<br>“년-월-일”(예: 1986-03-06)과 같은 형식
strftime(format)	| 형식을 지정하여 표현 (자료 참고)

```python
# datetime.date-test.py
from datetime import date

myBirthDay = date(1978,8,6)
today = date.today()
print(myBirthDay)
print(today)

# 1978-08-06
# 2019-08-14

print('나는 %d년 %d월 %d일에 태어남' %(myBirthDay.year, myBirthDay.month,myBirthDay.day))
# 나는 1978년 8월 6일에 태어남

day = '월화수목금토일'[today.weekday()]
print('오늘은 %s요일이에요' %day)
# 오늘은 수요일이에요
```

## datetime.time class
밀리세컨드까지 특정해 표현가능.
* 특정 시각 객체 생성: datetime.time(13,30,0,100000) # 13시30분0초.100000
|datetime.time class 속성 또는 메서드|	값 또는 기능|
|-|-|
hour	|시
minute|	분
second	|초
microsecond	|마이크로초
isoformat()	I|SO 표준 문자열 표현
strftime(format)	|임의 형식으로 문자열 표현

```python
# python interpreter
>>> from datetime import time
>>> at = time(15, 30, 45)
>>> at.hour, at.minute, at.second  # 시, 분, 초
(15, 30, 45)

>>> at.microsecond                 # 마이크로초
0

>>> at.isoformat()                 # ISO 표준 문자열 표현
'15:30:45'
```
### isoformat 문자열을 다시  datetime객체로
* datetime.fromisoformat(string)

## datetime.datetime class
datetime.date 와 datetime.time 을 합쳐놓은 class. 양쪽의 속성과 메소드를 모두 사용할 수 있다.
* 특정 일시 객체 생성: datetime(년, 월, 일, 시, 분, 초, 마이크로초)
* 현재 일시 객체 생성: datetime.now()
* 날짜와 시각 결합: datetime.combine(날짜, 시각)

```python
# python interpreter

>>> from datetime import datetime
>>> datetime(2017, 11, 14)
datetime.datetime(2017, 11, 14, 0, 0)

>>> datetime(2017, 11, 14, 8, 30)
datetime.datetime(2017, 11, 14, 8, 30)

>>> datetime(2017, 11, 14, 8, 30, 50, 200000)
datetime.datetime(2017, 11, 14, 8, 30, 50, 200000)

>>> datetime.now()  # 현재 일시
datetime.datetime(2017, 11, 14, 19, 4, 7, 950704)

>>> datetime.combine(date.today(), time(15))  # 오늘 3시
datetime.datetime(2017, 11, 14, 15, 0)

>>> now = datetime.now()
>>> now.year, now.month, now.day, '월화수목금토일'[now.weekday()]
(2017, 11, 14, '화')

>>> now.hour, now.minute, now.second, now.microsecond
(19, 8, 52, 283277)

>>> now.date(), now.time()
(datetime.date(2017, 11, 14), datetime.time(19, 8, 52, 283277))

>>> now.isoformat()
'2017-11-14T19:08:52.283277'
```

## datetime.timedelta class
두시간 사이의 차를 나타내는 timedelta class를 사용가능하다.
예를 들어,
date2 = date1 + timedelta
timedelta = date1 - date2
와 같은 연산이 가능하다.
자세한 내용은 참고자료 검토.

```python
# python interpreter
>>> from datetime import datetime, timedelta
>>> now = datetime.now()                 # 현재 일시
>>> after_1000h = timedelta(hours=1000)  # 1천 시간
>>> now + after_1000h                    # 지금부터 1천 시간 후
datetime.datetime(2017, 12, 26, 11, 42, 32, 103816)

>>> birthday = date(1986, 3, 6)          # 생년월일
>>> today = date.toady()                 # 오늘
>>> today - birthday                     # 태어난 뒤 오늘까지의 기간
datetime.timedelta(11576)
```

## 세계시계 datetime.tzinfo class
* time 이나 datetime 오브젝트의 멤버변수인 tzinfo가 None이 아닌 값(tzinfo나 그 서브클래스인 timezone 오브젝트)을 갖는 경우 세계시계로 작동하게 된다. (공식 문서에서 aware 라고 표현됨.)
* 생성자에  `tzinfo=` 아규먼트를 넣어줌으로써 세계시계작동시킨다.
* 써머타임 등 고려해 직접 tzinfo의 서브클래스를 작성 토록되어있지만(tzinfo는 추상클래스다) utc+9:00(서울 ) 등등 대부분의 간단한 경우를 나타내기 위해 이미 만들어져있는 timezone class를 사용할 수 있다.  
참고: https://spoqa.github.io/2019/02/15/python-timezone.html

```python
>>> from datetime import datetime,  timedelta, tzinfo, timezone

>>> datetime.utcnow()
datetime.datetime(2019, 8, 14, 21, 12, 22, 857347) # 영국 그리니치의 현재시간을 표시하고있기는 하지만 tzinfo=None으로, 세계시간 aware 하지는 않다.

>>> datetime.now(timezone.utc)
datetime.datetime(2019, 8, 14, 21, 14, 17, 112890, tzinfo=datetime.timezone.utc) # 세계시간 aware한 세계표준시

>>> seoulnow = datetime.now(timezone(timedelta(hours=9))) # utc+9:00 (서울표준시)
>>> seoulnow
datetime.datetime(2019, 8, 15, 6, 18, 34, 177299, tzinfo=datetime.timezone(datetime.timedelta(0, 32400)))

>>> seoulnow.utcoffset()
datetime.timedelta(0, 32400) # 세계표준시와 시차
>>> seoulnow.tzname()
'UTC+09:00' # 타임존 이름보기

>>> seoulnow.astimezone(timezone(timedelta(hours=-4))) # 같은 시간을 뉴욕표준시(utc-4:00)로 표현하면?  
datetime.datetime(2019, 8, 14, 17, 18, 34, 177299, tzinfo=datetime.timezone(datetime.timedelta(-1, 72000)))
```
