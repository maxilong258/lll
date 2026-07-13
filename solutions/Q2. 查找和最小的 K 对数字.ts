import { MyMinHeap } from "./MyMinHeap";

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
