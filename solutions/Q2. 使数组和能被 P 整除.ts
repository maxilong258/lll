function minSubarray(nums: number[], p: number): number {
  // 真正的总和
  const total = nums.reduce((a, b) => a + b, 0);

  // 最终要删除的子数组需要满足：
  // subSum % p == target
  const target = total % p;

  if (target === 0) return 0;

  // 真正的前缀和 -> 下标
  const map = new Map<number, number>();
  map.set(0, -1);

  let pre = 0;
  let ans = nums.length;

  for (let i = 0; i < nums.length; i++) {
    // 真正的前缀和
    pre += nums[i];

    // 枚举所有以前出现过的前缀和
    for (const [oldPre, index] of map) {
      // 当前子数组和
      const subSum = pre - oldPre;

      // 如果满足条件
      if (subSum % p === target) {
        ans = Math.min(ans, i - index);
      }
    }

    map.set(pre, i);
  }

  return ans === nums.length ? -1 : ans;
}

// 真正版本：
// function minSubarray(nums: number[], p: number): number {
//   // 计算整个数组的和 % p
//   // 不需要算真正的总和，只需要余数即可，防止数字过大
//   const total = nums.reduce((sum, num) => (sum + num) % p, 0);

//   // 如果本来就能整除，不需要删除任何元素
//   if (total === 0) return 0;

//   // key: 前缀和 % p
//   // value: 这个余数最后一次出现的位置
//   const map = new Map<number, number>();

//   // 前缀和为0，认为发生在数组开始前
//   // 例如删除前两个元素时，需要用到这个
//   map.set(0, -1);

//   // 当前前缀和 % p
//   let pre = 0;

//   // 最终答案
//   let ans = nums.length;

//   for (let i = 0; i < nums.length; i++) {

//     // 更新前缀和
//     pre = (pre + nums[i]) % p;

//     // 需要寻找的前缀和余数
//     // 如果以前存在这个余数
//     // 那么中间这一段子数组就是候选答案
//     const need = (pre - total + p) % p;

//     if (map.has(need)) {
//       // 当前子数组长度
//       ans = Math.min(ans, i - map.get(need)!);
//     }

//     // 更新当前位置
//     // 保存最后一次出现，可以保证子数组尽量短
//     map.set(pre, i);
//   }

//   // 不能删除整个数组
//   return ans === nums.length ? -1 : ans;
// }
