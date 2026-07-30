export class DListNode {
  key: number;
  value: number;
  prev: DListNode | null = null;
  next: DListNode | null = null;

  constructor(key: number = 0, value: number = 0) {
    this.key = key;
    this.value = value;
  }
}
