function finalPrices(prices: number[]): number[] {
  const res: number[] = [...prices];
  const stack: number[] = [];

  for (let i = 0; i < prices.length; i++) {
    while (
      stack.length > 0 &&
      prices[stack[stack.length - 1]] >= prices[i]
    ) {
      const index = stack.pop()!;
      res[index] = prices[index] - prices[i];
    }
    stack.push(i);
  }

  return res;
}
