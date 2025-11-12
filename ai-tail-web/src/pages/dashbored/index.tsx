import { useEffect, useState } from "react"
import { DashboredWrapper } from "./style"
import dayjs from "dayjs"
import DashboredLine from "@/components/chart/line/DashboredLine"
import { Item } from "@/components/layout/styles"
import { Segmented } from "antd"
import vaultService from "@/service/vault"
import { toFixed } from "@/utils"

const defaultList = [
  {
    label: 'Total Value Lock',
    value: 0,
    key: 'tvl',
  },
  {
    label: 'User Earnings',
    value: '$23144.21',
    key: 'earnings'
  },
  {
    label: 'Cumulative Return',
    value: '20.077%',
    key: 'cumulativeReturn'
  },
  {
    label: 'Annualized Return',
    value: '44.733%',
    key: 'annualizedReturn'
  }
]

type TabListType = 'All' | 'Month' | 'Week' | 'Day'

const TabListValue: Record<TabListType, number> = {
  'All': 3000,
  'Month': 30 * 24,
  'Week': 7 * 24,
  'Day': 24
}

const Dashbored = () => {
  const [list, setList] = useState<any[]>(defaultList)
  const [tvlList, setTvlList] = useState<any[]>([])
  const [cumulativeReturnList, setCumulativeReturnList] = useState<any[]>([])

  const getTotalLastRecord = () => {
    vaultService.getTotalLastRecord().then((res: any) => {
      if (res?.data) {
        const array = [...list]
        array.forEach((item) => {
          if (item.key === 'tvl') {
            item.value = '$' + (res.data.vaultEquitySpot ? toFixed(res.data.vaultEquitySpot) : 0)
          } else if (item.key === 'earnings') {
            item.value = '$' + (res.data.profitTotal ? toFixed(res.data.profitTotal) : 0)
          } else if (item.key === 'cumulativeReturn') {
            item.value = res.data.cumulativeReturn ? toFixed((res.data.cumulativeReturn * 100), 2) + '%' : '0%'
          } else if (item.key === 'annualizedReturn') {
            item.value = res.data.annualizedReturn && res.data.annualizedReturn !== '-1.0000000000' ? toFixed((res.data.annualizedReturn * 100), 2) + '%' : '0%'
          }
        })
        setList(array)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
  const getTotalStatistical = (type?: string, value?: TabListType) => {
    const req = {
      pageNumber: 1,
      pageSize: value ? TabListValue[value] : 3000,
    }
    vaultService.getTotalStatistical(req).then((res: any) => {
      if (res.data) {
        const tvlArray = res.data?.rows?.map((item: any) => {
          return {
            time: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            value: item.vaultEquitySpot ? Number(toFixed(item.vaultEquitySpot)) : 0
          }
        })?.reverse()
        const cumulativeReturnArray = res.data?.rows?.map((item: any) => {
          return {
            time: dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
            value: item.cumulativeReturn ? Number(toFixed((item.profitTotal), 2)) : 0
          }
        })?.reverse()
        if (type && type === 'tvl') {
          setTvlList(tvlArray)
        } else if (type && type === 'return') {
          setCumulativeReturnList(cumulativeReturnArray)
        } else if (!type && !value) {
          setTvlList(tvlArray)
          setCumulativeReturnList(cumulativeReturnArray)
        }
      }
    })
  }

  const fetchList = (type: string, value: string) => {
    getTotalStatistical(type, value as TabListType)
  }

  useEffect(() => {
    getTotalLastRecord()
    getTotalStatistical()
  }, [])


  return <DashboredWrapper>
    <div className="dashbored-content">
      {list.map((item) => {
        return <Item key={item.value} style={{ width: 'calc(25% - 16px)' }}>
          <div className="content-label">{item.label}</div>
          <div className="content-value">{item.value}</div>
        </Item>
      })}
    </div>
    <div className="dashbored-chart">
      <div className="dashbored-chart-title">
        <div className="dashbored-chart-title-label">TVL</div>
        <div className="position-table-header">
          <Segmented
            onChange={(val) => fetchList('tvl', val)}
            options={['All', 'Month', 'Week', 'Day']} />
        </div>
      </div>
      <div>
        <DashboredLine unit="$" unitType="prefix" name="TVL" style={{ height: 420 }} data={tvlList} />
      </div>
    </div>
    {/* <div className="dashbored-chart" >
      <div className="dashbored-chart-title">
        <div>Share Price</div>
        <div className="position-table-header">
          <Segmented
            options={['All', 'Month', 'Week', 'Day']} />
        </div>
      </div>
      <div>
        <DashboredLine name="Share Price" style={{ height: 320 }} data={mock.generateIncreasingData(60)} />
      </div>
    </div> */}
    <div className="dashbored-chart" >
      <div className="dashbored-chart-title">
        <div className="dashbored-chart-title-label">Return</div>
        <div className="position-table-header">
          <Segmented
            onChange={(val) => fetchList('return', val)}
            options={['All', 'Month', 'Week', 'Day']} />
        </div>
      </div>
      <div>
        <DashboredLine unit="$" unitType="prefix" name="Return" style={{ height: 320 }} data={cumulativeReturnList} />
      </div>
    </div>
    {/* <div className="dashbored-chart" >
      <div className="dashbored-chart-title">
        <div>Cost</div>
        <div className="position-table-header">
          <Segmented
            options={['All', 'Month', 'Week', 'Day']} />
        </div>
      </div>
      <div>
        <DashboredLine name="Cost" style={{ height: 320 }} data={mock.generateIncreasingData(60)} />
      </div>
    </div> */}
    {/* <div className="dashbored-chart" >
      <div className="dashbored-chart-title">
        <div>Funding Fee</div>
        <div className="position-table-header">
          <Segmented
            options={['All', 'Month', 'Week', 'Day']} />
        </div>
      </div>
      <div>
        <DashboredLine name="Funding Fee" style={{ height: 320 }} data={mock.generateIncreasingData(60)} />
      </div>
    </div> */}
  </DashboredWrapper>
}

export default Dashbored