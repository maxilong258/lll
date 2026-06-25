class MyQueue {
    // 定义输入栈和输出栈
    private stackIn: number[];
    private stackOut: number[];

    constructor() {
        this.stackIn = [];
        this.stackOut = [];
    }

    // 入队：直接放进输入栈
    push(x: number): void {
        this.stackIn.push(x);
    }

    // 出队：先确保输出栈有数据，再弹出栈顶
    pop(): number {
        this.dumpstackIn();
        return this.stackOut.pop()!;
    }

    // 获取队头元素：先确保输出栈有数据，再查看栈顶
    peek(): number {
        this.dumpstackIn();
        return this.stackOut[this.stackOut.length - 1];
    }

    // 判空：两个栈都为空时，队列才为空
    empty(): boolean {
        return this.stackIn.length === 0 && this.stackOut.length === 0;
    }

    /**
     * 辅助函数：如果输出栈为空，则将输入栈的所有元素“倒腾”到输出栈中
     */
    private dumpstackIn(): void {
        // 如果输出栈不为空，绝对不能倒腾，否则会打乱顺序
        if (this.stackOut.length > 0) return;

        // 只有输出栈为空时，才把输入栈的数据全部倒进去
        while (this.stackIn.length > 0) {
            this.stackOut.push(this.stackIn.pop()!);
        }
    }
}