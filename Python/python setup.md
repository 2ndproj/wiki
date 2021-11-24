# python 설치 및 셋업

## python 3.6 설치
* 홈브루를 통해 파이선  3.6설치하자.(맥북)
* `Error: python contains a recursive dependency on itself:` 에러가 발행하여
`--ignore-dependencies` 옵션을 추가하였다.
* brew 의 switch  명령은 설치된 패키지의 버전을 선택할 수 있게 해 준다.
참고: https://www.44bits.io/ko/post/install-specific-version-package-homebrew

``` bash
$ brew install --ignore-dependencies https://raw.githubusercontent.com/Homebrew/homebrew-core/f2a764ef944b1080be64bd88dca9a1d80130c558/Formula/python.rb
$ brew switch python 3.6.5_1
```
*  macOS에 기본 설치된 파이썬(/Library/Frameworks/Python)이 아닌,  homebrew로 설치한 파이선이(/usr/local/bin/python3) 실행되는 것을 확인한다.
```bash
$ which python3
/usr/local/bin/python3
```

## 패키지 설치와 관련한 몇가지 유용한 툴 추가 설치
* cmake, pkg-config: 빌드파일 관리
* wget: 파일 다운로드 툴
```bash
$ brew install cmake pkg-config wget
```

## pip 설치
```bash  
$ wget https://bootstrap.pypa.io/get-pip.py
$ sudo python3 get-pip.py
```

## virtual environment
참고: https://realpython.com/python-virtual-environments-a-primer/  
* virtualenv와  virtualenvwrapper 를 사용한다.
```bash  
$ sudo pip3 install virtualenv virtualenvwrapper
$ sudo rm -rf ~/get-pip.py ~/.cache/pip
```
* bash_profile 을 수정해 주어야한다.(mac)
linux의 경우 '~/.profile' 파일을 수정한다.

```bash
$ nano ~/.bash_profile
...아래 내용을 추가...
# virtualenv and virtualenvwrapper
export WORKON_HOME=$HOME/.virtualenvs
export VIRTUALENVWRAPPER_PYTHON=/usr/local/bin/python3
source /usr/local/bin/virtualenvwrapper.sh
```
* source 명령을 사용하면 로그오프-로그온 하지 않아도 바로  적용할 수 잇다.
```bash
$ source ~/.bash_profile
```
* virtualenvwrapper 에서 사용가능한 주요 명령은 아래에...
  - mkvirtualenv <env_name> <options> : Used to “make a virtual environment”
  - rmvirtualenv <env_name> : Destroys a virtual environment
  - workon <env_name> : Activates a virtual environment
  - deactivate : Deactivates the current virtual environment

## jupyter notebook
python 코드를 입력하고 바로 실행해 볼 수 있는 사용자친화적인 개발환경. ipython(interactive python)이라는 파이썬 인터프리터에 기반하며, 웹브라우저을 통해 실행된다.
입력즉시 실행되지만 한줄씩 입력해야하는 기본 파이썬 인터프리터와, 여러줄의 코드를 편하게 편집할 수 있지만 별도의 콘솔에서 실행해야하는 범용 텍스트에디터의 장점을 잘 섞은 제품이다.
공식싸이트: https://jupyter.org/index.html

### 설치
```bash
$ pip3 install notebook
```
### 실행
```bash
$ jupyter notebook
```
'jupyter notebook'을 발전시킨 'jupyter lab'도 사용해보자
```bash
# 설치
$ pip3 install jupyterlab
...
# 실행
$ jupyter lab
```

### 쥬피터 노트북에서 가상환경 사용

가상환경을 만든다 (여기서는 'myEnv'라는 이름으로 만들었다.)
```bash
$ mkvirtualenv myEnv
...
(myEnv)$
```
가상환경이 작동중임을 프롬프트의 (myEnv)로 알 수 있다.

주피터에서 가상환경 사용할 수 있도록 등록해준다.
```bash
# ipykernel 모듈이 필요하다.
(myEnv)$ pip3 install ipykernel
...
(myEnv)$ python3 -m ipykernel install --user --name=myEnv
```
이제 주피터노트북 에서 가상환경을 사용할 수 있다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/jkuKQ7AG/Image+2020-02-28+at+11.26.52+AM.png?v=d1d51cfac8726fdb187858df7d01a574)

현재 주피터에서 사용할 수 있는 커널(가상환경) 리스트 보기
```bash
$ jupyter kernelspec list
```

사용하지 않는 가상환경 쥬피터에서 제거
```bash
$ jupyter kernelspec uninstall myEnv
```
### 쥬피터 노트북에서 환경변수 사용하기
셸환경에서 'export'로 지정해 둔 환경변수를 주피터에서는 사용하지 못한다. 대신`%set_env {ENV_VAR} {PATH}` magic command를 사용해 환경변수를 사용할 수 있다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/12u1N59N/Image+2020-02-28+at+3.34.22+PM.png?v=c9850452046cabc98755b16624ad1dec)

magic command를 사용한 jupyter notebook의 더 많은 기능은 이곳:https://ipython.readthedocs.io/en/stable/interactive/magics.html 

### 쥬피터 노트북에서 쉘 명령어 사용하기
`!` 를 붙이면 쉘 명령어를 사용할 수 있다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/2NuwnO1W/dfd922c7-b0f0-455a-925e-ac5934ef85de.jpg?v=8888966a8dfd27efeac255806712bdd5)

... 그러니까 위의 환경변수 설정도 아래처럼 할 수 있는 것이다.
```
!export GOOGLE_APPLICATION_CREDENTIALS="/home/pi/my_credential.json"
```

### 쥬피터 노트북에서 acyncio 모듈 사용
asyncio module은 non-blocking IO를 구현하기 위한 모듈이다. 
주피터는 자체적으로 이벤트루프를 이미 사용하고 있기 때문에 asyncio를 사용하려하면 이벤트루프를 중첩할수 없다나 하는 메시지와 함께 exception 발생한다.
![](https://user-images.githubusercontent.com/10778668/50623487-6ae16700-0ee4-11e9-8242-9f4647699ef5.png)

`nest_asyncio`모듈을 사용해 해결한다.
```bash
$ pip3 install nest_asyncio
```
그리고
![](https://i.imgur.com/3gilTL4.png)
