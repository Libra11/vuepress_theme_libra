---
title: Javascript异步详解
category: javascript
desc: Javascript异步详解
tag:
  - javascript
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/asyncjavascript.png
date: "2023-02-20"
---

## 简介

`JavaScript`是一种单线程语言，这意味着在执行代码时只有一个主线程，代码是按照编写的顺序依次执行的。如果有一个耗时很长的操作在主线程上运行，那么这将会阻塞整个线程，导致页面无法响应用户输入或其他事件。

为了解决这个问题，`JavaScript`引入了异步编程。异步编程使得代码可以在主线程执行的同时，也能在后台完成一些操作。当异步操作完成后，可以通知主线程并处理结果。

异步编程主要使用回调函数、`Promise`和`async`/`await`这些技术来实现。这些技术使得`JavaScript`代码可以在主线程之外执行，并且可以在后台进行`I/O`操作、计算和网络请求等异步操作。

### 回调函数

回调函数是异步编程最早的实现方式之一，它是将一个函数作为参数传递给另一个函数，在异步操作完成后调用该函数来处理结果。

#### 缺点

- 回调地狱

```javascript
asyncFunc1(function(error, data1) {
  if (error) {
    console.error(error);
  } else {
    asyncFunc2(data1, function(error, data2) {
      if (error) {
        console.error(error);
      } else {
        asyncFunc3(data2, function(error, data3) {
          if (error) {
            console.error(error);
          } else {
            asyncFunc4(data3, function(error, data4) {
              if (error) {
                console.error(error);
              } else {
                // do something with data4
              }
            });
          }
        });
      }
    });
  }
});
```

在这个例子中，我们调用了四个异步函数(`asyncFunc1`、`asyncFunc2`、`asyncFunc3`、`asyncFunc4`)来执行某些任务。每个异步函数都需要传递回调函数来处理异步操作的结果，这可能会导致嵌套多层回调函数，使得代码难以理解和维护。

- 错误处理

当处理多个异步操作时，如果其中一个异步操作出错，我们通常需要停止整个流程并抛出错误。如果使用回调函数来处理异步操作的结果，可能需要嵌套多层回调函数来处理错误，使代码难以理解和维护。

```javascript
function fetchUser(userId, callback) {
  fetchData(`https://jsonplaceholder.typicode.com/users/${userId}`, function(
    err,
    userData
  ) {
    if (err) {
      callback(err, null);
    } else {
      const user = JSON.parse(userData);
      fetchData(
        `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
        function(err, postData) {
          if (err) {
            callback(err, null);
          } else {
            const posts = JSON.parse(postData);
            callback(null, { user, posts });
          }
        }
      );
    }
  });
}

fetchUser(1, function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});
```

在这个例子中，`fetchUser`函数需要通过回调函数获取用户信息和该用户的所有文章。当任何一个异步操作出错时，它需要调用回调函数并传递错误。

可以看到，由于需要嵌套多层回调函数，代码难以阅读和维护。而且，如果有更多的异步操作需要处理，这种方法将会变得更加混乱和难以维护。

### `Promise`

`Promise`是异步编程的另一种实现方式，它是一种对象，可以将异步操作的结果包装在其中，可以在异步操作完成后通过`.then()`方法处理结果，也可以通过`.catch()`方法处理异常。

#### 基本原理

`Promise`是一个有三个状态的对象：`pending`（进行中）、`fulfilled`（已完成）和`rejected`（已拒绝）。当`Promise`对象被创建时，它处于`pending`状态。当异步操作完成时，`Promise`对象会转换为`fulfilled`状态，并且会调用`Promise`对象的`then`方法来处理操作的结果。如果异步操作失败，则`Promise`对象会转换为`rejected`状态，并且会调用`Promise`对象的`catch`方法来处理操作失败的结果。**当`Promise`对象处于`fulfilled`或`rejected`状态时，它将保持在该状态，不会再次转换为其他状态。**

#### 基本用法

`Promise`对象可以通过 new Promise()方法创建，该方法接受一个函数作为参数，该函数的两个参数分别为`resolve`和`reject`。`resolve`用于将`Promise`对象的状态从`pending`转换为`fulfilled`，而`reject`则用于将 Promise 对象的状态从`pending`转换为 rejected。下面是一个简单的例子：

```js
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.5) {
      resolve("Success");
    } else {
      reject("Error");
    }
  }, 1000);
});

promise
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

在这个例子中，`Promise`对象会等待 1 秒钟，然后根据 Math.random()的值决定将`Promise`对象的状态转换为 fulfilled 还是`rejected`。如果 Promise 对象的状态为`fulfilled`，则会调用`then`方法来处理操作结果。如果`Promise`对象的状态为`rejected`，则会调用`catch`方法来处理操作失败的结果。

#### 方法

`Promise`对象具有以下几个方法：

- `then`：当`Promise`对象的状态从`pending`转换为`fulfilled`时调用，接受一个回调函数作为参数。该回调函数的参数是异步操作的结果。`then`方法可以链式调用。

```js
promise
  .then((result) => {
    console.log(result);
  })
  .then(() => {
    console.log("Another operation");
  });
```

- `catch`：当`Promise`对象的状态从`pending`转换为`rejected`时调用，接受一个回调函数作为参数。该回调函数的参数是异步操作失败的原因。

```js
promise.catch((error) => {
  console.error(error);
});
```

- `finally`：不管`Promise`对象的状态是`fulfilled`还是`rejected`，都会调用`finally`方法。该方法接受一个回调函数作为参数，该回调函数不接受任何参数。

```js
promise.finally(() => {
  console.log("Operation complete");
});
```

- `Promise.all()` 方法：接收一个 `Promise` 数组作为参数，返回一个新的 `Promise`，当所有 `Promise` 都成功 `resolved` 时，该 `Promise` 才会 `resolved`，返回所有 `Promise` 的结果组成的数组；当任意一个 `Promise` 被 `rejected` 时，该 `Promise` 就会 `rejected`，返回第一个 `rejected Promise` 的结果。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 2 rejected");
  }, 500);
});

Promise.all([promise1, promise2])
  .then((results) => {
    console.log("Promise.all resolved:", results);
  })
  .catch((error) => {
    console.log("Promise.all rejected:", error);
    // Promise.all rejected: Promise 2 rejected
  })
  .finally(() => {
    console.log("Promise.all done");
  });
```

- `Promise.allSettled()` 方法：接收一个 `Promise` 数组作为参数，返回一个新的 `Promise`，等待所有 `Promise` 结束后返回一个数组，该数组包含每个 `Promise` 的结果（无论 `resolved` 还是 `rejected`）。该方法在所有 `Promise` 执行完毕后才会返回结果。

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 3 rejected");
  }, 1000);
});

