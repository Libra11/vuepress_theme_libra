---
title: Javascript事件详解
category: javascript
desc: Javascript事件详解
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/JavaScript-Events.png
date: "2023-02-17"
---

## `事件`

### `DOM`事件级别

在 `Web` 开发中，有三个 `DOM` 事件级别，分别是 `DOM0`、`DOM2` 和 `DOM3`。下面是每个级别的简单介绍：

#### `DOM0` 事件（原生事件）

`DOM0` 事件指的是在早期 `Web` 开发中，使用原生 `JavaScript` 直接绑定事件处理函数。这种方式是最原始的事件处理方式，它没有标准化，也没有统一的接口和规范。

```html
<button type="button" onclick="fn()" id="btn">点我试试</button>

<script>
  function fn() {
    alert("Hello World");
  }
</script>
```

`DOM0`级事件模型并**不支持事件捕获**，它只支持事件冒泡。在`DOM0`级事件模型中，事件处理程序只能被添加到具体的`HTML`元素上，并且**只能响应事件冒泡阶段的事件**。

```html
<div id="outer">
  <div id="inner">
    Click me!
  </div>
</div>
<script>
  var outer = document.getElementById("outer");
  var inner = document.getElementById("inner");

  outer.onclick = function() {
    alert("Outer div clicked");
  };

  inner.onclick = function() {
    alert("Inner div clicked");
  };
</script>
```

#### `DOM2` 事件

`DOM2` 事件是在 2000 年左右制定的 `W3C` 标准，它引入了新的事件类型和事件处理方式，也增强了事件处理程序的能力。`DOM2` 事件提供了标准化的接口和规范，可以在所有支持 `DOM` 的浏览器中使用。它包括了以下主要特性：

- 添加和删除事件监听器：使用 `addEventListener()` 和 `removeEventListener()` 方法来添加和删除事件监听器。

- 事件流（`Event flow`）：事件流规定了事件的传递顺序，即从顶层元素传递到底层元素或者从底层元素传递到顶层元素。

- 事件对象（`Event object`）：事件对象是在事件触发时由浏览器创建的一个对象，它包含了事件相关的信息，比如事件类型、触发事件的元素、事件发生的时间等等。

  该事件对象作为事件处理程序的第一个参数传递，可以用于访问事件相关的信息和方法。

  `Event`对象包含了一些常用的属性和方法，例如：

  - `type`：表示事件的类型。
  - `target`：表示触发事件的元素。
  - `currentTarget`：表示当前正在处理事件的元素，通常是事件处理程序所绑定的元素。
  - `eventPhase`：表示事件目前所处的阶段，可能是捕获阶段（1）、目标阶段（2）或冒泡阶段（3）。
  - `stopPropagation()`：用于阻止事件的进一步传播，即停止事件的冒泡或捕获过程。
  - `preventDefault()`：用于阻止事件的默认行为。

```html
<button id="myButton">Click me</button>
```

```js
// 获取按钮元素
const button = document.getElementById("myButton");

// 添加点击事件监听器
button.addEventListener("click", function(event) {
  alert("Level 2 Event");
});
```

事件冒泡和捕获：事件冒泡和捕获是指事件传递的两种不同方式，可以通过 `addEventListener()` 的第三个参数来控制事件传递的方式。可以通过将`addEventListener()`方法的**第三个参数设置为`true`来启用事件捕获**。

```html
<div id="outer">
  <div id="inner">
    Click me!
  </div>
</div>

<script>
  // 事件冒泡
  var outer = document.getElementById("outer");
  var inner = document.getElementById("inner");

  outer.addEventListener(
    "click",
    function() {
      alert("Outer div clicked");
    },
    false
  );

  inner.addEventListener(
    "click",
    function() {
      alert("Inner div clicked");
    },
    false
  );
</script>

<script>
  // 事件捕获
  var outer = document.getElementById("outer");
  var inner = document.getElementById("inner");

  outer.addEventListener(
    "click",
    function() {
      alert("Outer div clicked");
    },
    true
  );

  inner.addEventListener(
    "click",
    function() {
      alert("Inner div clicked");
    },
    true
  );
</script>
```

#### `DOM3` 事件

