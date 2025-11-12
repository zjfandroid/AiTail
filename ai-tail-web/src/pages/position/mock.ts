function generateIncreasingData(num: number): Array<{ time: string; data: number }> {
  const result = [];
  const baseDate = new Date('2025-01-01');

  // 基础值，用于控制起始值和增长幅度
  const baseValue1 = 10000;  // data1起始值
  const increment1 = 50;   // data1每日增长量

  for (let i = 0; i < num; i++) {
    // 计算日期（从2025-01-01开始递增）
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    // 生成递增数据
    const data = Math.round(baseValue1 + increment1 * i + Math.random() * 2); // 基础增长+小幅随机波动

    result.push({
      time: formattedDate,
      data: data,
    });
  }

  return result;
}
export default {
  itemList: [
    {
      label: 'my Assets',
      value: 0
    },
    {
      label: 'Claimable Rewards',
      value: 0
    },
    {
      label: 'my Desposited',
      value: 0
    },
    {
      label: 'ROI',
      value: 0
    },
  ],
  generateIncreasingData
}