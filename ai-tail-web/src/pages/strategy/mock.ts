function generateIncreasingData(num: number): Array<{ time: string; data1: number; data2: number; data3: number }> {
  const result = [];
  const baseDate = new Date('2025-01-01');

  // 基础值，用于控制起始值和增长幅度
  const baseValue1 = 10;  // data1起始值
  const baseValue2 = 12;  // data2起始值
  const baseValue3 = 5.5; // data3起始值
  const increment1 = 2;   // data1每日增长量
  const increment2 = 1.5; // data2每日增长量
  const increment3 = 0.3; // data3每日增长量

  for (let i = 0; i < num; i++) {
    // 计算日期（从2025-01-01开始递增）
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    const formattedDate = date.toISOString().split('T')[0];

    // 生成递增数据
    const data1 = Math.round(baseValue1 + increment1 * i + Math.random() * 2); // 基础增长+小幅随机波动
    const data2 = Math.round(baseValue2 + increment2 * i + Math.random() * 2);
    const data3 = parseFloat((baseValue3 + increment3 * i + Math.random() * 0.5).toFixed(1));

    result.push({
      time: formattedDate,
      data1: data1,
      data2: data2,
      data3: data3
    });
  }

  return result;
}
export default {
  itemList: [
    {
      label: 'Current Share Price',
      value: '$1.201'
    },
    {
      label: 'Cumulative Return',
      value: '20.077%'
    },
    {
      label: 'Annualized Return',
      value: '44.733%'
    },
    {
      label: 'Sharpe Ratio',
      value: '6.27'
    },
    {
      label: 'Max Drawdown',
      value: '4.087%'
    }
  ],
  generateIncreasingData,
  vaultList: [
    {
      name: 'Vault A',
      tvl: '2.5M',
      total: '3M',
      value: '2578236.11',
      id: 1,
    },
    {
      name: 'Vault B',
      tvl: '2.86M',
      total: '3M',
      value: '2865612.78',
      id: 2,
    },
    {
      name: 'Vault C',
      tvl: '1.01M',
      total: '3M',
      value: '1012345.67',
      id: 3,
    },
    {
      name: 'Vault D',
      tvl: '622.3K',
      total: '3M',
      value: '622345.89',
      id: 4,
    },
    {
      name: 'Vault E',
      tvl: '349.2K',
      total: '3M',
      value: '349234.56',
      id: 5,
    }
  ]
}