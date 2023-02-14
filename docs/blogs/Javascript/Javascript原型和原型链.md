---
title: Javascript原型和原型链
category: javascript
desc: Javascript原型和原型链
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/ezgif-5-8cf19646d0.png
date: "2023-02-10"
---

### `Javascript`原型和原型链

![ezgif-5-8cf19646d0](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/ezgif-5-8cf19646d0.png)

## 四个规则

我们先来了解下面引用类型的四个规则：

1、引用类型，都具有对象特性，即可自由扩展属性。

2、引用类型，都有一个隐式原型 `__proto__` 属性，属性值是一个普通的对象。

3、引用类型，隐式原型 `__proto__` 的属性值指向它的构造函数的显式原型 `prototype` 属性值。

4、当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 `__proto__`（也就是它的构造函数的显式原型 `prototype`）中寻找。

> 引用类型：Object、Array、Function、Date、RegExp。这里我姑且称 **\_\_proto\_\_** 为隐式原型，没有官方中文叫法，大家都瞎叫居多。

下面我们逐一验证上面几个规则，就会慢慢地理解原型和原型链。

#### 规则一

引用类型，都具有对象特性，即可自由扩展属性：

```javascript
const obj = {};
const arr = [];
const fn = function() {};

obj.a = 1;
arr.a = 1;
fn.a = 1;

console.log(obj.a); // 1
console.log(arr.a); // 1
console.log(fn.a); // 1
```

> 这个规则应该比较好理解，Date 和 RegExp 也一样，就不赘述了。

#### 规则二

引用类型，都有一个隐式原型 `__proto__` 属性，属性值是一个普通的对象：

```javascript
const obj = {};
const arr = [];
const fn = function() {};

console.log("obj.__proto__", obj.__proto__);
console.log("arr.__proto__", arr.__proto__);
console.log("fn.__proto__", fn.__proto__);
```

#### 规则三

引用类型，隐式原型 `__proto__` 的属性值指向它的构造函数的显式原型 `prototype` 属性值：

```javascript
const obj = {};
const arr = [];
const fn = function() {};

obj.__proto__ == Object.prototype; // true
arr.__proto__ === Array.prototype; // true
fn.__proto__ == Function.prototype; // true
```

#### 规则四

当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 `__proto__`（也就是它的构造函数的显式原型 `prototype`）中寻找：

```javascript
const obj = { a: 1 };
obj.toString;
// ƒ toString() { [native code] }
```

首先， `obj` 对象并没有 `toString` 属性，之所以能获取到 `toString` 属性，是遵循了第四条规则，从它的构造函数 `Object` 的 `prototype` 里去获取。

## 一个特例

我试图想推翻上面的规则，看下面这段代码：

```javascript
function Person(name) {
  this.name = name;
  return this; // 其实这行可以不写，默认返回 this 对象
}

var nick = new Person("nick");
nick.toString;
// ƒ toString() { [native code] }
```

按理说， `nick` 是 `Person` 构造函数生成的实例，而 `Person` 的 `prototype` 并没有 `toString` 方法，那么为什么， `nick` 能获取到 `toString` 方法？

这里就引出 `原型链` 的概念了， `nick` 实例先从自身出发检讨自己，发现并没有 `toString` 方法。找不到，就往上走，找 `Person` 构造函数的 `prototype` 属性，还是没找到。构造函数的 `prototype` 也是一个对象嘛，那对象的构造函数是 `Object` ，所以就找到了 `Object.prototype` 下的 `toString` 方法。

原型链是指`Javascript`如何查找对象的属性和方法的机制。当您试图访问对象的某个属性时，`Javascript`首先检查该对象是否具有该属性，如果没有，它会沿着该对象的原型指针，查找该属性。这个查找过程一直持续到对象的原型是`null`，如果在此过程中找到了该属性，它将返回该属性的值，否则将返回`undefined`。

因此，通过构建原型链，可以实现**继承和复用**代码。您可以创建一个对象，该对象继承其他对象的属性和方法，并在需要时覆盖它们。

例如，您可以创建一个`Animal`对象，并为其定义属性和方法，然后创建另一个对象`Dog`，该对象的原型指向`Animal`，以便从`Animal`继承属性和方法。您也可以覆盖`Animal`中的某些方法，以便它们适用于狗。这样，您就可以避免重复编写代码，并使用继承的概念扩展对象的功能。

这是一个简单的例子，展示了如何使用原型创建和继承对象：

```javascript
// 创建Animal原型
var Animal = {
  type: "Animal",
  displayType: function() {
    console.log(this.type);
  },
};

// 从Animal继承，创建Dog对象
var Dog = Object.create(Animal);
Dog.type = "Dog";

// 显示Dog的类型
Dog.displayType(); // 输出 "Dog"
```

通过这种方式创建的对象具有从原型继承的属性和方法，并且可以覆盖这些属性和方法，以便适用于该对象。

希望这可以帮助您对`Javascript`的原型和原型链有更深入的理解。
