# DOM
- DOM是宿主对象，和浏览器的实现有关
- 渲染引擎： Gecko(火狐) / webkit(safari) / KHTML(Konqueror,KDE linux桌面打包发布的浏览器) / V8(Chrome)
## Node类型
- 每个文档只能有一个文档节点（document）。html的文档节点为 html；xml没有预设，任何元素都可以成为文档节点。
- 浏览器文档一般是HTML或者XML文档
- DOM一共有十二种节点类型，每种节点类型都继承Node类型，所以所有节点都共享相同的基本属性和方法。
    - Node.ELEMENT_NODE 1
    - Node.TEXT_NODE 3
- 每个节点
    - .nodeType决定节点类型
        - 对于元素节点
            - .nodeName 元素标签名
            - .nodeValue null
    - .hasChildNodes() 是否有子节点
    - .childNode NodeList的实例，类数组
        - 实时活动对象，而不是快照
        - somenode.childNode[0]
        - somenode.childNode.item(0) 
        - somenode.childNode.length
        - 可Array.from()转化为数组
    - somenode.nextSibling 上一个兄弟节点，无为null，说明是第一个节点
    - somenode.nextElementSibling 上一个兄弟元素，无为null
    - somenode.firstChild 第一个子节点； .firstElementChild 第一个子元素
    - .ownerDocument 返回文档节点
- 操作节点
    1. parent.appendChild(newNBode);
        - 添加一个节点到最后，并且返回插入的节点
        - somenode.appendChild(somenode.firstChild) 把第一个节点转移到最后
    2. parent.insertBefore(要插入的节点, 参照节点)
        - 放到参照节点之前，并且返回插入的节点
        - 参照节点为null, 相当于 appendChild
    > 1+2 以上不会删除任何已有节点
    3. parent.replaceChild(要插入的节点, 要替换的节点)
    4. parent.removeChild(移除的节点)
    > 3+4 移除的节点，从技术上仍然被同一个文档拥有，但是文档中已经没有它的位置了
    5. somenode.cloneNode(param)
        - param 为 true，深复制，即复制节点及整个**子**DOM树
        -  param 为 false，浅复制，无子节点，只复制somenode，则复制的节点的.childNodes.length为0
        - 一般只复制HTML属性，不会复制somenode的js属性，如事件处理等，但IE以前会复制，建议复制前删除
    6. somenode.normalize() 处理文档子树的文本节点
        - 浏览器实现原因，可能没有文本节点或文本节点为同胞关系。
        - 此方法是空文本节点删除，同胞关系，合并为一个文本节点。
    7. document.createElement('p') 创建一个新元素，并且接收返回值，可以给这个返回值添加属性
    > 以上方法，可以级联，继续操作
### Element 类型， nodeType - 1
- nodeValue - null
- element.nodeName 或 element.tagName 获取标签名， tagName 返回为大写，最后转小写
- nodeValue - null
- parentNode - Document 或 Element 对象
- 子节点可以是 Element、Text、Comment、ProcessingInstruction、CDATASection、EntityReference类型
- 所有的 HTML元素 都通过 HTMLElement （包括直接实例或者间接实例，如 HTMLBodyElement）表示，HTMLElement 直接继承 Element 并增加了一些属性
    - .className 可读取
    - .id 可读取
- 取得属性
    - element.getAttribute(atrName)
        - atrName 不区分大小写
        - 规范，自定义属性，前面加 data- 区分校验
        - atrName 为 style，获取到的是字符串；element.style（可读取） 获取的是 CSSStyleDeclaration
        - dom对象会有公认的属性，所以一般只有自定义属性才会用getAttribute获取
        - 公用属性可以通过 element. 赋值，会反应到Dom上，其他的不可以，只会给element添加值
    - element.setAttribute(atrName, value)
        - atrName 规范为小写
    - element.removeAttribute(atrName)
        - 连属性带值一起会被移除掉
    - element.attributes 获取属性集合，返回 NamedNodeMap 实例
        - element.attributes.getNamedItem('id').nodeValue 读取属性值
        - element.attributes['id'].nodeValue 同上
        - element.attributes.removeNamedItem('id') 移除属性，同 removeAttribute
