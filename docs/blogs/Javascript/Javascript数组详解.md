---
title: Javascript数组详解
category: javascript
desc: Javascript数组详解
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/arrayde.png
date: "2023-02-09"
---

## `Javascript` 数组详解

### 创建数组:

```javascript
// 字面量方式:
// 这个方法也是我们最常用的，在初始化数组的时候 相当方便
var a = [3, 11, 8]; // [3,11,8];
// 构造器:
// 实际上 new Array === Array,加不加new 一点影响都没有。
var a = Array(); // []
var a = Array(3); // [,,]
var a = Array(3, 11, 8); // [ 3,11,8 ]
```

#### `Array.of()` 返回由所有参数值组成的数组

定义：返回由所有参数值组成的数组，如果没有参数，就返回一个空数组。

目的：`Array.of()` 出现的目的是为了解决上述构造器因参数个数不同，导致的行为有差异的问题。

```javascript
let a = Array.of(3, 11, 8); // [3,11,8]
let a = Array.of(3); // [3]
```

#### `Arrary.from()` 将两类对象转为真正的数组

定义：用于将两类对象转为真正的数组（**不改变原对象，返回新的数组**）。

参数：

第一个参数(必需):要转化为真正数组的对象。

第二个参数(可选): 类似数组的`map`方法，对每个元素进行处理，将处理后的值放入返回的数组。

第三个参数(可选): 用来绑定`this`。

```javascript
// 1. 对象拥有length属性
let obj = { 0: "a", 1: "b", 2: "c", length: 3 };
let arr = Array.from(obj); // ['a','b','c'];
// 2. 部署了 Iterator接口的数据结构 比如:字符串、Set、NodeList对象
let arr = Array.from("hello"); // ['h','e','l','l','o']
let arr = Array.from(new Set(["a", "b"])); // ['a','b']
```

---

## 方法:

数组原型提供了非常多的方法，这里分为三类来讲，一类会改变原数组的值，一类是不会改变原数组，以及数组的遍历方法。

### 改变原数组的方法(9 个):

```javascript
let a = [1, 2, 3];
// ES5:
a.splice() /
  a.sort() /
  a.pop() /
  a.shift() /
  a.push() /
  a.unshift() /
  a.reverse();
// ES6:
a.copyWithin() / a.fill;
```

对于这些能够改变原数组的方法，要注意避免在循环遍历中改变原数组的选项，比如: 改变数组的长度，导致遍历的长度出现问题。

#### `splice()` 添加/删除数组元素

定义： `splice()` 方法**向/从数组中添加/删除**项目，然后返回被删除的项目

语法： `array.splice(index,howmany,item1,.....,itemX)`

参数:

1. `index`：必需。整数，规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
2. `howmany`：可选。要删除的项目数量。如果设置为 0，则不会删除项目。
3. `item1`, ..., `itemX`： 可选。向数组添加的新项目。

返回值: 如果有元素被删除,返回包含被删除项目的新数组。

- 删除元素

```javascript
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0, 3); // [1,2,3]
console.log(a); // [4,5,6,7]
// 从数组下标0开始，删除3个元素
let item = a.splice(-1, 3); // [7]
// 从最后一个元素开始删除3个元素，因为最后一个元素，所以只删除了7
```

- 删除并添加

```javascript
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0, 3, "添加"); // [1,2,3]
console.log(a); // ['添加',4,5,6,7]
// 从数组下标0开始，删除3个元素，并添加元素'添加'
let b = [1, 2, 3, 4, 5, 6, 7];
let item = b.splice(-2, 3, "添加1", "添加2"); // [6,7]
console.log(b); // [1,2,3,4,5,'添加1','添加2']
// 从数组最后第二个元素开始，删除3个元素，并添加两个元素'添加1'、'添加2'
```

- 不删除只添加:

```javascript
let a = [1, 2, 3, 4, 5, 6, 7];
let item = a.splice(0, 0, "添加1", "添加2"); // [] 没有删除元素，返回空数组
console.log(a); // ['添加1','添加2',1,2,3,4,5,6,7]
let b = [1, 2, 3, 4, 5, 6, 7];
let item = b.splice(-1, 0, "添加1", "添加2"); // [] 没有删除元素，返回空数组
console.log(b); // [1,2,3,4,5,6,'添加1','添加2',7] 在最后一个元素的前面添加两个元素
```

从上述三个栗子可以得出:

1. 数组如果元素不够，会删除到最后一个元素为止
2. 操作的元素，包括开始的那个元素
3. 可以添加很多个元素
4. **添加是在开始的元素前面添加的**

#### `sort()` 数组排序

