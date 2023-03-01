---
title: CSS层叠上下文
category: css
desc: CSS层叠上下文
tag:
  - css
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/stackingcontextcss.png
date: "2023-02-27"
---

## `CSS` 中的层叠上下文

### 什么是层叠上下文

层叠上下文(`stacking context`)，是 HTML 中一个二维的概念，在`规范中有明确强调，每个`盒模型都是处在-个三维空间里面，他们分别处在平面的`x`轴，`Y`轴 以及表示层叠的 `z`轴了 如下图所示的三个盒子，他们分别在处在 `x`轴 和 Y 轴，同时在 `Z`轴上发生层叠。

![image-20230227095216298](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230227095216298.png)

但并不是所有的盒子都会在 `Z`轴 发生层叠,我们都知道，默认情况下，`HTML`元素在页面是沿 X 轴 和`Y`轴 平铺。如下图所示:元素默认从上往下，从左往右依次排列。所以我们察觉不到它们在`z`轴 上的层叠关系。

![image-20230227095313095](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230227095313095.png)

而一旦元素发生堆叠，我们就感受到一个元素覆盖了另一个元素，这时我们就能感受到`Z`轴 的存在。但是实事上，不管元素发不发生重叠，`Z`轴 都存在。

理解了上面内容之后，那我们回过头来理解下，到底什么是层叠上下文?你可以把层叠上下文理解为`HTML`元素的一个属性，一但`HTML`元素拥有了这个属性，我们可以理解为这个`HTML`元素在 `z`轴 上就“高人一等”，也就是在`Z`轴上会显示在更上一层。

#### 怎么个具象化法理解?

你可以把[层叠上下文] 理解为当官:网页中有很多很多的元素，我们可以看成是真实世界的芸芸众生。真实世界里，我们大多数人是普通老百姓们，还有一部分人是做官的官员。`0K`，这里的“官员”就可以理解为网页中的层叠上下文元素。
换句话说，页面中的元素有了层桑上下文，就好比我们普通老百姓当了官，一旦当了官，相比普通老百姓而言，离皇帝更近了。同理，当元素有了层叠上下文，就相当于他比网页中其它元素的级别更高了，在`Z`轴上的位置就就高了，离我们用户 (屏幕)更近了，显示在更上一层。

### 层叠上下文的创建

层叠上下文也基本上是有一些特定的`CSS`属性创建的。主要由以下 3 点

- `html`根元素:页面根元素天生具有层叠上下文，称之为“根层叠上下文”

- `z-index`值为数值的定位元素的传统层叠上下文`z-index:auto`不会创建层叠上下文。

- 其他`CSS3`属性

#### 根层叠上下文

指的是页面根元素，也就是滚动条的默认的始作俑者`<html>`元素。这就是为什么，绝对定位元素在 `left` / `top`等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。

我们写在`body`中的`HTML`标签，默认的就是处在`HTML`这个根层叠上下文中，在这个层叠上下文中各元素在`z`轴上有着自己的排列顺序，具体如何排列，后面层叠顺序会讲到。

#### 定位元素与传统层叠上下文

- 对于包含有 `position:relative/position:absolute`的定位元素，当其`z-index`值不是 `auto` 的时候,会创建层叠上下

- position 值为 `fixed` (固定定位) 或 `sticky` (粘滞定位) 的元素

  > 当我们给元素添加定位和 z-index 时，元素就会显示在其它元素的上面，本质就是因为他拥有了自己的层叠上下文，在 Z 轴上要比其它未拥有层叠上下文的元素更高一等。

#### `CSS3`与新时代的层叠上下文