### Attr 类型， nodeType - 2
- nodeName 属性名
- nodeValue 属性值
- parentNode null
- HTML中不支持子节点
- XML中子节点可是 Text 或 EntityReference 类型
- 属性是 attributes 属性中的节点，一般不认为是 DOM树 的一部分，更多使用 getAttribute(), setAttribute(),removeAttribute()
- Attr对象三个属性 name, value, specified为布尔值，表示属性使用的是默认值还是被指定的值
- document.createAttribute() 创建新的Attr节点，参数为属性名。
```
let attr = document.createAttribute('align');
attr.value = 'left'
element.setAttributeNode(attr)
```
- 获取属性
    - element.attributes['align'].value，可返回节点
    - element.getAttributeNode['align'].value，可返回节点
    - element.getAttribute('align')，只可返回值
### Text 类型， nodeType-3
- nodeName - #text
- .nodeValue 为节点中包含的文本，可读取；设值，但是小于号，大于号，引号会被转义
- parentNode 为 Element 对象
- 不支持子节点
- 可以先获取元素，然后再通过元素获取文本节点
- 默认情况下，包含文本内容的每个元素最多只能有一个文本节点，空格也算，空则不产生文本节点
- api
    - textNode.appendData(str) 向节点末尾添加一个文本
    - textNode.deleteData(offset, count) 从offset的位置开始，删除count个字符
    - textNode.insertData(offset, str) 在offset的位置插入str
    - textNode.replaceData(offset, count, str) 用str替代从位置 offset + count 的文本
    - textNode.splitText(offset) 在位置offset将当前文本节点拆分为两个文本节点
    - textNode.substring(offset, count) 提取从位置offset到offset + count 的文本
    - 可用length获取字符串长度
    - textNode.splitText(position)
        - 将一个文本节点拆成两个
        - 原本的包含开头到偏移位置之前的文本
        - 返回一新文本节点，包含剩下的文本
- 创建文本节点
    - document.createTextNode(str)
    - 可通过 element.appendChild(textNode) 添加
    - 可以创建多个文本节点，插入同一个元素，只有这种情况，一个元素的子元素才有多个文本节点
    - 含有多个文本节点时，在父元素调用.normalize()，所有同胞文本节点会合并为一个文本节点，中间被别的元素隔开的不能合并
### CDATASection 类型， nodeType-4
- <*![CDATA[this is some content]]>
- nodeName - #cdata-section
- nodeValue - CDATA 区块的内容
- parent值为 Document 或 Element 对象
- 不支持子节点
- 继承自Text类型，拥有splitText 在外的其他字符串操作方法
- CDATA 区块只在 XML中有效，老浏览器会识别为注释， 当前没有一个浏览器正确识别 CDATASection 类型，包括在XML文档中
- 在XML文档中，document.createCDATASection() 传入节点内容来创建 CDATA 区块
### Comment 类型， nodeType-8
- nodeName - #comment
- nodeValue 为注释内容
- parent值为 Document 或 Element 对象
- 不支持子节点
- 和Text类型继承同一个基类 CharacterData, 因此拥有除splitText 以外的其他字符串操作方法
- document.createComment(str) 创建注释节点
- 浏览器不承认<*/html>后的注释，要想访问，必须确定是html的后代
### Document 类型， nodeType - 9
- nodeName - #document
- nodeValue - null
- parentNode - null
- ownerDocument - null
- 子节点可以是 DocumentType(最多一个)，Element(最多一个)，ProcessingInstruction 或 Comment类型
- 浏览器中，文档对象 document 是 HTMLDocument 的实例（HTMLDocument 继承 Document），表示整个 HTML 页面。
- 子节点四种类型 DocumentType、Element、ProcessingInstruction、comment 类型
    - document.documentElement 始终指向 html
    - document.body 直接指向 body
    - document.doctype 取得对 <!doctype> 的引用
    - 元素是 HTMLElement (HTMLElement 继承 Element) 的实例
- 文档信息
    - document.title 可以读取浏览器标题，但这个改变不会改变 title元素的原有内容
    - 以下只有domain是可以设置的，但是不能设置URL不包含的值
        - document.URL 取得地址栏URL
        - document.domain 取得域名
            - 只能放松不能收紧，因为每次都能设置 domain中包含的
            - 页面包含不同子域的窗格<*frame>或内嵌窗格<*iframe>，设置相同的domain后，就可以访问对方的js，不然无法访问
        - document.referrer 取得当前页面来源，无则为空字符串
