import { ListNode } from "./ListNode";

// function swapPairs(head: ListNode | null): ListNode | null {
//   let first = head;
//   let second = head?.next;
//   while (first && second) {
//     let temp = first.val;
//     first.val = second.val;
//     second.val = temp;
//     first = first.next?.next;
//     second = second.next?.next;
//   }
//   return head;
// }

function swapPairs(head: ListNode | null): ListNode | null {
  const dummy = new ListNode(0, head);
  let prev: ListNode = dummy;
  while (prev.next && prev.next.next) {
    const first = prev.next as ListNode;
    const second = first.next as ListNode;
    first.next = second.next;
    second.next = first;
    prev.next = second;
    prev = first;
  }
  return dummy.next;
}
