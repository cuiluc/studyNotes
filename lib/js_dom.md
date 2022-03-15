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
    - .className 可读取， 用此设置类名
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
    - element.setAttributeNS(spaceName, atrName, value)
        - 命名空间变化， 第一个参数为命名空间字符串
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
        - 可以用过 element.textContent = 'xx'直接设置文本节点， 比起innerText更推荐这个
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
---

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
- 这种方式相当域添加了 async 属性
- 需要动态加载的script外部脚本，比如在js中创建一个 script标签添加src属性。会影响性能，可以在文档头部， `<link rel="preload" href="想加载文件的路径">`

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

### NodeList 对象
- 和 NamedNodeMap, HTMLCollection 这三个都是实时的
- 所以，document.getElementsByTagName() 获取的NodeList 对象是实时的，如果要添加同样的标签，那么最好将长度保存起来
---

## MutationObserver接口
- 可以在DOM被修改时异步执行回调。使用MutationObserver可以观察整个文档、DOM树的一部分，或某个元素。此外还可以观察元素属性、子节点、文本，或者前三者任意组合的变化。
- 新引进MutationObserver接口是为了取代废弃的MutationEvent。
- MutationObserver 的实例要通过调用 MutationObserver构造函数并传入一个回调函数来创建：
```
let observer = new MutationObserver((mutationRecords, mutationObserver) => console.log(mutationRecords, mutationObserver));
```
### 基本语法 observe 方法
- observe(要观察的DOM节点，MutationObserverInit对象)方法
    - 新创建的MutationObserver实例不会关联DOM的任何部分。
    - 要把这个observer与DOM关联起来，需要使用observe()方法。
    - 参数一，必须是一个node，不能为nodeList
    - 参数二，MutationObserverInit对象用于控制观察哪些方面的变化，是一个键/值对形式配置选项的字典。
        - MutationObserverInit 对象用于控制对目标节点的观察范围。观察者可以观察的事件包括属性变化、文本变化和子节点变化。
        - 对象属性 childList / attributes / characterData 不管直接或间接，至少需要一个为 true 不然报错
            - subtree 布尔值，默认false，是否观察目标节点的子树， true则观察自己以及后代
                - 默认为目标元素及其**子节点**的变化
                - 为true，以下三种情况会触发回调
                    - attributes 为 true 时，子元素的属性变化
                    - characterData 为 true 时，子元素的字符数据变化
                    - childList 为 true 时，子元素的增删子节点
                - 注意，被观察目标元素中的节点被移出其子树之后，即严格来讲该节点已经脱离了原来的目标元素，但它仍然会触发变化事件。

            - attributes 布尔值，默认false，是否观察目标节点的属性变化
            - attributeFilter 字符串数组，默认观察所有属性，表示要观察哪些属性变化
                - 把这个设置成true的话，attributes也会被转化为 true
                - 没在数组内的，无法触发回调
                - 默认的都是公认的dom属性，可以把自定义的属性名写到其中，如，attributeFilter: ['foo']
            - attributeOldValue 布尔值，默认false，设置 mutationRecords 是否启用记录变化之前的属性值
                - 把这个设置成true的话，attributes也会被转化为 true
            
            - characterData 布尔值，默认false，修改字符数据是否触发变化
            - characterOldValue, 布尔值，默认false，设置 mutationRecords 是否记录变化之前的字符数据
                - 把这个设置成true的话，characterData也会被转化为 true

            - childList 布尔值，默认false，表示修改目标节点的子节点是否触发变化事件，观察**子节点的添加和移除**
                - insertBefore 重新排序页面当前存在的元素，会触发两次变化，移除 + 添加
    ```
    // 创建一个观察者（observer）并配置它观察<body>元素上的属性变化
    let observer = new MutationObserver(() => console.log( 'body changed' ));
    observer.observe(document.body, {attributes: true})
    ```
    - body元素任何属性变化，都会执行回调函数；但是，<*body>元素后代的修改或其他非属性修改都不会触发回调进入任务队列

