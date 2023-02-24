---
title: leetCode001 两数之和
category: algorithm
desc: leetCode001 两数之和
tag:
  - algorithm
  - leetcode
  - 算法
picture: https://libra321.oss-cn-huhehaote.aliyuncs.com/img/leetcode01.png
date: "2023-02-23"
---

## 两数之和

### 题目描述

给定一个整数数组 `nums` 和一个整数目标值 `target`，请找出数组中和为目标值的两个整数。

你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

### 代码实现

#### 解法一：暴力枚举

遍历每个元素 `x`，并查找是否存在一个值与 `target - x` 相等的目标元素。

```js
var twoSum = function(nums, target) {
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] + nums[j] == target) {
        return [i, j];
      }
    }
  }
  return [];
};
```

时间复杂度：`O(n^2)`。

#### 解法二：哈希表

**一般来说，题目中要求我们找到满足某些条件的值或者元素，我们就可以考虑使用哈希表来降低时间复杂度**

- 首先，初始化一个空的哈希表 `map`。
- 遍历数组 `nums`。
- 对于每一个元素 `nums[i]`，查看 `map` 中是否存在 `target - nums[i]` 的键值对，如果存在，直接返回结果 `[map[target-nums[i]], i]`。
- 如果不存在，将当前元素 `nums[i]` 存入 `map` 中，键为 `nums[i]`，值为 `i`。
- 如果遍历完整个数组都没有找到满足条件的两个数，则返回一个空数组`[]`。

```js
var twoSum = function(nums, target) {
  let map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const item = nums[i];
    if (map.has(target - item)) {
      return [map.get(target - item), i];
    }
    map.set(item, i);
  }
  return [];
};
```

时间复杂度：`O(n)`。

#### 解法三：排序+双指针

双指针解题思路是先对数组进行排序，然后用两个指针分别从头和尾向中间移动，如果两个指针所指的元素之和等于目标值，就返回它们的原始下标；如果小于目标值，就把左指针右移；如果大于目标值，就把右指针左移

```js
var twoSum = function(nums, target) {
  // 记录原始索引
  const arr = nums.map((num, i) => [num, i]);
  arr.sort((a, b) => a[0] - b[0]);
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = arr[left][0] + arr[right][0];
    console.log(sum);
    if (sum === target) {
      return [arr[left][1], arr[right][1]];
    }
    sum < target ? left++ : right--;
  }
  return [];
};
```

时间复杂度：`O(nlogn)`。其中 `n` 是数组的长度。这是因为排序需要 `O(nlogn)` 的时间，双指针遍历需要 `O(n)` 的时间，所以总的时间复杂度是 `O(nlogn + n) = O(nlogn)` 。