定义: `sort()`方法对数组元素进行排序，并返回这个数组。

参数可选: 规定排序顺序的比较函数。

默认情况下`sort()`方法没有传比较函数的话，默认按字母升序，如果不是元素不是字符串的话，会调用`toString()`方法将元素转化为字符串的`Unicode`(万国码)位点，然后再比较字符。

```javascript
// 字符串排列 看起来很正常
var a = ["Banana", "Orange", "Apple", "Mango"];
a.sort(); // ["Apple","Banana","Mango","Orange"]
// 数字排序的时候 因为转换成Unicode字符串之后，有些数字会比较大会排在后面 这显然不是我们想要的
var a = [10, 1, 3, 20, 25, 8];
console.log(a.sort()); // [1,10,20,25,3,8];
```

**比较函数的两个参数：**

`sort`的比较函数有两个默认参数，要在函数中接收这两个参数，这两个参数是数组中两个要比较的元素，通常我们用 a 和 b 接收两个将要比较的元素：

- 若比较函数返回值<0，那么`a`将排到`b`的前面;
- 若比较函数返回值=0，那么`a` 和 `b` 相对位置不变；
- 若比较函数返回值>0，那么`b` 排在`a` 将的前面；

**sort 排序常见用法**：

1. 数组元素为数字的升序、降序:

   ```javascript
   var array = [10, 1, 3, 4, 20, 4, 25, 8];
   // 升序 a-b < 0   a将排到b的前面，按照a的大小来排序的
   // 比如被减数a是10，减数是20  10-20 < 0   被减数a(10)在减数b(20)前面
   array.sort(function(a, b) {
     return a - b;
   });
   console.log(array); // [1,3,4,4,8,10,20,25];
   // 降序 被减数和减数调换了  20-10>0 被减数b(20)在减数a(10)的前面
   array.sort(function(a, b) {
     return b - a;
   });
   console.log(array); // [25,20,10,8,4,4,3,1];
   ```

2. 数组多条件排序

   ```javascript
   var array = [
     { id: 10, age: 2 },
     { id: 5, age: 4 },
     { id: 6, age: 10 },
     { id: 9, age: 6 },
     { id: 2, age: 8 },
     { id: 10, age: 9 },
   ];
   array.sort(function(a, b) {
     if (a.id === b.id) {
       // 如果id的值相等，按照age的值降序
       return b.age - a.age;
     } else {
       // 如果id的值不相等，按照id的值升序
       return a.id - b.id;
     }
   });
   // [{"id":2,"age":8},{"id":5,"age":4},{"id":6,"age":10},{"id":9,"age":6},{"id":10,"age":9},{"id":10,"age":2}]
   ```

3. 自定义比较函数，天空才是你的极限

类似的：**运用好返回值，我们可以写出任意符合自己需求的比较函数**

```javascript
var array = [
  { name: "Koro1" },
  { name: "Koro1" },
  { name: "OB" },
  { name: "Koro1" },
  { name: "OB" },
  { name: "OB" },
];
array.sort(function(a, b) {
  if (a.name === "Koro1") {
    // 如果name是'Koro1' 返回-1 ，-1<0 a排在b的前面
    return -1;
  } else {
    // 如果不是的话，a排在b的后面
    return 1;
  }
});
// [{"name":"Koro1"},{"name":"Koro1"},{"name":"Koro1"},{"name":"OB"},{"name":"OB"},{"name":"OB"}]
```

#### `pop()` 删除一个数组中的最后的一个元素

定义: `pop()` 方法删除一个数组中的最后的一个元素，并且**返回这个元素**。

参数: 无。

```javascript
let a = [1, 2, 3];
let item = a.pop(); // 3
console.log(a); // [1,2]
```

#### `shift()` 删除数组的第一个元素

定义: `shift()`方法删除数组的第一个元素，并**返回这个元**素。

参数: 无。

```javascript
let a = [1, 2, 3];
let item = a.shift(); // 1
console.log(a); // [2,3]
```

#### `push()` 向数组的末尾添加元素

定义：`push()` 方法可向数组的末尾添加一个或多个元素，并**返回新的长度**。

参数: `item1`, `item2`, ..., `itemX` ,要添加到数组末尾的元素

```javascript
let a = [1, 2, 3];
let item = a.push("末尾"); // 4
console.log(a); // [1,2,3,'末尾']
```

#### `unshift()`

定义：`unshift()` 方法可向数组的开头添加一个或更多元素，并**返回新的长度**。

参数: `item1`, `item2`, ..., `itemX` ,要添加到数组开头的元素

```javascript
let a = [1, 2, 3];
let item = a.unshift("开头"); // 4
console.log(a); // ['开头',1,2,3]
```

