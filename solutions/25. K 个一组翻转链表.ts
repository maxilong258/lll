import { ListNode } from "./ListNode";

function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let prev: ListNode | null = null
  let curr: ListNode | null = head
  let next: ListNode | null = null
  let check: ListNode | null = head
  let canProceed: number = 0
  let count: number = 0
  while (canProceed < k && check !== null) {
    canProceed++
    check = check.next
  }
  if (canProceed === k) {
    while (count < k) {
      next = curr!.next
      curr!.next = prev
      prev = curr
      curr = next
      count++
    }
    if (next !== null) {
      head!.next = reverseKGroup(next, k)
    }
    return prev
  } else {
    return head
  }
};
