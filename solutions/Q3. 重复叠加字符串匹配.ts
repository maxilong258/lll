function repeatedStringMatch(a: string, b: string): number {
  let count = 0;
  let currentStr = "";

  // 1. 先叠加到长度 >= b.length
  while (currentStr.length < b.length) {
    currentStr += a;
    count++;
  }

  // 2. 检查当前长度刚达标时是否包含 b
  if (currentStr.includes(b)) {
    return count;
  }

  // 3. 如果没包含，再叠加一次 a（此时长度必然 > b.length）
  // 对应你推导的“比 b 还长”的极限情况
  if ((currentStr + a).includes(b)) {
    return count + 1;
  }

  // 4. 如果比 b 还长了还是没包含，说明绝对不可能了
  return -1;
}
