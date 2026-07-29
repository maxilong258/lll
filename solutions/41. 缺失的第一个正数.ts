function firstMissingPositive(nums: number[]): number {
  const n = nums.length;

  // 1. 将每个数字放到对应的索引位置上 (数字 x 放到 nums[x - 1])
  for (let i = 0; i < n; i++) {
    while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] !== nums[i]) {
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  // 2. 检查哪个位置的数字不匹配
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  // 3. 如果 1 到 n 全部存在，则缺失的是 n + 1
  return n + 1;
}