### 回调函数参数
    - 第一个参数， MutationRecord
        - 每个回调都会收到一个 MutationRecord 实例的数组。
        - MutationRecord 实例包含的信息包括发生了什么变化，以及DOM的哪一部分受到了影响。
        - 因为回调执行之前可能同时发生多个满足观察条件的事件，所以每次执行回调都会传入一个包含按顺序入队的MutationRecord实例的数组。
        - 数组对象可以看出目标元素target， 变化类型type
        - 连续修改会按顺序记录，对同一属性赋值多次，即便是赋值同一个值，也会产生同样多的记录
        - MutationRecord 实例属性
            - target 被修改影响的目标节点
            - type，字符串 attributes , characterData 或者 childList
            - oldValue， type - childList一直为null；其他两种类型在*observe的参数二MutationObserverInit对象*启用观察时，两个为被替代的值，否则为null
            - attributeName，type -  attributes为被修改的属性的
            - attributeNamespace，使用命名空间的attributes的变化，其他为null
            - addedNode,  childList变化，返回添加节点的 NodeList, 默认为空的 NodeList[]
            - removedNode,  childList变化，返回删除节点的 NodeList, 默认为空的 NodeList[]
            - previousSibling,  childList变化，返回变化节点前一个同胞Node, 默认为null
            - nexSibling,  childList变化，返回变化节点后一个同胞Node, 默认为null
    - 第二个参数， 观察变化的 MutationObserver

### 基本语法 disconnect()
    - 默认情况下，只要被观察的**元素**不被垃圾回收，MutationObserver的回调就会响应DOM变化事件，从而被执行。
    - 要提前终止执行回调，可以调用disconnect()方法。
    - 同步调用，在两次变化之间，调用 observer.disconnect() 之后，不仅会停止此后变化事件的回调，也会**抛弃已经加入任务队列要异步执行的回调**; 要不影响已经加入的，把 observer.disconnect() 放到setTimeout, 0中
    ```
    let observer = new MutationObserver((mutationRecords, MutationObserver) => console.log(mutationRecords, mutationObserver));
    observer.observe(document.body, { attributes: true })
    document.body.className = 'a'
    setTimeout(() => {
        // 这样第一次的'a'可以调用回调
        observer.disconnect()
        document.body.className = 'b'
    }, 0)
    ```

### 基本语法 takeRecords()
- 调用 MutationObserver 实例的takeRecords()方法可以清空记录队列，取出并返回其中的所有MutationRecord实例
- 希望断开与观察目标的联系，但又希望处理由于调用disconnect()而被抛弃的记录队列中的 MutationRecord实例时比较有用。
```
let observer = new MutationObserver((mutationRecords, MutationObserver) => console.log(mutationRecords, mutationObserver));
observer.observe(document.body, { attributes: true })
document.body.className = 'a'
observer.takeRecords() // [MutationRecord]
observer.takeRecords() // []
```

### 复用，多次使用 MutationObserver
    - 多次调用observe()方法，可以复用一个MutationObserver对象观察多个不同的目标节点。
        - 此时，MutationRecord 数组的 target属性可以标识发生变化事件的目标节点。
    - disconnect()，调用它会停止观察所有目标
    ```
    let observer = new MutationObserver((mutationRecords, MutationObserver) => console.log(mutationRecords, mutationObserver));
    observer.observe(dom1), { attributes: true })
    observer.observe(dom2), { attributes: true })
    // dom1 和 dom2 的属性变化，会在同一个数组 mutationRecords 显示，只是 target 不同
    ```

### 重用，重新使用 MutationObserver
    - 调用disconnect() 并不会结束MutationObserver的生命。
    - 可重新使用这个观察者，再将它关联到新的目标节点。

### 注意
- 回调函数观察到变化后执行，且不是同步任务
- MutationObserver接口是出于性能考虑而设计的，其核心是异步回调与记录队列模型。为了在大量变化事件发生时不影响性能，每次变化的信息（由观察者实例决定）会保存在MutationRecord实例中，然后添加到记录队列。这个队列对每个MutationObserver实例都是唯一的，是所有DOM变化事件的有序列表。
    - 每次MutationRecord被添加到MutationObserver的记录队列时，**仅当之前没有已排期的微任务回调**时（队列中微任务长度为0），才会将观察者注册的回调（在初始化MutationObserver时传入）作为**微任务**调度到任务队列上。这样可以保证记录队列的内容不会被回调处理两次。
    - 不过在回调的微任务异步执行期间，有可能又会发生更多变化事件。因此被调用的回调会接收到一个MutationRecord实例的数组，顺序为它们进入记录队列的顺序。回调要负责处理这个数组的每一个实例，因为函数退出之后这些实现就不存在了。回调执行后，这些MutationRecord就用不着了，因此记录队列会被清空，其内容会被丢弃。

