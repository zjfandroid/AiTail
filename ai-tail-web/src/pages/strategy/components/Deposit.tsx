import { useEffect, useState } from "react"
import InputComponent from "./InputComponent"
import DataList, { IData } from "./DataList"
import { DespositWrapper } from "../style"
import { toFixed, uniqueArrayByKey } from "@/utils"

interface IDesposit {
  balance: number
  usdcBalance: number
  value: number
  data: any
  userVault: any
  vaultStatics?: any
  earn?: any
  setValue: (value: number) => void
}

const Desposit = (props: IDesposit) => {
  const { usdcBalance, balance, value, setValue, data, earn, userVault, vaultStatics } = props;
  const [list, setList] = useState<IData[]>([])

  useEffect(() => {
    if (data) {
      const array = [{
        label: 'My Earnings:',
        value: toFixed(earn || 0, 4),
        type: 'number',
        key: 'tvl'
      }, {
        label: 'APY:',
        value: toFixed(vaultStatics?.annualizedReturn * 100 || 0, 4) + '%',
        type: 'string',
        key: 'apy'
      }, {
        label: 'My Position:',
        value: toFixed(balance || 0, 4),
        type: 'number',
        key: 'position'
      },
      {
        label: 'My Share:',
        value: toFixed(userVault?.vaultShares || 0, 4),
        type: 'number',
        key: 'share'
      }]
      setList(uniqueArrayByKey([...array, ...list], 'key'))
    } else {
      const array = [{
        label: 'My Earnings:',
        value: 0,
        type: 'number',
        key: 'tvl'
      }, {
        label: 'APY:',
        value: '19%',
        type: 'string',
        key: 'apy'
      }, {
        label: 'My Position:',
        value: 0,
        type: 'number',
        key: 'position'
      },
      {
        label: 'My Share:',
        value: 0,
        type: 'number',
        key: 'share'
      }]
      setList(uniqueArrayByKey([...array, ...list], 'key'))
    }
  }, [data, userVault])

  return (
    <DespositWrapper>
      <div style={{ width: '100%', marginTop: '20px' }}>
        <InputComponent balance={usdcBalance} value={value} onChange={(val) => {
          if (typeof val === 'number' || typeof val === 'string') {
            setValue(Number(val))
          } else {
            setValue(0)
          }
        }} />
      </div>
      {list && list.length > 0 && <div>
        <DataList list={list} />
      </div>}
      <div className="card-item-info">
        <p> *The minimum deposit amount is 100 USDC.</p>
        <p> *Funds deposited will be subject to a 24-hours redemption period before withdrawal.</p>
      </div>
    </DespositWrapper>
  );
}

export default Desposit;