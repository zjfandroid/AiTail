import { Item } from "@/components/layout/styles"
import Chart from "./components/Chart"
import OptContent from "./components/OptContent"
import mock from "./mock"
import { Content, Header } from "./style"
import { Button, Popover } from "antd"
import VaultList from "./components/VaultList"
import { ArrowLeftOutlined, DownOutlined, LeftOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import vaultService from "@/service/vault"
import { getUrlParam, numberToLetter } from "@/utils"
import Card from "./components/card"
import { useNavigate } from "umi"


const Strategy = () => {
  const [vaultData, setVaultData] = useState<any>()
  const type = getUrlParam('type')
  const vaultAddress = getUrlParam('vaultAddress')
  const nav = useNavigate()

  const getVaultDetail = (address: string) => {
    if (!vaultAddress) return
    vaultService.getVaultDetail(vaultAddress).then((res: any) => {
      setVaultData(res?.data || {})
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    if (vaultAddress) {
      getVaultDetail(vaultAddress)
    }
  }, [vaultAddress])

  const goList = () => {
    nav('/jdn')
  }

  return <Content>
    <div>
      <div className="content-opt">
        <div onClick={goList}><ArrowLeftOutlined />
          Back to JDN</div>
      </div>
      <Card data={vaultData} type={type || ''} />
    </div>

    {/* <div className="content">
      {itemList.map((item) => {
        return <Item key={item.value}>
          <div className="content-label">{item.label}</div>
          <div className="content-value">{item.value}</div>
        </Item>
      })}
    </div> */}
    {/* <div className="content" style={{ alignItems: 'flex-start' }}>
      <OptContent list={vaultList} />
      <Chart />
    </div> */}
  </Content>
}

export default Strategy