import { ListNode } from "./ListNode";

function oddEvenList(head: ListNode | null): ListNode | null {
    // 边界情况：如果链表为空或只有一个节点，无需处理，直接返回
    if (!head || !head.next) {
      return head;
    }
  
    // 初始化奇数链表和偶数链表的当前指针
    let odd = head;
    let even: ListNode | null = head.next;
  
    // 关键：记录偶数链表的头节点，用于最后拼接
    const evenHead = even;
  
    // 循环条件：确保偶数节点及其下一个节点都存在
    while (even !== null && even.next !== null) {
      // 1. 奇数指针向后跳一步（连接到下一个奇数节点）
      odd.next = even.next;
      odd = even.next;
  
      // 2. 偶数指针向后跳一步（连接到下一个偶数节点）
      even.next = odd.next;
      even = odd.next;
    }
  
    // 3. 遍历结束后，将奇数链表的尾部连接到偶数链表的头部
    odd.next = evenHead;
  
    return head;
  }