#### `reverse()` 颠倒数组中元素的顺序

定义: `reverse()` 方法用于颠倒数组中元素的顺序。

参数: 无

```javascript
let a = [1, 2, 3];
a.reverse();
console.log(a); // [3,2,1]
```

#### `copyWithin()` 指定位置的成员复制到其他位置

定义: 在当前数组内部，将指定位置的成员复制到其他位置,并返回这个数组。

语法:

```javascript
array.copyWithin(target, (start = 0), (end = this.length));
```

参数:

三个参数都是数值，如果不是，会自动转为数值.

1. `target`（必需）：从该位置开始替换数据。如果为负值，表示倒数。
2. `start`（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示倒数。
3. `end`（可选）：到该位置前停止读取数据，默认等于数组长度。使用负数可从数组结尾处规定位置。

-

```javascript
// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1);
// [4, 2, 3, 4, 5]
var a = [
  "OB1",
  "Koro1",
  "OB2",
  "Koro2",
  "OB3",
  "Koro3",
  "OB4",
  "Koro4",
  "OB5",
  "Koro5",
];
// 2位置开始被替换,3位置开始读取要替换的 5位置前面停止替换
a.copyWithin(2, 3, 5);
// ["OB1","Koro1","Koro2","OB3","OB3","Koro3","OB4","Koro4","OB5","Koro5"]
```

从上述栗子:

1. 第一个参数是开始被替换的元素位置
2. 要替换数据的位置范围:从第二个参数是开始读取的元素，在第三个参数前面一个元素停止读取
3. 数组的长度不会改变
4. **读了几个元素就从开始被替换的地方替换几个元素**

#### `fill()` 填充数组

定义: 使用给定值，填充一个数组。

参数:

第一个元素(必须): 要填充数组的值

第二个元素(可选): 填充的开始位置,默认值为 0

第三个元素(可选)：填充的结束位置，默认是为数组`length`

```javascript
["a", "b", "c"].fill(7)[
  // [7, 7, 7]
  ("a", "b", "c")
].fill(7, 1, 2);
// ['a', 7, 'c']
```

---

### 不改变原数组的方法(8 个):

```javascript
// ES5：
slice、join、toLocateString、toStrigin、cancat、indexOf、lastIndexOf、
// ES7：
includes
```

#### `slice()` 浅拷贝数组的元素

定义： 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象，且原数组不会被修改。

**注意**：字符串也有一个`slice()` 方法是用来提取字符串的，不要弄混了。

语法:

```javascript
array.slice(begin, end);
```

参数:

`begin`(可选): 索引数值,接受负值，从该索引处开始提取原数组中的元素,默认值为 0。

`end`(可选):索引数值(不包括),接受负值，在该索引处前结束提取原数组元素，默认值为数组末尾(包括最后一个元素)。

```javascript
let a = ["hello", "world"];
let b = a.slice(0, 1); // ['hello']
a[0] = "改变原数组";
console.log(a, b); // ['改变原数组','world'] ['hello']
b[0] = "改变拷贝的数组";
console.log(a, b); // ['改变原数组','world'] ['改变拷贝的数组']
```

如上：新数组是浅拷贝的，**元素是简单数据类型，改变之后不会互相干扰**。

如果是**复杂数据类型(对象,数组)的话，改变其中一个，另外一个也会改变**。

```javascript
let a = [{ name: "OBKoro1" }];
let b = a.slice();
console.log(b, a); // [{"name":"OBKoro1"}]  [{"name":"OBKoro1"}]
// a[0].name='改变原数组';
// console.log(b,a); // [{"name":"改变原数组"}] [{"name":"改变原数组"}]
// b[0].name='改变拷贝数组',b[0].koro='改变拷贝数组';
//  [{"name":"改变拷贝数组","koro":"改变拷贝数组"}] [{"name":"改变拷贝数组","koro":"改变拷贝数组"}]
```

原因在定义上面说过了的：`slice()`是浅拷贝，对于复杂的数据类型浅拷贝，拷贝的只是指向原数组的指针，所以无论改变原数组，还是浅拷贝的数组，都是改变原数组的数据。

#### `join()` 数组转字符串

定义: `join()` 方法用于把数组中的所有元素通过指定的分隔符进行分隔放入一个字符串，返回生成的字符串。

语法:

```javascript
array.join(str);
```

参数:

`str`(可选): 指定要使用的分隔符，默认使用逗号作为分隔符。

```javascript
let a = ["hello", "world"];
let str = a.join(); // 'hello,world'
let str2 = a.join("+"); // 'hello+world'
```

