---
title: Ajax与跨域
category: javascript
desc: Ajax与跨域
tag:
  - javascript
  - this
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/ajaxandcors.png
date: "2023-02-15"
---

## `Ajax`

`Ajax`（`Asynchronous JavaScript and XML`）是一种用于创建交互式`Web`应用程序的技术。它允许`Web`应用程序通过异步方式与`Web`服务器通信，无需刷新整个页面即可更新部分内容，从而提高了用户体验和`Web`应用程序的性能。

`Ajax`通过`JavaScript`、`XMLHttpRequest`和`DOM`技术实现。`JavaScript`负责收集用户输入和动态修改页面，`XMLHttpRequest`对象用于与`Web`服务器进行异步通信，`DOM`则用于将服务器响应更新到`Web`页面上。

使用`Ajax`，`Web`应用程序可以通过以下步骤与`Web`服务器进行异步通信：

1. 创建`XMLHttpRequest`对象
2. 使用`XMLHttpRequest`对象向`Web`服务器发送请求
3. 接收`Web`服务器的响应
4. 使用`DOM`将响应更新到`Web`页面上

### 代码示例

```javascript
function ajax(url, method, data) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.statusText);
        }
      }
    };
    xhr.send(data ? JSON.stringify(data) : null);
  });
}
```

使用该函数，可以轻松地发送`Ajax`请求并处理响应。例如：

```js
ajax("http://example.com/api/users", "POST", {
  name: "John",
  email: "john@example.com",
})
  .then(function(response) {
    console.log("User created:", JSON.parse(response));
  })
  .catch(function(error) {
    console.error("Failed to create user:", error);
  });
```

该函数返回一个`Promise`对象，该对象在请求成功时会调用`resolve`方法，并将服务器响应的字符串作为参数传递。在请求失败时，该对象会调用`reject`方法，并将错误消息字符串作为参数传递。在请求成功或失败后，可以使用`then`方法或`catch`方法分别处理响应或错误。

### `readyState`

`readyState`属性表示`XMLHttpRequest`对象的状态，它有 5 个可能的取值：

- 0: 代表请求尚未初始化，即`XMLHttpRequest`对象已创建但尚未调用`open()`方法；
- 1: 代表请求已经建立，即 open()方法已经被调用；
- 2: 代表请求已经发送，即`send()`方法已经被调用，并且头部和状态已经可获得；
- 3: 代表请求正在处理中，即服务器正在处理请求并返回响应；
- 4: 代表请求已完成，即服务器已经返回响应，`XMLHttpRequest`对象已经接收到完整的响应数据。

## `Ajax`跨域

`Ajax`跨域是指通过`XMLHttpRequest`对象发送请求到不同域名的服务器。在`Web`浏览器中，存在**同源策略**，即`JavaScript`脚本可以访问与当前文档源相同的资源，而不能访问其他源的资源。同源策略是`Web`安全模型的重要组成部分，目的是防止恶意脚本通过跨站点脚本攻击（`XSS`）等方式窃取用户信息。

> 同源策略（`Same Origin Policy`）是一种`Web`浏览器安全机制，用于保护用户数据免受恶意网站的攻击。同源策略规定，`JavaScript`脚本只能访问与自身文档源（协议、主机名、端口号）相同的资源，不能访问其他源的资源。

因此，如果通过`Ajax`请求访问不同源的资源，将会受到同源策略的限制，请求将被阻止。例如，如果一个网页在`http://www.example.com`域名下，它不能通过`Ajax`请求访问`http://api.example.net`域名下的资源。

为了解决`Ajax`跨域问题，需要使用一些方法来绕过同源策略。常见的方法包括：

### `JSONP`

`JSONP`是一种通过动态创建`<script>`标签来加载外部脚本的技术，因为`<script>`标签没有同源策略限制，可以从不同域名加载脚本。`JSONP`的实现原理是服务器返回一个`JavaScript`回调函数，客户端通过该回调函数来获取数据。由于`JSONP`使用了`<script>`标签，因此只支持`GET`请求。

