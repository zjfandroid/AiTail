import { useEffect, useState } from "react"
import { CardWrapper } from "../style"
import Desposit from "./Deposit"
import Whithdraw from "./Whithdraw"
import { Button, message } from "antd"
import useWeb3 from "../hooks"
import { useAccount } from "@ant-design/web3"
import { trimSpecialChars } from "@/utils"

interface ICard {
  data: any,
  type?: string
}

const items = [
  {
    label: 'Deposit',
    value: 'deposit'
  },
  {
    label: 'Withdraw',
    value: 'withdraw'
  }
]

const Card = (props: ICard) => {
  const { data, type } = props
  const { account } = useAccount()
  const [tab, setTab] = useState(type || 'deposit')
  const [depositValue, setDepositValue] = useState(0)
  const [withdrawValue, setWithdrawValue] = useState(0)
  const [withdrawRequestValue, setWithdrawRequestValue] = useState(0)

  const {
    usdcBalance,
    balance,
    earn,
    userVault,
    vaultStatics,
    handleDeposit,
    handleWithdrawRequest,
    handleWithdraw,
    getVaultDepositor
  } = useWeb3({
    accountAddress: account?.address || '',
    vaultAddress: data?.vaultAddress,
    data
  })

  const onCheckTab = (value: string) => {
    setTab(value)
  }

  const onDeposit = () => {
    if (!account) {
      message.error('Please connect your wallet')
      return
    }
    if (!depositValue || Number(depositValue) <= 0) {
      message.error('Please enter a valid amount')
      return
    }
    if (!data?.vaultAddress) {
      message.error('Vault address is not provided')
      return
    }
    if (Number(depositValue) > Number(usdcBalance)) {
      message.error('Insufficient USDC balance')
      return
    }
    if (Number(depositValue) < 100) {
      message.error('Minimum deposit amount is 100 USDC')
      return
    }
    handleDeposit(depositValue).then(() => {
      setDepositValue(0)
      getVaultDepositor()
    }).catch((err) => {
      console.error('Deposit failed:', err)
    })
  }

  const onWhithdrawRequest = () => {
    if (!account) {
      message.error('Please connect your wallet')
      return
    }
    if (!withdrawValue || Number(withdrawValue) <= 0) {
      message.error('Please enter a valid amount')
      return
    }
    if (!data?.vaultAddress) {
      message.error('Vault address is not provided')
      return
    }
    if (Number(withdrawValue) > Number(balance)) {
      message.error('Insufficient balance')
      return
    }
    handleWithdrawRequest(withdrawValue).then(() => {
      setWithdrawValue(0)
      getVaultDepositor()
    }).catch((err) => {
      console.error('Withdraw request failed:', err)
    })
  }

  const onWhithdraw = () => {
    handleWithdraw().then(res => {
      getVaultDepositor()
    })
  }

  useEffect(() => {
    if (userVault) {
      setWithdrawRequestValue(Number(userVault?.lastWithdrawRequestValue) || 0)
    }
  }, [userVault])


  return <CardWrapper>
    <div className="title">{trimSpecialChars(data?.vaultName)}</div>
    <div className="content-tabs">
      {items.map((item) => {
        return <div
          onClick={() => onCheckTab(item.value)}
          key={item.value}
          className={tab === item.value ? "select-tab content-tab-item" : "content-tab-item"}>
          {item.label}
        </div>
      })}
    </div>
    {tab === 'deposit' && <Desposit
      usdcBalance={usdcBalance}
      balance={balance || 0}
      value={depositValue}
      earn={earn}
      data={data}
      vaultStatics={vaultStatics}
      userVault={userVault}
      setValue={setDepositValue} />}
    {tab === 'withdraw' && <Whithdraw
      balance={balance || 0}
      data={data}
      earn={earn}
      vaultStatics={vaultStatics}
      userVault={userVault}
      value={withdrawValue}
      setValue={setWithdrawValue} />}
    <div className="footer-content">
      {tab === 'deposit' && <Button block shape="round" onClick={onDeposit}>Deposit</Button>}
      {tab === 'withdraw' && withdrawRequestValue === 0 && <Button block shape="round" onClick={onWhithdrawRequest}>Whithdraw Request</Button>}
      {tab === 'withdraw' && withdrawRequestValue > 0 && <Button block shape="round" onClick={onWhithdraw}>Whithdraw</Button>}
    </div>
  </CardWrapper>
}

export default Card