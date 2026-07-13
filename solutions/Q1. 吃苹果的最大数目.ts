import { MyMinHeap } from "./MyMinHeap";

function eatenApples(apples: number[], days: number[]): number {
  const n = apples.length;
  let ans = 0;

  // 1. 实例化你原本的堆（存的是过期天数 rotDay）
  const heap = new MyMinHeap();
  // 2. 外面的 Map 依然存 [过期天数 -> 该天过期的苹果总数]
  const appleMap = new Map<number, number>();

  let i = 0;
  while (i < n || heap.size() > 0) {
    // 1. 如果在 n 天内，且今天长了苹果，无条件累加数量并入堆
    if (i < n && apples[i] > 0) {
      const rotDay = i + days[i];
      appleMap.set(rotDay, (appleMap.get(rotDay) || 0) + apples[i]);
      // 不管以前有没有，只要有新苹果在 rotDay 过期，就把这个时间戳压入堆
      heap.push(rotDay);
    }

    // 2. 核心修正：统一在这里清除【已过期】或【已被吃光】的堆顶
    while (heap.size() > 0) {
      const topRotDay = heap.peek();
      // 如果堆顶的时间已经过期，或者该天数对应的苹果总数已经是 0 了
      if (
        topRotDay <= i ||
        (appleMap.has(topRotDay) && appleMap.get(topRotDay)! <= 0)
      ) {
        heap.pop(); // 弹出无用数据
      } else {
        break;
      }
    }

    // 3. 吃苹果：此时堆顶一定是有效且最早过期的那一天
    if (heap.size() > 0) {
      const topRotDay = heap.peek();

      // 吃掉一个
      const currentCount = appleMap.get(topRotDay)!;
      appleMap.set(topRotDay, currentCount - 1);
      ans++;

      // 注意：这里不要盲目 pop！让上面的 while 循环在下一轮自动判断和清除
    }

    i++; // 进入下一天
  }

  return ans;
}

/**
 * 堆：存「过期日期」，最小堆找最早过期
 * Map：存「每个过期日还剩几个苹果」
 * 过期判断：今天 i >= rotDay 就不能吃了；堆顶无效就 pop，直到堆顶有效再吃
 * 这是典型的 贪心 + 最小堆：优先处理 deadline 最早的任务，和「任务调度」里按截止时间排序是同一思路。
 */
