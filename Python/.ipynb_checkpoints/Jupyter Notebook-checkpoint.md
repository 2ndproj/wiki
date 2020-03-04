# jupyter notebook
python 코드를 입력하고 바로 실행해 볼 수 있는 사용자친화적인 개발환경. ipython(interactive python)이라는 파이썬 인터프리터에 기반하며, 웹브라우저을 통해 실행된다.
입력즉시 실행되지만 한줄씩 입력해야하는 기본 파이썬 인터프리터와, 여러줄의 코드를 편하게 편집할 수 있지만 별도의 콘솔에서 실행해야하는 범용 텍스트에디터의 장점을 잘 섞은 제품이다.
공식싸이트: https://jupyter.org/index.html

## 설치
```bash
$ pip3 install notebook
```
## 실행
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

## 쥬피터 노트북에서 가상환경 사용
ipykernel 모듈이 필요하다.
```bash
$ pip3 install ipykernel
```

가상환경을 만든다 (여기서는 'myEnv'라는 이름으로 만들었다.)
```bash
$ mkvirtualenv myEnv
...
(myEnv)$ deavtivated
```
주피터에서 가상환경 사용할 수 있도록 등록해준다.
```bash
# 가상환경 밖으로 나와야한다.
(myEnv)$ deavtivated
...
$ python3 -m ipykernel install --user --name=myEnv
```
이제 주피터노트북 에서 가상환경을 사용할 수 있다.
![](https://p195.p4.n0.cdn.getcloudapp.com/items/jkuKQ7AG/Image+2020-02-28+at+11.26.52+AM.png?v=d1d51cfac8726fdb187858df7d01a574)

사용하지 않는 가상환경 쥬피터에서 제거
```bash
$ jupyter kernelspec uninstall myEnv
```
