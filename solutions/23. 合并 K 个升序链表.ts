import { ListNode } from "./ListNode";

function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const res = mergeKListsHandler(0, lists.length - 1);
  return res;

  function mergeKListsHandler(start: number, end: number): ListNode | null {
    if (end - start > 1) {
      let mid = Math.floor(start + (end - start) / 2);
      let left = mergeKListsHandler(start, mid);
      let right = mergeKListsHandler(mid + 1, end);
      return merge2Lists(left, right);
    }
    if (end - start === 1) {
      return merge2Lists(lists[start], lists[end]);
    }
    if (end - start === 0) {
      return lists[start];
    }
    return null;
  }
}
function merge2Lists(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  const res = l1.val < l2.val ? l1 : l2;
  res.next = merge2Lists(res.next, l1.val >= l2.val ? l1 : l2);
  return res;
}