#### 例子

假设我们有一个页面 `http://www.example.com/index.html`，需要从另一个域名 `http://api.example.net` 获取数据，可以使用如下代码：

```js
function handleResponse(data) {
  console.log(data);
}

var script = document.createElement("script");
script.src = "http://api.example.net/data?callback=handleResponse";
document.body.appendChild(script);
```

在这个例子中，我们定义了一个回调函数 `handleResponse`，然后动态创建了一个 `<script>` 标签，并将其 `src` 属性设置为 `http://api.example.net/data?callback=handleResponse`。`callback=handleResponse` 是`JSONP`的关键，它告诉服务器需要将响应包装在一个回调函数中返回。

服务器端返回的数据应该是一个`JavaScript`函数调用，例如：

```js
handleResponse({ name: "John", age: 30 });
```

当浏览器接收到这个响应时，就会自动执行 `handleResponse` 函数，从而在客户端获得响应数据。由于使用了 `<script>` 标签，**`JSONP`只支持`GET`请求，不能用于发送`POST`请求**。另外需要注意的是，使用`JSONP`存在一些安全隐患，因此不建议在生产环境中使用。

#### 安全隐患

`JSONP`存在一些安全隐患，主要有以下几点：

- 客户端难以控制回调函数名称

在`JSONP`中，客户端需要指定一个回调函数的名称，并将该名称作为参数传递给服务器。服务器返回的响应数据将被包装在该函数的调用中返回，从而在客户端中执行该函数并获取响应数据。但是客户端很难控制回调函数的名称，因为这个名称是由服务器返回的。如果恶意网站在响应中返回一个恶意的回调函数名称，可能会导致安全问题。

- 服务器难以验证客户端身份

在`JSONP`中，服务器无法验证客户端的身份，因为请求中包含的回调函数名称是由客户端指定的，服务器并不知道该名称是否来自合法的客户端。因此，如果服务器返回的响应数据包含敏感信息，可能会被恶意网站窃取。

- 服务器难以控制响应数据

在`JSONP`中，服务器无法控制响应数据的格式和内容，因为响应数据将被包装在客户端指定的回调函数的调用中返回。如果恶意网站在请求中传递了恶意代码，可能会导致安全问题。

由于这些安全隐患，不建议在生产环境中使用`JSONP`，而应该使用更安全的跨域技术，例如`CORS`。如果必须使用`JSONP`，建议使用`HTTPS`协议，并确保响应数据经过严格的验证和过滤，以防止安全漏洞。

### `CORS`

`CORS`是一种支持跨域资源共享的技术，它允许服务器发送响应头，告诉浏览器允许哪些域名访问资源。通过`CORS`，可以在客户端使用`Ajax`请求跨域资源，而无需使用`JSONP`等绕过同源策略的方法。

#### 例子

- 在服务器端设置允许跨域请求的头信息

在服务器端，需要设置允许跨域请求的头信息。具体来说，需要设置 `Access-Control-Allow-Origin` 头信息，该头信息指示服务器允许哪些域名的请求访问。例如，下面的代码允许所有域名的请求访问：

```js
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
```

- 发送`CORS`跨域请求

在客户端，可以使用`XMLHttpRequest`对象或`fetch` `API`发送`CORS`请求。发送`CORS`请求的方式与普通请求相同，只需将 `XMLHttpRequest` 对象的 `withCredentials` 属性设置为 `true`，**表示允许发送跨域请求的凭证**（如`cookies`、`HTTP`认证等）。

例如，以下代码使用 `fetch` API 发送 CORS 请求：

```js
fetch("https://api.example.com/data", {
  mode: "cors",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
```

在上面的代码中，`fetch` API 请求的第二个参数中指定了 `credentials: 'include'`，表示允许发送跨域请求的凭证。

