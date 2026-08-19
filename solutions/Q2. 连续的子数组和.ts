function checkSubarraySum(nums: number[], k: number): boolean {
    const map = new Map<number, number>();
  
    // 处理从下标 0 开始的子数组
    map.set(0, -1);
  
    let sum = 0;
  
    for (let i = 0; i < nums.length; i++) {
      sum += nums[i];
  
      const remainder = sum % k;
  
      if (map.has(remainder)) {
        const j = map.get(remainder)!;
  
        // 子数组长度至少为 2
        if (i - j >= 2) {
          return true;
        }
      } else {
        // 只记录第一次出现的位置
        map.set(remainder, i);
      }
    }
  
    return false;
  }
  