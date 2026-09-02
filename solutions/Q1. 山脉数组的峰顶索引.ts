function peakIndexInMountainArray(arr: number[]): number {
    // 题目保证是山脉数组，峰值不可能在最左或最右两端
    let left = 0;
    let right = arr.length - 1;
  
    while (left < right) {
      // 防止 (left + right) 溢出，并向下取整
      let mid = left + Math.floor((right - left) / 2);
  
      if (arr[mid] < arr[mid + 1]) {
        // 处于递增阶段，峰值在右侧
        left = mid + 1;
      } else {
        // 处于递减阶段，峰值在左侧，也可能 mid 就是峰值
        right = mid;
      }
    }
  
    // 当 left == right 时，即为峰值下标
    return left;
  };