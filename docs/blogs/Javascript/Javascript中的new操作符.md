---
title: Javascript中的new操作符
category: javascript
desc: Javascript中的new操作符
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/newop.png
date: "2023-02-10"
---

## `JavaScript` 中的 `new` 操作符

- 创建一个新的空对象。

- 将这个新对象的`__proto__`属性指向构造函数的`prototype`对象。

- 将构造函数的`this`指向这个新对象。

- 执行构造函数的代码。

- 如果构造函数没有显式返回对象，则返回新对象。

以下是一个手写的 `new` 方法的实现：

```javascript
function myNew(Constructor, ...args) {
  let obj = {};
  obj.__proto__ = Constructor.prototype;
  let result = Constructor.apply(obj, args);
  return typeof result === "object" ? result : obj;
}
```

您可以使用以下方式使用这个函数：

```javascript
function MyConstructor(name) {
  this.name = name;
}
let instance = myNew(MyConstructor, "John Doe");
console.log(instance.name); // Output: 'John Doe'
```
