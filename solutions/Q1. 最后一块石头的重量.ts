function lastStoneWeight(stones: number[]): number {
  // 💡 改用我们自己重命名后的 MyMaxHeap
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

// 🚀 类名改为 MyMaxHeap，防止和 LeetCode 冲突
class MyMaxHeap {
  private data: number[] = [];

  constructor(arr: number[] = []) {
    this.data = [...arr];
    for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) {
      this.shiftDown(i);
    }
  }

  size(): number {
    return this.data.length;
  }

  push(val: number): void {
    this.data.push(val);
    this.shiftUp(this.data.length - 1);
  }

  pop(): number {
    if (this.size() === 0) return 0;
    const top = this.data[0];
    const bottom = this.data.pop()!;
    if (this.size() > 0) {
      this.data[0] = bottom;
      this.shiftDown(0);
    }
    return top;
  }

  private shiftUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] <= this.data[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private shiftDown(index: number): void {
    const len = this.data.length;
    while (index * 2 + 1 < len) {
      let maxChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;

      if (
        rightChildIndex < len &&
        this.data[rightChildIndex] > this.data[maxChildIndex]
      ) {
        maxChildIndex = rightChildIndex;
      }

      if (this.data[index] >= this.data[maxChildIndex]) break;
      this.swap(index, maxChildIndex);
      index = maxChildIndex;
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
}
