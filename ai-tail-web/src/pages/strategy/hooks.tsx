import vaultService from "@/service/vault"
import { VersionedTransaction } from "@solana/web3.js"; // 假设使用 Solana 库
import {
  useWallet,
} from '@ant-design/web3-solana';
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useRef, useState } from "react";
import Config from "@/utils/config";
import { message } from "antd";
import { getContractVaultBalance, getEarnings, getUserProfit, getVaultValue, getWithdrawRequestAmount } from "@/utils/contractServer";


export interface TokenConfig {
  mint: PublicKey;
  tokenProgram?: PublicKey; // 可选，默认自动检测
}


interface IUseWeb3 {
  vaultAddress: string
  accountAddress: string
  data?: any
}

// USDC 主网合约地址
const USDC_MINT_ADDRESS = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

const useWeb3 = (props: IUseWeb3) => {
  const { vaultAddress, accountAddress, data } = props
  const { connected, signTransaction, publicKey } = useWallet();
  const [balance, setBalance] = useState(0);
  const [usdcBalance, setUsdCBalance] = useState(0);
  const [userVault, setUserVault] = useState<any>(null);
  const [vaultStatics, setVaultStatics] = useState<any>(null);
   const [withdrawRequestValue, setWithdrawRequestValue] = useState(0);

  const [earn, setEarn] = useState(0);
  const timer = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const [uuid, setUuid] = useState<string>('');

  const connection = new Connection((Config.RPC ?? ""), { wsEndpoint: (Config.RPC_WS_URL ?? ""), commitment: 'confirmed' })

  // 解析函数
  async function parseBase64ToTxn(base64String: string) {
    // 1. 解码 Base64 到 Buffer 或 Uint8Array
    const decodedBuffer: any = Buffer.from(base64String, "base64");
    // 或浏览器环境（无 Buffer）：
    // const decodedUint8 = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));

    // 2. 反序列化为 VersionedTransaction
    const transaction = VersionedTransaction.deserialize(decodedBuffer);
    return transaction;
  }
  // 处理存款
  const handleDeposit = async (amount: number) => {
    if (!connected) {
      console.error('Wallet not connected');
      return;
    }
    if (!vaultAddress || !accountAddress) {
      console.error('Vault address or account address is not provided')
      return
    }
    try {
      const amountInSmallestUnit = Math.round(amount * 10 ** Number(6));
      if (isNaN(amountInSmallestUnit)) {
        throw new Error('Invalid amount value');
      }
      const req = {
        amount: amountInSmallestUnit,
        authority: accountAddress,
        vaultAddress: vaultAddress,
      }
      const res: any = await vaultService.genDepositTx(req)
      if (res?.data) {
        // 解析交易数据
        setUuid(res?.data?.uuid || '')
        const result = await parseBase64ToTxn(res?.data?.tx);
        console.log(result)
        // 签名
        const signData = await sign(result)
        // 发送交易
        await sendTransaction(signData, res?.data?.uuid, () => {
          message.success('Transaction submitted, please check the result later.');
        }, (error) => {
          message.error('Transaction failed!');
          console.error('Transaction failed:', error);
        });
        getVaultDepositor() // 更新余额
        fetchUSDCBalance() // 更新 USDC 余额
      }
    } catch (error) {
      console.log('交易失败', error)
    }

  }

  // 申请取款
  const handleWithdrawRequest = async (amount: number) => {
    if (!connected) {
      console.error('Wallet not connected');
      return;
    }
    if (!vaultAddress || !accountAddress) {
      console.error('Vault address or account address is not provided')
      return
    }
    try {
      const amountInSmallestUnit = Math.round(amount * 10 ** Number(6));
      if (isNaN(amountInSmallestUnit)) {
        throw new Error('Invalid amount value');
      }
      const req = {
        amount: amountInSmallestUnit,
        authority: accountAddress,
        vaultAddress: vaultAddress,
      }
      const res: any = await vaultService.genRequestWithdrawTx(req)
      if (res?.data) {
        // 解析交易数据
        setUuid(res?.data?.uuid || '')
        const result = await parseBase64ToTxn(res?.data?.tx);
        console.log(result)
        // 签名
        const signData = await sign(result)
        // 发送交易
        await sendTransaction(signData, res?.data?.uuid, () => {
          message.success('Your withdrawal request has been successfully processed. Please wait 1-2 minutes before attempting another withdrawal.');
          getVaultDepositor() // 更新余额
        }, (error) => {
          message.error('Transaction failed!');
          console.error('Transaction failed:', error);
        });
      }
    } catch (error) {
      console.log('交易失败', error)
    }
  }

  // 取款
  const handleWithdraw = async () => {
    if (!connected) {
      console.error('Wallet not connected');
      return;
    }
    if (!vaultAddress || !accountAddress) {
      console.error('Vault address or account address is not provided')
      return
    }
    try {
      const req = {
        authority: accountAddress,
        vaultAddress: vaultAddress,
      }
      const res: any = await vaultService.genWithdrawTx(req)
      if (res?.data) {
        // 解析交易数据
        setUuid(res?.data?.uuid || '')
        const result = await parseBase64ToTxn(res?.data?.tx);
        console.log(result)
        // 签名
        const signData = await sign(result)
        // 发送交易
        await sendTransaction(signData, res?.data?.uuid, () => {
          message.success('Transaction submitted, please check the result later.');
          getVaultDepositor() // 更新余额
          fetchUSDCBalance() // 更新 USDC 余额
        }, (error) => {
          message.error('Transaction failed!');
          console.error('Transaction failed:', error);
        });
      }
    } catch (error) {
      console.log('交易失败', error)
    }
  }

  const sign = async (data: any) => {
    if (!connected) {
      console.error('Wallet not connected');
      return;
    }
    if (!data) {
      console.error('Data is not provided')
      return
    }
    try {
      // 1. 检查交易是否需要额外签名（如 feePayer）
      if (!data.message.header.numRequiredSignatures) {
        throw new Error("交易未包含必要签名");
      }
      const signature = await signTransaction?.(data);
      return signature;
    }
    catch (error) {
      console.error("签名失败:", error);
      throw error; // 重新抛出错误以便后续处理
    }
  }

  const sendTransaction = async (transaction: any, uuid: string, successCallback: () => void, errorCallback: (error: any) => void) => {
    if (!connected) {
      console.error('Wallet not connected');
      return;
    }
    if (!transaction) {
      console.error('Transaction is not provided')
      return
    }
    try {
      const txid = await connection.sendTransaction(transaction);
      // 发送交易到 Solana 网络
      // 4. 确认交易
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

      // 等待交易确认
      const confirmation = await connection.confirmTransaction({
        signature: txid,
        blockhash,
        lastValidBlockHeight,
      }, "confirmed"); // "confirmed" | "finalized"
      console.log("交易上链成功，区块:", confirmation);
      console.log('交易 ID:', txid);
      successCallback();
      sendTxHistory(uuid, txid) // 发送交易历史
    } catch (error) {
      errorCallback(error);
      console.error("交易失败:", error);
    }
  }

  const getVaultDepositor = async () => {

    if (!vaultAddress || !accountAddress) {
      console.error('Vault address or account address is not provided')
      return
    }
    try {
      const req = {
        vaultAddress: vaultAddress,
        authority: accountAddress,
      }
      const res: any = await vaultService.getVaultDepositor(req)
      const res1: any = await vaultService.getLatestRecord(vaultAddress);
      if (res?.data) {
        const vaultValue = getVaultValue(res.data, data);
        const userProfit = getUserProfit(res.data);
        const userClaimableAmount = getContractVaultBalance(res.data, data);
        const earn = getEarnings(res?.data, data);
        const withdrawRequestVal = getWithdrawRequestAmount(res?.data, data);
        setWithdrawRequestValue(withdrawRequestVal);
        setEarn(earn);
        setBalance(userClaimableAmount);
        setUserVault(res?.data)
        setVaultStatics(res1?.data)
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        if (timer.current) {
          timerRef.current = setTimeout(() => {
            getVaultDepositor() // 定时更新余额
          }, timer.current)
        }
      }
    } catch (error) {
      console.log('获取余额失败', error)
    }
  }

  const fetchUSDCBalance = async () => {
    if (!publicKey || !connection) {
      return;
    }

    try {

      // 获取 USDC 代币账户
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
        publicKey,
        { mint: new PublicKey(USDC_MINT_ADDRESS) }
      );

      console.log('tokenAccounts', tokenAccounts)

      // 计算总余额（考虑可能有多个账户）
      let totalBalance = 0;
      tokenAccounts.value.forEach(account => {
        const amount = account.account.data.parsed.info.tokenAmount;
        totalBalance += parseFloat(amount.uiAmount);
      });

      setUsdCBalance(totalBalance);
    } catch (err: any) {
      console.error('Error fetching USDC balance:', err);
    } finally {
    }
  };

  const sendTxHistory = async (uuid: string, txHash: string) => {
    if (!uuid || !txHash) return
    const req = {
      txHash: txHash,
      uuid: uuid,
    }
    await vaultService.updateTxHistory(req)
  }

  useEffect(() => {
    if (connected) {
      timer.current = 10000
      getVaultDepositor()
      fetchUSDCBalance()
    }
    return (() => {
      timer.current = null
      clearTimeout(timerRef.current)
      timerRef.current = null
    })
  }, [connected, vaultAddress, accountAddress])
  return {
    handleDeposit,
    handleWithdrawRequest,
    handleWithdraw,
    balance,
    usdcBalance,
    userVault,
    getVaultDepositor,
    vaultStatics,
    earn,
    withdrawRequestValue
  }
}

export default useWeb3