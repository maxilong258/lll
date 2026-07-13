import { MyMinHeap } from "./MyMinHeap";

// function maxEvents(events: number[][]): number {
//   events.sort((a, b) => a[1] - b[1]);
//   const set = new Set<number>();
//   for (const event of events) {
//     for (let i = event[0]; i <= event[1]; i++) {
//       if (!set.has(i)) {
//         set.add(i);
//         break;
//       }
//     }
//   }
//   return set.size;
// }

function maxEvents(events: number[][]): number {
  let maxDay = 0;
  for (const e of events) {
    maxDay = Math.max(maxDay, e[1]);
  }
  events.sort((a, b) => a[0] - b[0]);

  const pq = new MyMinHeap();
  const n = events.length;
  let ans = 0;
  for (let i = 1, j = 0; i <= maxDay; i++) {
    // 添加所有在当前天开始的事件
    while (j < n && events[j][0] <= i) {
      pq.push(events[j][1]);
      j++;
    }
    // 移除所有已经结束的事件
    while (pq.size() > 0 && pq.peek() < i) {
      pq.pop();
    }
    // 选择结束时间最早的事件
    if (pq.size() > 0) {
      pq.pop();
      ans++;
    }
  }
  return ans;
}
