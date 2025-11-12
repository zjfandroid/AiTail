import { useMemo, useState } from "react"
import mock from "../mock"
import styled from "styled-components"
import { convertNumber, numberToLetter } from "@/utils"


const VaultListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 810px;
  .vault-item{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 254px;
    height: 80px;
    margin: 8px;
    background: #FFFFFF;
    border-radius: 12px;
    box-sizing: border-box;
    cursor: pointer;
    .vault-item-title{
      padding-bottom: 8px;
    }
    .commom-data{
      font-weight: 600;
      font-size: 16px;
      color: #252525;
    }
    .select-value{
      font-weight: 600;
      font-size: 16px;
      color: #5495F9;
    }
  }
  .vault-item:hover{
    border: 1px solid #5495F9;
  }
  .vault-item-select{
    background: #ECF3FF;
    border: 1px solid #5495F9;
  }
`

interface IVaultList {
  list: any[]
  selected: any
  setSelected: (value: any) => void
}

const allVault = {
  name: 'Show All Vaults',
  vaultAddress: 'all',
  totalValue: '',
  total: ''
}


const VaultList = (props: IVaultList) => {
  const { selected, list, setSelected } = props

  const array = useMemo(() => {
    return [...list]
  }, [list])

  return <VaultListWrapper>{array.map((item) => {
    return <div
      key={item.vaultAddress}
      onClick={() => setSelected(item)}
      className={selected?.vaultAddress === item.vaultAddress ? 'vault-item vault-item-select' : 'vault-item'}>
      <div
        className={selected?.vaultAddress === item.vaultAddress ? 'vault-item-title select-value' : 'vault-item-title commom-data'}>
        {item?.name}
      </div>
      {item.vaultAddress !== 'all' && <div className="vault-item-value">
        <span
          className={selected?.vaultAddress === item.vaultAddress ? 'vault-item-value-data select-value' : 'vault-item-value-data commom-data'}>
          {convertNumber(item.totalValue)}
        </span>
        <span>/ {'3M'} USDC Used</span>
      </div>}
    </div>
  })}</VaultListWrapper>
}

export default VaultList