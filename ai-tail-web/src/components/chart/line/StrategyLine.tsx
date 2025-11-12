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
    const yData1 = data.map((item: any) => item.data1);
    const yData2 = data.map((item: any) => item.data2);
    const yData3 = data.map((item: any) => item.data3);
    const seriesData = [
      { name: 'Share Price', data: data.map((item: any) => item.data1) },
      { name: 'Moving Avarage of 7 Days', data: data.map((item: any) => item.data2) },
      { name: 'Moving Avarage of 1 Day', data: data.map((item: any) => item.data3) },
    ];
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
        }
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
          minInterval: 25,
          type: 'value',
          splitNumber: 3,
          axisTick: {
            show: false // 隐藏刻度线
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
          name: 'Share Price',
          type: 'line',
          data: yData1,
          symbol: 'none',
          lineStyle: {
            width: 2, // 线段粗细
            color: '#009DFF', // 线段颜色
          },
        },
        {
          name: 'Moving Avarage of 7 Days',
          type: 'line',
          data: yData2,
          symbol: 'none',
          lineStyle: {
            width: 2, // 线段粗细
            color: '#CC3DAB', // 线段颜色
          },
        },
        {
          name: 'Moving Avarage of 1 Day',
          type: 'line',
          data: yData3,
          symbol: 'none',
          lineStyle: {
            width: 2, // 线段粗细
            color: '#12CA98', // 线段颜色
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
