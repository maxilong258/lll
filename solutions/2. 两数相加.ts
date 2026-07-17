import { ListNode } from "./ListNode";

function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummy = new ListNode();
  let curr = dummy;
  let carry = 0;
  while (l1 || l2 || carry) {
    let val = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + carry;
    carry = Math.floor(val / 10);
    curr.next = new ListNode(val % 10);
    curr = curr.next;
    l1 ? (l1 = l1.next) : null;
    l2 ? (l2 = l2.next) : null;
  }
  return dummy.next;
}