Promise.allSettled([promise1, promise2, promise3])
  .then((results) => {
    console.log(results);
    // [
    //    0: {status: 'fulfilled', value: 'Promise 1 resolved'}
    //    1: {status: 'fulfilled', value: 'Promise 2 resolved'}
    //    2: {status: 'rejected', reason: 'Promise 3 rejected'}
    // ]
  })
  .catch((error) => {
    console.error(error);
  });
```

- `Promise.race()` 方法：接收一个 `Promise` 数组作为参数，返回一个新的 `Promise`，只要其中一个 `Promise` 状态发生改变，该 `Promise` 就会跟着改变。如果某个 `Promise` 成功 `resolved`，该 `Promise` 就会 `resolved`；如果某个 `Promise` 被 `rejected`，该 `Promise` 就会 `rejected`，并返回**第一个**被 `resolved` 或 `rejected` 的 `Promise` 的结果。

```javascript
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 1 resolved");
  }, 3000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Promise 2 resolved");
  }, 2000);
});

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("Promise 3 rejected");
  }, 1000);
});

Promise.race([promise1, promise2, promise3])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

#### 手写`Promise`

```javascript
class MyPromise {
  constructor(executor) {
    this.state = "pending"; // promise的状态
    this.value = undefined; // promise的值
    this.onFulfilledCallbacks = []; // 存储成功的回调函数
    this.onRejectedCallbacks = []; // 存储失败的回调函数

    // 定义resolve和reject函数
    const resolve = (value) => {
      if (this.state === "pending") {
        // 只有在pending状态下才能改变状态和值
        this.state = "fulfilled"; // 改变状态为fulfilled
        this.value = value; // 设置值为传入的value
        this.onFulfilledCallbacks.forEach((callback) => callback()); // 执行所有成功的回调函数
      }
    };

    const reject = (reason) => {
      if (this.state === "pending") {
        // 只有在pending状态下才能改变状态和值
        this.state = "rejected"; // 改变状态为rejected
        this.value = reason; // 设置值为传入的reason
        this.onRejectedCallbacks.forEach((callback) => callback()); // 执行所有失败的回调函数
      }
    };

    try {
      executor(resolve, reject); // 执行传入的函数参数，并传入resolve和reject作为参数
    } catch (error) {
      reject(error); // 如果发生错误，直接reject错误对象
    }
  }

  then(onFulfilled, onRejected) {
    console.log(this.state);
    if (this.state === "fulfilled") {
      // 如果当前状态是fulfilled，直接执行onFulfilled并传入value作为参数
      onFulfilled(this.value);
    } else if (this.state === "rejected") {
      // 如果当前状态是rejected，直接执行onRejected并传入value作为参数
      onRejected(this.value);
    } else if (this.state === "pending") {
      // 如果当前状态是pending，将onFulfilled和onRejected存入对应的数组中，等待后续执行
      this.onFulfilledCallbacks.push(() => onFulfilled(this.value));
      this.onRejectedCallbacks.push(() => onRejected(this.value));
    }
  }
  catch(onRejected) {
    return this.then(undefined, onRejected); // 返回一个新的promise对象，并调用then方法
  }
  static all(iterable) {
    return new MyPromise((resolve, reject) => {
      // 返回一个新的MyPromise对象
      let count = 0; // 记录已完成的数量
      let result = []; // 存储结果数组
      for (let item of iterable) {
        // 遍历可迭代对象
        let index = count; // 记录当前索引
        count++; // 增加已完成数量
        item.then(
          // 将每个元素转换为MyPromise对象，并调用then方法
          (value) => {
            result[index] = value; // 将结果存入数组对应位置
            if (--count === 0) {
              // 如果所有元素都完成了，则解决新的MyPromise对象，并传入结果数组作为值
              resolve(result);
            }
          },
          (reason) => {
            reject(reason); // 如果有任何元素失败了，则拒绝新的MyPromise对象，并传入失败原因作为值
          }
        );
      }
    });
  }
  static allSettled(iterable) {
    return new MyPromise((resolve) => {
      // 返回一个新的MyPromise对象
      let count = 0; // 记录已完成的数量
      let result = []; // 存储结果数组
      for (let item of iterable) {
        // 遍历可迭代对象
        let index = count; // 记录当前索引
        count++; // 增加已完成数量
        item.then(
          // 将每个元素转换为MyPromise对象，并调用then方法
          (value) => {
            result[index] = { status: "fulfilled", value }; // 将结果存入数组对应位置，包含状态和值
            if (--count === 0) {
              // 如果所有元素都完成了，则解决新的MyPromise对象，并传入结果数组作为值
              resolve(result);
            }
          },
          (reason) => {
            result[index] = { status: "rejected", reason }; // 将错误存入数组对应位置，包含状态和原因
            if (--count === 0) {
              // 如果所有元素都完成了，则解决新的MyPromise对象，并传入结果数组作为值
              resolve(result);
            }
          }
        );
      }
    });
  }
  static race(iterable) {
    return new MyPromise((resolve, reject) => {
      // 返回一个新的MyPromise对象
      for (let item of iterable) {
        // 遍历可迭代对象
        item.then(
          // 将每个元素转换为MyPromise对象，并调用then方法
          (value) => {
            resolve(value); // 如果有任何元素成功了，则解决新的MyPromise对象，并传入成功值作为值
          },
          (reason) => {
            reject(reason); // 如果有任何元素失败了，则拒绝新的MyPromise对象，并传入失败原因作为值
          }
        );
      }
    });
  }
  static resolve(value) {
    // 如果value是MyPromise对象，直接返回
    if (value instanceof MyPromise) {
      return value;
    }
    // 否则，返回一个以value为结果的fulfilled状态的MyPromise对象
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason) {
    // 如果reason是MyPromise对象，直接返回
    if (reason instanceof MyPromise) {
      return reason;
    }
    // 否则，返回一个以reason为原因的rejected状态的MyPromise对象
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}
```

