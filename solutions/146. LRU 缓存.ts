import { DListNode } from "./DListNode";

class LRUCache {
  private capacity: number;
  private map: Map<number, DListNode>;
  private head: DListNode;
  private tail: DListNode;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.map = new Map();

    // 创建虚拟头节点和虚拟尾节点，并建立连接
    this.head = new DListNode();
    this.tail = new DListNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    const node = this.map.get(key);
    if (!node) {
      return -1;
    }
    // 被访问后，将其移动到链表最前面
    this.moveToHead(node);
    return node.value;
  }

  put(key: number, value: number): void {
    const node = this.map.get(key);

    if (node) {
      // key 存在，更新 value 并移动到最前面
      node.value = value;
      this.moveToHead(node);
    } else {
      // key 不存在，创建新节点
      const newNode = new DListNode(key, value);
      this.map.set(key, newNode);
      this.addToHead(newNode);

      // 如果超出容量，移除最久未使用的元素（即尾节点前一个）
      if (this.map.size > this.capacity) {
        const removedNode = this.removeTail();
        if (removedNode) {
          this.map.delete(removedNode.key);
        }
      }
    }
  }

  // 辅助函数 1：把节点从原链表中断开删除
  private removeNode(node: DListNode): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  // 辅助函数 2：把节点插入到虚拟头节点后面（即链表最前面）
  private addToHead(node: DListNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  // 辅助函数 3：将已有节点移动到表头
  private moveToHead(node: DListNode): void {
    this.removeNode(node);
    this.addToHead(node);
  }

  // 辅助函数 4：移除链表末尾节点（虚拟尾节点的前一个）
  private removeTail(): DListNode | null {
    const res = this.tail.prev;
    if (res === this.head) return null; // 链表为空
    this.removeNode(res!);
    return res;
  }
}