- DOM Level 2规范中描述的 MutationEvent 定义了一组会在各种DOM变化时触发的事件。由于浏览器事件的实现机制，这个接口出现了严重的性能问题。因此，DOM Level 3规定废弃了这些事件。
- MutationObserver接口就是为替代这些事件而设计的更实用、性能更好的方案。将变化回调委托给微任务来执行可以保证事件同步触发，同时避免随之而来的混乱。为Mutation-Observer而实现的记录队列，可以保证即使变化事件被爆发式地触发，也不会显著地拖慢浏览器。无论如何，使用MutationObserver仍然不是没有代价的。因此理解什么时候避免出现这种情况就很重要了。
    - MutationObserver的引用
        - MutationObserver实例与目标节点之间的引用关系是非对称的。MutationObserver拥有对要观察的目标节点的弱引用。
        - 因为是弱引用，所以不会妨碍垃圾回收程序回收目标节点。
        - 目标节点却拥有对MutationObserver的强引用。如果目标节点从DOM中被移除，随后被垃圾回收，则关联的MutationObserver也会被垃圾回收。
    - MutationRecord的引用
        - 记录队列中的每个MutationRecord实例至少包含对已有DOM节点的一个引用。如果变化是childList类型，则会包含多个节点的引用。
        - 记录队列和回调处理的默认行为是耗尽这个队列，处理每个MutationRecord，然后让它们超出作用域并被垃圾回收。
        - 有时候可能需要保存某个观察者的完整变化记录。保存这些MutationRecord实例，也就会保存它们引用的节点，因而会妨碍这些节点被回收。如果需要尽快地释放内存，建议从每个MutationRecord中抽取出最有用的信息，然后保存到一个新对象中，最后抛弃MutationRecord。
---
---
# DOM 拓展
- 两个标准： Selectors API 与 HTML5
- 一个规范： ElementTraversal规范

## Selectors API标准
- 根据css选择器匹配元素
- 在兼容浏览器中，Document类型 和 Element类型的实例 上都会暴露这两个方法
- 可以在Document、DocumentFragment和Element类型上使用
    - 选择符有语法错误或碰到不支持的选择符，会抛出错误
### Selectors API Level 1规范
1. .querySelector('CSS选择符字符串')
    - 返回第一个匹配的后代元素，无null
    - Document上，从文档元素开始搜索；在Element上，只会从当前元素的后代中查询
    - documnet.querySelector('body')
    - documnet.body.querySelector('img.btn')
2. .querySelectorAll('CSS选择符字符串')
    - 返回NodeList的静态实例；无，空的NodeList实例
    - 静态的“快照”，而非“实时”的查询。此底层实现避免了使用NodeList对象可能造成的性能问题
    - 返回值可for-of，可以用item(index)/[index]取个别元素
## Selectors API Level 2规范
1. el.matches('CSS选择符字符串')
    - 元素匹配则该选择符返回true，否则返回false
    - documnet.body.matches('body.page1') // true/false
    - 可以方便地检测某个元素会不会被querySelector()或querySelectorAll()方法返回
    - 所有主流浏览器都支持matches()。Edge、Chrome、Firefox、Safari和Opera完全支持，IE9~11及一些移动浏览器支持带前缀的方法
2. el.find() 尚未有浏览器实现或宣称实现
3. el.findAll() 尚未有浏览器实现或宣称实现

## HTML5标准
- 以前是一个纯标记语言
### CSS类扩展
### 自定义数据属性
#### 获取元素 el.getElementsByClassName('类名， 多个用 空格相隔')
- 如果提供了多个类名，则顺序无关紧要
- 返回s所有包含相应类的元素NodeList
- 类名不加.
- document.getElementsByClassName('a b c')
- 如果要给包含特定类（而不是特定ID或标签）的元素添加事件处理程序，使用这个方法会很方便
- IE9及以上版本，以及所有现代浏览器都支持
#### 操作类名
1. el.className 获取/设置
    - el.className = ' a b c'
    - el.className //  a b c
2. el.classList
    - 是一个新的集合类型DOMTokenList的实例
    - .length / .item[index] / [index]
    - DOMTokenList还增加了以下方法:
        1. el.classList.add（value），向类名列表中添加指定的字符串值value。如果这个值已经存在，则什么也不做。
        2. el.classList.contains（value），返回布尔值，表示给定的value是否存在。
        3. el.classList.remove（value），从类名列表中删除指定的字符串值value。
        4. el.classList.toggle（value），如果类名列表中已经存在指定的value，则删除；如果不存在，则添加。
    - el.classList.remove('a') 不影响其他类名
    - 除非是完全删除或完全重写元素的class属性，否则className属性就用不到了
    - IE10及以上版本（部分）和其他主流浏览器（完全）实现了classList属性。
### 焦点管理
- 页面加载时，可以通过用户输入（按Tab键或代码中使用focus()方法）让某个元素自动获得焦点
1. document.activeElement，始终包含当前拥有焦点的DOM元素
    - 默认情况下，在页面刚加载完之后会设置为document.body。在页面完全加载之前，为null。