使用`join`方法或者下文说到的`toString`方法时，当数组中的元素也是数组或者是对象时会出现什么情况？

```javascript
let a = [["OBKoro1", "23"], "test"];
let str1 = a.join(); // OBKoro1,23,test
let b = [{ name: "OBKoro1", age: "23" }, "test"];
let str2 = b.join(); // [object Object],test
// 对象转字符串推荐JSON.stringify(obj);
```

所以，`join()/toString()`方法在数组元素是数组的时候，会将里面的数组也调用`join()/toString()`,如果是对象的话，对象会被转为`[object Object]`字符串。

#### `toLocaleString()` 数组转字符串

定义: 返回一个表示数组元素的字符串。该字符串由数组中的每个元素的 `toLocaleString()` 返回值经调用 `join()` 方法连接（由逗号隔开）组成。

语法:

```javascript
array.toLocaleString();
```

参数：无。

```javascript
let a = [{ name: "OBKoro1" }, 23, "abcd", new Date()];
let str = a.toLocaleString(); // [object Object],23,abcd,2018/5/28 下午1:52:20
```

如上述栗子：调用数组的`toLocaleString`方法，数组中的每个元素都会调用自身的`toLocaleString`方法，对象调用对象的`toLocaleString`,Date 调用 Date 的`toLocaleString`。

#### `toString()` 数组转字符串 不推荐

定义: `toString()` 方法可把数组转换为由逗号链接起来的字符串。

语法:

```javascript
array.toString();
```

参数: 无。

该方法的效果和`join`方法一样，都是用于数组转字符串的，但是与`join`方法相比没有优势，也不能自定义字符串的分隔符，因此不推荐使用。

**值得注意的是**：当数组和字符串操作的时候，`js` 会调用这个方法将数组自动转换成字符串

```javascript
let b = ["toString", "演示"].toString(); // toString,演示
let a = ["调用toString", "连接在我后面"] + "啦啦啦"; // 调用toString,连接在我后面啦啦啦
```

#### `cancat`

定义： 方法用于合并两个或多个数组，返回一个新数组。

语法：

```javascript
var newArr =oldArray.concat(arrayX,arrayX,......,arrayX)
```

参数：

`arrayX`（必须）：该参数可以是具体的值，也可以是数组对象。可以是任意多个。

-

```javascript
let a = [1, 2, 3];
let b = [4, 5, 6];
//连接两个数组
let newVal = a.concat(b); // [1,2,3,4,5,6]
// 连接三个数组
let c = [7, 8, 9];
let newVal2 = a.concat(b, c); // [1,2,3,4,5,6,7,8,9]
// 添加元素
let newVal3 = a.concat("添加元素", b, c, "再加一个");
// [1,2,3,"添加元素",4,5,6,7,8,9,"再加一个"]
// 合并嵌套数组  会浅拷贝嵌套数组
let d = [1, 2];
let f = [3, [4]];
let newVal4 = d.concat(f); // [1,2,3,[4]]
```

**`ES6`扩展运算符`...`合并数组**：

因为 ES6 的语法更简洁易懂，所以现在合并数组我大部分采用`...`来处理，`...`运算符可以实现`cancat`的每个栗子，且更简洁和具有高度自定义数组元素位置的效果。

```javascript
let a = [2, 3, 4, 5];
let b = [4, ...a, 4, 4];
console.log(a, b); //  [2, 3, 4, 5] [4, 2, 3, 4, 5, 4, 4]
```

#### `indexOf()` 查找数组是否存在某个元素，返回下标

定义: 返回在数组中可以找到一个给定元素的**第一个索引**，如果不存在，则返回-1。

语法:

```javascript
array.indexOf(searchElement, fromIndex);
```

参数:

`searchElement`(必须):被查找的元素

`fromIndex`(可选):开始查找的位置(不能大于等于数组的长度，返回-1)，接受负值，默认值为 0。

严格相等的搜索:

数组的`indexOf`搜索跟字符串的`indexOf`不一样,数组的`indexOf`使用严格相等`===`搜索元素，即**数组元素要完全匹配**才能搜索成功。

**注意**：**`indexOf()`不能识别`NaN`**

-

```javascript
let a = ["啦啦", 2, 4, 24, NaN];
console.log(a.indexOf("啦")); // -1
console.log(a.indexOf("NaN")); // -1
console.log(a.indexOf("啦啦")); // 0
```

#### `lastIndexOf()` 查找指定元素在数组中的最后一个位置

定义: 方法返回指定元素,在数组中的**最后一个的索引**，如果不存在则返回 -1。（从数组后面往前查找）

语法:

```javascript
arr.lastIndexOf(searchElement, fromIndex);
```

