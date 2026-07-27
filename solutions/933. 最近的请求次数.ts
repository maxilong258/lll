import { MyQueue } from "./MyQueue";

class RecentCounter {
  private queue: MyQueue;

  constructor() {
    this.queue = new MyQueue();
  }

  ping(t: number): number {
    this.queue.enqueue(t);

    // 只要队头过期了，就出队删除
    while (this.queue.peek() !== null && this.queue.peek()! < t - 3000) {
      this.queue.dequeue();
    }

    return this.queue.size();
  }
}

// class RecentCounter {
//   private queue: number[];

//   constructor() {
//     this.queue = [];
//   }

//   ping(t: number): number {
//     this.queue.push(t);
//     // 弹出过期的时间（小于 t - 3000 的记录）
//     while (this.queue[0] < t - 3000) {
//       this.queue.shift();
//     }
//     return this.queue.length;
//   }
// }
