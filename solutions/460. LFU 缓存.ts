class MyNode {
    key: number;
    value: number;
    freq: number;
    prev: MyNode | null = null;
    next: MyNode | null = null;

    constructor(key: number, value: number) {
        this.key = key;
        this.value = value;
        this.freq = 1; // 新节点初始频率为 1
    }
}

// 辅助类：每个频率对应一个双向链表
class MyDoublyLinkedList {
    head: MyNode;
    tail: MyNode;
    size: number = 0;

    constructor() {
        this.head = new MyNode(-1, -1);
        this.tail = new MyNode(-1, -1);
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    /**
     * 辅助函数：插入节点到表头（最新访问/最新添加）
     */
    addFirst(node: MyNode): void {
        node.next = this.head.next;
        node.prev = this.head;
        this.head.next!.prev = node;
        this.head.next = node;
        this.size++;
    }

    /**
     * 辅助函数：从链表中移除指定节点
     */
    remove(node: MyNode): void {
        node.prev!.next = node.next;
        node.next!.prev = node.prev;
        this.size--;
    }

    /**
     * 辅助函数：移除链表末尾节点（即该频率下最久未使用的节点）
     */
    removeLast(): MyNode | null {
        if (this.size === 0) return null;
        const lastNode = this.tail.prev!;
        this.remove(lastNode);
        return lastNode;
    }
}

class LFUCache {
    private capacity: number;
    private minFreq: number = 0;
    private keyToMyNode: Map<number, MyNode> = new Map();
    private freqToDLList: Map<number, MyDoublyLinkedList> = new Map();

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    /**
     * 获取键对应的值：如果存在，增加访问频率并移动节点，返回 key 的 value；否则返回 -1
     */
    get(key: number): number {
        const node = this.keyToMyNode.get(key);
        if (!node) return -1;

        // 节点被访问，提升其频率
        this.increaseFreq(node);
        return node.value;
    }

    /**
     * 插入/更新键值对：如果已存在则更新值并增加频率；如果不存在且已满则先淘汰最低频率中最久未使用的节点，再插入新节点
     */
    put(key: number, value: number): void {
        if (this.capacity === 0) return;

        const node = this.keyToMyNode.get(key);

        if (node) {
            // key 已存在：更新 value 并增加频率
            node.value = value;
            this.increaseFreq(node);
        } else {
            // key 不存在：如果满了，先淘汰最低频率中最旧的节点
            if (this.keyToMyNode.size >= this.capacity) {
                this.removeMinFreqMyNode();
            }

            // 创建新节点并加入
            const newNode = new MyNode(key, value);
            this.keyToMyNode.set(key, newNode);

            // 新节点频率为 1，加入 freq = 1 的链表中
            let list = this.freqToDLList.get(1);
            if (!list) {
                list = new MyDoublyLinkedList();
                this.freqToDLList.set(1, list);
            }
            list.addFirst(newNode);

            // 新插入节点的频率一定为 1，更新 minFreq
            this.minFreq = 1;
        }
    }

    /**
     * 核心辅助函数：将节点的访问频率 +1，并将其移动到对应的新频率链表中
     */
    private increaseFreq(node: MyNode): void {
        const oldFreq = node.freq;
        const oldList = this.freqToDLList.get(oldFreq)!;

        // 1. 从旧频率链表中移除
        oldList.remove(node);

        // 2. 如果旧链表空了，且旧频率刚好是 minFreq，更新 minFreq
        if (oldList.size === 0 && this.minFreq === oldFreq) {
            this.minFreq++;
        }

        // 3. 增加节点频率
        node.freq++;

        // 4. 加入新频率链表表头
        let newList = this.freqToDLList.get(node.freq);
        if (!newList) {
            newList = new MyDoublyLinkedList();
            this.freqToDLList.set(node.freq, newList);
        }
        newList.addFirst(node);
    }

    /**
     * 核心辅助函数：淘汰 minFreq 链表末尾（最久未使用）的节点，并从 key 映射表中删除
     */
    private removeMinFreqMyNode(): void {
        const minList = this.freqToDLList.get(this.minFreq)!;
        const deletedNode = minList.removeLast();
        if (deletedNode) {
            this.keyToMyNode.delete(deletedNode.key);
        }
    }
}