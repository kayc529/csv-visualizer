'use client';

import { calculatePercentage } from '@/utils/calculation-helper';
import { useDataStore } from '@/utils/use-bear-store';
import { ChangeEvent, useState } from 'react';
import {
  convertKeyValuePairToArray,
  convertNumbersToPercentage,
} from '@/utils/data-helper';
import { MdOutlineZoomIn, MdOutlineZoomOut } from 'react-icons/md';

import { Chart } from 'react-google-charts';

export default function CsvResults() {
  const dataStore = useDataStore();
  const [chartType, setChartType] = useState('bar');
  const [width, setWidth] = useState(110);
  const [chartData, setChartData] = useState(dataStore.csvData);

  const displayData = () => {
    let list = [];

    for (let [key, value] of dataStore.csvData) {
      list.push(
        <li key={key} className='flex flex-col items-center'>
          <p className='font-bold capitalize text-center'>{key}</p>
          <p>
            {value} (
            {dataStore.count === 0
              ? 0
              : calculatePercentage(value, dataStore.count)}
            %)
          </p>
          {/* <input type='checkbox' checked={true} className='mt-1 w-4 h-4' /> */}
        </li>
      );
    }

    return (
      <>
        <ul className='w-full flex justify-center gap-x-6 gap-y-4 overflow-x-auto'>
          {list}
        </ul>

        {list.length > 0 && (
          <>
            {' '}
            <p className='py-6 font-bold'>
              Total Number of Votes: {dataStore.count}
            </p>{' '}
            <button
              className='w-max px-2 py-1 bg-slate-200 border border-black disabled:opacity-50'
              onClick={() => {
                dataStore.showChart();
              }}
              disabled={dataStore.isShowChart}
            >
              Generate Chart
            </button>
          </>
        )}
      </>
    );
  };

  const generateChart = () => {
    const data = convertKeyValuePairToArray(dataStore.csvData);
    const options = {
      title: dataStore.chartName,
      titleTextStyle: {
        fontSize: 24,
      },
    };

    let chartWidth = data.length * width;
    console.log(width);

    data.unshift(['Vote Options', '# of Votes']);

    return (
      <div className='w-full py-8 overflow-x-scroll'>
        <Chart
          key={width}
          chartType={chartType === 'bar' ? 'BarChart' : 'PieChart'}
          width={`${chartWidth}px`}
          height='500px'
          data={data}
          options={options}
          className='mx-auto'
        />
      </div>
    );
  };

  const changeChartType = () => {
    if (chartType === 'bar') {
      setChartType('pie');
    } else {
      setChartType('bar');
    }
  };

  const decreaseChartSize = () => {
    if (width === 50) {
      return;
    }

    setWidth((prev) => prev - 10);
  };

  return (
    <section className='w-full py-10 flex flex-col items-center'>
      <>{displayData()}</>
      <div className='w-4/5 mt-10'>
        {dataStore.isShowChart && generateChart()}
      </div>

      {dataStore.isShowChart && (
        <div className='flex items-center gap-x-4'>
          <button
            className='w-max mt-10 p-1 bg-slate-200 border border-black'
            onClick={() => setWidth((prev) => prev + 10)}
          >
            <MdOutlineZoomIn className='w-6 h-6' />
          </button>
          <button
            className='w-max mt-10 px-2 py-1 bg-slate-200 border border-black'
            onClick={changeChartType}
          >
            Switch to {chartType === 'bar' ? 'Pie Chart' : 'Bar Chart'}
          </button>
          <button
            className='w-max mt-10 p-1 bg-slate-200 border border-black'
            onClick={decreaseChartSize}
          >
            <MdOutlineZoomOut className='w-6 h-6' />
          </button>
        </div>
      )}
    </section>
  );
}
