# XML parsing (elementTree library)

python에서 XML 작성, 파싱을 위해 elementTree 사용. 파이썬 기본 라이브러리로 포함되어있다.

공식문서: [https://docs.python.org/ko/3/library/xml.etree.elementtree.html](https://docs.python.org/ko/3/library/xml.etree.elementtree.html)

## XML 태그 구조
```
<tag attrib1=value atrib2=value> text </tag>
```

XML 문서는 tag,  key-value 쌍인 attribute, 실제 본문이라 할 text로 구성되어있다.

## XML 문서 로딩

1. 파일로부터 로딩

```python
import xml.etree.ElementTree as ET

tree = ET.parse('myfile.xml')
root = tree.getroot()
```

1. text로부터 로딩 (http response로 데이터를 받았다던지....)

```python
text = '''<?xml version="1.0"?>
<data>
    <country name="Liechtenstein">
        <rank>1</rank>
        <year>2008</year>
        <gdppc>141100</gdppc>
        <neighbor name="Austria" direction="E"/>
        <neighbor name="Switzerland" direction="W"/>
    </country>
    <country name="Singapore">
        <rank>4</rank>
        <year>2011</year>
        <gdppc>59900</gdppc>
        <neighbor name="Malaysia" direction="N"/>
    </country>
    <country name="Panama">
        <rank>68</rank>
        <year>2011</year>
        <gdppc>13600</gdppc>
        <neighbor name="Costa Rica" direction="W"/>
        <neighbor name="Colombia" direction="E"/>
    </country>
</data>
'''

import xml.etree.ElementTree as ET

root = ET.fromstring(text)

```

로딩된 ET 오브젝트는 for 문 등으로 하위 노드를 iterate 할 수 있다.

```python
for child in root:
	print(child.tag, child.attrib)
```

```
country {'name': 'Liechtenstein'}
country {'name': 'Singapore'}
country {'name': 'Panama'}
```

인덱스로 특정 노드에 액세스 할 수 있다.

```python
print (root[0][1].text)
```

```python
2008
```

## 특정 태그 찾기

findall('특정tag')함수를 사용, 일하는 모든 태그를 리스트로 리턴한다.

```python
countries = root.findall('country')
for country in countries:
	rank = country.find('rank').text
	name = country.get('name') #get()으로 attrib에 억세스
	print(name, rank)
```

```
Liechtenstein 1
Singapore 4
Panama 68
```

note: findall() 태그찾기는 자식 노드에 대해서만 가능. 손자 노드의 태그는 찾지 못한다.

손자 및 그 아래 모든 자식 노드에 대해 특정 tag를 찾기 위해서는 iter() 함수 를 사용.

```python
for neighbor in root.iter('neighbor'):
	print(neighbor.attrib)
```

```python
{'name': 'Austria', 'direction': 'E'}
{'name': 'Switzerland', 'direction': 'W'}
{'name': 'Malaysia', 'direction': 'N'}
{'name': 'Costa Rica', 'direction': 'W'}
{'name': 'Colombia', 'direction': 'E'}
```

note: iter()를 argument 전달 없이 'iter()'로 사용하면 모든 노드를 반환.

## XPath

보다 정교하게 엘리먼트를 찾기 위해 xpath를 사용한다.