#### 凭证

`CORS`（跨域资源共享）是一种机制，允许`Web`应用程序从不同的域访问其资源。为了提供更安全的访问控制，`CORS`还支持凭证机制。

凭证是指在`CORS`请求中携带了`cookies`、`HTTP`认证或`TLS`客户端证书等敏感信息，而不是简单的请求。`CORS`通过两个头部来控制凭证的发送和接收：`Access-Control-Allow-Credentials` 和 `withCredentials`。

当`Web`应用程序使用`CORS`请求时，浏览器会在发送请求之前**检查目标服务器是否允许跨域请求携带凭证信息**。如果目标服务器允许使用凭证进行跨域请求，那么浏览器会在请求头中设置`withCredentials`为`true`，并在发送请求时携带`cookie`等凭证信息。如果目标服务器不允许使用凭证进行跨域请求，那么浏览器将忽略`withCredentials`头部，并且不会在请求中携带凭证信息。

目标服务器可以通过设置`Access-Control-Allow-Credentials`头部来允许或禁止携带凭证信息的跨域请求。如果服务器允许携带凭证信息的跨域请求，它必须设置`Access-Control-Allow-Origin`头部为请求源的域名，并将`Access-Control-Allow-Credentials`设置为`true`。这样，浏览器才会在发送跨域请求时携带凭证信息。

> 浏览器在发送跨域请求时，会自动在请求头中添加`Origin`字段，该字段表示请求的源地址（域名和协议）。服务器收到请求后，会根据该字段来判断是否允许该跨域请求。
>
> 如果服务器允许当前请求的来源（即请求头中的`Origin`字段）与其自身的域名匹配，那么服务器会在响应头中添加一些`Access-Control-*`的字段，来告诉浏览器该请求可以被跨域访问，并且可以携带凭证信息。浏览器收到响应后，会检查响应头中的`Access-Control-*`字段，判断是否允许携带凭证信息。
>
> 如果服务器不允许当前请求的来源（即请求头中的`Origin`字段）与其自身的域名匹配，那么服务器会拒绝该请求，并在响应头中添加一些`Access-Control-*`的字段，告诉浏览器该请求不能被跨域访问，或者不能携带凭证信息。

### 代理服务器

代理服务器是指在客户端和服务器之间插入一个中间层，通过代理服务器来转发请求和响应。客户端通过`Ajax`请求代理服务器上的资源，而代理服务器再向目标服务器发送请求，获取数据后返回给客户端。**客户端和代理服务器之间没有跨域问题，因为它们处于同一个域名下。代理服务器和目标服务器之间并不需要进行`CORS`处理，因为它们不涉及跨域问题(浏览器才有同源策略)。**

#### 例子

- 启动代理服务器

在本地启动一个代理服务器，用于转发客户端发送的跨域请求，并从目标服务器获取响应数据。可以使用任何一种`Web`服务器，例如`Node.js`中的`Express`。

- 配置代理服务器

配置代理服务器以将客户端请求转发到目标服务器，并将响应数据返回给客户端。例如，以下是一个基本的`Express`代理服务器配置：

```js
const express = require("express");
const httpProxy = require("http-proxy");

const app = express();
const proxy = httpProxy.createProxyServer();

app.use("/", (req, res) => {
  proxy.web(req, res, { target: "http://api.example.com" });
});

app.listen(3000, () => {
  console.log("Proxy server listening on port 3000");
});
```

在上面的代码中，`http-proxy`模块用于创建代理服务器。`app.use()`函数用于配置路由，将所有客户端请求转发到目标服务器（`http://api.example.com`）。

- 发送跨域请求

在客户端，向代理服务器发送跨域请求。例如，以下是一个使用`fetch`对象发送跨域请求的示例：

```js
fetch("http://localhost:3000/data")
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });
```

在上面的代码中，客户端向代理服务器发送`GET`请求，并从代理服务器获取响应数据。
