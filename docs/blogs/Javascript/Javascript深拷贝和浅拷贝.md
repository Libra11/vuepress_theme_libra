---
title: Javascript深拷贝和浅拷贝
category: javascript
desc: Javascript深拷贝和浅拷贝
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/copy.png
date: "2023-01-09"
---

## 深拷贝和浅拷贝

在 `JavaScript` 中，深拷贝是指在复制对象时，复制的对象和原对象完全独立，对一个对象的修改不会影响另一个对象。浅拷贝是指在复制对象时，复制的对象和原对象共享内存地址，对一个对象的修改会影响另一个对象。

### 浅拷贝

`JavaScript` 中的浅拷贝是指在复制对象时，复制的对象和原对象共享内存地址，对一个对象的修改会影响另一个对象。

`JavaScript` 中可以使用以下方法实现浅拷贝：

- 赋值运算符（`=`）：使用赋值运算符复制对象时，复制的对象和原对象共享内存地址。
- `Object.assign()` 方法：`Object.assign()` 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。如果源对象中的属性是对象，则复制的是引用。
- 展开运算符（`...`）：同`Object.assign()`,展开运算符只复制一层属性，如果对象的属性是对象，则复制的是对象的引用。

```javascript
let obj1 = { a: 1, b: { c: 2 } };
// 使用赋值运算符实现浅拷贝
let obj2 = obj1;
// 使用 Object.assign() 方法实现浅拷贝
let obj3 = Object.assign({}, obj1);
// 使用展开运算符实现浅拷贝
let obj4 = { ...obj1 };

console.log(obj1 === obj2); // Output: true
console.log(obj1 === obj3); // Output: false
console.log(obj1 === obj4); // Output: false
console.log(obj1.b === obj3.b); // Output: true
console.log(obj1.b === obj4.b); // Output: true
```

### 深拷贝

- `JSON.parse(JSON.stringify(obj))`
- 递归实现
- `structuredClone(value, options)` （`Chrome98`之后才支持）

```javascript
let obj1 = { a: 1, b: { c: 2 } };
let obj2 = JSON.parse(JSON.stringify(obj1))
console.log(obj1 === obj2);  // Output: false
console.log(obj1.b === obj2.b);  // Output: false


// 如果`obj`里面有时间对象，则`JSON.stringify`后再`JSON.parse`的结果，时间将只是字符串的形式，而不是对象的形式
var obj3 = {
  date: new Date(1536627600000)
};
let obj4 = JSON.parse(JSON.stringify(obj3));
console.log(obj4);   // Output: {date: '2018-09-11T01:00:00.000Z'}

// 如果`obj`里有`RegExp`(正则表达式的缩写)、`Error`对象，则序列化的结果将只得到空对象；
var obj5 = {
  date: new RegExp('\\w+')
};
let obj6 = JSON.parse(JSON.stringify(obj5));
console.log(obj6);   // Output: date: {}

// 如果`obj`里有函数，`undefined`，则序列化的结果会把函数或 `undefined`丢失；
var obj7 = {
  ex: 'test',
  date: function test() {},
  unde: undefined
};
let obj8 = JSON.parse(JSON.stringify(obj7));
console.log(obj8);   // Output: {ex: 'test'}

// 如果obj里有`NaN`、`Infinity`和`-Infinity`，则序列化的结果会变成`null`;
var obj9 = {
  ex: 'test',
  a: Infinity,
  b: -Infinity,
  c: NaN
};
let obj10 = JSON.parse(JSON.stringify(obj9));
console.log(obj10);   {ex: 'test', a: null, b: null, c: null}

// `JSON.stringify()`只能序列化对象的可枚举的自有属性，例如 如果`obj`中的对象是有构造函数生成的， 则使用`JSON.parse(JSON.stringify(obj))`深拷贝后，会丢弃对象的`constructor`；
function Person(name) {
  this.name = name;
  console.log(name)
}

const liai = new Person('liai');
const obj11 = {
  date: liai,
};
const obj12 = JSON.parse(JSON.stringify(obj11));
console.log(obj11, obj12)
/*
date: Person
  name: "liai"
  [[Prototype]]: Object
  	constructor: ƒ Person(name)
  	...

date:
	name: "liai"
	[[Prototype]]: Object
		constructor: ƒ Object()
		...
*/

// 如果对象中存在循环引用的情况也无法正确实现深拷贝；
let obj13 = { a: 1 };
obj13.b = obj13;
let obj14 = JSON.parse(JSON.stringify(obj13));
console.log(obj14.b === obj14);  // Output: false
```

```javascript
// 递归实现
function deepCopy(obj) {
  if (typeof obj !== "object" || obj === null) return obj;
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepCopy(obj[key]);
    }
  }
  return result;
}

let obj1 = { a: 1, b: { c: 2 } };
let obj2 = deepCopy(obj1);

console.log(obj1 === obj2); // Output: false
console.log(obj1.b === obj2.b); // Output: false
```

```javascript
// javascript structuredClone是一个使用结构化克隆算法创建给定值的深层拷贝的方法。
// 结构化克隆算法用于复制复杂JavaScript对象的算法，在调用structuredClone()
// 通过postMessage()在Worker之间传输数据、使用IndexedDB存储对象或为其他API复制对象时在内部使用。

// structuredClone()方法还允许在原始值中的可转移对象被转移而不是克隆到新对象。
// 转移的对象从原始对象中分离并附加到新对象；它们在原始对象中不再可访问。

// 下面是一个使用structuredClone()方法的代码示例：
// 创建一个包含循环引用和可转移对象的复杂对象
const obj = {
  a: 1,
  b: {
    c: 2,
    d: new ArrayBuffer(8),
  },
};
obj.b.e = obj; // 添加循环引用

// 使用structuredClone()方法创建一个深层拷贝，并将ArrayBuffer转移
const clone = structuredClone(obj, { transfer: [obj.b.d] });

// 检查结果
console.log(clone); // { a: 1, b: { c: 2, d: ArrayBuffer {}, e: [Circular *1] } }
console.log(obj.b.d); // undefined
console.log(clone.b.d); // ArrayBuffer {}
```
