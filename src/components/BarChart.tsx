import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { processChartData } from '../utils/dataProcessing';
import { useMantineColorScheme } from '@mantine/core';

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const chartData = processChartData();

      const option = {
        title: {
          text: 'Average Crop Production',
          left: 'center',
          top: 0,
          textStyle: {
            color: colorScheme === 'dark' ? '#ffffff' : '#333333'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: chartData.map((item) => item.crop),
          name: 'Crop',
          nameLocation: 'middle',
          nameGap: 35,
          axisLabel: {
            interval: 0,
            rotate: 45
          },
          nameTextStyle: {
            fontWeight: 'bold',
            fontSize: 16,
            color: colorScheme === 'dark' ? '#ffffff' : '#333333'
          }
        },
        yAxis: {
            type: 'value',
            name: 'Average Crop Production',
            nameLocation: 'middle',
            nameGap: 50,
            nameTextStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: colorScheme === 'dark' ? '#ffffff' : '#333333'
            }
          },
                  series: [
          {
            name: 'Average Production',
            type: 'bar',
            data: chartData.map((item) => item.averageProduction),
            itemStyle: {
              color: colorScheme === 'dark' ? '#3498db' : '#2980b9'
            }
          }
        ]
      };

      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [colorScheme]);

  return <div ref={chartRef} style={{ width: '100%', height: '500px' }} />;
};

export default BarChart;
