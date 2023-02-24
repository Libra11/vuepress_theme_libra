---
title: leetCode003 无重复字符的最长子串
category: algorithm
desc: leetCode003 无重复字符的最长子串
tag:
  - algorithm
  - leetcode
  - 算法
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/leetcode003.png
date: "2023-02-24"
---

## 无重复字符的最长子串

### 题目描述

给定一个字符串 `s` ，请你找出其中不含有重复字符的 最长子串 的长度。

示例 1：

输入：`s = "abcabcbb"` 输出：3 解释：因为无重复字符的最长子串是 `"abc"`，所以其长度为 3。

示例 2：

输入：`s = "bbbbb"` 输出：1 解释：因为无重复字符的最长子串是 `"b"`，所以其长度为 1。

示例 3：

输入：`s = "pwwkew"` 输出：3 解释：因为无重复字符的最长子串是 `"wke"`，所以其长度为 3。

### 解题思路

思路：
这道题主要用到思路是：滑动窗口

什么是滑动窗口？

其实就是一个队列,比如例题中的 `abcabcbb`，进入这个队列（窗口）为 `abc` 满足题目要求，当再进入 `a`，队列变成了 `abca`，这时候不满足要求。所以，我们要移动这个队列！我们只要把队列的左边的元素移出就行了，直到满足题目要求！

这道题需要求的是不含重复字符的最长子串的长度，我们可以使用滑动窗口的思想来解决。具体步骤如下：

1. 定义两个指针，`left` 和 `right`，分别表示滑动窗口的左右边界。
2. 将右指针 `right` 向右移动，直到遇到重复字符或者到达字符串的末尾为止。
3. 如果右指针 `right` 指向的字符没有重复，则更新最长子串的长度。
4. 更新 `left` (取**重复字符出现位置+1**和`left`本身的最大值)，然后继续执行步骤 2 和 3。
5. 重复步骤 2、3、4 直到右指针 `right` 到达字符串的末尾为止。

### 代码实现

#### 滑动窗口

滑动窗口法的时间复杂度为 `O(n)`。

```js
var lengthOfLongestSubstring = function(s) {
  let max = 0; // 最长子串的长度
  let map = new Map(); // 创建一个 Map 集合，用于存储字符及其下标
  let left = 0; // 定义左指针
  for (let right = 0; right < s.length; right++) {
    if (map.has(s.charAt(right))) {
      // 如果字符已经在集合中出现过
      left = Math.max(left, map.get(s.charAt(right)) + 1); // 更新左指针的位置
    }
    map.set(s.charAt(right), right); // 将字符加入集合中
    max = Math.max(max, right - left + 1); // 更新最长子串的长度
  }
  return max; // 返回最长子串的长度
};
```
