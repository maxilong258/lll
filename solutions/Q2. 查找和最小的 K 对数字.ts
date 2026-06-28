function kSmallestPairs(nums1: number[], nums2: number[], k: number): number[][] {
  const res: number[][] = [];
  const n = nums1.length;
  const m = nums2.length;
  if (n === 0 || m === 0 || k === 0) return res;

  const heap = new MyMinHeap();
  // 堆只存 sum，(i, j) 由业务层维护
  const indexMap = new Map<number, [number, number][]>();

  const pushPair = (i: number, j: number) => {
    const sum = nums1[i] + nums2[j];
    if (!indexMap.has(sum)) indexMap.set(sum, []);
    indexMap.get(sum)!.push([i, j]);
    heap.push(sum);
  };

  const popPair = (): [number, number] => {
    const sum = heap.pop();
    const indices = indexMap.get(sum)!;
    const pair = indices.shift()!;
    if (indices.length === 0) indexMap.delete(sum);
    return pair;
  };

  for (let i = 0; i < Math.min(k, n); i++) {
    pushPair(i, 0);
  }

  while (res.length < k && heap.size() > 0) {
    const [i, j] = popPair();
    res.push([nums1[i], nums2[j]]);
    if (j + 1 < m) {
      pushPair(i, j + 1);
    }
  }

  return res;
}

class MyMinHeap {
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
      if (this.data[index] >= this.data[parentIndex]) break;
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  private shiftDown(index: number): void {
    const len = this.data.length;
    while (index * 2 + 1 < len) {
      let minChildIndex = index * 2 + 1;
      const rightChildIndex = index * 2 + 2;

      if (
        rightChildIndex < len &&
        this.data[rightChildIndex] < this.data[minChildIndex]
      ) {
        minChildIndex = rightChildIndex;
      }

      if (this.data[index] <= this.data[minChildIndex]) break;
      this.swap(index, minChildIndex);
      index = minChildIndex;
    }
  }

  private swap(i: number, j: number): void {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }
}
