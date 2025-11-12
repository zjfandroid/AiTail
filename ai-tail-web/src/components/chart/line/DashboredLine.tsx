import { useMemo, useState } from 'react';

import ReactEChartsCore from 'echarts-for-react/lib/core';
import * as echarts from 'echarts/core';
import {
  LineChart,
} from 'echarts/charts';

import {
  GridComponent,
  TooltipComponent,
  TitleComponent,
  LegendComponent,
  DataZoomComponent,
} from 'echarts/components';

import {
  CanvasRenderer,
  // SVGRenderer,
} from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LineChart,
  CanvasRenderer,
  DataZoomComponent,
  LegendComponent,
]);

const LineCharts = (props: any) => {
  const data = props.data;
  const style = props.style;
  const title = props.title;
  const name = props.name;
  const unit = props.unit || '';
  const unitType = props.unitType || 'prefix'; // normal | percent

  const [theme, setTheme] = useState('light');


  const tableBorderColor1 = () => {
    if (theme !== 'dark') {
      return '#ebebeb'
    } else {
      return '#0E1019'
    }
  }
  const tableBorderColor2 = () => {
    if (theme !== 'dark') {
      return '#fff'
    } else {
      return '#2D3150'
    }
  }
  const commonColor = () => {
    if (theme !== 'dark') {
      return '#666'
    } else {
      return '#e6e6e6'
    }
  }

  const options = useMemo(() => {
    const xData = data.map((item: any) => item.time);
    const yData = data.map((item: any) => item.value);
    // 根据 unitType 决定单位显示位置
    const formatValue = (value: number) => {
      if (unitType === 'prefix') {
        return `${unit}${value}`; // 单位在前，如 "$100"
      } else if (unitType === 'percent') {
        return `${value}%`; // 百分比，如 "10%"
      } else {
        return `${value} ${unit}`; // 单位在后，如 "100 kg"
      }
    };
    return {
      title: {
        text: title ? title : '收益趋势图',
        show: false,
      },
      grid: { // 让图表占满容器
        top: "40px",
        left: "60px",
        right: "40px",
        bottom: "30px"
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#1A1A1A',
        textStyle: {
          color: '#fff',
          fontSize: 12
        },
        formatter: (params: any) => {
          const date = params[0].axisValue;
          const value = params[0].data;
          return `
          <div>
            <div>${date}</div>
            <div>${params[0].seriesName}: ${formatValue(value)}</div>
          </div>
        `;
        }
      },
      xAxis: {
        name: '',
        type: 'category',
        data: xData,
        axisTick: {
          show: false // 隐藏刻度线
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: tableBorderColor1(),
            shadowBlur: 1,
            shadowColor: tableBorderColor2(),
            shadowOffsetX: 4,
            shadowOffsetY: 1
          }
        },
        axisLabel: {
          color: commonColor()
        }
      },
      yAxis: [
        {
          name: '', // y轴名称显示单位
          type: 'value',
          splitNumber: 3,
          axisTick: {
            show: false // 隐藏刻度线
          },
          axisLabel: {
            formatter: (value: number) => formatValue(value), // y轴刻度值格式化
            color: commonColor()
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: tableBorderColor1(),
              shadowBlur: 1,
              shadowColor: tableBorderColor2(),
              shadowOffsetX: 4,
              shadowOffsetY: 1
            }
          }
        },
      ],
      series: [
        {
          name: name || 'tvl',
          type: 'line',
          data: yData,
          symbol: 'none',
          lineStyle: {
            width: 2, // 线段粗细
            color: '#F86868', // 线段颜色
          },
        },
      ]
    };
  }, [data]);

  return (
    <ReactEChartsCore
      echarts={echarts}
      option={options}
      style={style}
      notMerge={true}
      lazyUpdate={true}
      theme={'theme_name'}
    />
  );
};

export default LineCharts;
