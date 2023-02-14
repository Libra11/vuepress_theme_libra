---
title: Javascript中的Map和Set
category: javascript
desc: Javascript中的Map和Set
tag:
  - javascript
  - this
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/mapandset.jpeg
date: "2023-02-14"
---

## `Javascript` `Map`、`WeakMap`、`Set`、`WeakSet`详解

### `Map` 与 `WeakMap`

JavaScript 推出 `Map` 和 `WeakMap` 的原因是为了提供更丰富和灵活的数据结构，以支持更高效和更简单的数据存储和操作。

`Map` 是一种键值对存储方式，允许用户使用任意类型的键（包括对象）作为索引，这使得开发人员可以更方便地组织和存储数据。`WeakMap` 同样是一种键值对存储方式，但与 `Map` 不同的是，`WeakMap` 的键是弱引用，并且不会被垃圾回收机制回收，因此可以防止内存泄漏。

总的来说，`Map` 和 `WeakMap` 的出现为 `JavaScript` 提供了更加灵活的数据存储方式，使得开发人员可以更方便地组织和处理数据。

#### `Map`

- `set(key, value)`：设置一个键值对。
- `get(key)`：获取指定键的值。

```js
let myMap = new Map();

myMap.set("key1", "value1");
myMap.set("key2", "value2");

console.log(myMap.get("key1")); // 'value1'
console.log(myMap.get("key2")); // 'value2'
```

- `has(key)`：返回一个布尔值，表示指定键是否存在。

```js
let myMap = new Map();

myMap.set("key1", "value1");
myMap.set("key2", "value2");

console.log(myMap.has("key1")); // true
console.log(myMap.has("key3")); // false
```

- `delete(key)`：删除指定键。

```js
let myMap = new Map();

myMap.set("key1", "value1");
myMap.set("key2", "value2");

myMap.delete("key1");

console.log(myMap.has("key1")); // false
```

- `clear()`：清空所有键值对。

```js
let myMap = new Map();

myMap.set("key1", "value1");
myMap.set("key2", "value2");

myMap.clear();

console.log(myMap.size); // 0
```

- `size`：返回键值对数量。

```js
let myMap = new Map();

myMap.set("key1", "value1");
myMap.set("key2", "value2");

console.log(myMap.size); // 2
```

#### `WeakMap`

- `set(key, value)`：设置一个键值对。
- `get(key)`：获取指定键的值。

```javascript
let map = new WeakMap();
let obj = { name: 1 };
map.set(obj, "yy"); // WeakMap {{…} => 'yy'}
map.get(obj); // 'yy'
```

- `has(key)`：返回一个布尔值，表示指定键是否存在。

```javascript
map.has(obj); // true
```

- `delete(key)`：删除指定键。

```javascript
map2.delete(obj);
map2.has(obj); // false
```

`Map` 和 `WeakMap` 的方法基本相同，但由于 `WeakMap` 的特殊性质

- 它不提供 `size` 属性。
- `WeakMap` 没有 `clear()` 方法，`WeakMap` 与普通的 `Map` 不同，它没有提供删除整个映射或者清空整个映射的方法。一旦一个键不再被引用，它在 `WeakMap` 中的对应值就会自动被垃圾回收机制回收。因此，你不能通过任何方法手动清空一个 `WeakMap`，只能通过让所有键都不再被引用来实现。

#### 区别

`Map` 和 `WeakMap` 的主要区别在于它们的键（key）的引用强度。

`Map` 的键是强引用，因此它们不会被垃圾回收机制回收。这意味着，如果一个键在 `Map` 中被引用，则它不会被回收，即使没有其他对象指向该键。

```js
let myMap = new Map();
let key = {};

myMap.set(key, "value");

console.log(myMap.has(key)); // true

key = null;

console.log(myMap.has(key)); // true
```

相比之下，`WeakMap` 的键是弱引用，因此它们可以被垃圾回收机制回收。如果一个键在 `WeakMap` 中不再被引用，则它会被回收。

```js
let myWeakMap = new WeakMap();
let key = {};

myWeakMap.set(key, "value");

console.log(myWeakMap.has(key)); // true

key = null;

console.log(myWeakMap.has(key)); // false
```

因此，如果需要存储的数据不重要且有可能在未来被回收，则使用 `WeakMap` 更合适，以避免内存泄漏。如果需要存储的数据重要且需要长期保存，则使用 `Map` 更合适。

### `Set` 与 `WeakSet`

JavaScript 推出 `Set` 和 `WeakSet` 是为了提供一种更方便和高效的存储唯一值的数据结构。