`CSS3`的出现除了带来了新属性，同时还对过去的很多规则发出了挑战。例如，`CSS3 transform` [对`overflow`隐藏对`position:fixed`定位的影响等。而这里，层桑上下文这一块的影响要更加广泛与易著.如下:

- 父元素的 display 属性值为`flex|inline-flex`，子元素`z-index`属性值不为`auto`的时候，子元素为层叠上下文元素；

- 元素的`opacity`属性值不是`1`；

- 元素的`transform`属性值不是`none`；

- 元素`mix-blend-mode属性值不是`normal`；

- 元素的`filter`属性值不是`none`；

- 元素的`isolation`属性值是`isolate`；

- `will-change`指定的属性值为上面任意一个；

- 元素的`-webkit-overflow-scrolling`属性值设置为`touch`。

### 什么是层叠顺序

我们都知道，除了定位的元素会覆盖在其它元素的上面之外，还有很多情况下元素会发生重叠，那发生重叠时元素是以什么样的顺序来重桑的呢?这就是我们接下来要讲的元素的层叠顺序
"层叠顺序”英文称作”`stacking order`”表示元素发生层叠时候有着特定的垂直显示顺序。
我们页面中的元素有: 块级元素，行内元素，行内块元素，浮动元素，定位元素，还有后面学到的一些`CSS3`属性，当元素添加相关属性后，元素的层级也会发生改变。以下图只列出了目前学到的相关元素在同一层叠上下文中的层叠顺序。

![image-20230227100719701](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230227100719701.png)

同一层叠上下文，元素的层叠顺序，参考上图，由上到下分别

1. 背景和边框:建立当前层叠上下文元素的背景和边框.
2. 负的 `z-index`:当前层叠上下文中，`z-index` 属性值为负的元素
3. 块级盒:文档流内非行内级非定位后代元素
4. 浮动盒:非定位浮动元素。
5. 行内盒:文档流内行内级非定位后代元素
6. `z-index:0`: 层叠级数为`0`的定位元素.
7. 正 `z-index: z-index` 属性值为正的定位元素

### 案例

#### 元素都处在`html`层叠上下文中

```html
<style>
  html {
    background-color: skyblue;
  }

  .container {
    width: 600px;
    height: 600px;
    background-color: #ddd;
    margin: 50px;
    position: relative;
  }

  .box {
    width: 200px;
    height: 100px;
    border: 2px solid red;
  }

  .box1 {
    position: absolute;
    top: -30px;
    left: -30px;
    z-index: -1;
    background-color: pink;
  }

  .box2 {
    background-color: yellow;
  }

  .box3 {
    background-color: tomato;
    float: left;
    margin-top: -63px;
    margin-left: 37px;
  }

  .box4 {
    background-color: green;
    display: inline-block;
    margin-top: -23px;
    margin-left: -172px;
  }

  .box5 {
    background-color: blueviolet;
    position: absolute;
    z-index: 0;
    top: 117px;
    left: 102px;
  }

  .box6 {
    background-color: aquamarine;
    position: absolute;
    top: 153px;
    left: 134px;
    z-index: 1;
  }
</style>
</head>

<body>
  html
  <div class="container">
    <div class="box box1">z-index: -1</div>
    <div class="box box2">block</div>
    <div class="box box3">float</div>
    <div class="box box4">inline-block/inline</div>
    <div class="box box5">z-index: 0</div>
    <div class="box box6">z-index: 1</div>
  </div>
</body>
```

![image-20230227103001396](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230227103001396.png)

> 重点提示:
> 如果元素的等级一样，则写在后面的会覆盖在前面的上面如块级和块级，浮动和浮动，行内块与行内块，定位与定位元素，发生重叠时，默认的写在后面的会在最上面显示

#### 当元素处于定位元素的层叠上下文中

当相对定位元素处在`html`层叠上下文中，设置`z-index:-1`时，元素会在所有元素的下面显示.

当相对定位元素处在定位元素的层叠上下文中，设置`z-index-1`时，元素会在当前层叠上下文元素中所有元素的最下面。

```html
<style>
  .box,
  .box2 {
    width: 300px;
    height: 300px;
    background-color: skyblue;
    margin: 50px;
    position: relative;
  }

  .item,
  .item2 {
    width: 100px;
    height: 100px;
    background-color: khaki;
    position: absolute;
    top: -40px;
    left: -40px;
    z-index: -1;
  }

  .box {
    z-index: 0;
  }
</style>

<body>
  <div class="box">
    box是层叠上下文
    <!-- box 是层叠上下文 item相对于box层叠上下文，所以负的z-index排在box层叠上下文background-color上面 -->
    <div class="item"></div>
  </div>

  <div class="box2">
    box2不是层叠上下文
    <!-- box2 不是层叠上下文 z-index是-1，item相对于html层叠上下文，所以负的z-index排在最下面 -->
    <div class="item2"></div>
  </div>
</body>
```

![image-20230227104859678](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230227104859678.png)

#### 不同层叠上下文中子元素的层叠顺序

如下图的`B`和 C 都创建了自己的层叠上下文，那`B`中的子元素和`C`中的子元素的层叠顺序是怎么样的?

![image-20230227105245047](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230227105245047.png)

这个不写例子了，一句结论：

**谁的层叠上下文等级高，谁的子元素层级就高**
