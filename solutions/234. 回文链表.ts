import { ListNode } from "./ListNode";

function isPalindrome(head: ListNode | null): boolean {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow!.next;
    fast = fast.next.next;
  }
  let prev: ListNode | null = null;
  let current: ListNode | null = slow;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current!;
    current = next;
  }
  let p1: ListNode | null = head;
  let p2: ListNode | null = prev;
  while (p2) {
    if (p1?.val !== p2.val) {
      return false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
}
