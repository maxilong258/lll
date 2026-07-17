import { ListNode } from "./ListNode";

function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  if (head === null) return null;
  let dummy = new ListNode(0, head);
  let first: any = dummy;
  let second: any = dummy;
  for (let i = 0; i < n + 1; i++) {
    first = first?.next;
  }
  while (first) {
    first = first.next;
    second = second.next;
  }
  second!.next = second!.next?.next ?? null;
  return dummy.next;
}
