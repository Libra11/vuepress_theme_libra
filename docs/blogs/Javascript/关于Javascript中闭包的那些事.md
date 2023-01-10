---
title: 关于Javascript中闭包的那些事
category: javascript
desc: 关于Javascript中闭包的那些事
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/Closure.png
date: "2023-01-10"
---

## 关于 Javascript 中闭包的那些事

### 闭包简介

闭包（`Closure`）是 `JavaScript`中一个重要的概念。它是指有权访问另一个函数作用域中的变量的函数。闭包可以让这些变量的值始终保存在内存中，使得这些变量在函数外仍然可以被访问。

在 `JavaScript` 中，闭包是**一个函数及其相关的引用环境组合的一个整体**。当这个函数被创建时，其会自动携带其创建时所在的环境。这个环境包括了所有在函数创建时可以访问的变量和函数。

闭包的一个重要应用是封装变量和函数。在闭包中，**变量和函数都是私有的，只能通过闭包中的函数访问。这样就可以在外部保护这些变量和函数，只允许被特定的函数访问**。

例如：

```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

let counter = createCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
```

在上面的代码中，函数 `createCounter` 返回一个匿名函数。这个匿名函数引用了外部的变量 `count`，因此会形成一个闭包。这个匿名函数可以访问并修改变量 `count`。

当调用函数 `createCounter` 时，会创建变量 `count` 并初始化为 `0`。然后会返回一个匿名函数，这个匿名函数会引用外部的变量 `count`。当调用这个匿名函数时，会将变量 `count` 加 `1` 并返回。

在上面的代码中，变量 `counter` 指向返回的匿名函数。当调用 `counter()` 时，会将变量 `count` 加 `1` 并返回。由于闭包会保存变量的值，因此连续调用 `counter()` 会返回递增的值。

### 关于堆栈

堆内存和栈内存的区别在于：

- 堆内存用于存储引用类型的值，栈内存用于存储函数调用时所需的临时数据。
- 堆内存的分配是动态的，栈内存的分配是静态的。
- 堆内存的释放是由垃圾回收机制自动完成的，栈内存的释放是在**函数执行完毕**后立即完成的。

栈内存不会被释放的情况包括：

- 当函数执行过程中遇到死循环时，函数的执行环境就不会被释放。
- 当函数执行过程中创建的**闭包**引用了函数的局部变量时，函数的执行环境就不会被释放。

> 在 `JavaScript` 中，**闭包的变量存储在堆内存中**。闭包的变量会一直存在，直到垃圾回收机制回收了这些变量所在的执行环境。

### 闭包的使用场景

闭包在 `JavaScript` 中有以下使用场景：

- 保护函数内部的局部变量不被外界访问。
- 在循环中使用闭包可以保存循环变量的值。
- 在事件处理函数中使用闭包可以保存事件相关的信息。

下面是一个使用闭包保护函数内部变量的例子：

```javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // Output: 1
console.log(counter()); // Output: 2
```

下面是使用闭包保存循环变量的例子：

```javascript
for (let i = 0; i < 5; i++) {
  // 使用回调函数就是在使用闭包
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

下面是使用闭包保存事件相关信息的例子：

```javascript
const buttons = document.querySelectorAll("button");
for (let i = 0; i < buttons.length; i++) {
  // 使用回调函数就是在使用闭包
  buttons[i].addEventListener("click", function() {
    console.log(i);
  });
}
```

### 闭包的弊端

闭包可以让函数内部的变量延长生命周期，但是这也带来了一些弊端：

1. 闭包会使得函数中的变量无法被垃圾回收机制回收，造成内存泄露。

```javascript
function createCache() {
  let cache = {};
  return function(key) {
    return cache[key];
  };
}

let getCache = createCache();
getCache("key1");

// 这时候，变量 cache 就无法被垃圾回收机制回收，造成内存泄露。
```

2. 闭包会使得函数的变量都被保存在内存中，占用内存空间。

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}

// 这段代码中，每个 setTimeout 都会创建一个闭包，保存变量 i，这样就会占用大量内存空间。
```
