---
title: leetCode002 两数相加
category: algorithm
desc: leetCode002 两数相加
tag:
  - algorithm
  - leetcode
  - 算法
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/lettcode002.png
date: "2023-02-23"
---

## 两数相加

### 题目描述：

给出两个非空链表表示两个非负整数。其中，它们各自的位数是按照逆序的方式存储的，并且它们的每个节点只能存储一位数字。如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

示例：

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)

输出：7 -> 0 -> 8

原因：342 + 465 = 807

### 解题代码

#### 解法一：模拟法

![image-20230223175049272](https://libra321.oss-cn-huhehaote.aliyuncs.com/img/image-20230223175049272.png)

- 新建一个头节点 `head` 和一个指针 `cur`（初始值为 `head`）。
- 定义一个变量 `carry`，表示进位值（初始值为 0）。
- 遍历两个链表，每次取出两个链表当前节点的值并相加，加上 `carry` 值，得到一个新节点的值 `val`。
- 将 `carry` 值更新为 `val` 的十位数（即 `carry = Math.floor(val / 10)`）。
- 创建一个新节点，并将 `val` 的个位数作为新节点的值。
- 将新节点接在链表上，并将指针 `cur` 移动到新节点。
- 继续遍历两个链表，直到其中一个链表遍历完了。
- 如果进位值 `carry` 不为 0，还需要新建一个节点，节点的值为 `carry`。
- 返回头节点 `head` 的下一个节点（因为头节点只是一个辅助节点，没有实际意义）。

```js
var addTwoNumbers = function(l1, l2) {
  let head = new ListNode(0); // 新建一个头节点
  let cur = head; // 定义一个指针 cur
  let carry = 0; // 进位值 carry
  while (l1 || l2) {
    let val1 = l1 ? l1.val : 0; // 取出 l1 的当前节点的值
    let val2 = l2 ? l2.val : 0; // 取出 l2 的当前节点的值
    let sum = val1 + val2 + carry; // 两个节点的值相加，并加上进位值
    carry = Math.floor(sum / 10); // 更新进位值
    let node = new ListNode(sum % 10); // 创建一个新节点
    cur.next = node; // 将新节点接在链表上
    cur = cur.next; // 将指针 cur 移动到新节点
    l1 = l1 ? l1.next : null; // 将 l1 指针移动到下一个节点
    l2 = l2 ? l2.next : null; // 将 l2 指针移动到下一个节点
  }
  if (carry) {
    cur.next = new ListNode(carry); // 如果还有进位值，需要新建一个节点
  }
  return head.next; // 返回头节点的下一个节点
};
```

#### 解法二：递归法

```js
var addTwoNumbers = function(l1, l2, carry = 0) {
  if (!l1 && !l2 && !carry) return null; // 如果两个链表和进位值都为空，则返回 null
  let val1 = l1 ? l1.val : 0; // 取出 l1 的当前节点的值
  let val2 = l2 ? l2.val : 0; // 取出 l2 的当前节点的值
  let sum = val1 + val2 + carry; // 两个节点的值相加，并加上进位值
  let node = new ListNode(sum % 10); // 创建一个新节点
  node.next = addTwoNumbers(
    l1 ? l1.next : null,
    l2 ? l2.next : null,
    Math.floor(sum / 10)
  ); // 递归创建下一个节点，并更新进位值
  return node; // 返回当前节点
};
```
