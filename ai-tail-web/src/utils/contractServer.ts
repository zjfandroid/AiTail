import { toFixed } from ".";

const getTotalEquity = (vaultData: any) => {
  if(!vaultData) return 0;
  return (Number(vaultData.totalValue) || 0);
}

// 计算用户vault总的资产
export function getVaultValue(userVault: any, vaultData: any)  {
  if(!userVault || !vaultData) return 0;
  const totalEquity = getTotalEquity(vaultData);
  if(totalEquity === 0) return 0;
  if(!vaultData.totalShares && Number(vaultData.totalShares) === 0) return 0;
  return (totalEquity * Number(userVault.vaultShares)) / Number(vaultData.totalShares);
}

// 计算userProfit
export function getUserProfit(userVault: any) {
  const result = (Number(userVault.depositorEquity) || 0) - ((Number(userVault.cumulativeProfitShareAmount) || 0) + (Number(userVault.netDeposits) || 0));
  return result > 0 ? result : 0;
}

// 计算管理费的百分比
export function getManagementFeePercentage(vaultData: any) {
  return vaultData?.profitShare ? Number(toFixed((Number(vaultData.profitShare) / 10000), 2)) : 0;
}

const getManagementFee = (vaultData: any) => {
  const ManagementFeePercentage = getManagementFeePercentage(vaultData);
  return ManagementFeePercentage / 100;
}

// 获取合约vault balance
export  function getContractVaultBalance(userVault: any, vaultData: any) {
  const vaultValue = getVaultValue(userVault, vaultData);
  const userProfit = getUserProfit(userVault);
  const managementFee = getManagementFee(vaultData);
  return vaultValue - userProfit * managementFee;
}

// 获取收益
export function getEarnings(userVault: any, vaultData: any) {
  const userProfit = getUserProfit(userVault);
  const managementFee = getManagementFee(vaultData);
  return userProfit * (1 - managementFee);
}

// 获取withdraw request amount
export function getWithdrawRequestAmount(userVault: any, vaultData?: any) {
  if(!userVault || !vaultData) return 0;
  const totalEquity = getTotalEquity(vaultData);
  if(totalEquity === 0) return 0;
  if(!userVault?.vaultShares && Number(userVault?.vaultShares) === 0) return 0;
  return (totalEquity * Number(userVault.lastWithdrawRequestShares)) / Number(userVault.vaultShares);
}

//计算年化收益
export function getAnnualizedReturn(annualizedReturn: any) {
  return annualizedReturn ? Number(toFixed((annualizedReturn * 100), 2)) : 0;
}