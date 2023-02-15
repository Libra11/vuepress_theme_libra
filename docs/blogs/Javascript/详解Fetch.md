---
title: 详解Fetch
category: javascript
desc: 详解Fetch
tag:
  - javascript
  - this
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/fetchapi.png
date: "2023-02-15"
---

## `Fetch`

`Fetch`是一种浏览器中的`API`，它提供了一种用于发送`HTTP`请求并处理响应的简单、灵活的方式。`Fetch` `API`使得在`JavaScript`中发送和接收数据变得更加容易，而不需要使用`XMLHttpRequest`（`XHR`）。

`Fetch` `API`使用`Promise`，因此它可以很好地与`async`/`await`一起使用。它支持请求和响应的各种数据类型，包括`JSON`、文本、`Blob`、`ArrayBuffer`等。`Fetch` `API`还支持跨域请求，并且默认情况下不发送或接收`cookies`，从而提高了安全性。

### 简单示例

好的，以下是一个使用`Fetch` `API`发送`GET`请求并处理响应的代码示例：

```js
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
```

这个例子使用`Fetch` `API`发送一个`GET`请求，请求地址是https://jsonplaceholder.typicode.com/todos/1。该请求返回一个`JSON`对象，其中包含了代办事项的信息。在代码中，我们使用`fetch`()函数发送请求，并将返回的`Promise`对象传递给`then`()方法。

在第一个`then`()方法中，我们将响应对象转换为`JSON`格式的数据，以便于后续处理。这里使用了`response.json`()方法，该方法返回一个`Promise`对象，该对象在成功时返回`JSON`数据。

在第二个`then`()方法中，我们将`JSON`数据打印到控制台上，以便于查看。在这里，我们只是简单地使用了`console.log`()方法。

在最后一个`catch`()方法中，我们处理了可能发生的错误。如果请求失败，我们将在控制台上输出错误信息。

### 方法

在使用 `Fetch` API 发起请求时，可以通过 `init` 对象中的 `method` 属性来指定请求方法。常见的请求方法包括 `GET`、`POST`、`PUT`、`DELETE` 等。

下面是一个使用 `Fetch` `API` 发起 `GET` 请求的示例：

```js
fetch("https://example.com/api/data?name=John")
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
```

以上代码向 `https://example.com/api/data` 发起了一个 `GET` 请求，并使用 `Promise` 语法处理响应。首先判断响应是否正常（即状态码是否为 200），如果正常则将响应转换为 `JSON` 格式并输出到控制台中。如果响应不正常则抛出一个错误并输出到控制台中。

如果需要使用其他请求方法，可以在 `init` 对象中指定 `method` 属性。

下面是一个使用 `Fetch` `API` 发起 `POST` 请求的示例：

```js
fetch("https://example.com/api/data", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John",
    age: 30,
  }),
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
```

以上代码向 `https://example.com/api/data` 发起了一个 `POST` 请求，将一个 `JSON` 格式的对象作为请求主体发送。在 `init` 对象中，需要设置请求头中的 `Content-Type` 属性为 `application/json`，以指定请求主体的类型为 JSON。请求主体需要通过 `JSON.stringify()` 方法将对象转换为字符串格式。在 `Promise` 中处理响应的方式与上例相同。

### 关于`response`

当使用`Fetch` `API`发送`HTTP`请求并接收响应时，响应将包含在一个`Response`对象中。该对象提供了许多有用的方法和属性，以帮助我们处理响应数据。下面是一个简单的例子，说明如何使用`Response`对象：

```js
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => {
    console.log(response.status); // 输出响应状态码
    console.log(response.ok); // 输出一个布尔值，表示响应是否成功
    console.log(response.headers.get("Content-Type")); // 输出响应头中Content-Type字段的值
    console.log(response.json()); // 将响应主体解析为JSON格式的数据，并返回一个Promise对象，该对象在成功时返回JSON数据
    console.log(response.blob()); // 方法将响应主体作为Blob对象返回，
    console.log(response.arrayBuffer()); // 方法将响应主体作为ArrayBuffer对象返回等。
    return response.text(); // 将响应主体作为文本返回
  })
  .then((data) => {
    console.log(data); // 输出响应主体的文本内容
  })
  .catch((error) => console.error(error));
```

