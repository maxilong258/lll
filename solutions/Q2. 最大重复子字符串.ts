function maxRepeating(sequence: string, word: string): number {
  let k = 0;
  let repeatWord = word;

  // 只要叠加后的 repeatWord 依然是 sequence 的子串，就继续叠加
  while (sequence.includes(repeatWord)) {
    k++;
    repeatWord += word;
  }

  return k;
}
