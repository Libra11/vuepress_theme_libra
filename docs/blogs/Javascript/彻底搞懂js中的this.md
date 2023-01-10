---
title: 彻底搞懂 js 中的 this
category: javascript
desc: 彻底搞懂 js 中的 this
tag:
  - javascript
  - this
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/this.png
date: "2023-01-10"
---

## 详解 Javascript 中的 this

`Javascript` 中的 `this` 关键字代表的是函数的执行环境，它的指向是在**函数运行时确定的，而不是在函数定义时确定的**。

### `this`

在 `Javascript` 中，`this` 的值可以分为四种情况：

1. `this` 在全局作用域下的值为 `window` 对象。

```javascript
console.log(this === window); // true
```

2. `this` 在函数作用域下的值为 `window` 对象。

```javascript
function foo() {
  console.log(this === window); // true
}
foo();
```

3. `this` 在对象的方法中的值为该对象本身。

```javascript
let obj = {
  name: "Tom",
  sayHi: function() {
    console.log(this === obj); // true
  },
};
obj.sayHi();
```

4. `this` 在构造函数中的值为新创建的对象。

```javascript
function Person(name) {
  this.name = name;
}
let tom = new Person("Tom");
console.log(tom.name); // 'Tom'
```

### `this`动态更改

`JavaScript`支持运行环境动态切换，也就是说，`this`的指向是动态的，很难事先确定到底指向哪个对象。

在 `Javascript` 中，可以使用 `call`、`apply` 和 `bind`方法来改变函数中的 `this` 指向。

1. `call` 方法

`call` 方法可以接受两个参数，第一个参数是新的 `this` 值，第二个参数是一个参数列表。

```javascript
let obj = {
  name: "Tom",
  sayHi: function() {
    console.log(`Hi, my name is ${this.name}`);
  },
};

let obj2 = {
  name: "Jerry",
};

obj.sayHi.call(obj2); // Hi, my name is Jerry
```

2. `apply`方法

`apply` 方法与 `call` 方法类似，也可以接受两个参数，第一个参数是新的 `this` 值，第二个参数是一个参数数组。

```javascript
let obj = {
  name: "Tom",
  sayHi: function(greeting) {
    console.log(`${greeting}, my name is ${this.name}`);
  },
};

let obj2 = {
  name: "Jerry",
};

obj.sayHi.apply(obj2, ["Hello"]); // Hello, my name is Jerry
```

3. `bind` 方法

`bind` 方法与 `call` 和 `apply` 方法类似，也可以接受一个参数作为新的 `this` 值，并返回一个新函数。该函数在调用时可以接受其他参数。

```javascript
let obj = {
  name: "Tom",
  sayHi: function(greeting) {
    console.log(`${greeting}, my name is ${this.name}`);
  },
};

let obj2 = {
  name: "Jerry",
};

let sayHiWithJerry = obj.sayHi.bind(obj2);
sayHiWithJerry("Hello"); // Hello, my name is Jerry
```

注意，使用 `bind` 方法时，新函数的 this 值是不可以被改变的。

```javascript
let obj = {
  name: "Tom",
  sayHi: function(greeting) {
    console.log(`${greeting}, my name is ${this.name}`);
  },
};

let obj2 = {
  name: "Jerry",
};

let sayHiWithJerry = obj.sayHi.bind(obj2);
sayHiWithJerry.call(obj, "Hello"); // Hello, my name is Jerry
```

在上面的代码中，使用 `call` 方法尝试改变 `sayHiWithJerry` 函数中的 `this` 值，但是实际上 `this` 值仍然是 `obj2`。

### **事件绑定中的`this`**

事件绑定共有三种方式：行内绑定、动态绑定、事件监听；

行内绑定的两种情况：

```html
<input type="button" value="按钮" onclick="clickFun()" />
<script>
  function clickFun() {
    console.log(this); // 此函数的运行环境在全局window对象下，因此this指向window;
  }
</script>
<input
  type="button"
  value="按钮"
  onclick="console.log(this)"
/><!-- 运行环境在节点对象中，因此this指向本节点对象 input-->
```

行内绑定事件的语法是在`html`节点内，以节点属性的方式绑定，属性名是事件名称前面加`on`，属性的值则是一段可执行的 JS 代码段；而属性值最常见的就是一个函数调用；

当事件触发时，属性值就会作为`JS`代码被执行，当前运行环境下没有`clickFun`函数，因此浏览器就需要跳出当前运行环境，在整个环境中寻找一个叫`clickFun`的函数并执行这个函数，所以函数内部的`this`就指向了全局对象`window`；如果不是一个函数调用，直接在当前节点对象环境下使用`this`，那么显然`this`就会指向当前节点对象；

动态绑定与事件监听：

```html
<input type="button" value="按钮" id="btn" />
<script>
  var btn = document.getElementById("btn");
  btn.onclick = function() {
    console.log(this); // this指向本节点对象 input
  };
</script>
```

因为动态绑定的事件本就是为节点对象的属性(事件名称前面加`on`)重新赋值为一个匿名函数，因此函数在执行时就是在节点对象的环境下，`this`自然就指向了本节点对象；

### **构造函数中的`this`**

```jsx
function Pro() {
  this.x = "1";
  this.y = function() {};
}
var p = new Pro();
```

在 `JavaScript` 中，使用 `new` 运算符可以创建一个新对象。创建对象的过程包括以下步骤：

1. 创建一个空对象。
2. 将该对象的原型指向构造函数的 `prototype` 属性。
3. 将该对象的 `this` 指向该对象。
4. 执行构造函数的代码，并将构造函数的返回值赋值给该对象。

### **箭头函数中的`this`**

箭头函数不会创建自己的`this`,它只会从自己的作用域链的上一层继承`this`

```jsx
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++; // |this| 正确地指向 p 实例
  }, 1000);
}
var p = new Person();
```

由于 箭头函数没有自己的`this`指针，通过 `call()` _或_ `apply()` 方法调用一个函数时，只能传递参数（**不能绑定`this`**），他们的第一个参数会被忽略。

```jsx
var adder = {
  base: 1,
  add: function(a) {
    var f = (v) => v + this.base;
    return f(a);
  },
  addThruCall: function(a) {
    var f = (v) => v + this.base;
    var b = {
      base: 2,
    };
    return f.call(b, a);
  },
};
console.log(adder.add(1)); // 输出 2
console.log(adder.addThruCall(1)); // 仍然输出 2
```

### **匿名函数**

```jsx
var name = "window";
var person = {
  name: "one",
  wrap: function() {
    (function() {
      console.log(this.name); // window
    })();
    function sum() {
      console.log(this.name); // window
    }
    sum();
  },
};
person.wrap();
```

`JS（ES5）`里面有三种函数调用形式：

- `func(p1, p2)` 函数调用模式
- `obj.child.method(p1, p2)` 方法调用模式
- `func.call(context, p1, p2)`上下文调用模式

可以看到不是通过对象来调用的方法，而是直接执行的，属于函数调用模式。

匿名函数自动执行属于函数调用模式，我们定义的非匿名函数 `sum` 虽然在对象里，但不是通过对象(`obj.sum`)直接调用而是在对象的函数里调用，所以 `sum` 也属于函数调用模式

注意，如果使用 `new` 运算符调用匿名函数，则 `this` 指向新创建的对象。(参照上面说的**构造函数中的`this`**)

```javascript
let obj = new (function() {
  this.name = "Tom";
  console.log(`Hi, my name is ${this.name}`);
})(); // Hi, my name is Tom
```
