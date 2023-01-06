---
title: 数据类型检测的方式有哪些
category: javascript
desc: 判断Javascript数据类型检测的方式有哪些
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/checktype.png
date: "2023-01-06"
---

## 数据类型检测的方式有哪些

### typeof

```javascript
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof function() {}); // function
console.log(typeof Symblo(2)); // symbol
console.log(typeof 123n); // bigint
console.log(typeof undefined); // undefined
console.log(typeof null); // object
console.log(typeof {}); // object
console.log(typeof []); // object
```

其中数组、对象、`null`都会被判断为`object`，其他判断都正确。

### instanceof

`instanceof` 是 `JavaScript` 中的一个运算符，用于检测某个构造函数的 `prototype` 属性是否出现在对象的原型链中。

例如：

```javascript
function A() {}
function B() {}

let x = new A();
console.log(x instanceof A); // Output: true
console.log(x instanceof B); // Output: false
```

`instanceof` 运算符的运算原理如下：

1. 检测右操作数是否是函数。如果不是，则抛出 `TypeError`。
2. 如果左操作数不是对象，则返回 `false`。
3. 检测函数的 `prototype` 属性是否出现在对象的原型链中。如果出现，则返回 `true`；否则返回 `false`。

例如：

```javascript
function A() {}
function B() {}

A.prototype = Object.create(B.prototype);

let x = new A();
console.log(x instanceof B); // Output: true
console.log(x instanceof A); // Output: true
```

```javascript
console.log([] instanceof Array); // true
console.log(function() {} instanceof Function); // true
console.log({} instanceof Object); // true
```

`instanceof`**只能正确判断引用数据类型**，而不能判断基本数据类型。`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。

### constructor

```javascript
console.log((2).constructor === Number); // true
console.log(true.constructor === Boolean); // true
console.log("str".constructor === String); // true
console.log([].constructor === Array); // true
console.log(function() {}.constructor === Function); // true
console.log({}.constructor === Object); // true
console.log(Symbol(1).constructor === Symbol); // true
console.log(1n.constructor === BigInt); // true
```

`constructor`不能判断`null`和`undefined`类型。需要注意，如果改变它的原型，`constructor`就不能用来判断数据类型了：

```javascript
function Fn() {}

Fn.prototype = new Array();

var f = new Fn();

console.log(f.constructor === Fn); // false
console.log(f.constructor === Array); // true
```

### Object.prototype.toString.call()

`Object.prototype.toString.call()` 使用 Object 对象的原型方法 toString 来判断数据类型：

```javascript
var a = Object.prototype.toString;

console.log(a.call(2)); // [object Number]
console.log(a.call(true)); // [object Boolean]
console.log(a.call("str")); // [object String]
console.log(a.call([])); // [object Array]
console.log(a.call(function() {})); // [object Function]
console.log(a.call(1n)); // [object BigInt]
console.log(a.call(Symbol(1))); // [object Symbol]
console.log(a.call({})); // [object Object]
console.log(a.call(undefined)); // [object Undefined]
console.log(a.call(null)); // [object Null]
```

同样是检测对象`obj`调用`toString`方法，`obj.toString()`的结果和`Object.prototype.toString.call(obj)`的结果不一样，这是为什么？

这是因为`toString`是`Object`的原型方法，而`Array`、`function`等**类型作为`Object`的实例，都重写了`toString`方法**。不同的对象类型调用`toString`方法时，根据原型链的知识，调用的是对应的重写之后的`toString`方法（`function`类型返回内容为函数体的字符串，`Array`类型返回元素组成的字符串…），而不会去调用`Object`上原型`toString`方法（返回对象的具体类型），所以采用`obj.toString()`不能得到其对象类型，只能将`obj`转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用`Object`原型上的`toString`方法。
