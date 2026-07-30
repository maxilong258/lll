function largestAltitude(gain: number[]): number {
  let cur = 0,
    max = 0;
  for (const g of gain) {
    cur += g;
    max = Math.max(max, cur);
  }
  return max;
}
