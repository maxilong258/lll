import { TreeNode } from "./TreeNode.ts";

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
  // 提前用 Map 记录 inorder 中每个值的索引，实现 O(1) 查找
  const valToIndex = new Map<number, number>();
  for (let i = 0; i < inorder.length; i++) {
    valToIndex.set(inorder[i], i);
  }

  // 递归辅助函数
  // inStart, inEnd 表示当前子树在中序序列中的范围 [inStart, inEnd]
  // postStart, postEnd 表示当前子树在后序序列中的范围 [postStart, postEnd]
  function helper(
    inStart: number,
    inEnd: number,
    postStart: number,
    postEnd: number,
  ): TreeNode | null {
    // base case：范围不合法，说明子树为空
    if (inStart > inEnd || postStart > postEnd) {
      return null;
    }

    // 1. 后序遍历的最后一个节点就是当前根节点的值
    const rootVal = postorder[postEnd];
    const root = new TreeNode(rootVal);

    // 2. 获取根节点在中序遍历中的位置
    const rootIndex = valToIndex.get(rootVal)!;

    // 3. 计算左子树的节点数量
    const leftSize = rootIndex - inStart;

    // 4. 递归构造左右子树
    // 左子树的中序范围: [inStart, rootIndex - 1]
    // 左子树的后序范围: [postStart, postStart + leftSize - 1]
    root.left = helper(
      inStart,
      rootIndex - 1,
      postStart,
      postStart + leftSize - 1,
    );

    // 右子树的中序范围: [rootIndex + 1, inEnd]
    // 右子树的后序范围: [postStart + leftSize, postEnd - 1]
    root.right = helper(
      rootIndex + 1,
      inEnd,
      postStart + leftSize,
      postEnd - 1,
    );

    return root;
  }

  return helper(0, inorder.length - 1, 0, postorder.length - 1);
}
