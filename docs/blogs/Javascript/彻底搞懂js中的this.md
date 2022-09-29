---
title: 彻底搞懂 js 中的 this
category: javascript
desc: 彻底搞懂 js 中的 this
tag:
  - javascript
  - this
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/blog/Javascript%E5%B0%8F%E6%8A%80%E5%B7%A7.png
date: "2020-12-12"
---

想要理解`this`，你可以先记住以下两点：

**1：`this`永远指向一个对象；**

**2：`this`的指向完全取决于函数调用的位置；**

针对以上的第一点特别好理解，不管在什么地方使用`this`，它必然会指向某个对象；确定了第一点后，也引出了一个问题，就是`this`使用的地方到底在哪里，而第二点就解释了这个问题，但关键是在`JavaScript`语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象下运行，而`this`就是函数运行时所在的对象（环境）。这本来并不会让我们糊涂，但是`JavaScript`支持运行环境动态切换，也就是说，`this`的指向是动态的，很难事先确定到底指向哪个对象，这才是最让我们感到困惑的地方。

### **先看原理**

```jsx
function fun() {
  console.log(this.s);
}
var obj = {
  s: "1",
  f: fun,
};
var s = "2";
obj.f(); // 1
fun(); // 2
```

上述代码中，`fun`函数被调用了两次，显而易见的是两次的结果不一样；

很多人都会这样解释，`obj.f()`的调用中，因为运行环境在`obj`对象内，因此函数中的`this`指向对象`obj`;

而在全局作用域下调用 `fun()` ，函数中的 `this` 就会指向全局作用域对象 window;

但是大部分人不会告诉你，**`this`的指向为什么会发生改变，`this`指向的改变到底是什么时候发生的；**而搞懂了这些，`this`的使用才不会出现意外；

首先我们应该知道，在`JS`中，数组、函数、对象都是引用类型，在参数传递时也就是引用传递；

上面的代码中，`obj` 对象有两个属性，但是属性的值类型是不同的，在内存中的表现形式也是不同的；