2. el.focus() 让某个元素获取焦点
3. document.hasFocus()，该方法返回布尔值，表示文档是否拥有焦点
    - 可以确定用户是否在操作页面。
- 有利于无障碍Web应用程序，因为一个重点就是焦点管理
### HTMLDocument 扩展
1. document.readyState
    - loading，表示文档正在加载； complete，表示文档加载完成
    - 可以不再依赖onload，即可判断文档是否加载完
2. document.compatMode 检测页面渲染模式
    - 标准模式，"CSS1Compat"；在混杂模式，BackCompat"
3. document.head 直接取head元素
    - document.body
### 字符集属性 document.characterSet
- 表示文档实际使用的字符集，也可指定新字符集
- 默认值是"UTF-16"
- 可以通过 \<meta>元素 或 响应头，以及新增的 characterSeet属性 来修改
### 自定义数据属性
1. 非标准属性，需要用 data-xx
    - 以便告诉浏览器，这些属性既不包含与渲染有关的信息，也不包含元素的语义信息
    - <div id="myDiv" data-appId="12345"></div>
    - data-myname/data-myName 用 myname访问；data-my-name/data-My-Name 用 myName访问。第二个横杠的第一个字母是大写，其余都会转小写
2. el.dataset.xx 访问
    - 是一个DOMStringMap的实例，包含一组键/值对映射
    - el.dataset.appId
- 适合需要给元素附加某些数据的场景，比如链接追踪和在聚合应用程序中标识页面的不同部分。另外，单页应用程序框架也非常多地使用了自定义数据属性。
### 插入标记
#### el.innerHTML
1. 返回元素所有后代的HTML字符串，包括元素、注释和文本节点。返回的值浏览器实现不一致，如空格等
2. 写入时，根据提供的字符串值以新的DOM子树替代元素中原来包含的所有节点
    - 赋值会被解析为DOM子树，并替代元素之前的所有节点。
        - 因为所赋的值默认为HTML，所以其中的所有标签都会以浏览器处理HTML的方式转换为元素（同样，转换结果也会因浏览器不同而不同）
        - 如果赋值中不包含任何HTML标签，则直接生成一个文本节点
    - 设置完，立即可以用
3. 所有现代浏览器中，通过innerHTML插入的\<script>标签是不会执行的
4. IE8以前，script标签带defer属性/style标签（非受控元素 script/style/注释，即页面上看不到），之前(即兄长标签)如果是受控元素，是可以执行的
    - 如果只有非受控元素，innerHTML会干掉非受控开始的内容
    - 前面加_ / 前面加非空标签，哪怕是标签中间为空格 / <input type="hidden">可执行
- Firefox在内容类型为application/xhtml+xml的XHTML文档中对innerHTML更加严格。在XHTML文档中使用innerHTML，必须使用格式良好的XHTML代码。否则，在Firefox中会静默失败
- 暴露给用户时，一定要做好隔离和防止xss攻击
#### el.outerHTML
1. 返回值包括 el.innerHTML + el本身
2. 写入，也会干掉el本身
#### el.insertAdjacentHTML(position, htmlStr) 与 el.insertAdjacentText(position, htmlStr)
1. 参数1， 插入位置position
    - "beforebegin"，插入当前元素前面，作为前一个同胞节点，相当于相对于<p>
    - "afterbegin"，插入当前元素内部，作为新的子节点或放在第一个子节点前面，相当于相对于<p>
    - "beforeend"，插入当前元素内部，作为新的子节点或放在最后一个子节点后面，相当于相对于</p>
    - "afterend"，插入当前元素后面，作为下一个同胞节点，相当于相对于</p>
    > 注意这几个值是不区分大小写的
2. 参数2 要插入的HTML或文本
    - 作为HTML字符串解析（与innerHTML和outerHTML相同）或者作为纯文本解析（与innerText和outerText相同）
    - 如果是HTML，则会在解析出错时抛出错误
- 如
    ```
    element.insertAdjacentHTML("beforebegin", "<p>Hello world! </p>");
    element.insertAdjacentText("beforebegin", "Hello world! ");
    ```
#### 内存问题
- 以上操作替换子节点可能在浏览器（特别是IE）中导致内存问题。
    - 比如被移除的元素还有关联的事件处理程序或其他JavaScript对象（作为元素的属性），那它们之间的绑定关系会滞留在内存中。如果频繁操作，内存占用太多
    - 在使用innerHTML、outerHTML和insertAdjacentHTML()之前，**最好**手动删除要被替换的元素上关联的事件处理程序和JavaScript对象
