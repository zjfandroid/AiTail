import { Segmented, Select } from "antd"
import { ChartWrapper } from "../style"
import UsdcPng from '@/assets/images/usdc2.png'
import { useState } from "react"
import StrategyLine from "@/components/chart/line/StrategyLine"
import mock from "../mock"

const Chart = () => {
  const [time, setTime] = useState('Month')
  const [year, setYear] = useState('2025')
  const [list, setList] = useState<any[]>(mock.generateIncreasingData(30))
  const handleChange = (value: string) => {
    setYear(value)
  }
  const onChangeTime = (value: string) => {
    setTime(value)
    if (value === 'Month') {
      setList(mock.generateIncreasingData(30))
    } else if (value === 'Quater') {
      setList(mock.generateIncreasingData(90))
    } else if (value === 'Year') {
      setList(mock.generateIncreasingData(365))
    }
  }
  return (
    <ChartWrapper >
      <div className="chart-header">
        <div className="chart-header-label">
          <img src={UsdcPng} alt="" />
          <span>Performance</span>
        </div>
        <div className="chart-header-select">
          <Select
            value={year}
            onChange={handleChange}
            options={[
              { value: '2025', label: '2025' },
              { value: '2024', label: '2024' }
            ]}
          />
        </div>
      </div>
      <div className="chart-content">
        <div className="chart-content-title">
          <div className="chart-content-title-label">Share Price</div>
          <div className="chart-content-title-seelct">
            <Segmented<string>
              value={time}
              options={[{
                label: 'Month',
                value: 'Month'
              },
              {
                label: 'Quater',
                value: 'Quater'
              },
              {
                label: 'Year',
                value: 'Year'
              }]}
              onChange={onChangeTime}
            /></div>
        </div>
      </div>
      <div className="chart-chart">
        <StrategyLine style={{ height: 280 }} data={list} />
      </div>
    </ChartWrapper>
  )
}

export default Chart