function beautifulArray(n: number): number[] {
  // 递归基
  if (n === 1) return [1];

  // 1. 递归生成奇数部分（包含 (n + 1) / 2 个元素）
  const left = beautifulArray(Math.ceil(n / 2));

  // 2. 递归生成偶数部分（包含 n / 2 个元素）
  const right = beautifulArray(Math.floor(n / 2));

  const result: number[] = [];

  // 将左半部分映射为奇数：2 * x - 1
  for (const x of left) {
    result.push(2 * x - 1);
  }

  // 将右半部分映射为偶数：2 * x
  for (const x of right) {
    result.push(2 * x);
  }

  return result;
}