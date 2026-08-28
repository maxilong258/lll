import { MyMinHeap } from "./MyMinHeap";

// function findKthLargest(nums: number[], k: number): number {
//   const minHeap = new MyMinHeap();

//   for (const num of nums) {
//     if (minHeap.size() < k) {
//       // 堆内元素不足 k 个时直接放入
//       minHeap.push(num);
//     } else if (num > minHeap.peek()) {
//       // 当前数字大于堆顶（即大于前 k 大元素里的最小值）时，弹出堆顶并放入新数
//       minHeap.pop();
//       minHeap.push(num);
//     }
//   }

//   // 最终堆顶就是第 k 个最大的元素
//   return minHeap.peek();
// }

// 快速排序
function findKthLargest(nums: number[], k: number): number {
    // 第 k 个最大元素，即升序排序后的第 nums.length - k 个元素
    const targetIndex = nums.length - k;
  
    function quickSelect(left: number, right: number): number {
      if (left === right) return nums[left];
  
      // 随机选 pivot 并交换到 left，防止极端的降序/升序样例导致 $O(n^2)$ 退化
      const randomIndex = Math.floor(Math.random() * (right - left + 1)) + left;
      [nums[left], nums[randomIndex]] = [nums[randomIndex], nums[left]];
  
      const pivot = nums[left];
      let i = left + 1;
      let j = right;
  
      while (true) {
        while (i <= j && nums[i] < pivot) i++;
        while (i <= j && nums[j] > pivot) j--;
        if (i >= j) break;
        [nums[i], nums[j]] = [nums[j], nums[i]];
        i++;
        j--;
      }
  
      [nums[left], nums[j]] = [nums[j], nums[left]];
  
      // 剪枝判断：只处理包含 targetIndex 的那半边
      if (j === targetIndex) {
        return nums[j];
      } else if (j < targetIndex) {
        return quickSelect(j + 1, right);
      } else {
        return quickSelect(left, j - 1);
      }
    }
  
    return quickSelect(0, nums.length - 1);
  }