在 JavaScript 中，我们经常使用数组来存储一组唯一值，但数组常常有一些缺陷：

- 数组中的值可能不是真正的唯一的。
- 对数组中的每个值进行去重的操作效率低下。

为了解决上述问题，JavaScript 推出了 `Set` 和 `WeakSet`。

`Set` 是一种具有键值对概念的数据结构，其中每个值都是唯一的。而 `WeakSet` 则是一种存储弱引用对象的数据结构，当对象不再被引用时，它们会自动从 `WeakSet` 中删除。

这两种数据结构的出现，为 `JavaScript` 开发者提供了一种更灵活和高效的方法来存储唯一值和弱引用对象。

#### `Set`

- `add(value)`：将指定的值添加到 `Set` 中。

```js
scssCopy code
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);

console.log(mySet); // Set { 1, 2, 3 }
```

- `clear()`：清空 `Set` 中的所有值。

```js
scssCopy code
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);

console.log(mySet); // Set { 1, 2, 3 }

mySet.clear();

console.log(mySet); // Set {}
```

- `delete(value)`:从 `Set` 中删除指定的值。

```js
scssCopy code
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);

console.log(mySet); // Set { 1, 2, 3 }

mySet.delete(2);

console.log(mySet); // Set { 1, 3 }
```

- `has(value)`:判断 `Set` 中是否有指定的值。

```js
scssCopy code
const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(3);

console.log(mySet.has(2)); // true
console.log(mySet.has(4)); // false
```

#### `WeakSet`

- `add`：将指定的对象添加到 `WeakSet` 中。

```js
const ws = new WeakSet();

const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

ws.add(obj1);
ws.add(obj2);

console.log(ws.has(obj1)); // true
console.log(ws.has(obj2)); // true
```

- `delete`：从 `WeakSet` 中删除指定的对象。

```js
const ws = new WeakSet();

const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

ws.add(obj1);
ws.add(obj2);

console.log(ws.has(obj1)); // true

ws.delete(obj1);

console.log(ws.has(obj1)); // false
```

- `has`：检查 `WeakSet` 中是否包含指定的对象。

```js
const ws = new WeakSet();

const obj1 = { name: "Alice" };
const obj2 = { name: "Bob" };

ws.add(obj1);

console.log(ws.has(obj1)); // true
console.log(ws.has(obj2)); // false
```

### 优势

#### `Map`之于对象

- **键的类型不限于字符串或符号**

在 `JavaScript` 中，对象的键只能是字符串或符号。而在 `Map` 中，键的类型可以是任何类型，包括对象、函数、`NaN` 等。这使得 `Map` 在处理键值对时更加灵活。

- **键值对数量可以轻松获取**

在对象中，要获取键值对的数量，需要手动遍历对象或者使用 `Object.keys` 方法，这样的操作比较繁琐。而在 `Map` 中，可以使用 `size` 属性轻松获取键值对的数量。

- **迭代顺序可控**

在对象中，对象属性的顺序是不确定的，因此无法保证属性的迭代顺序。而在 `Map` 中，键值对的迭代顺序是按照插入顺序进行的，因此可以控制迭代的顺序。

- **可以更方便地使用自定义对象作为键**

在对象中，如果要使用自定义对象作为键，需要手动实现键的比较函数。而在 `Map` 中，可以直接使用自定义对象作为键，`Map` 会自动进行比较。

- **可以更方便地清空**

在对象中，要清空对象的属性，需要手动遍历对象，将每个属性删除。而在 `Map` 中，可以直接使用 `clear` 方法清空所有键值对。

#### `Set`之于数组

- **自动去重**

在 `Set` 中，所有的值都是唯一的，如果向 `Set` 中添加一个已经存在的值，`Set` 会自动忽略这个值。这使得 `Set` 成为一种轻松去重的工具，可以方便地将包含重复元素的数组转换为不包含重复元素的数组。

- 高效的查找操作

在数组中，要查找某个元素是否存在，需要使用循环或者数组方法。而在 `Set` 中，可以使用 `has` 方法直接判断某个值是否存在，这个操作的时间复杂度为 `O(1)`，效率比循环或数组方法高得多。

- **可以更方便地使用对象作为值**

在数组中，可以使用对象作为元素，但是如果要查找某个对象，需要手动遍历数组并比较对象的属性。而在 `Set` 中，可以直接使用对象作为值，`Set` 会自动进行比较。

- 可以更方便地清空

在数组中，要清空数组，需要使用 `splice` 方法或者直接将数组长度设置为 0。而在 `Set` 中，可以直接使用 `clear` 方法清空所有元素。