### 自定义请求

#### 请求方法

`HTTP`请求方法指定了请求应该执行的操作。默认情况下，`Fetch` `API`使用`GET`方法。但是，我们可以通过在`fetch`()函数的`init`对象中设置 method 属性来指定请求方法。常用的请求方法包括`GET`、`POST`、`PUT`、`DELETE`等。（上面有`post`方法的代码示例）

#### 请求头

`HTTP`请求头是一个包含请求元数据的对象。它可以包含诸如`Content-Type`、`Authorization`、`Accept`等字段。我们可以在`fetch`()函数的`init`对象中设置`headers`属性来指定请求头。

```js
fetch("https://example.com/api", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username: "johndoe", password: "secretpassword" }),
})
  .then((response) => {
    // 处理响应数据
  })
  .catch((error) => console.error(error));
```

#### 请求体

`HTTP`请求体是包含在请求中的数据。当使用`POST`、`PUT`等请求方法时，我们需要向服务器发送一些数据，这些数据被包含在请求体中。我们可以在`fetch`()函数的`init`对象中设置`body`属性来指定请求体。请求体可以是字符串、`Blob`对象、`FormData`对象等。

```js
const formData = new FormData();
formData.append("name", "John");
formData.append("age", "30");

fetch("https://example.com/api/data", {
  method: "POST",
  body: formData,
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Network response was not ok.");
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
```

#### 缓存模式

`HTTP`缓存是一个存储`HTTP`响应的机制。当浏览器发出`HTTP`请求时，它会首先检查缓存，看看是否有可用的响应。如果有，它将从缓存中获取响应，而不是从服务器重新获取。我们可以在`fetch`()函数的`init`对象中设置`cache`属性来指定缓存模式。常用的缓存模式包括`default`、`no-cache`、no-store 等。

```js
fetch("https://example.com/api/data", {
  cache: "no-cache", // 禁用缓存
})
  .then((response) => {
    // 处理响应数据
  })
  .catch((error) => console.error(error));
```

#### 超时时间

当`HTTP`请求超过指定的时间时，`Fetch` `API`将自动终止该请求。我们可以在`fetch`()函数的`init`对象中设置`timeout`属性来指定超时时间。

```js
fetch("https://example.com/api/data", {
  timeout: 5000, // 超时时间为5秒
})
  .then((response) => {
    // 处理响应数据
  })
  .catch((error) => console.error(error));
```

#### 请求重定向

`HTTP`重定向是服务器告诉客户端去请求另一个`URL`的一种机制。我们可以在`fetch`()函数的`init`对象中设置`redirect`属性来指定重定向选项。常用的重定向选项包括`follow`、`error`、`manual`等。

```js
fetch("https://example.com/api/data", {
  redirect: "follow", // 自动跟随重定向
})
  .then((response) => {
    // 处理响应数据
  })
  .catch((error) => console.error(error));
```

### 中止请求

`Fetch` `API`还支持使用`AbortController`来取消请求。`AbortController`是一个 API，用于中止`fetch`请求。如果请求已经发出，我们可以调用`AbortController`的`abort`()方法来中止请求。例如，以下代码演示了如何使用`AbortController`来中止请求：

```js
const controller = new AbortController();
const signal = controller.signal;

fetch("https://example.com/api", { signal })
  .then((response) => {
    // 处理响应数据
  })
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("请求已中止");
    } else {
      console.error(error);
    }
  });

controller.abort(); // 取消请求
```

### 优缺点

**fetch 的优点：**

- 原生支持 `Promise`，可以更方便地进行异步操作和链式调用。
- 不需要额外的依赖库，可直接使用浏览器原生的 `fetch` 方法。
- 支持 `Stream` `API`，可以处理大量的数据。
- 支持 `CORS` 和 `Service Workers`，提供了更加灵活的跨域和离线缓存控制。
- 更加轻量级，不会对项目产生额外的体积开销。

**fetch 的缺点：**

- 相对于 `axios` 等库来说，语法不太友好，需要手动处理一些错误和异常情况。
- 不支持自动转换数据格式，需要手动使用 `JSON.parse()` 等方法对返回的数据进行处理。
- 不支持自动取消请求。
