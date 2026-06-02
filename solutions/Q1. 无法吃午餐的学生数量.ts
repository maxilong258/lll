function countStudents(students: number[], sandwiches: number[]): number {
  // 1. 统计喜欢 0 和 1 的学生总数
  let count0 = 0;
  let count1 = 0;
  for (const s of students) {
    if (s === 0) count0++;
    else count1++;
  }

  // 2. 依次看三明治能不能被消掉
  for (const sandwich of sandwiches) {
    if (sandwich === 0) {
      if (count0 > 0) {
        count0--; // 有喜欢0的，拿走
      } else {
        break; // 栈顶是0，但已经没有学生喜欢0了，卡死！
      }
    } else {
      if (count1 > 0) {
        count1--; // 有喜欢1的，拿走
      } else {
        break; // 栈顶是1，但已经没有学生喜欢1了，卡死！
      }
    }
  }

  // 3. 返回剩下没吃饭的人数
  return count0 + count1;
}
