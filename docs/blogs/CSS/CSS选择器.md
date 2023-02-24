---
title: CSS选择器
category: css
desc: CSS选择器
tag:
  - css
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/cssselectors.png
date: "2023-02-24"
---

## `CSS`选择器

`CSS`选择器是用来选择你想要给予样式的`HTML`元素的模式。根据它们可以选择的元素类型，`CSS`选择器可以分为以下几类:

### 基本选择器

#### 元素选择器

根据元素名称来选择，例如`p`，`div`，`h1`等。

```css
/* 元素 */
p {
  font-size: 16px;
}
```

#### `ID`选择器

根据元素的`ID`属性来选择，以`#`开头，例如`#myid`。

```css
/* ID */
#myid {
  color: red;
}
```

#### 类选择器

根据元素的`class`属性来选择，以`.`开头，例如`.myclass`。

```css
/* 类 */
.myclass {
  background-color: green;
}
```

#### 通配符选择器

选择所有元素，用`*`表示。

```css
/*通配符*/
* {
  margin: 0;
  padding: 0;
}
```

#### 分组选择器

将多个选择器用逗号分隔，同时应用相同的样式规则，例如`h1, h2, p {color: blue;}`。

```css
/* 分组 */
h1,
h2,
p {
  color: blue;
}
```

### 组合器选择器

#### 后代组合器

根据父子关系来选择元素，用空格分隔，例如`div p {color: red;}`表示选中所有`div`元素内部的`p`元素。

```css
/* 后代 */
div p {
  color: red;
}
```

#### 子组合器

根据直接父子关系来选择元素，用大于号（>）分隔，例如 `div > p {color: green;}`表示选中所有`div`元素**直接包含**的`p`元素。

```css
/* 子 */
div > p {
  color: green;
}
```

#### 相邻兄弟组合器

根据相邻兄弟关系来选择元素，用加号（+）分隔，例如 `h1 + p {color: yellow;}`表示选中紧跟在`h1`后面的**第一个**`p`元素。

```css
/* 相邻兄弟 */
h1 + p {
  color: yellow;
}
```

#### 广义兄弟组合器

根据兄弟关系来选择所有匹配的后续兄弟元素，用波浪线（~）分隔 ，例如 `h1 ~ p {color: pink;}`表示选中跟在`h1`后面的**所有**`p`元素。

```css
/* 广义兄弟 */
h1 ~ p {
  color: pink;
}
```

### 伪类选择器

根据特定状态或条件来动态地改变样式效果。以冒号（:）开头，并且有很多种类型。例如`:hover`, `:active`, `:first-child`, `:nth-child(n)`, `:checked`, `:not(selector)`等。

```css
/* :hover */
a:hover {
  text-decoration: none;
}

/* :active */
button:active {
  transform: scale(0.9);
}

/* :first-child */
ul li:first-child {
  font-weight: bold;
}

/* :nth-child(n) */
ul li:nth-child(2n) {
  background-color: gray;
}

/* :checked */
input[type="checkbox"]:checked + label {
  text-decoration: line-through;
}

/* :not(selector) */
div:not(.myclass) {
  border: 1px solid black;
}
```

### 伪元素选择器

根据特定位置或内容来创建虚拟的 HTML 子元素，并给予样式效果。以双冒号（::）开头，并且有很多种类型。例如 `::before`, `::after`, `::first-letter`, `::first-line`, `::selection`, `::placeholder`等。

```css
/* ::before */
p::before {
  content: "Hello ";
}

/* ::after */
p::after {
  content: " World!";
}

/* ::first-letter */
p::first-letter {
  font-size: 24px;
}

/* ::first-line */
p::first-line {
  text-align: center;
}

/* ::selection */
p::selection {
  color: white;
  background-color: black;
}

/* ::placeholder */
input[type="text"]::placeholder {
  color: gray;
}
```

### 属性选择器

根据特定属性或属性值来匹配 HTML 元素。使用方括号（[]）包裹属性名和可选的操作符和值。例如 `[attr]`, `[attr=value]`, `[attr~=value]`, `[attr|=value]`,`[attr^=value]`,`[attr$=value]`,`[attr*=value]`,`[attr operator value i]`(i 表示不区分大小写)等。

- `[attr]`：选择具有指定属性的所有元素，不管属性值是什么。例如`[title]`表示选择所有有`title`属性的元素。
- `[attr=value]`：选择具有指定属性和指定值的所有元素。例如`[type=text]`表示选择所有`type`属性为`text`的元素。
- `[attr~=value]`：选择具有指定属性，且该属性值包含一个以空格分隔的单词列表中包含指定值的所有元素。例如`[class~=myclass]`表示选择所有`class`属性中包含`myclass`这个单词（**不一定是整个值**）的元素。
- `[attr|=value]`：选择具有指定属性，且该属性值等于指定值或以指定值加连字符`（-）`开头的所有元素。这通常用于匹配语言代码。例如`[lang|=en]`表示选择所有`lang`属性为`en`或以`en-`开头的元素。
- `[attr^=value]`：选择具有指定属性，且该属性值以指定值开头（区分大小写）的所有元素。例如`[href^="https"]`表示选择所有`href`属性以`https`开头的元素。
- `[attr$=value]`: 选择具有指定属性，且该属性值以指定值结尾（区分大小写）的所有元素。例如`[src$=".png"]`表示选择所有`src`属性以`.png`结尾的元素。
- `[attr*=value]`: 选择具有指定属性，且该属性值包含指定值（区分大小写）的所有元素。例如`[href*="google"]`表示选择所有`href`属性中包含`google`的元素。
- `[attr operator value i]`: 选择具有指定属性，且该属性值符合指定操作符和值（不区分大小写）的所有元素。在操作符和值之间加上一个空格和一个 i 字符。例如`[type="text" i]`表示选择所有`type`属性为`text`或`TEXT`或`Text`等不同大小写形式的元素。

```css
/* [attr] */
a[target] {
  color: purple;
}

/* [attr=value] */
a[target="_blank"] {
  font-style: italic;
}

/* [attr~=value] */
div[class~="myclass"] {
  border-radius: 10px;
}

/* [attr|=value] */
div[lang|="en"] {
  font-family: Arial;
}

/* [attr^=value] */
a[href^="https"] {
  color: green;
}

/* [attr$=value] */
img[src$=".png"] {
  opacity: 0.8;
}

/* [attr*=value] */
a[href*="google"] {
  font-weight: bold;
}

/* [attr operator value i] */
input[type="text" i] {
  width: 200px;
}
```
