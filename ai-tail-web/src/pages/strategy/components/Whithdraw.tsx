import { useEffect, useState } from "react"
import InputComponent from "./InputComponent"
import DataList, { IData } from "./DataList"
import { toFixed, uniqueArrayByKey } from "@/utils"
import { DespositWrapper } from "../style"

interface IDesposit {
  balance: number
  value: number
  data: any
  userVault?: any
  vaultStatics?: any
  earn?: any
  setValue: (value: number) => void
}

const Whithdraw = (props: IDesposit) => {
  const { balance, value, data, setValue, vaultStatics, userVault, earn } = props;
  const [list, setList] = useState<IData[]>([])

  useEffect(() => {
    if (data) {
      const array = [{
        label: 'My Earnings',
        value: toFixed(earn || 0, 4),
        type: 'number',
        key: 'tvl'
      }, {
        label: 'Apy',
        value: toFixed(vaultStatics?.annualizedReturn * 100 || 0, 4) + '%',
        type: 'string',
        key: 'apy'
      }, {
        label: 'My Position',
        value: toFixed(balance || 0, 4),
        type: 'number',
        key: 'position'
      },
      {
        label: 'My Share',
        value: toFixed(userVault?.vaultShares || 0, 4),
        type: 'number',
        key: 'share'
      },
      {
        label: 'Withdraw Request Value',
        value: toFixed(userVault?.lastWithdrawRequestValue || 0, 4),
        type: 'number',
        key: 'requestValue',
        style: { width: '100%' }
      },]
      setList(uniqueArrayByKey([...array, ...list], 'key'))
    } else {
      const array = [{
        label: 'My Earnings',
        value: 0,
        type: 'number',
        key: 'tvl'
      }, {
        label: 'Apy',
        value: '19%',
        type: 'string',
        key: 'apy'
      }, {
        label: 'My Position',
        value: 0,
        type: 'number',
        key: 'position'
      },
      {
        label: 'My Share',
        value: 0,
        type: 'number',
        key: 'share'
      },
      {
        label: 'Withdraw Request Value',
        value: 0,
        type: 'number',
        key: 'requestValue',
        style: { width: '100%' }
      }]
      setList(uniqueArrayByKey([...array, ...list], 'key'))
    }
  }, [data, userVault])

  return (
    <DespositWrapper>
      <div style={{ width: '100%', marginTop: '20px' }}>
        <InputComponent balance={balance} value={value} onChange={(val) => {
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
        <p>After the 5 mins redemption period, your funds can be withdrawn to your wallet. The maximum withdrawal amount is based on share value at request time, though the final amount may be lower. Performance Fee 25.00%</p>
        <p className="tips">* 20% of the performance fee will be distributed to Rebate Program participants</p>
      </div>
    </DespositWrapper>
  );
}

export default Whithdraw;