- 定位元素
    - document.getElementById('myId')
        - 没找到返回null
        - 多个只返回第一个出现的元素
    - document.getElementsByTagName('div')
        - html文档中，返回一个 HTMLCollection 对象，实时的，与NodeList相似
        - 可用中括号（实际上调用的还是.item），或者.item(index)取值
        - 如果标签中有 name="xx" 属性，可以通过 .namedItem('xx') 获取； 也可以用中括号[xx]（实际上调用的还是.namedItem）获取
        - document.getElementsByTagName('*') 获取所有元素，按照页面出现顺序，在数组依次显示
    - document.getElementsByName('myName')
        - .namedItem('xx') 只会返回第一个
        - label 标签的 for="id" 属性可以关联标签操作
    - document.anchors 文档中所有带 name 属性的 a 元素
    - document.forms 文档中所有 form 元素
    - document.images 文档中所有 img 元素
    - document.links 文档中所有带 href 属性的 a 元素
- DOM 兼容性检测
    - document.implementation 提供了浏览器 DOM 实现相关的信息和能力
    - document.implementation.hasFeature(特性名称, DOM版本)
        - 如，document.implementation.hasFeature('View', '2.0')
        - 浏览器支持返回 true
- 文档写入
    - document.write(parma) / document.writeln(parma)
        - parma 为字符串，可以包含 标签
        - writeln() 会在末尾追加一个换行符\
        - 这两种方法第一次执行，会把页面所有内容都干掉；但后面继续执行只会追加，不会再全部删除
    - document.open() 会干掉所有原本文档内容
    - document.close()
### DocumentType 类型， nodeType - 10
- DocumentType 节点包含文旦类型(doctype)信息
- nodeName 为文档类型的名称
- nodeValue, null
- 不支持子节点
- 不支持动态创建，只能在解析文档代码时创建
- document.doctype 可访问
    - .name 文档类型的名称
    - .entities 文档类型描述的实体的 NamedNodeMap
    - .notations 文档类型描述的表示法的 NamedNodeMap
### DocumentFragment 类型， nodeType - 11
- nodeName -  #document-fragment
- nodeValue - null
- parentNode - null
- 子节点可以是 Element、ProcessingInstruction 、Comment、Text、CDATASection、EntityReference类型
- 所有节点中唯一一个在标记中没有对应表示的类型
- DOM 将**文档片段**定义为“轻量级”文档，可以包含和操作节点，且没有完整**文档**那样额外的消耗
- 不能直接把**文档片段**添加到**文档**，而是作为其他要被添加到**文档**节点的仓库
- let fragment = document.createDocumentFragment() 创建**文档片段**
- 继承了所有**文档**类型具备的可以执行DOM操作的方法
    - **文档**中的一个节点被添加到**文档片段**，它就会被从**文档树**上移除，不会被浏览器渲染
    - 添加**文档片段**的节点不属于**文档树**，不会被浏览器渲染
    - 可通过 appendChild 和 insertBefore 将**文档片段**内容添加到**文档**，**文档片段**所有子节点都会添加到**文档**相应位置，但**文档片段**本身不会
- 可以把要添加的节点先创建到**文档片段**中，然后一次添加到**文档**，避免多次渲染
```
let ul = document.getElementById('myList')
let fragment = document.createDocumentFragment();
let i = 0;
while (i++ <= 3) {
    let li = document.createElement('li');
    let text = document.createTextNode(`item ${i}`);
    text.appendChild(text);
    fragment.appendChild(li);
}
ul.appendChild(fragment);
// 此时文档片段的子节点全部被转义到了 ul,  fragment 为空
```
## DOM编程
### 动态脚本
- 页面初始加载时不存在，后面通过添加dom加载的脚本
    - 方法一，也可以添加到head中
    ```
    let script = document.createElement('script')
    script.src = "xx.js"
    document.body.appendChild(script)
    ```
    - 方法二
        - 这种方式相当于在全局作用域中把源代码传个 evel()方法
    ```
    let script = document.createElement('script')
    let code = 'function sayHi(){}'
    try {
        // IE做了特殊处理，不允许访问DOM
        script.appendChild(document.createTextNode(code))
    } catch (e) {
        // IE需要这样
        script.text = code
    }
    document.body.appendChild(script)
    ```
