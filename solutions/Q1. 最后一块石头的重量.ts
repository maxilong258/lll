import { MyMaxHeap } from "./MyMaxHeap";

function lastStoneWeight(stones: number[]): number {
  const heap = new MyMaxHeap(stones);

  while (heap.size() >= 2) {
    const y = heap.pop();
    const x = heap.pop();
    if (x !== y) {
      heap.push(y - x);
    }
  }

  return heap.size() === 0 ? 0 : heap.pop();
}
