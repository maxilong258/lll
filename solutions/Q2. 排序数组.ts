

function sortArray(nums: number[]): number[] {
    // 快速排序
    // quickSort(nums, 0, nums.length - 1);
    return nums;
}

function quickSort(nums: number[], left: number, right: number): void {
    // 递归终止条件：子数组长度小于等于 1
    if (left >= right) return;

    // 1. 进行划分 (Partition)，获取基准值最终的正确位置
    const pivotIndex = partition(nums, left, right);

    // 2. 递归排序左半部分和右半部分
    quickSort(nums, left, pivotIndex - 1);
    quickSort(nums, pivotIndex + 1, right);
}

function partition(nums: number[], left: number, right: number): number {
    // 选最左侧元素作为基准值 (Pivot)
    const pivot = nums[left]; 
    let i = left + 1;
    let j = right;

    while (i <= j) {
        // 从左往右找第一个大于等于 pivot 的数
        while (i <= j && nums[i] < pivot) i++;
        // 从右往左找第一个小于等于 pivot 的数
        while (i <= j && nums[j] > pivot) j--;

        if (i <= j) {
            // 交换位置，让小于 pivot 的在左，大于 pivot 的在右
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
            j--;
        }
    }

    // 将基准值放到正确的位置（与 j 交换）
    [nums[left], nums[j]] = [nums[j], nums[left]];
    return j; // 返回基准值的正确索引
}


