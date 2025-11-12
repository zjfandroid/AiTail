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

const MinLineChart = (props: any) => {
  const data = props.data;
  const style = props.style;
  const title = props.title;
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
    const yData1 = data.map((item: any) => item.value);
     // 动态计算y轴范围（核心优化）
    const minVal = Math.min(...yData1);
    const maxVal = Math.max(...yData1);
    const rangePadding = Math.max(0.001, (maxVal - minVal) * 0.2); // 20%的扩展范围
    const yMin = minVal - rangePadding;
    const yMax = maxVal + rangePadding;
    return {
      title: {
        text: '',
        show: false,
      },
      grid: { // 让图表占满容器
        top: "10px",
        left: "5px",
        right: "10px",
        bottom: "5px"
      },
      xAxis: {
        name: ' ',
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
          name: '',
          type: 'value',
          min: yMin, // 动态设置最小值
          max: yMax, // 动态设置最大值
          splitNumber: 4, // 增加刻度数量
          axisTick: {
            show: false // 隐藏刻度线
          },
          splitLine: {
            show: false,
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
          name: 'Share Price',
          type: 'line',
          data: yData1,
          symbol: 'none',
          lineStyle: {
            width: 2, // 线段粗细
            color: '#009DFF', // 线段颜色
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

export default MinLineChart;
