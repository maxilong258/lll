/**
 * 单调递增栈：每个柱子作为「矩形高度」时，左右第一个更矮的柱子就是边界。
 * 末尾加 0 迫使所有柱子最终被弹出并结算面积。时间 O(n)，空间 O(n)。
 */
function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  const h = [...heights, 0];

  for (let i = 0; i < h.length; i++) {
    while (stack.length > 0 && h[stack[stack.length - 1]] > h[i]) {
      const height = h[stack.pop()!];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }

  return maxArea;
}
