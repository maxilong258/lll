import { ListNode } from "./ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}

// function reverseList(head: ListNode | null): ListNode | null {
//   if (head === null || head.next === null) {
//     return head;
//   }
//   const newHead = reverseList(head.next);
//   head.next.next = head;
//   head.next = null;
//   return newHead;
// }
