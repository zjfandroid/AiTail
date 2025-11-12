import { useState } from "react"
import { OptContentWrapper } from "../style"
import {
  UpOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { Input, Progress } from "antd"
import WalletPng from '@/assets/images/wallet.png'
import UsdcPng from '@/assets/images/usdc2.png'
import VaultProgess from "./VaultProgess";
import { useAccount } from "@ant-design/web3";
import useWeb3 from "../hooks";


const items = [
  {
    label: 'Deposit',
    value: 'deposit'
  },
  {
    label: 'Whithdraw',
    value: 'whithdraw'
  }
]

interface IOptContent {
  list: any[]
}

const OptContent = (props: IOptContent) => {
  const { list } = props
  const { account } = useAccount()
  const [tab, setTab] = useState('deposit')
  const [isOpen, setIsOpen] = useState(true)
  const [value, setValue] = useState('0')
  const [selected, setSelected] = useState<any>()

  console.log('account', account)

  const { handleDeposit } = useWeb3({ accountAddress: account?.address || '', vaultAddress: selected?.vaultAddress })

  const onCheckTab = (value: string) => {
    console.log(value)
    setTab(value)
  }

  const onDesposit = () => {
    if (!selected) {
      return
    }
    if (!account) {
      console.log('Please connect your wallet')
      return
    }
    if (!value || Number(value) <= 0) {
      console.log('Please enter a valid amount')
      return
    }
    handleDeposit(Number(value))
  }

  return <OptContentWrapper>
    <div className="header">
      {items.map((item) => {
        return <div key={item.value}>
          <div className={tab === item.value ? 'header-item header-item-active' : 'header-item'} onClick={() => onCheckTab(item.value)}>{item.label}</div>
        </div>
      })}
    </div>
    <div className="info">
      <div className="info-tag">Est. APR: 19.32%</div>
    </div>
    <div className="opt-content">
      <div className="opt-content-tile">Vault  Type</div>
      <VaultProgess selected={selected} setSelected={setSelected} data={list} />
    </div>
    <div className="opt-data">
      <div className="opt-data-header">
        <div className="opt-data-header-label">Balance</div>
        <div className="opt-data-header-value">
          <img src={WalletPng} alt="" />
          <span>0 USDC</span>
        </div>
      </div>
      <div className="opt-data-input">
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          prefix={
            <div className="opt-data-input-label">
              <img src={UsdcPng} alt="" />
              <span>USDC</span>
            </div>
          }
          suffix={<div className="opt-data-input-button">Max</div>}
        />
      </div>
      {tab === 'deposit' && <div className="opt-data-message">
        <div className="opt-data-message-title"><ExclamationCircleOutlined /> Min Deposit</div>
        <div className="opt-data-message-info">The minimum deposit amount is 100 USDC.</div>
      </div>}
      {tab === 'whithdraw' && <div className="opt-data-info">
        <div className="opt-data-info-icon"><InfoCircleOutlined /></div>
        <div className="opt-data-info-text">
          Reminder<br />
          The estimated withdrawal amount in USDC may differ slightly from the actual withdrawal amount due to fluctuations in the vault's performance.
        </div>
      </div>}
      <div className="opt-data-value">
        <div className="opt-data-value-list">
          <div className="opt-data-value-list-label">My Position (USDC)</div>
          <div className="opt-data-value-list-value">$0.00</div>
        </div>
        <div className="opt-data-value-list">
          <div className="opt-data-value-list-label">Projected Earnings / Month (USDC)</div>
          <div className="opt-data-value-list-value">$0.00</div>
        </div>
        <div className="opt-data-value-list">
          <div className="opt-data-value-list-label">Projected Earnings / Year (USDC)</div>
          <div className="opt-data-value-list-value">$0.00</div>
        </div>
      </div>
    </div>
    <div className="opt-opt">
      <div className="opt-opt-info">Funds deposited will be subject to a 24-hours redemption period before withdrawal.</div>
      {!account && <div className="opt-opt-button"> Connect</div>}
      {account && tab === 'deposit' && <div className="opt-opt-button" onClick={() => onDesposit()}>Deposit</div>}
    </div>
  </OptContentWrapper>
}

export default OptContent