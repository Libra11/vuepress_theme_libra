---
title: CSS盒子模型
category: css
desc: CSS盒子模型
tag:
  - css
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/boxmodel.png
date: "2023-03-01"
---

## `CSS`盒子模型

`CSS`盒子模型（`Box Model`）是`Web`页面中的一个基本概念，用于描述 HTML 元素在浏览器中所占用的空间大小和布局方式。每个`HTML`元素都是一个矩形盒子，由四个部分组成：内容区域（`Content`）、内边距区域（`Padding`）、边框区域（`Border`）和外边距区域（`Margin`），这些部分在`CSS`中都可以被单独地设置和控制。

下面是`CSS`盒子模型的详细介绍：

1. 内容区域（`Content`）：HTML 元素的内容区域指的是元素中包含的文本、图片、视频等内容所占用的空间大小。内容区域的大小可以通过设置元素的宽度（`width`）和高度（`height`）来进行控制。
2. 内边距区域（`Padding`）：`HTML`元素的内边距区域指的是内容区域和边框之间的空白区域。内边距的大小可以通过设置元素的`padding`属性来进行控制。
3. 边框区域（`Border`）：HTML 元素的边框区域指的是包裹内容和内边距的框架，用于区分元素和其他元素的边界。边框的大小、样式和颜色可以通过设置元素的`border`属性来进行控制。
4. 外边距区域（`Margin`）：`HTML`元素的外边距区域指的是边框和相邻元素之间的空白区域。外边距的大小可以通过设置元素的`margin`属性来进行控制。

### 分类

`CSS`有两种盒子模型，分别是标准盒子模型和怪异盒子模型。它们的区别在于计算元素的总宽度和总高度时，是否包含内边距和边框

- 标准盒子模型：
  - 元素的总宽度 = 内容宽度 + 左右内边距 + 左右边框 ；
  - 元素的总高度 = 内容高度 + 上下内边距 + 上下边框。
- 怪异盒子模型：
  - 元素的总宽度 = 内容宽度（包含左右内边距和左右边框）；
  - 元素的总高度 = 内容高度（包含上下内边距和上下边框）。

### 示例

`CSS3`提供了一个属性`box-sizing`，可以用来指定使用哪种盒子模型默认值是`content-box`，表示使用标准盒子模型；另一个值是`border-box`，表示使用怪异盒子模型。

以下是一个代码示例，展示了两种盒子模型的效果：

```html
<style>
  /* 通用样式 */
  div {
    width: 300px;
    height: 200px;
    padding: 20px;
    border: 10px solid skyblue;
    margin: 10px;
  }

  /* 标准盒子模型 */
  #standard {
    box-sizing: content-box;
    /* 默认值 */
  }

  /* 怪异盒子模型 */
  #weird {
    box-sizing: border-box;
  }
</style>

<div id="standard">这是一个标准盒子</div>
<div id="weird">这是一个怪异盒子</div>
```

![image-20230301173906166](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230301173906166.png)