参数:

`searchElement`(必须): 被查找的元素

`fromIndex`(可选): 逆向查找开始位置，默认值数组的长度-1，即查找整个数组。

关于`fromIndex`有三个规则:

1. 正值。如果该值大于或等于数组的长度，则整个数组会被查找。

2. 负值。将其视为从数组末尾向前的偏移。(比如-2，从数组最后第二个元素开始往前查找)

3. **负值。其绝对值大于数组长度，则方法返回 -1，即数组不会被查找。**

   ```javascript
   let a = ["OB", 4, "Koro1", 1, 2, "Koro1", 3, 4, 5, "Koro1"]; // 数组长度为10
   let b = a.lastIndexOf("Koro1", 4); // 从下标4开始往前找 返回下标2
   let b = a.lastIndexOf("Koro1", 100); //  大于或数组的长度 查找整个数组 返回9
   let b = a.lastIndexOf("Koro1", -11); // -1 数组不会被查找
   let b = a.lastIndexOf("Koro1", -9); // 从第二个元素4往前查找，没有找到 返回-1
   ```

#### `includes()` 查找数组是否包含某个元素 返回布尔

定义： 返回一个布尔值，表示某个数组是否包含给定的值

语法：

```javascript
array.includes(searchElement, (fromIndex = 0));
```

参数：

`searchElement`(必须):被查找的元素

`fromIndex`(可选):默认值为 0，参数表示搜索的起始位置，接受负值。正值超过数组长度，数组不会被搜索，返回`false`。负值绝对值超过长数组度，重置从 0 开始搜索。

**`includes`方法是为了弥补`indexOf`方法的缺陷而出现的:**

1. `indexOf`方法不能识别`NaN`
2. `indexOf`方法检查是否包含某个值不够语义化，需要判断是否不等于`-1`，表达不够直观

eg:

```javascript
let a = ["OB", "Koro1", 1, NaN];
// let b=a.includes(NaN); // true 识别NaN
// let b=a.includes('Koro1',100); // false 超过数组长度 不搜索
// let b=a.includes('Koro1',-3);  // true 从倒数第三个元素开始搜索
// let b=a.includes('Koro1',-100);  // true 负值绝对值超过数组长度，搜索整个数组复制代码
```

---

### 遍历方法(12 个):

`js`中遍历数组并不会改变原始数组的方法总共有 12 个:

```javascript
// ES5：
forEach、every 、some、 filter、map、reduce、reduceRight、
// ES6：
find、findIndex、keys、values、entries
```

#### `forEach`

定义: 按升序为数组中含有效值的每一项执行一次回调函数。

语法：

```javascript
array.forEach(function(currentValue, index, arr), thisValue)
```

参数:

`function`(必须): 数组中每个元素需要调用的函数。

```scss
// 回调函数的参数
1. currentValue(必须),数组当前元素的值
2. index(可选), 当前元素的索引值
3. arr(可选),数组对象本身
```

`thisValue`(可选): 当执行回调函数时`this`绑定对象的值，默认值为`undefined`

**关于`forEach()`你要知道**：

- 无法中途退出循环，只能用`return`退出本次回调，进行下一次回调。
- 它总是返回 `undefined`值,即使你`return`了一个值。

#### 下面类似语法同样适用这些规则

```markdown
1. 对于空数组是不会执行回调函数的
2. 对于已在迭代过程中删除的元素，或者空元素会跳过回调函数
3. 遍历次数再第一次循环前就会确定，再添加到数组中的元素不会被遍历。
4. 如果已经存在的值被改变，则传递给 callback 的值是遍历到他们那一刻的值。
```

-

```javascript
let a = [1, 2, , 3]; // 最后第二个元素是空的，不会遍历(undefined、null会遍历)
let obj = { name: "OBKoro1" };
let result = a.forEach(function(value, index, array) {
  a[3] = "改变元素";
  a.push("添加到尾端，不会被遍历");
  console.log(value, "forEach传递的第一个参数"); // 分别打印 1 ,2 ,改变元素
  console.log(this.name); // OBKoro1 打印三次 this绑定在obj对象上
  // break; // break会报错
  return value; // return只能结束本次回调 会执行下次回调
  console.log("不会执行，因为return 会执行下一次循环回调");
}, obj);
console.log(result); // 即使return了一个值,也还是返回undefined
// 回调函数也接受接头函数写法
```

#### `every` 检测数组所有元素是否都符合判断条件

定义: 方法用于检测数组所有元素是否都符合函数定义的条件

语法：

```delphi
array.every(function(currentValue, index, arr), thisValue)
```

参数:(这几个方法的参数，语法都类似)