- 插入大量的新HTML使用innerHTML比使用多次DOM操作创建节点再插入来得更便捷。这是因为HTML解析器会解析设置给innerHTML（或outerHTML）的值。解析器在浏览器中是底层代码（通常是C++代码），比JavaScript快得多。不过，HTML解析器的构建与解构也不是没有代价，因此最好限制使用innerHTML和outerHTML的次数
### el.scrollIntoView()
- 存在于所有HTML元素上，可以滚动浏览器窗口或容器元素以便包含元素进入视口。
- 这个方法的参数如下：
    - alignToTop是一个布尔值。
        - true：窗口滚动后元素的顶部与视口顶部对齐。
        - false：窗口滚动后元素的底部与视口底部对齐。
    - scrollIntoViewOptions是一个选项对象。
        - behavior：定义过渡动画，可取的值为"smooth"和"auto"，默认为"auto"。
        - block：定义垂直方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"start"。
        - inline：定义水平方向的对齐，可取的值为"start"、"center"、"end"和"nearest"，默认为"nearest"。
    -  不传参数等同于alignToTop为true。
```
document.forms[0].scrollIntoView();
document.forms[0].scrollIntoView(true);
document.forms[0].scrollIntoView({behavior: 'smooth', block: 'start'});
```
## ElementTraversal规范
- IE9之前的版本不会把元素间的空格当成空白节点，而其他浏览器则会。导致了childNodes和firstChild等属性上的差异,为此，同时不影响DOM规范，W3C通过新的Element Traversal规范定义了一组新属性。
- Element Traversal API为DOM元素添加了5个属性：
    1. parentEle.childElementCount，返回子元素数量（不包含文本节点和注释）
    2. parentEle.firstElementChild，指向第一个Element类型的子元素（Element版firstChild）
    3. parentEle.lastElementChild，指向最后一个Element类型的子元素（Element版lastChild）
    4. parentEle.previousElementSibling，指向前一个Element类型的同胞元素（Element版previousSibling）
    5. parentEle.nextElementSibling，指向后一个Element类型的同胞元素（Element版nextSibling）
    - IE9及以上版本，以及所有现代浏览器都支持Element Traversal属性
## 专有拓展 某个浏览器专有
### el.children
- 是一个HTMLCollection，只包含元素的Element类型的子节点。如果元素的子节点类型全部是元素类型，那children和childNodes中包含的节点应该是一样的。
### 元素间关系
#### el1.contains(el2)
- el2是el1的后代，返回true，否则返回false
- document.documentElement.contains(document.body)
#### el1.compareDocumentPosition(el2)
- DOM Level 3 的方法，可以确定节点间的关系
- 返回表示两个节点关系的位掩码
    - 0x1 断开，不在文档中
    - 0x2 领先，el2在el1之前
    - 0x4 随后，el2在el1之后
    - 0x8 包含，el2是el1祖先
    - 0x10 被包含，el2是el1后代
- document.documentElement.compareDocumentPosition(document.body)  // 20（或0x14，其中0x4表示“随后”，加上0x10“被包含”）
### 插入标记
#### el.innerText
- innerText属性对应元素中包含的所有文本内容，无论文本在子树中哪个层级。
1. 在用于读取值时，innerText会按照深度优先的顺序将子树中所有文本节点的值拼接起来。
    - 注意不同浏览器对待空格的方式不同，因此格式化之后的字符串可能包含也可能不包含原始HTML代码中的缩进。
2. 在用于写入值时，innerText会移除元素的所有后代并插入一个包含该值的文本节点
    - 设置innerText会移除元素之前所有的后代节点，完全改变DOM子树
    - 设置innerText也会编码出现在字符串中的HTML语法字符（小于号、大于号、引号及和号）
- div.innerText = div.innerText; 执行后，容器元素的内容只会包含原先的文本内容
#### el.outerText
- 同上，不过会包含el本身/删除el本身
```
div.outerText = "Hello world! ";
// 相当于
let text = document.createTextNode("Hello world! ");
div.parentNode.replaceChild(text, div);
```
### 滚动
- 虽然HTML5把scrollIntoView()标准化了，但不同浏览器中仍然有其他专有方法。
- 比如，el.scrollIntoViewIfNeeded()
    - 作为HTMLElement类型的扩展可以在所有元素上调用
    - scrollIntoViewIfNeeded(alingCenter)会在元素不可见的情况下，将其滚动到窗口或包含窗口中，使其可见；如果已经在视口中可见，则这个方法什么也不做。
    - 如果将可选的参数alingCenter设置为true，则浏览器会尝试将其放在视口中央。Safari、Chrome和Opera实现了这个方法。