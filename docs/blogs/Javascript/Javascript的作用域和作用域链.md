---
title: Javascript的作用域与作用域链
category: javascript
desc: Javascript的作用域与作用域链
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/scope.png
date: "2023-01-09"
---

## Javascript 的作用域与作用域链

### 作用域

在 `JavaScript` 中，作用域是一种机制，用于确定在何处可以访问变量。

`JavaScript` 有三种作用域

#### 全局作用域

在全局作用域中声明的变量可以在程序的任何地方访问。全局作用域中的变量可以在函数内部访问，也可以在函数外部访问。

- **最外层函数**和在**最外层函数外面定义的变量**拥有全局作用域

  ```javascript
  var outVar = "最外层变量";
  //最外层函数
  function outFun() {
    var inVar = "内层变量";
    //内层函数
    function innerFun() {
      console.log(inVar);
      function innererFun() {
        console.log(inVar);
      }
    }
    innerFun();
  }
  console.log(outVar); //最外层变量
  outFun(); //内层变量
  console.log(inVar); //inVar is not defined
  innerFun(); //innerFun is not defined
  ```

- 所有末定义直接赋值的变量自动声明为拥有全局作用域

  ```javascript
  function outFun2() {
    variable = "未定义直接赋值的变量";
    var inVar = "内层变量";
  }
  outFun2();

  console.log(variable); //未定义直接赋值的变量
  console.log(inVar); //inVar is not defined
  ```

- 所有`window`对象的属性拥有全局作用域

  > 1. 全局变量很容易被意外修改，这可能会导致意料之外的错误。
  > 2. 全局变量的命名冲突，会污染全局命名空间。如果多个模块都使用了同名的全局变量，会导致命名冲突。

#### 函数作用域

在函数作用域中声明的变量只能在函数作用域内部访问，不能在函数外部访问。

```javascript
// 函数作用域
function outFun() {
  var innerVar = "内部变量";
  // 内部函数
  function innerFun() {
    console.log(innerVar);
  }
  innerFun();
}
console.log(outFun()); // 内部变量
console.log(innerVar); // Uncaught ReferenceError: innerVar is not defined
console.log(innerFun()); // Uncaught ReferenceError: innerFun is not defined
```

> **作用域是分层的，内层作用域可以访问外层作用域的变量**

> **如果你使用`var`定义变量，块语句（大括号“｛｝”中间的语句），如 if 和 switch 条件语句或 for 和 while 循环语句，不像函数，它们不会创建一个新的作用域**。

#### 块级作用域

块级作用域可通过新增命令`let`和`const`声明，所声明的变量在指定块的作用域外无法被访问。（`ES6`新增）。

生成块级作用域的条件

- 函数内部
- 使用大括号（`{}`）包围的区域。

### 关于`let`、`const`和`var`

#### 函数提升

在 JavaScript 中，函数提升（Hoisting）是指在执行 JavaScript 代码之前，会将所有函数声明提升到代码的顶部。

例如：

```javascript
foo();

function foo() {
  console.log("foo");
}
```

在上面的代码中，函数 `foo` 被声明在了代码的末尾，但是可以正常调用。这是因为在执行代码之前，函数 `foo` 已经被提升到了代码的顶部。

对于函数表达式，只有函数名会被提升，而函数体不会。

例如：

```javascript
foo(); // Uncaught TypeError: foo is not a function

var foo = function() {
  console.log("foo");
};
```

在上面的代码中，函数表达式 `foo` 被声明在了代码的末尾，但是在函数表达式之前调用了函数 `foo`。这会导致 `TypeError` 错误，因为函数体并没有被提升。

#### 变量提升

`JavaScript` 中的变量提升（`hoisting`）是指在代码运行之前，**所有声明的变量**都会被提升到代码的最顶部。

```javascript
console.log(x); // Output: undefined
var x = 1;

// 上面的代码相当于
var x;
console.log(x);
x = 1;
```

使用 `let` 和 `const` 声明的变量在声明之前是不可访问的，被称为暂时性死区（`temporal dead zone`，`TDZ`）

```javascript
console.log(x); // Uncaught ReferenceError: x is not defined
let x = 1;

// 参数的暂时性死区
function foo(x = y, y = 1) {
  console.log(x, y);
}
foo(); // Uncaught ReferenceError: y is not defined
```

> 所有的声明（`var`, `let`, `const`）都会被“提升”。但是只有使用`var`关键字声明的变量才会被初始化`undefined`值，而`let`和`const`声明的变量则不会被初始化值。

#### 重复声明

在 `JavaScript` 中，使用 `var` 声明的变量可以重复声明。

例如：

```javascript
var x = 1;
var x = 2;
console.log(x); // Output: 2
```

在上面的代码中，变量 `x` 被声明了两次，但是后声明的变量会覆盖先声明的变量。所以变量 `x` 的值是 `2`。

但是使用 `let` 和 `const` 声明的变量不能重复声明。

例如：

```javascript
let x = 1;
let x = 2; // Uncaught SyntaxError: Identifier 'x' has already been declared

const x = 1;
const x = 2; // Uncaught SyntaxError: Identifier 'x' has already been declared
```

在上面的代码中，使用 `let` 和 `const` 声明的变量 `x` 被重复声明，这会导致语法错误。

所以，使用 `let` 和 `const` 声明的变量不能重复声明，而使用 `var` 声明的变量可以重复声明。

#### 循环中的闭包

在循环中需要使用闭包，但是在闭包中引用了循环变量。

例如：

```javascript
for (var i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

在上面的代码中，使用了循环将 10 个回调函数放入 `setTimeout` 函数中。但是，所有回调函数都是在循环结束之后执行，所以循环变量 `i` 在循环结束之后仍然可以被访问。

在上面的代码中，循环结束之后，循环变量 `i` 的值是 `10`。所以所有回调函数都会输出 `10`。

使用块级作用域，就可以解决这个问题。

例如：

```javascript
for (let i = 0; i < 10; i++) {
  setTimeout(function() {
    console.log(i);
  }, 1000);
}
```

在上面的代码中，使用了块级作用域声明循环变量 `i`。这样，循环变量 `i` 就被限制在循环内部，循环结束之后就不能被访问，从而解决了循环中使用闭包的问题。

当然，也可以通过`IIFE`:立即执行函数表达式建立局部作用域来解决这个问题

```javascript
for (var i = 0; i < 10; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 1000);
  })(i);
}
```

### 作用域链

在 `JavaScript` 中，作用域链（`Scope Chain`）是由一系列的作用域组成的链式结构，用于查找变量的值。

当执行一段 `JavaScript` 代码时，会创建一个执行上下文（`Execution Context`），其中包含了当前代码的作用域以及相关的变量和函数。每个执行上下文都有一个作用域链，用于维护作用域之间的关系。

当在 `JavaScript` 代码中声明一个变量时，这个变量会被添加到当前的作用域中。如果在当前的作用域中找不到该变量，就会在作用域链的下一个作用域中查找，以此类推。如果在作用域链的所有作用域中都找不到该变量，就会抛出一个 `ReferenceError` 错误。

例如：

```javascript
function foo() {
  console.log(a);
  console.log(b); // Uncaught ReferenceError: b is not defined
}

function bar() {
  var a = 2;
  foo();
}

var a = 1;
bar();
1;
```

再看一个例子：

```javascript
var x = 10;
function fn() {
  console.log(x);
}
function show(f) {
  var x = 20(function() {
    f(); //10，而不是20
  })();
}
show(fn);
```

> 要到创建`fn`函数的那个作用域中取，**无论`fn`函数将在哪里调用**。
