import { ListNode } from "./ListNode";

function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
    if (slow === fast) {
      let p1 = head;
      let p2 = slow;
      while (p1 !== p2) {
        p1 = p1!.next;
        p2 = p2!.next;
      }
      return p1;
    }
  }
  return null;
}
