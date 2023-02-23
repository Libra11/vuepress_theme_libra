---
title: Javascript防抖节流和柯里化
category: javascript
desc: Javascript防抖节流和柯里化
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/JavaScript-Debounce-vs.-Throttle-2.png
date: "2023-02-23"
---

防抖和节流都是`JavaScript`中用于限制事件触发频率的技术。当需要在用户操作时处理大量计算时，它们可以有效地减少性能问题。

### 防抖`Debouncing)`

**防抖是指在一定时间间隔内，如果同一事件被触发多次，只执行最后一次触发事件的函数**，而忽略之前触发的函数执行。通常在用户频繁操作时使用。如：

- 搜索框输入联想：用户输入搜索关键字后，只在用户输入完成之后触发一次搜索，而不是在每次输入时都进行搜索。
- 按钮防抖：在提交表单或者进行其他操作时，防止用户重复点击按钮多次提交，可以限制触发函数的执行次数。
- 窗口大小调整：当用户频繁地调整浏览器窗口大小时，可以使用防抖来避免过度计算，减少性能问题。

使用`setTimeout()`实现，示例代码如下：

```javascript
function debounce(func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}
```

其中，`func`是需要执行的函数，`delay`是时间间隔。返回值是一个新的函数，这个函数在`delay`时间内只会被执行一次，如果多次调用，则每次重新计时。这个函数可以通过事件监听函数来调用。

### 节流 `Throttling`

节流是指**在一定时间间隔内，无论事件被触发多少次，只执行一次事件处理函数。**

- 滚动加载：在网页滚动时，可以使用节流来控制滚动事件的触发频率，以减少服务器的请求压力。
- 频繁的鼠标移动事件：当需要响应鼠标移动事件时，可以使用节流来减少响应次数，提高性能。
- 实时定位：当需要定位用户当前位置时，可以使用节流来减少定位请求的次数，提高性能。

使用`setTimeout()`实现，示例代码如下：

```javascript
function throttle(func, delay) {
  let timer = null;
  return function() {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}
```

其中，`func`是需要执行的函数，`delay`是时间间隔。返回值是一个新的函数，这个函数在`delay`时间内只会被执行一次，如果多次调用，则只有第一次会被执行，后续会被忽略。这个函数可以通过事件监听函数来调用。

## 函数柯里化

`JavaScript`函数柯里化是一种**将一个带有多个参数的函数转换成一系列只接收一个参数的函数的技术**。在柯里化之后，每个新函数接收一个参数并返回一个函数，这个函数会接收下一个参数，直到所有参数都被传递完毕，最后返回函数的结果。

例如，对于一个带有三个参数的函数：

```js
function add(x, y, z) {
  return x + y + z;
}
```

可以通过柯里化的方式转换成以下形式：

```js
function add(x) {
  return function(y) {
    return function(z) {
      return x + y + z;
    };
  };
}
```

然后可以像下面这样调用这个函数：

```js
add(1)(2)(3); // 6
```

在这个例子中，我们先传递了一个参数`1`，然后返回了一个新函数，该函数接受参数 2，并返回另一个新函数。最后一个新函数接收参数`3`并返回结果`6`。

**函数柯里化的主要作用之一是实现函数复用和参数复用**，具体来说，它可以让我们通过多次调用一个函数，每次传递不同的参数来生成新的函数。这样可以使得代码更加灵活、可重用，同时也能减少代码的冗余。

例如，考虑以下的加法函数：

```javascript
function add(x, y) {
  return x + y;
}
```

我们可以使用函数柯里化来生成一个新的函数`add5`，该函数总是将 5 作为第一个参数：

```js
const add5 = add.bind(null, 5);

console.log(add5(2)); // 输出 7
console.log(add5(3)); // 输出 8
```

在这个例子中，我们使用了`Function.prototype.bind()`方法将`add`函数的第一个参数绑定到 5，生成一个新的函数`add5`。这个新的函数只需要传递一个参数，就可以得到我们想要的结果。

另外一个例子是使用柯里化实现一个通用的过滤函数，该函数可以接收一个函数作为参数，然后返回一个新的函数，该函数接收一个数组并将这个数组过滤出符合条件的元素：

```js
function filter(fn) {
  return function(arr) {
    return arr.filter(fn);
  };
}

const greaterThan3 = filter((x) => x > 3);

console.log(greaterThan3([1, 2, 3, 4, 5])); // 输出 [4, 5]
console.log(greaterThan3([2, 3])); // 输出 []
```

在这个例子中，我们定义了一个通用的过滤函数`filter`，它接收一个函数作为参数，并返回一个新的函数。新函数接收一个数组参数，并通过调用`Array.prototype.filter()`方法来过滤出符合条件的元素。我们使用柯里化的方式将一个过滤函数作为参数传递给`filter`函数，然后生成一个新的函数`greaterThan3`，该函数总是过滤出大于 3 的元素。这样，**我们就可以轻松地实现各种不同的过滤操作，同时也能提高代码的可读性和可维护性。**

### 柯里化函数实现

```js
function currying(func) {
  const args = [];
  return function result(...rest) {
    if (!rest.length) return func(...args);
    args.push(...rest);
    return result;
  };
}

// 使用
function add(...args) {
  return args.reduce((x, y) => {
    return x + y;
  });
}

currying(add)(1)(3)(4, 5)(); //13
```
