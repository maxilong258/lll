import { ListNode } from "./ListNode";

function sortList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;
  let runner = head.next;
  let chaser = head;
  while (runner !== null && runner.next !== null) {
    runner = runner.next.next!;
    chaser = chaser.next!;
  }
  let temp = chaser.next;
  chaser.next = null;
  let left = sortList(head);
  let right = sortList(temp);
  let h = new ListNode();
  const res = h;
  while (left !== null && right !== null) {
    if (left.val < right.val) {
      h.next = left;
      left = left.next;
    } else {
      h.next = right;
      right = right.next;
    }
    h = h.next;
  }
  h.next = left !== null ? left : right;
  return res.next;
}
