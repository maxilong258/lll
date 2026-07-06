function repeatedSubstringPattern(s: string): boolean {
  const n = s.length;
  // 枚举可能的子串长度 i，最大不超过 n / 2
  for (let i = 1; i <= Math.floor(n / 2); i++) {
    if (n % i === 0) {
      // 子串长度必须是原字符串长度的因数
      let isMatch = true;
      // 检查后续字符是否与对应位置的字符相等
      for (let j = i; j < n; j++) {
        if (s[j] !== s[j - i]) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) return true;
    }
  }
  return false;
}

// function repeatedSubstringPattern(s: string): boolean {
//   // 将两个 s 拼接，并去掉首尾字符
//   const doubleS = (s + s).slice(1, -1);
//   // 检查在剩下的字符串中是否还能找到原字符串 s
//   return doubleS.includes(s);
// }
