# 파이썬 가상환경 (virtual environment)
<del>
참고: https://realpython.com/python-virtual-environments-a-primer/  
* virtualenv와  virtualenvwrapper 를 사용한다.
```bash  
$ sudo pip3 install virtualenv virtualenvwrapper
$ sudo rm -rf ~/get-pip.py ~/.cache/pip
```
* bash_profile 을 수정해 주어야한다.
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
  - lsvirtualenv <env_name> : 현재 설치되어있는 가상환경 리스트 보기
  - rmvirtualenv <env_name> : Destroys a virtual environment
  - workon <env_name> : Activates a virtual environment
  - deactivate : Deactivates the current virtual environment
</del>

<br>
python3.3 이후로 'venv'가 기본 패키지에 내장되어 표준으로 자리잡았다.
가상환경 사용을 위해 venv 사용한다.
다른 이름으로 만든 여러개의 가상환경을 한 곳에 모아두는 것도 가능하지만, 여기서는 프로젝트별로 각각의 위치에 가상환경을 만드는 것으로 한다.
참고: https://www.daleseo.com/python-venv/

* 프로젝트 폴더에 가상환경만들고 활성화하기
  
  ```bash
    $ python3 -m venv venv #venv 라는 이름의 폴더로 가상환경 만듬.
    $ . venv/bin/activate
    (venv)$
  ```

* 비활성화 하기
  ```bash
  (venv)$ deactivate
  $
  ```