### `async/await`

`async/await`是`ES2017`引入的新特性，它是一种用于处理`Promise`的语法糖。`async`函数返回一个`Promise`对象，可以使用`await`关键字等待一个异步操作的结果，并将结果赋值给变量。这样可以编写更易读和维护的异步代码。

`async`/`await`的核心原理是利用`generator`函数和`promise`来实现异步流程的自动执行。

- `generator`函数可以通过`yield`关键字来暂停和恢复执行，并返回一个迭代器对象，可以通过调用`next`方法来获取下一个`yield`表达式的值
- `promise`是一种表示异步操作结果的对象，可以通过`then`方法来添加成功或失败时执行的回调函数

手写`async`/`await`的最简实现如下：

```js
function asyncToGenerator(generatorFunc) {
  // 返回一个新的异步函数
  return function() {
    // 先调用generator函数生成迭代器
    const gen = generatorFunc.apply(this, arguments);
    // 返回一个promise
    return new Promise((resolve, reject) => {
      // 封装一个step 函数
      function step(key, arg) {
        let generatorResult;
        // try catch捕获可能抛出错误
        try {
          generatorResult = gen[key](arg);
        } catch (error) {
          return reject(error);
        }
        // 解构赋值得到value和done属性
        const { value, done } = generatorResult;
        if (done) {
          // 如果迭代器完成了，则直接resolve这个值
          return resolve(value);
        } else {
          // 否则就继续往下执行，并将value包装成promise
          return Promise.resolve(value).then(
            (val) => step("next", val),
            (err) => step("throw", err)
          );
        }
      }
      // 开始迭代过程
      step("next");
    });
  };
}
```

#### 使用

```js
// 假设有一个返回promise的异步函数getData
function getData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("data");
    }, 1000);
  });
}

// 定义一个generator函数
function* testG() {
  // await被编译成了yield
  const data = yield getData();
  console.log("data: ", data);
  const data2 = yield getData();
  console.log("data2: ", data2);
  return "success";
}

// 使用asyncToGenerator转换成异步函数
const testA = asyncToGenerator(testG);

// 调用异步函数
testA().then((res) => {
  console.log("res: ", res);
});
```
