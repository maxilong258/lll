import { ListNode } from "./ListNode";

function insertionSortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;

  // 哨兵节点，简化头部的插入操作
  const dummy = new ListNode(0, head);

  // lastSorted 指向已排序链表的最后一个节点
  let lastSorted = head;
  // curr 是当前等待插入排序的节点
  let curr: ListNode | null = head.next;

  while (curr !== null) {
    if (lastSorted.val <= curr.val) {
      // 情况1：当前节点大于等于已排序区末尾，直接延长已排序区域
      lastSorted = lastSorted.next!;
    } else {
      // 情况2：需要将 curr 插入到前面的合适位置
      let prev = dummy;
      // 从头寻找插入位置（找到第一个大于 curr.val 的节点的前驱）
      while (prev.next!.val <= curr.val) {
        prev = prev.next!;
      }

      // 调整指针：断开 curr，插入到 prev 和 prev.next 之间
      lastSorted.next = curr.next;
      curr.next = prev.next;
      prev.next = curr;
    }
    // 处理下一个未排序节点
    curr = lastSorted.next;
  }

  return dummy.next;
}
