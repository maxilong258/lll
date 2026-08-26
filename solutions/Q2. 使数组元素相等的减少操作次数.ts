function reductionOperations(nums: number[]): number {
    nums.sort((a, b) => a - b);
    
    let ans = 0;
    let steps = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            steps++;
        }
        ans += steps;
    }
    
    return ans;
}