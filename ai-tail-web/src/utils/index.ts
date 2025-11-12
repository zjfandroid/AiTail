export function convertNumber(inputStr?: string, decimalPlaces = 4) {
  // 将输入字符串转换为数值
  const num = Number(inputStr);

  // 判断是否为有效数字
  if (isNaN(num) || !isFinite(num)) {
    return '0';
  }

  // 处理保留小数位数的参数
  const decimals = Number.isInteger(decimalPlaces) && decimalPlaces >= 0
    ? decimalPlaces
    : 4;

  let unit = '';
  let divisor = 1;

  // 判断数值范围并确定单位
  if (num >= 1e7) {
    unit = 'M';
    divisor = 1e6;
  } else if (num >= 1e4) {
    unit = 'K';
    divisor = 1e3;
  }

  // 计算转换后的值并保留小数
  const convertedValue = num / divisor;
  const formattedValue = convertedValue.toFixed(decimals);

  // 拼接单位并返回结果
  return unit ? `${formattedValue}${unit}` : formattedValue;
}

export function numberToLetter(num: number): string | null {
  if (Number.isInteger(num) && num >= 0 && num <= 25) {
    return String.fromCharCode(65 + num); // 'A' 的 ASCII 码是 65
  }
  return null;
}

export function calculatePercentage(str: string, num: number): number {
  const a = Number(str);
  if (isNaN(a)) {
    return 0;
  }
  let result = (a / num) * 100;
  if (result > 0 && result < 1) {
    result = 1
  }
  return result
}

// 给数组对象除重
export function uniqueArrayByKey<T>(array: T[], key: keyof T): T[] {
  const seen = new Set();
  return array.filter(item => {
    const value = item[key];
    if (seen.has(value)) {
      return false;
    } else {
      seen.add(value);
      return true;
    }
  });
}

// 保留小数点后n位, 输入也有可能是string类型
export function toFixed(value: number | string, decimalPlaces = 4): string {
  if(value === null || value === undefined) return '0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(num)) {
    return '0';
  }
  if (num === 0) {
    return '0'
  }
  return num.toFixed(decimalPlaces);
}

// 获取url参数
export function getUrlParam(name: string): string | null {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  // substr 被弃用了，换掉
  const r = window.location.search.substring(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}

// 根据时间日期计算距离当前日期的间隔
// 小于1天返回几小时前，大于1天小于1年返回几天前，大于1年返回几年前
export function timeAgo(date: Date | string): string {
  const now = new Date();
  const pastDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minutes ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hours ago`;
  } else if (diffInSeconds < 31536000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} days ago`;
  } else {
    const years = Math.floor(diffInSeconds / 31536000);
    return `${years} years ago`;
  }
}

export function trimSpecialChars(str?: string) {
  // 替换开头和结尾的特殊字符（非字母数字）
  return str?.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '') || '';
}