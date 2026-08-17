import { ListNode } from "./listNode";

function nextLargerNodes(head: ListNode | null): number[] {
  // 先把链表转成数组
  const nums: number[] = [];

  let cur = head;

  while (cur) {
    nums.push(cur.val);
    cur = cur.next;
  }

  const answer = new Array(nums.length).fill(0);

  // 存下标
  const stack: number[] = [];

  for (let i = 0; i < nums.length; i++) {
    // 当前数字比栈顶对应的数字大
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const index = stack.pop()!;

      // 当前数字就是这个节点的下一个更大节点
      answer[index] = nums[i];
    }

    // 当前节点暂时还没找到更大的
    stack.push(i);
  }

  return answer;
}
