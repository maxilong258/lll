/** 'a' → 0 … 'z' → 25 */
function letterIndex(c: string): number {
  return c.charCodeAt(0) - 97;
}

function letterChar(i: number): string {
  return String.fromCharCode(i + 97);
}

/**
 * 口语版思路（像排队挑人）：
 *
 * 从左往右扫，手里维护一个「当前答案」栈（从左到右）。
 *
 * - 每种字母最后在答案里只能出现一次：已经进过栈的字母再遇到就跳过。
 * - 想让字典序尽量小：尽量让小的字母靠左。
 * - 当看到当前字母比栈顶字母更小时，会想「能不能把栈顶那个大字母挪到后面再选？」
 *   只有当这个大字母在字符串后面还会出现时，才敢弹出栈顶（否则弹了就凑不齐每种一次了）。
 *
 * 「后面还会出现」用计数维护：预先数好频次，每走过一个字符就给对应字母减一。
 */
function removeDuplicateLetters(s: string): string {
  const unseenRight = new Array(26).fill(0);
  for (let k = 0; k < s.length; k++) {
    unseenRight[letterIndex(s[k])]++;
  }

  /** 栈底 → 栈顶：答案从左到右 */
  const stack: number[] = [];
  const picked = new Array(26).fill(false);

  for (let k = 0; k < s.length; k++) {
    const cur = letterIndex(s[k]);

    // 当前字符处理完了，右边的世界里少了一个它
    unseenRight[cur]--;

    if (picked[cur]) {
      continue;
    }

    // 栈顶太大、且栈顶后面还能补回来 → 弹出栈顶，晚点再用它
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      const stackTopIsLarger = top > cur;
      const stackTopStillAppearsLater = unseenRight[top] > 0;

      if (!stackTopIsLarger || !stackTopStillAppearsLater) {
        break;
      }

      stack.pop();
      picked[top] = false;
    }

    stack.push(cur);
    picked[cur] = true;
  }

  return stack.map(letterChar).join('');
}
