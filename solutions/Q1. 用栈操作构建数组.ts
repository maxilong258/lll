function buildArray(target: number[], _n: number): string[] {
  const ops: string[] = [];
  let next = 1;
  for (const t of target) {
    while (next < t) {
      ops.push("Push", "Pop");
      next++;
    }
    ops.push("Push");
    next++;
  }
  return ops;
}