/**
 * 思路：单调栈模拟调用栈 + 记录「上一次事件处理到哪一刻」prev
 *
 * - start T：若在子函数开始前，栈顶是当前正在独占运行的函数，
 *   则从 prev 到 T-1 这段时间都属于栈顶（因为子函数在时间 T 的「起点」才真正开始）。
 * - end T：当前函数在时间 T 的「末尾」结束，这一段是 [prev, T] 闭上区间，
 *   长度为 T - prev + 1；结束后「下一刻」从 T+1 算起。
 */
function exclusiveTime(n: number, logs: string[]): number[] {
  const ans = new Array(n).fill(0);
  const stack: number[] = [];
  let prev = 0;

  for (const log of logs) {
    const parts = log.split(":");
    const id = Number(parts[0]);
    const isStart = parts[1] === "start";
    const t = Number(parts[2]);

    if (isStart) {
      if (stack.length > 0) {
        ans[stack[stack.length - 1]] += t - prev;
      }
      stack.push(id);
      prev = t;
    } else {
      ans[id] += t - prev + 1;
      stack.pop();
      prev = t + 1;
    }
  }

  return ans;
}
