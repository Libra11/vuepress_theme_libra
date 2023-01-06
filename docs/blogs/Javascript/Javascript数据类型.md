---
title: Javascript数据类型
category: javascript
desc: Javascript数据类型
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/javascripttype.png
date: "2023-01-06"
---

## 一、数据类型

### 1. JavaScript 有哪些数据类型，它们的区别？

`JavaScript`共有八种数据类型，分别是 `Undefined`、`Null`、`Boolean`、`Number`、`String`、`Object`、`Symbol`、`BigInt`。

#### `Undefined`

`undefined` 是 JavaScript 中的一个关键字，表示未定义。这意味着变量被声明了，但没有被赋值。

例如：

```javascript
let x;
console.log(x); // Output: undefined
```

#### `Null`

`null` 是 JavaScript 中的一个关键字，表示**空对象指针**。它是一个特殊的值，意味着对象不存在。

例如：

```javascript
let x = null;
console.log(x); // Output: null
```

> 在 `JavaScript` 中，`null` 的类型是 `object`。

> 在 `JavaScript` 中，`null` 与 `undefined` 不同。`null` 表示一个空对象指针，而 `undefined` 表示一个未定义的值。

#### `Boolean`

`Boolean` 是 `JavaScript` 中的一个数据类型，表示真假值。它只有两个值：`true` 和 `false`。

例如：

```javascript
let x = true;
console.log(x); // Output: true

let y = false;
console.log(y); // Output: false
```

#### `Number`

`Number` 是 `JavaScript` 中的一个数据类型，表示数值。它可以是**整数**或**浮点数**，也可以是特殊的数值，如 `Infinity` 和 `NaN`。

例如：

```javascript
let a = 42;
console.log(a); // Output: 42

let b = 3.14;
console.log(b); // Output: 3.14

let c = Infinity;
let c = 1 / 0;
console.log(c); // Output: Infinity

let d = NaN;
let d = "hello" / 2;
console.log(d); // Output: NaN
```

数字的表示范围取决于它的类型：整数或浮点数。

整数表示范围：

- `Number.MAX_SAFE_INTEGER` 表示 `JavaScript` 中可以安全使用的最大整数。它的值为 9007199254740991。
- `Number.MIN_SAFE_INTEGER` 表示 `JavaScript` 中可以安全使用的最小整数。它的值为 -9007199254740991。

浮点数表示范围：

- `Number.MAX_VALUE` 表示 `JavaScript` 中可表示的最大浮点数。它的值为 1.7976931348623157e+308。
- `Number.MIN_VALUE` 表示 `JavaScript` 中可表示的最小浮点数。它的值为 5e-324。

`JavaScript` 的 `Number` 类型使用 53 位表示小数位，10 位表示指数位，1 位表示符号位。在某些情况下，JavaScript 可能无法准确地表示某些数字。例如，下面的代码输出了一个非常接近但不完全等于 1 的数字：

```javascript
console.log(0.1 + 0.2); // Output: 0.30000000000000004
```

要解决这个问题，有几种方法可以考虑：

1. 使用第三方库，如 [bignumber.js](https://github.com/MikeMcl/bignumber.js/)，它可以解决浮点数精度问题。

2. 使用整数进行运算。例如，将 0.1 和 0.2 表示为 10 和 20，然后执行运算。最后，再将结果除以 10。这样可以避免使用小数，从而避免精度误差。

例如：

```javascript
let x = 0.1;
let y = 0.2;

console.log((x * 10 + y * 10) / 10); // Output: 0.3
```

#### `String`

`String` 是 `JavaScript` 中的一个数据类型，表示字符串。字符串是由一系列字符组成的文本序列。

例如：

```javascript
let x = "Hello, world!";
console.log(x); // Output: "Hello, world!"
```

字符串还可以使用下标（也称为索引）访问其中的单个字符。字符串的下标从 0 开始，依次递增。

例如：

```javascript
let x = "Hello, world!";
console.log(x[0]); // Output: "H"
console.log(x[1]); // Output: "e"
```

字符串还可以使用模板字符串进行拼接。模板字符串是使用反引号（``）表示的字符串。模板字符串还可以使用标签进行处理。标签是一个函数，它可以在模板字符串被构造之前进行处理。

例如：

```javascript
let x = "world";
let y = upper`Hello, ${x}!`;

function upper(strings, ...values) {
  let result = "";
  console.log(strings); // (2) ['Hello, ', '!', raw: Array(2)]
  console.log(values); // ['world']
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += values[i].toUpperCase();
    }
  }
  return result;
}

console.log(y); // Output: "hello, WORLD!"
```

#### `Object`

`Object` 是 `JavaScript` 中的一个数据类型，表示对象。对象是由一系列键值对组成的无序集合。

例如：

```javascript
let x = {
  name: "John",
  age: 30,
};

console.log(x); // Output: { name: "John", age: 30 }
```

对象的键值对称为属性`property`。对象的属性可以使用点运算符（`.`）或方括号运算符（`[]`）访问。

例如：

```javascript
console.log(x.name); // Output: "John"
console.log(x["age"]); // Output: 30
```

对象还可以使用构造函数进行创建。

例如：

```javascript
let y = new Object();
y.name = "John";
y.age = 30;
console.log(y); // Output: { name: "John", age: 30 }
```

#### `Symbol`

`Symbol` 是 `JavaScript` 中的一种数据类型，表示唯一的值。`Symbol` 类型的值可以用于标识对象的属性。

例如：

```javascript
let x = Symbol("Hello, world!");
console.log(x); // Output: Symbol(Hello, world!)
```

`Symbol` 类型的值是唯一的，因此即使使用相同的参数创建两个 `Symbol`，它们也是不同的。

例如：

```javascript
let y = Symbol("Hello, world!");
console.log(x === y); // Output: false
```

`Symbol` 可以用于对象的属性名，以避免属性名冲突。

例如：

```javascript
let x = Symbol("name");
let y = {
  [x]: "John",
};
console.log(y[x]); // Output: "John"
```

#### `BigInt`

`BigInt` 是 `JavaScript` 中的一种数据类型，表示大整数。`BigInt` 可以表示的整数范围比 `Number` 类型的整数范围要大。

例如：

```javascript
let x = 12345678901234567890n; // n 标识符表示 x 是一个 BigInt
console.log(x); // Output: 12345678901234567890n
```

这些数据可以分为**原始数据类型**和**引用数据类型**：

- 栈：原始数据类型（`Undefined`、`Null`、`Boolean`、`Number`、`String`）
- 堆：引用数据类型（对象、数组和函数）

两种类型的区别在于**存储位置的不同：**

- 原始数据类型直接存储在栈（`stack`）中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆（`heap`）中的对象，占据空间大、大小不固定。如果存储在栈中，将会影响程序运行的性能；引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