`function`(必须): 数组中每个元素需要调用的函数。

```javascript
// 回调函数的参数
1. currentValue(必须),数组当前元素的值
2. index(可选), 当前元素的索引值
3. arr(可选),数组对象本身复制代码
```

`thisValue`(可选): 当执行回调函数时 this 绑定对象的值，默认值为`undefined`

方法返回值规则:

1. 如果数组中检测到**有一个元素不满足，则整个表达式返回 false**，且剩余的元素不会再进行检测。
2. 如果所有元素**都满足条件，则返回 true**。

-

```javascript
function isBigEnough(element, index, array) {
  return element >= 10; // 判断数组中的所有元素是否都大于10
}
let result = [12, 5, 8, 130, 44].every(isBigEnough); // false
let result = [12, 54, 18, 130, 44].every(isBigEnough); // true
// 接受箭头函数写法
[12, 5, 8, 130, 44].every((x) => x >= 10); // false
[12, 54, 18, 130, 44].every((x) => x >= 10); // true
```

#### `some` 数组中的是否有满足判断条件的元素

定义：数组中的是否有满足判断条件的元素

语法：

```javascript
array.some(function(currentValue, index, arr), thisValue)
```

参数:(这几个方法的参数，语法都类似)

`function`(必须): 数组中每个元素需要调用的函数。

```javascript
// 回调函数的参数
1. currentValue(必须),数组当前元素的值
2. index(可选), 当前元素的索引值
3. arr(可选),数组对象本身复制代码
```

`thisValue`(可选): 当执行回调函数时 this 绑定对象的值，默认值为`undefined`

方法返回值规则：

1. 如果**有一个元素满足条件，则表达式返回 true**, 剩余的元素不会再执行检测。

2. 如果**没有满足条件的元素，则返回 false**。

   ```javascript
   function isBigEnough(element, index, array) {
     return element >= 10; //数组中是否有一个元素大于 10
   }
   let result = [2, 5, 8, 1, 4].some(isBigEnough); // false
   let result = [12, 5, 8, 1, 4].some(isBigEnough); // true
   ```

#### `filter` 过滤原始数组，返回新数组

定义: 返回一个新数组, 其包含通过所提供函数实现的测试的所有元素。

语法：

```javascript
let new_array = arr.filter(function(currentValue, index, arr), thisArg)
```

参数:(这几个方法的参数，语法都类似)

`function`(必须): 数组中每个元素需要调用的函数。

```scss
// 回调函数的参数
1. currentValue(必须),数组当前元素的值
2. index(可选), 当前元素的索引值
3. arr(可选),数组对象本身复制代码
```

`thisValue`(可选): 当执行回调函数时 this 绑定对象的值，默认值为`undefined`

-

```javascript
let a = [32, 33, 16, 40];
let result = a.filter(function(value, index, array) {
  return value >= 18; // 返回a数组中所有大于18的元素
});
console.log(result, a); // [32,33,40] [32,33,16,40]
```

#### `map` 对数组中的每个元素进行处理，返回新的数组

定义：创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

语法：

```javascript
let new_array = arr.map(function(currentValue, index, arr), thisArg)
```

参数:(这几个方法的参数，语法都类似)

`function`(必须): 数组中每个元素需要调用的函数。

```scss
// 回调函数的参数
1. currentValue(必须),数组当前元素的值
2. index(可选), 当前元素的索引值
3. arr(可选),数组对象本身复制代码
```

`thisValue`(可选): 当执行回调函数时 this 绑定对象的值，默认值为`undefined`

-

```javascript
let a = ["1", "2", "3", "4"];
let result = a.map(function(value, index, array) {
  return value + "新数组的新元素";
});
console.log(result, a);
// ["1新数组的新元素","2新数组的新元素","3新数组的新元素","4新数组的新元素"] ["1","2","3","4"]
```

#### `reduce` 为数组提供累加器，合并为一个值

定义：`reduce()` 方法对累加器和数组中的每个元素（从左到右）应用一个函数，最终合并为一个值。

语法：

