import { useEffect, useMemo, useState } from "react"
import { PositionWrapper } from "./style"
import mock from "./mock"
import { ConfigProvider, Empty, Pagination, Segmented, Table, Tooltip } from "antd"
import NoDataPng from '@/assets/images/nodata.png'
import { Item } from "@/components/layout/styles"
import vaultService from "@/service/vault"
import { useAccount } from "@ant-design/web3"
import dayjs from "dayjs"
import { render } from "react-dom"
import { getEarnings, getVaultValue } from "@/utils/contractServer"

export const CustomEmpty = () => (
  <div style={{ textAlign: 'center', padding: 20 }}>
    <Empty
      image={NoDataPng}
    />
  </div>
);

const defaultList = [
  {
    label: 'My Assets',
    value: 0,
    key: 'myAssets'
  },
  {
    label: 'Claimable Rewards',
    value: 0,
    key: 'claimableRewards'
  },
  {
    label: 'my Desposited',
    value: 0,
    key: 'myDesposited'
  },
  {
    label: 'ROI',
    value: 0,
    key: 'roi'
  },
]

enum ETXType {
  DEPOSIT = 1,
  'REQUEST WITHDRAW' = 2,
  WITHDRAW = 3,
}

const ETXTypeObj: any = {
  'Deposit': ETXType.DEPOSIT,
  'Withdraw request': ETXType['REQUEST WITHDRAW'],
  'Withdraw': ETXType.WITHDRAW,
  'All': undefined,
}
const Position = () => {
  const [list, setList] = useState<any[]>(defaultList)
  const [tab, setTab] = useState<string>('All')
  const [dataSource, setDataSource] = useState<any[]>([])
  const { account } = useAccount()
  const [vaultDetail, setVaultDetail] = useState<any>()
  const [total, setTotal] = useState<number>(0)
  const columns = useMemo(() => {
    let array = [{
      title: 'Txn Hash',
      dataIndex: 'txHash',
      key: 'txHash',
      width: 300,
      ellipsis: true,
      return: (val: string) => {
        return <Tooltip title={val}></Tooltip>
      }
    }, {
      title: 'Event',
      dataIndex: 'txType',
      key: 'txType',
      render: (val: number) => {
        return ETXType[val] || ''
      }
    }, {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (val: string) => {
        return '$' + (val ? (Number(val) / (1000000)).toFixed(2) : 0)
      }
    }, {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val: string) => {
        return dayjs(val).format('YYYY-MM-DD HH:mm:ss')
      }
    }]
    if (tab === 'All') {
      array = array.filter(item => item.key !== 'event')
    }
    return array
  }, [tab])

  const getist = () => {
    if (!vaultDetail?.vaultAddress) return
    if (!account?.address) return
    const req = {
      pageNumber: 1,
      pageSize: 10,
      status: 2,
      txType: ETXTypeObj[tab] || undefined,
      authority: account?.address || '',
      vaultAddress: vaultDetail?.vaultAddress || '',
    }
    vaultService.getTxHistoryList(req).then((res: any) => {
      if (res.data) {
        setDataSource(res.data?.rows || [])
        setTotal(res.data.count || 0)
      }
    })
  }

  const getVaultDetail = () => {
    const req = {
      pageNumber: 1,
      pageSize: 10,
      isPrivate: false,
    }
    vaultService.getVaultList(req).then((res: any) => {
      if (res.data) {
        setVaultDetail(res?.data?.rows?.[0])
      }
    })
  }

  const getVaultDepositor = async (vaultAddress: string, accountAddress: string, data: any) => {

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
      if (res?.data) {
        const vaultValue = getVaultValue(res?.data, data);
        const earn = getEarnings(res?.data, data);
        const userVaultDetail = res.data
        const array = [...list]
        const newList = array.map(item => {
          const obj = { ...item }
          if (item.key === 'myAssets') {
            obj.value = '$' + (vaultValue ? vaultValue.toFixed(2) : 0)
          }
          if (item.key === 'claimableRewards') {
            obj.value = '$' + (earn ? earn.toFixed(2) : 0)
          }
          if (item.key === 'myDesposited') {
            obj.value = '$' + (userVaultDetail?.totalDeposits ? Number(userVaultDetail?.totalDeposits).toFixed(2) : 0)
          }
          if (item.key === 'roi') {
            obj.value = (userVaultDetail?.netDeposits ? Number((earn / (Number(userVaultDetail?.netDeposits) || 1)).toFixed(4)) * 100 : 0) + '%'
          }
          return obj
        })
        setList(newList)
      }
    } catch (error) {
      console.log('获取余额失败', error)
    }
  }

  const changePagination = (page: number) => {
    const req = {
      pageNumber: page,
      pageSize: 10,
      authority: account?.address || '',
      vaultAddress: vaultDetail?.vaultAddress || '',
      status: 2,
    }
    vaultService.getTxHistoryList(req).then((res: any) => {
      if (res.data) {
        setDataSource(res.data?.rows || [])
        setTotal(res.data.count || 0)
      }
    })
  }

  useEffect(() => {
    getVaultDetail()
  }, [])

  useEffect(() => {
    getist()
  }, [tab])

  useEffect(() => {
    getist()
    if (vaultDetail && account?.address) {
      getVaultDepositor(vaultDetail?.vaultAddress, account?.address, vaultDetail)
    }
  }, [vaultDetail, account])

  return <PositionWrapper>
    <div className="position-content">
      {list.map((item, index) => {
        return <Item key={item.key} style={{ width: 'calc(25% - 16px)' }}>
          <div className="content-label">{item.label}</div>
          <div className="content-value">{item.value}</div>
        </Item>
      })}
    </div>
    <div className="position-table">
      <div className="position-table-header">
        <Segmented
          value={tab}
          size="large"
          onChange={(value) => setTab(value)}
          options={['All', 'Deposit', 'Withdraw request', 'Withdraw']} />
      </div>
      <div className="position-table-content">
        <ConfigProvider renderEmpty={CustomEmpty}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={{
              pageSize: 10,
              total: total,
              onChange: changePagination,
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  </PositionWrapper>
}

export default Position