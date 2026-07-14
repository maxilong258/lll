class MyCircularQueue {
    private queue: number[];
    private front: number;
    private rear: number;
    private capacity: number; // 实际数组大小为 k + 1
  
    constructor(k: number) {
      this.capacity = k + 1;
      this.queue = new Array(this.capacity);
      this.front = 0;
      this.rear = 0;
    }
  
    enQueue(value: number): boolean {
      if (this.isFull()) return false;
      this.queue[this.rear] = value;
      this.rear = (this.rear + 1) % this.capacity; // 循环向后移动
      return true;
    }
  
    deQueue(): boolean {
      if (this.isEmpty()) return false;
      this.front = (this.front + 1) % this.capacity; // 循环向后移动
      return true;
    }
  
    Front(): number {
      if (this.isEmpty()) return -1;
      return this.queue[this.front];
    }
  
    Rear(): number {
      if (this.isEmpty()) return -1;
      // 因为 rear 指向的是下一个插入位置，所以前一个位置才是队尾
      return this.queue[(this.rear - 1 + this.capacity) % this.capacity];
    }
  
    isEmpty(): boolean {
      return this.front === this.rear;
    }
  
    isFull(): boolean {
      return (this.rear + 1) % this.capacity === this.front;
    }
  }