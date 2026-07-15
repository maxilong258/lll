function reformatDate(date: string): string {
  const [day, month, year] = date.split(" ");

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // 月份转换
  const m = String(months.indexOf(month) + 1).padStart(2, "0");
  // 天数转换：长度为 3 说明是单数（如 "1st" -> "01"），否则取前两位
  const d = day.length === 3 ? "0" + day[0] : day.substring(0, 2);

  return `${year}-${m}-${d}`;
}
