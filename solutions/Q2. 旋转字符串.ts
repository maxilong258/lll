function rotateString(s: string, goal: string): boolean {
  if (s.length !== goal.length) return false;

  let current = s;
  for (let i = 0; i < s.length; i++) {
    if (current === goal) return true;
    // 每次旋转：截取剩余部分并拼接第一个字符
    current = current.slice(1) + current[0];
  }

  return false;
}

// function rotateString(s: string, goal: string): boolean {
//   return s.length === goal.length && (s + s).includes(goal);
// }
