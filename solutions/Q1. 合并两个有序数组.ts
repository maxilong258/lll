/**
 Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1: number[], m: number, nums2: number[], n: number): void {
  let p1 = m - 1;
  let p2 = n - 1;
  let tail = m + n - 1;

  while (p1 >= 0 && p2 >= 0) {
    if (nums1[p1] > nums2[p2]) {
      nums1[tail] = nums1[p1];
      p1--;
    } else {
      nums1[tail] = nums2[p2];
      p2--;
    }
    tail--;
  }

  // 如果 nums2 还有剩余元素，直接填入 nums1
  while (p2 >= 0) {
    nums1[tail] = nums2[p2];
    p2--;
    tail--;
  }
}