```javascript
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

参数：

`function`(必须): 数组中每个元素需要调用的函数。

```scss
// 回调函数的参数
1. total(必须)，初始值, 或者上一次调用回调返回的值
2. currentValue(必须),数组当前元素的值
3. index(可选), 当前元素的索引值
4. arr(可选),数组对象本身复制代码
```

`initialValue`(可选): 指定第一次回调 的第一个参数。

回调第一次执行时:

- 如果 `initialValue` 在调用 `reduce` 时被提供，那么第一个 `total` 将等于 `initialValue`，此时 `currentValue` 等于数组中的第一个值；
- 如果 `initialValue` 未被提供，那么 `total` 等于数组中的第一个值，`currentValue` 等于数组中的第二个值。此时如果数组为空，那么将抛出 `TypeError`。
- 如果数组仅有一个元素，并且没有提供 `initialValue`，或提供了 `initialValue` 但数组为空，那么回调不会被执行，数组的唯一值将被返回。

-

```javascript
// 数组求和
let sum = [0, 1, 2, 3].reduce(function(a, b) {
  return a + b;
}, 0);
// 6
// 将二维数组转化为一维 将数组元素展开
let flattened = [
  [0, 1],
  [2, 3],
  [4, 5],
].reduce((a, b) => a.concat(b), []);
// [0, 1, 2, 3, 4, 5]
```

#### `reduceRight` 从右至左累加

这个方法除了与`reduce`执行方向相反外，其他完全与其一致，请参考上述 `reduce` 方法介绍。

#### `find()`&`findIndex()` 根据条件找到数组成员

`find()`定义：用于找出第一个符合条件的数组成员，并返回该成员，如果没有符合条件的成员，则返回`undefined`。

`findIndex()`定义：返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

这两个方法

语法：

```javascript
let new_array = arr.find(function(currentValue, index, arr), thisArg)
let new_array = arr.findIndex(function(currentValue, index, arr), thisArg)
```

参数:(这几个方法的参数，语法都类似)

`function`(必须): 数组中每个元素需要调用的函数。

```scss
// 回调函数的参数
1. currentValue(必须),数组当前元素的值
2. index(可选), 当前元素的索引值
3. arr(可选),数组对象本身复制代码
```

`thisValue`(可选): 当执行回调函数时 this 绑定对象的值，默认值为`undefined`

这两个方法都可以识别`NaN`,弥补了`indexOf`的不足.

-

```javascript
// find
let a = [1, 4, -5, 10].find((n) => n < 0); // 返回元素-5
let b = [1, 4, -5, 10, NaN].find((n) => Object.is(NaN, n)); // 返回元素NaN
// findIndex
let a = [1, 4, -5, 10].findIndex((n) => n < 0); // 返回索引2
let b = [1, 4, -5, 10, NaN].findIndex((n) => Object.is(NaN, n)); // 返回索引4
```

#### `keys()`&`values()`&`entries()` 遍历键名、遍历键值、遍历键名+键值

定义：三个方法都返回一个新的 `Array Iterator` 对象，对象根据方法不同包含不同的值。

语法：

```javascript
array.keys();
array.values();
array.entries();
```

参数：无。

```javascript
for (let index of ["a", "b"].keys()) {
  console.log(index);
}
// 0
// 1

for (let elem of ["a", "b"].values()) {
  console.log(elem);
}
// 'a'
// 'b'

for (let [index, elem] of ["a", "b"].entries()) {
  console.log(index, elem);
}
// 0 "a"
// 1 "b"
```

在`for..of`中如果遍历中途要退出，可以使用`break`退出循环。

如果不使用`for...of`循环，可以手动调用遍历器对象的 next 方法，进行遍历:

```javascript
let letter = ["a", "b", "c"];
let entries = letter.entries();
console.log(entries.next().value); // [0, 'a']
console.log(entries.next().value); // [1, 'b']
console.log(entries.next().value); // [2, 'c']
```

## `Javascript`数组方法实践

### 数组扁平化

1. 递归：通过递归的方式不断的把数组内嵌的数组打开，并把所有的元素放到一个新数组中。

```javascript
function flattenArray(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flattenArray(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```

2. 使用 `reduce()` 和 `concat()`：通过 `reduce()` 方法把所有数组元素合并成一个数组，`concat()` 方法用于把多个数组合并成一个数组。

```javascript
function flattenArray(arr) {
  return arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val),
    []
  );
}
```

3. 使用 `spread` 运算符：`ES6` 中引入了 `spread` 运算符，可以用于把数组扁平化。

```javascript
function flattenArray(arr) {
  return [].concat(
    ...arr.map((val) => (Array.isArray(val) ? flattenArray(val) : val))
  );
}
```

4. 利用 `toString` 把数组变成以逗号分隔的字符串，然后遍历数组把每一项再变回原来的类型。

```javascript
const flatten = (arr) =>
  arr
    .toString()
    .split(",")
    .map((item) => +item);

const arr = [1, [2, [3, 4]]];
console.log(flatten(arr));
```

### 生成类似[1-100]这样的的数组：

测试大量数据的数组时可以这样生成：

```javascript
// fill
const arr = new Array(100).fill(0).map((item, index) => index + 1);

// Array.from()
const arr = Array.from(Array(100), (v, k) => k + 1);

