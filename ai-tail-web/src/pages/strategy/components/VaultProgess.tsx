import { DownOutlined, UpOutlined } from "@ant-design/icons"
import { Popover, Progress } from "antd"
import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import VaultProgessItem from "./VaultProgessItem"
import mock from "../mock"

const VaultProgessWrapper = styled.div`
.vault-progess-list{
  width: 100%;
}
`

interface IVaultProgess {
  data: any[]
  selected?: any
  setSelected?: (val: any) => void
}

interface IVaultProgessList {
  list: any[]
  width: number
  onChange?: (val: any) => void
}

const VaultProgessList = (props: IVaultProgessList) => {
  const { list, width, onChange } = props

  return <div className="vault-progess-list" style={{ width: width }}>
    {list.map((item, index) => {
      return <VaultProgessItem index={index} isSelect={true} key={item.value} data={item} onChange={onChange} />
    })}
  </div>
}

const VaultProgess = (props: IVaultProgess) => {
  const { data, selected, setSelected } = props
  const [isOpen, setIsOpen] = useState(false)
  const [list, setList] = useState<any[]>([])
  const ref = useRef<any>(null)
  const width = useMemo(() => {
    if (ref.current) {
      return ref.current.offsetWidth
    } else {
      return undefined
    }
  }, [ref.current?.offsetWidth])

  useEffect(() => {
    if (data && data.length) {
      const newList = data.map((item: any) => {
        return {
          ...item,
          selected: item.vaultAddress === selected?.vaultAddress
        }
      })
      setList(newList)
      if (!selected) {
        setSelected?.(newList[0])
      }
    }
  }, [data])

  const onChange = (val: any) => {
    setSelected?.(val)
    setIsOpen(false)
    const newList = list.map(item => {
      if (item.id === val.id) {
        return { ...item, selected: true }
      } else {
        return { ...item, selected: false }
      }
    })
    setList(newList)
  }
  return <VaultProgessWrapper ref={ref}>
    <Popover
      color="#F7F8FA"
      content={<VaultProgessList width={width} list={list} onChange={onChange} />}
      title=""
      placement="bottomRight"
      autoAdjustOverflow={false}
      trigger="click">
      <div>
        <VaultProgessItem
          data={selected}
          opt={<div onClick={() => setIsOpen(!isOpen)} className="vault-type">
            {isOpen ? <UpOutlined /> : <DownOutlined />}
          </div>} />
      </div>
    </Popover>
  </VaultProgessWrapper>
}

export default VaultProgess