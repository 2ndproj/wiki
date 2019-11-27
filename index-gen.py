#!/usr/local/bin/python3

# 2nd proj. wiki 의 index page 자동 생성 스크립트
# 폴더 내의 .md파일들을 읽어 index.md문서에 링크로 집어넣는다.
# 디렉토리가 있다면 구조를 살려서 넣는다.

# index-gen.py

import glob #파일 리스트 뽑는데 필요
import os.path # 파일이 디렉토리인지 알아보는데 필요

# 빈 index.md파일을 만든다.
f = open("index.md", "w")
# index.md에 앞부분... 제목등등 기록한다.
f.write("# 2nd project wiki \n")
f.write("모든이의 세컨드 프로젝트를 지원하기 위한 노하우 모음 위키입니다. \n 모든 자료는 부담 없이 마음껏 사용하셔도 좋습니다. \n 문서의 잘못된 내용을 발견하거나 공유하고픈 자신만의 노하우가 있다면 [markdown 형식](https://gist.github.com/ihoneymon/652be052a0727ad59601)으로 문서 작성해 [등록요청](https://github.com/2ndproj/wiki/issues/new) 바랍니다.\n")
# global variable 'folder_level'을 사용한다. : 레벨이 깊어질수록 표제어에 붙는 '#'가 많아지도록 한다.
folder_level = 1
#global var 'home_directory'를 사용한다. 스크립트가 실햏된 최초 작업디렉토리를 기록해 두었다가 각 파일의 상대경로를 작성하는데 사용한다.
home_directory = os.getcwd()
skipfilelist = ['index.md', 'navigation.md','private']
print(home_directory)

# def listup:
def listup():
    global folder_level
    global home_directory
    global skipfilelist
    # glob 모듈 사용해 현 워킹 디렉토리의 모든 파일 목록을 리스트로 만든다.
    files = glob.glob("*")
    # 첫번째 항목부터 순차적으로...
    for file in files:
        # 항목이 index.md 자체 등 제외되어야 할 파일이라면...
        if file in skipfilelist:
            break

        # 항목이 폴더라면...
        elif os.path.isdir(file) is True:
            print(file)
            # folder_level이 1 깊어지고
            os.chdir(file)
            folder_level += 1
            # index.md파일에 folder_level에 따라 #을찍고 파일명을 쓴다.
            f.write('#'*(folder_level)+' '+file+'\n')
            listup()

        # 항목이 .md파일이라면 ...
        elif file[-3:] == ".md":
            # 파일을 열어 첫줄과 파일링크를 index.md에 기입한다.
            abs_dir = os.getcwd()+'/'+file
            print("abs_dir: "+abs_dir)
            rel_dir = abs_dir[len(home_directory):]
            print("rel_dir: "+rel_dir)

            with open(abs_dir, 'r') as mdfile:
                subject = mdfile.readline()
            f.write('['+subject+']'+'('+rel_dir+')'+'\n')

        # 기타 파일이라면
        else:
            pass

    # listup함수가 끝날 때는 folder_level을 다시 하나 줄여놓는다.
    f.write("\n")
    os.chdir("..")
    folder_level -=1

listup()
# dsquare 플러그인 추가
# f.write('[gimmick:Disqus](2ndproj)')
# 파일 닫기
f.close()