// ... + array.keys()
const ary = [...Array(100).keys()];
```

`new Array(100)` 会生成一个有 100 空位的数组，这个数组是不能被`map()，forEach(), filter(), reduce(), every() ，some()`遍历的，因为空位会被跳过（`for of`不会跳过空位，可以遍历）。 `[...new Array(4)]` 可以给空位设置默认值`undefined`，从而使数组可以被以上方法遍历。

### 数组解构赋值应用

```javascript
// 交换变量
[a, b] = [b, a][(o.a, o.b)] = [o.b, o.a];
// 生成剩余数组
const [a, ...rest] = [..."asdf"]; // a: 'a'，rest: ["s", "d", "f"]
```

### 数组浅拷贝

```javascript
const arr = [1, 2, 3];
const arrClone = [...arr];
// 对象也可以这样浅拷贝
const obj = { a: 1 };
const objClone = { ...obj };
```

浅拷贝方法有很多如`arr.slice(0, arr.length)/Arror.from(arr)`等，但是用了`...`操作符之后就不会再想用其他的了~

### 数组合并

```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];
const arr = [...arr1, ...arr2, ...arr3];
```

`arr1.concat(arr2, arr3)`同样可以实现合并，但是用了`...`操作符之后就不会再想用其他的了~

### 数组去重

```javascript
const arr = [1, 1, 2, 2, 3, 4, 5, 5];
const newArr = [...new Set(arr)];
```

`new Set(arr)`接受一个数组参数并生成一个 set 结构的数据类型。set 数据类型的元素不会重复且是`Array Iterator`，所以可以利用这个特性来去重。

### 数组取交集

```javascript
const a = [0, 1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7, 8];
const duplicatedValues = [...new Set(a)].filter((item) => b.includes(item));
duplicatedValues; // [3, 4, 5]
```

### 数组取差集

```javascript
const a = [0, 1, 2, 3, 4, 5];
const b = [3, 4, 5, 6, 7, 8];
const diffValues = [...new Set([...a, ...b])].filter(
  (item) => !b.includes(item) || !a.includes(item)
); // [0, 1, 2, 6, 7, 8]
```

### 数组转对象

```javascript
const arr = [1, 2, 3, 4];
const newObj = { ...arr }; // {0: 1, 1: 2, 2: 3, 3: 4}
const obj = { 0: 0, 1: 1, 2: 2, length: 3 };
// 对象转数组不能用展开操作符，因为展开操作符必须用在可迭代对象上
let newArr = [...obj]; // Uncaught TypeError: object is not iterable...
// 可以使用Array.form()将类数组对象转为数组
let newArr = Array.from(obj); // [0, 1, 2]
```

### 数组摊平

```javascript
const obj = { a: "群主", b: "男群友", c: "女裙友", d: "未知性别" };
const getName = function(item) {
  return item.includes("群");
};
// 方法1
const flatArr = Object.values(obj)
  .flat()
  .filter((item) => getName(item));
const flatArr = Object.values(obj)
  .flat()
  .filter(getName);
```

二维数组用`array.flat()`，三维及以上用`array.flatMap()`。`array.flat(2)`可以传参数字如 2，表示要摊平的层数。

### 强大的`reduce`

`array.reduce` 遍历并将当前次回调函数的返回值作为下一次回调函数执行的第一个参数。

利用 `array.reduce` 替代一些需要多次遍历的场景，可以极大提高代码运行效率。

1. 利用`reduce` 输出一个数字/字符串

假如有如下每个元素都由字母's'加数字组成的数组`arr`，现在找出其中最大的数字：（`arr`不为空）

```javascript
const arr = ["s0", "s4", "s1", "s2", "s8", "s3"];

const maxS = arr.reduce((total, cur) => {
  const curIndex = Number(cur.replace("s", ""));
  return curIndex > total ? curIndex : total;
}, 0);
```

2. 利用`reduce` 输出一个数组/对象

```javascript
const arr = [1, 2, 3, 4, 5];

const value = arr.reduce((total, curr) => {
  return curr % 2 === 0 ? [...total, { value: curr }] : total;
}, []);
```

掌握了上面两种用法，结合实际需要，就可以用 `reduce/reduceRight` 实现各种奇巧淫技了。

3. 不改变原数组的`reverse`

由于 `array.reverse()` 函数会改变原数组自身，这样就限制了一些使用场景。如果我想要一个不会改变数组自身的 `reverse` 函数呢？

```javascript
const myReverse = (arr = []) => {
  return arr.reduceRight((total, cur) => [...total, cur], []); // 也可以返回逗号表达式 (total.push(cur), total)
};
```