![https://pic1.zhimg.com/80/v2-d8344e9d298a58727e08d7a36ea4c8d0_1440w.jpg](https://pic1.zhimg.com/80/v2-d8344e9d298a58727e08d7a36ea4c8d0_1440w.jpg)

调用时就成了这个样子：

![https://pic2.zhimg.com/80/v2-ddd9067ff2cbccbd380604d656775a4d_1440w.jpg](https://pic2.zhimg.com/80/v2-ddd9067ff2cbccbd380604d656775a4d_1440w.jpg)

因为函数在`js`中既可以当做值传递和返回，也可当做对象和构造函数，所有函数在运行时需要确定其当前的运行环境，`this`就出生了，所以，`this`会根据运行环境的改变而改变，同时，函数中的`this`也只能在运行时才能最终确定运行环境；

再来看下面的代码，你可能会更加理解`this`对于运行环境的动态切换规则：

```jsx
var A = {
  name: "张三",
  f: function() {
    console.log("姓名：" + this.name);
  },
};
var B = {
  name: "李四",
};
B.f = A.f;
B.f(); // 姓名：李四
A.f(); // 姓名：张三
```

上面代码中，`A.f`属性被赋给`B.f`，也就是`A`对象将匿名函数的 **地址** 赋值给`B`对象；

那么在调用时，函数分别根据运行环境的不同，指向对象`A`和`B`

![https://pic2.zhimg.com/80/v2-cbc152bda151b900e508a217cd4d2bb9_1440w.jpg](https://pic2.zhimg.com/80/v2-cbc152bda151b900e508a217cd4d2bb9_1440w.jpg)

```jsx
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 2,
  fn: foo,
};
var obj1 = {
  a: 1,
  o1: obj2,
};
obj1.o1.fn(); // 2
```

`obj1`对象的`o1`属性值是`obj2`对象的地址，而`obj2`对象的`fn`属性的值是函数`foo`的地址；

函数`foo`的调用环境是在`obj2`中的，因此`this`指向对象`obj2`;

那么接下来，我们对`this`使用最频繁的几种情况做一个总结，最常见的基本就是以下 5 种：

对象中的方法，事件绑定 ，构造函数 ，定时器，函数对象的`call()`、`apply()`方法；

上面在讲解`this`原理是，我们使用对象的方法中的`this`来说明的，在此就不重复讲解了，不懂的同学们，请返回去重新阅读；

```jsx
function baz() {
  // 当前调用栈是：baz // 因此，当前调用位置是全局作用域
  console.log("baz");
  bar(); // <-- bar 的调用位置
}
function bar() {
  // 当前调用栈是 baz -> bar // 因此，当前调用位置在 baz 中
  console.log("bar");
  foo(); // <-- foo 的调用位置
}
function foo() {
  // 当前调用栈是 baz -> bar -> foo // 因此，当前调用位置在 bar 中
  console.log("foo");
}
baz(); // <-- baz 的调用位置
```

### `this的绑定规则`

### 默认绑定

首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则。

思考一下下面的代码：

```jsx
function foo() {
  console.log(this.a);
}
var a = 2;
foo(); // 2
```

你应该注意到的第一件事是，声明在全局作用域中的变量（比如 `var a = 2`）就是全局对象的一个同名属性。它们本质上就是同一个东西，并不是通过复制得到的，就像一个硬币的两面一样。 接下来我们可以看到当调用 `foo()` 时，`this.a` 被解析成了全局变量 `a`。为什么？因为在本 例中，函数调用时应用了`this` 的默认绑定，因此 `this` 指向全局对象。

那么我们怎么知道这里应用了默认绑定呢？可以通过分析调用位置来看看 `foo()` 是如何调 用的。在代码中，`foo()` 是直接使用不带任何修饰的函数引用进行调用的，因此只能使用默认绑定，无法应用其他规则。

如果使用严格模式（`strict mode`），则不能将全局对象用于默认绑定，因此 `this` 会绑定到`undefined`：

```jsx
function foo() {
  "use strict";
  console.log(this.a);
}
var a = 2;
foo(); // TypeError: this is undefined
```

在严格模式下调用`foo()` 则不影响默认绑定：

```jsx
function foo() {
  console.log(this.a);
}
var a = 2;
// 严格模式下调用 foo() 不影响默认绑定
(function() {
  "use strict";
  foo(); // 2
})();
```

### 隐式绑定

另一条需要考虑的规则是调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含，不过这种说法可能会造成一些误导。

思考下面的代码：

```jsx
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
obj.foo(); // 2
```

首先需要注意的是 `foo()` 的声明方式，及其之后是如何被当作引用属性添加到 `obj` 中的。但是无论是直接在 `obj` 中定义还是先定义再添加为引用属性，这个函数严格来说都不属于`obj` 对象。

然而，调用位置会使用 `obj` 上下文来引用函数，因此你可以说函数被调用时 `obj` 对象“拥有”或者“包含”它。无论你如何称呼这个模式，当 `foo()` 被调用时，它的前面确实加上了对 `obj` 的引用。当函数引用有上下文对象时，隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。因为调用 `foo()` 时 `this` 被绑定到 `obj`，因此 `this.a` 和 `obj.a` 是一样的。

对象属性引用链中只有上一层或者说最后一层在调用位置中起作用。举例来说：

```jsx
function foo() {
  console.log(this.a);
}
var obj2 = {
  a: 42,
  foo: foo,
};
var obj1 = {
  a: 2,
  obj2: obj2,
};
obj1.obj2.foo(); // 42
```

### 隐式丢失

一个最常见的 `this` 绑定问题就是被隐式绑定的函数会丢失绑定对象，也就是说它会应用默`this`全面解析 ，从而把 `this`绑定到全局对象或者 `undefined` 上，取决于是否是严格模式。

思考下面的代码：

```jsx
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var bar = obj.foo; // 函数别名！
var a = "oops, global"; // a 是全局对象的属性
bar(); // "oops, global"
```

虽然 `bar` 是 `obj.foo` 的一个引用，但是实际上，**它引用的是 `foo` 函数本身**，因此此时的`bar()` 其实是一个不带任何修饰的函数调用，因此应用了默认绑定。

一种更微妙、更常见并且更出乎意料的情况发生在传入回调函数时：

```jsx
function foo() {
  // foo 是在 doFoo 中调用的， 所以它的 this 指向 doFoo 的 this
  console.log(this.a);
}
function doFoo(fn) {
  // fn 其实引用的是 foo
  // 这个函数是在全局调用的，所以 doFoo 的 this 指向 windows
  fn(); // <-- 调用位置！
}
var obj = {
  a: 2,
  foo: foo,
};
var a = "oops, global"; // a 是全局对象的属性
doFoo(obj.foo); // "oops, global"
```

参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值，所以结果和上一个例子一样。

如果把函数传入语言内置的函数而不是传入你自己声明的函数，会发生什么呢？结果是一样的，没有区别：

```jsx
function foo() {
  console.log(this.a);
}
var obj = {
  a: 2,
  foo: foo,
};
var a = "oops, global"; // a 是全局对象的属性
setTimeout(obj.foo, 100); // "oops, global"
```

`JavaScript` 环境中内置的 `setTimeout()` 函数实现和下面的伪代码类似：

```jsx
function setTimeout(fn, delay) {
  // 等待 delay 毫秒
  fn(); // <-- 调用位置！
}
```

就像我们看到的那样，回调函数丢失 `this` 绑定是非常常见的。除此之外，还有一种情

况 `this` 的行为会出乎我们意料：调用回调函数的函数可能会修改 `this`。在一些流行的

`JavaScript` 库中事件处理器常会把回调函数的 `this` 强制绑定到触发事件的 `DOM` 元素上。

这在一些情况下可能很有用，但是有时它可能会让你感到非常郁闷。遗憾的是，这些工具

通常无法选择是否启用这个行为。

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

事件监听中`this`指向的原理与动态绑定基本一致，所以不再阐述；

### **构造函数中的`this`**

```jsx
function Pro() {
  this.x = "1";
  this.y = function() {};
}
var p = new Pro();
```

![https://pic2.zhimg.com/80/v2-7ce5f71bd0865872b513a88fabb597fd_1440w.jpg](https://pic2.zhimg.com/80/v2-7ce5f71bd0865872b513a88fabb597fd_1440w.jpg)

对于接触过 `JS` 面向对象编程的同学来说，上面的代码和图示基本都能看懂，`new` 一个构造函数并执行函数内部代码的过程就是这个五个步骤，当 `JS` 引擎指向到第 3 步的时候，会**强制的将`this`指向新创建出来的这个对象**；基本不需要理解，因为这本就是 `JS` 中的语法规则，记住就可以了；

### **`window`定时器中的`this`**

```jsx
var obj = {
  fun: function() {
    console.log(this);
  },
};
setInterval(obj.fun, 1000); // this指向window对象
setInterval("obj.fun()", 1000); // this指向obj对象
```

`setInterval()` 是`window`对象下内置的一个方法，接受两个参数，**第一个参数允许是一个函数或者是一段可执行的 `JS`代码**，第二个参数则是执行前面函数或者代码的时间间隔；

在上面的代码中，`setInterval(obj.fun,1000)` 的第一个参数是`obj`对象的`fun` ，因为 `JS` 中函数可以被当做值来做引用传递，实际就是将这个函数的地址当做参数传递给了 `setInterval` 方法，换句话说就是 `setInterval` 的第一参数接受了一个函数，那么此时 1000 毫秒后，函数的运行就已经是在`window`对象下了，也就是函数的调用者已经变成了`window`对象，所以其中的`this`则指向的全局`window`对象；

而在 `setInterval('obj.fun()',1000)` 中的第一个参数，实际则是传入的一段可执行的 `JS` 代码；1000 毫秒后当 `JS` 引擎来执行这段代码时，则是通过 `obj` 对象来找到 `fun` 函数并调用执行，那么函数的运行环境依然在 对象 `obj` 内，所以函数内部的`this`也就指向了 `obj` 对象；

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

**箭头函数不绑定`Arguments` 对象**。因此，在本示例中，`arguments`只是引用了封闭作用域内的`arguments`：

```jsx
var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // 隐式绑定 foo 函数的 arguments 对象. arguments[0] 是 n,即传给foo函数的第一个参数
  return f();
}

foo(1); // 2
foo(2); // 4
foo(3); // 6
foo(3, 2); //6
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
