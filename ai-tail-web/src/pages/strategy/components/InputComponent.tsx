import { InputNumber } from "antd"
import { InputComponentWrapper } from "../style"
import UsdcImg from '@/assets/images/usdc2.png'
import { toFixed } from "@/utils"

interface IInputComponent {
  balance: number
  value: number
  onChange: (value: number | string | null) => void
}

const InputComponent = (props: IInputComponent) => {
  const { balance, value, onChange } = props
  const handleMax = () => {
    if (balance > 0) {
      onChange(Number(toFixed(balance, 4)))
    } else {
      onChange(0)
    }
  }
  return <InputComponentWrapper>
    <div className="input-label">
      <img src={UsdcImg} alt="" />
      <span>USDC</span>
    </div>
    <div className="input-content">
      <div className="input-balance">
        <div>Balance: $ <span className="input-balance-primary">{toFixed(balance)}</span></div>
        <div className="input-balance-max" onClick={handleMax}>MAX</div>
      </div>
      <div className="input-field">
        <InputNumber onChange={onChange} controls={false} placeholder="" variant="filled" value={value} />
      </div>
    </div>
  </InputComponentWrapper>
}

export default InputComponent