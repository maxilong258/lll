import { ListNode } from "./ListNode";

/** 单向链表实现的队列 */
export class MyQueue {
  private head: ListNode | null = null;
  private tail: ListNode | null = null;
  private _size: number = 0;

  /** 入队：链表尾部追加 O(1) */
  enqueue(val: number): void {
    const newNode = new ListNode(val);
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this._size++;
  }

  /** 出队：弹出链表头部 O(1) */
  dequeue(): number | null {
    if (!this.head) return null;
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) {
      this.tail = null;
    }
    this._size--;
    return val;
  }

  /** 查看队头 O(1) */
  peek(): number | null {
    return this.head ? this.head.val : null;
  }

  /** 当前大小 O(1) */
  size(): number {
    return this._size;
  }
}
