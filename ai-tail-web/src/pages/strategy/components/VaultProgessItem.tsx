import { calculatePercentage, convertNumber, numberToLetter } from "@/utils/index"
import { Progress } from "antd"
import React from "react"
import styled, { css } from "styled-components"

const VaultProgessItemWrapper = styled.div<{ isSelect?: boolean }>`
  margin: 8px 0;
  padding: 16px;
  background: #F7F8FA;
  border-radius: 10px;
  cursor: pointer;
  .opt-content-progess-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .vault-title{
      font-weight: 600;
      font-size: 14px;
      color: #252525;
    }
    .vault-type{
      cursor: pointer;
      font-weight: 400;
      font-size: 14px;
      color: #4E5969;
      line-height: 22px;
    }
  }
  .opt-content-progess-value{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    font-weight: 400;
    font-size: 14px;
    color: #4E5969;
    line-height: 22px;
  }
  /* 条件悬停样式 */
  ${props => props.isSelect && css`
    &:hover {
      background: #E6F0FF;
      .vault-title {
        color: #5495F9;
      }
    }
  `}
`

interface IVaultProgess {
  data: any
  isSelect?: boolean
  index?: number
  onChange?: (value: any) => void
  opt?: React.ReactNode
}

const VaultProgessItem = (props: IVaultProgess) => {
  const { opt, data, isSelect, index, onChange } = props
  return <VaultProgessItemWrapper isSelect={isSelect} onClick={() => onChange?.(data)}>
    <div className="opt-content-progess-header">
      <div className="vault-title"> {'Vault ' + numberToLetter(index || 0)}</div>
      {opt}
    </div>
    <div className="opt-content-progess-content"> <Progress percent={calculatePercentage(data?.totalValue || 0, 300000000)} showInfo={false} /></div>
    <div className="opt-content-progess-value">
      <div>Available Capacity:</div>
      <div>{convertNumber(data?.totalValue)} USDC</div>
    </div>
  </VaultProgessItemWrapper>
}

export default VaultProgessItem