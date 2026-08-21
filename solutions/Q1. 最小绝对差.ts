function minimumAbsDifference(arr: number[]): number[][] {
    arr.sort((a, b) => a - b);
  
    let minDiff = Infinity;
    const ans: number[][] = [];
  
    for (let i = 1; i < arr.length; i++) {
      const diff = arr[i] - arr[i - 1];
  
      if (diff < minDiff) {
        // 找到了更小的差值
        minDiff = diff;
  
        // 之前的答案全部作废
        ans.length = 0;
  
        ans.push([arr[i - 1], arr[i]]);
      } else if (diff === minDiff) {
        // 找到了另一个同样最小的
        ans.push([arr[i - 1], arr[i]]);
      }
    }
  
    return ans;
  }