`DOM3` 事件是在 2004 年制定的标准，它在 `DOM2` 事件的基础上增加了一些新的功能和 `API`。`DOM3` 事件包括以下主要特性：

- 支持更多的事件类型：包括滚动事件、焦点事件、复制事件、粘贴事件、拖放事件等等。
- 支持更多的事件处理程序：包括 `oncopy`、`oncut`、`onpaste`、`ondragstart`、`ondragenter`、`ondragover`、`ondragleave`、`ondragend` 等等。

```html
<button id="myButton">Click me</button>
```

```js
// 获取按钮元素
const button = document.getElementById("myButton");

// 添加复制事件监听器
button.addEventListener("copy", function(event) {
  event.preventDefault();
  alert("Copying is not allowed");
});
```

### 事件委托

事件委托（`Event Delegation`）是一种常见的`JavaScript`编程模式，通过在父元素上监听事件，从而实现对子元素的事件处理。它的基本思想是利用事件的冒泡机制，将事件处理程序绑定在父元素上，而不是直接绑定在子元素上。这样，当子元素触发事件时，事件会一直向上冒泡到父元素，父元素就可以捕获到事件，并根据事件源的不同来执行相应的处理逻辑。

事件委托的优点包括：

- 可以避免在每个子元素上都绑定事件处理程序，从而提高性能。

- 可以动态地添加或删除子元素，而无需重新绑定事件处理程序。

- 可以简化代码结构，减少重复代码。

事件委托的实现步骤如下：

- 在父元素上监听需要处理的事件。

- 在事件处理函数中，通过事件对象的`target`属性获取到事件源（即子元素）。

- 根据事件源的不同，执行相应的处理逻辑。

例如，以下代码演示了如何利用事件委托实现对多个按钮的点击处理：

```html
<div id="buttons">
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
</div>

<script>
  const buttons = document.getElementById("buttons");
  buttons.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      // 处理按钮的点击事件
      console.log("Button clicked:", event.target.innerText);
    }
  });
</script>
```

### 事件循环

`JavaScript`的事件循环（`Event Loop`）是一种用于处理异步任务的机制，它通过不断地从任务队列中取出任务并执行，来实现 `JavaScript` 的单线程非阻塞特性。事件循环的基本原理如下：

1. 事件循环会不断地从任务队列中取出一个任务，该任务会被执行。
2. 在执行任务的过程中，如果遇到异步任务（如定时器、网络请求、`DOM` 事件等），则将该异步任务挂起，继续执行下一个任务。
3. **当异步任务完成时，将其对应的回调函数添加到任务队列的末尾，等待下一次执行。**
4. 事件循环的执行顺序为“先进先出”，即先添加到队列中的任务会先被执行。

在浏览器中，事件循环通常包括以下几个阶段：

1. 宏任务（`macro-task`）：包括整体代码、`setTimeout`、`setInterval`、`I/O` 操作、`UI` 交互事件等。
2. 微任务（`micro-task`）：包括`Promise`、`process.nextTick`、`Object.observe`、`MutationObserver`等。
3. 渲染：更新屏幕显示。

在每个事件循环周期中，**事件循环会先处理所有的微任务，然后再处理一个宏任务**，接着渲染屏幕，然后再处理下一个宏任务。**在处理微任务时，如果有新的微任务产生，则会继续处理微任务**，直到所有的微任务被处理完毕。

以下是一个简单的示例代码，它演示了事件循环的执行过程：

```javascript
console.log("start"); // 执行同步任务

setTimeout(() => {
  console.log("setTimeout"); // 执行宏任务
}, 0);

Promise.resolve().then(() => {
  console.log("promise"); // 执行微任务
});

console.log("end"); // 执行同步任务

// start end promise setTimeout
```

在这个例子中，首先会执行同步任务，输出`start`和`end`。然后，由于`setTimeout`是一个宏任务，因此它会被添加到宏任务队列中，等待下一次事件循环执行。接着，由于`Promise.resolve()`是一个微任务，因此它会被添加到微任务队列中，等待宏任务队列执行完毕后立即执行。最终，事件循环会先执行所有的微任务，输出`promise`，然后再执行宏任务，输出`setTimeout`。