#### 注意： 
- 通过innerHTML 创建的 <*script> 永远不会执行
- 会创建元素以及其中的脚本，但解析器会给这个标签大会上那个用不执行的标签
- 通过innerHTML 创建的 <*script>, 以后也没办法强制执行

### 动态样式
- 通过外部方式加载样式是一个异步过程。样式的加载和正在执行的js代码没有先后顺序。一般也无需知道样式何时加载完
- 方法一
```
let head = document.getElementsByTagName('head')[0]
let link = document.createElement('link')
link.rel = 'stylesheet'
link.type = 'text/css'
link.href = 'style.css'
head.appendChild(link)
```
- 方法二
    - 这样添加的样式会立即生效
    - IE 要小心使用 styleSheet.cssText。以下情况可能导致浏览器崩溃
        - 重用同一个style元素并设置该属性超过一次
        - 将 cssText 设置为空字符串
```
let style = document.createElement('script')
style.type = 'text/css'
let cssStr = 'body{font-size: 16px;}'
try {
    // IE做了特殊处理，不允许访问DOM
    style.appendChild(document.createTextNode(cssStr))
} catch (e) {
    // IE
    style.styleSheet.cssText = cssStr
}
let head = document.getElementsByTagName('head')[0]
head.appendChild(link)
```

### 创建表格
- 可以依照 普通方式一步步创建 createElement
- 为了方便创建表格，HTML DOM给<*table>、<*tbody>和<*tr>元素添加了一些属性和方法
    - <*table>元素添加了以下属性和方法：
        - caption，指向<*caption>元素的指针（如果存在）；
        - tBodies，包含<*tbody>元素的HTMLCollection；
        - tFoot，指向<*tfoot>元素（如果存在）；
        - tHead，指向<*thead>元素（如果存在）；
        - rows，包含表示所有行的HTMLCollection；
        - createTHead()，创建<*thead>元素，放到表格中，返回引用；
        - createTFoot()，创建<*tfoot>元素，放到表格中，返回引用；
        - createCaption()，创建<*caption>元素，放到表格中，返回引用；
        - deleteTHead()，删除<*thead>元素；
        - deleteTFoot()，删除<*tfoot>元素；
        - deleteCaption()，删除<*caption>元素；
        - deleteRow（pos），删除给定位置的行；
        - insertRow（pos），在行集合中给定位置插入一行。
    - <*tbody>元素添加了以下属性和方法：
        - rows，包含<*tbody>元素中所有行的HTMLCollection；
        - deleteRow（pos），删除给定位置的行；
        - insertRow（pos），在行集合中给定位置插入一行，返回该行的引用。
    - <*tr>元素添加了以下属性和方法：
        - cells，包含<tr>元素所有表元的HTMLCollection；
        - deleteCell（pos），删除给定位置的表元；
        - insertCell（pos），在表元集合给定位置插入一个表元，返回该表元的引用。
```
// 创建表格
let table = document.createElement("table");
table.border = 1;
table.width = "100%";

// **创建表体**
let tbody = document.createElement("tbody");
table.appendChild(tbody);

// **创建第一行**
tbody.insertRow(0);
// 创建行，并传入数字表示把这一行放在什么位置
// 用tbody.rows[0]来引用这一行，因为这一行刚刚创建并被添加到tbody的位置0
tbody.rows[0].insertCell(0);
// 创建表元，并传入数字表示把这表元放在什么位置
// tbody.rows[0].cells[0] 来引用这个表元
tbody.rows[0].cells[0].appendChild(document.createTextNode("Cell 1,1"))
tbody.rows[0].insertCell(1);
tbody.rows[0].cells[1].appendChild(document.createTextNode("Cell 2,1"))

// **创建第二行**
tbody.insertRow(1);
tbody.rows[1].insertCell(0);
tbody.rows[1].cells[0].appendChild(document.createTextNode("Cell 1,2"))
tbody.rows[1].insertCell(1);
tbody.rows[1].cells[1].appendChild(document.createTextNode("Cell 2,2"))

// **把表格添加到文档主体**
document.body.appendChild(table);
```