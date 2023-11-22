'use client';

import { calculatePercentage } from '@/utils/calculation-helper';
import { useDataStore } from '@/utils/use-bear-store';
import { ChangeEvent, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import { chartColors, getChartOptions } from '@/utils/chart-setting';
import { convertNumbersToPercentage } from '@/utils/data-helper';
ChartJS.register(...registerables);

export default function CsvResults() {
  const dataStore = useDataStore();
  const [colors, setColors] = useState<Map<string, string>>(new Map());
  const [showChart, setShowChart] = useState(false);
  const [chartType, setChartType] = useState('bar');

  const onColorChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let key = e.target.name;
    let temp = new Map(colors);
    temp.set(key, e.target.value);
    setColors(temp);
  };

  const displayData = () => {
    let list = [];
    for (let [key, value] of dataStore.csvData) {
      list.push(
        <li key={key} className='flex flex-col items-center'>
          <p className='font-bold capitalize'>{key}</p>
          <p>
            {value} (
            {dataStore.count === 0
              ? 0
              : calculatePercentage(value, dataStore.count)}
            %)
          </p>
          {/* <input type='color' name={key} onChange={(e) => onColorChange(e)} /> */}
        </li>
      );
    }

    return (
      <>
        <ul className='flex gap-x-6 gap-y-4'>{list}</ul>
        {list.length > 0 && (
          <button
            className='w-max px-2 py-1 mt-4 bg-slate-200 border border-black'
            onClick={() => setShowChart(true)}
          >
            Generate Chart
          </button>
        )}
      </>
    );
  };

  const generateChart = () => {
    const labels = Array.from(dataStore.csvData.keys());
    const values =
      chartType === 'bar'
        ? Array.from(dataStore.csvData.values())
        : convertNumbersToPercentage(
            dataStore.csvData.values(),
            dataStore.count
          );

    const data = {
      labels: labels,
      datasets: [
        {
          label: '# of votes',
          backgroundColor: chartColors,
          //   borderColor: 'rgb(255, 99, 132)',
          data: values,
        },
      ],
    };

    return chartType === 'bar' ? (
      <Bar data={data} options={getChartOptions(dataStore.chartName)} />
    ) : (
      <Pie data={data} options={getChartOptions(dataStore.chartName)} />
    );
  };

  const changeChartType = () => {
    if (chartType === 'bar') {
      setChartType('pie');
    } else {
      setChartType('bar');
    }
  };

  return (
    <section className='w-full py-10 flex flex-col items-center'>
      <>{displayData()}</>
      <div className='w-4/5 mt-10'>{showChart && generateChart()}</div>

      {showChart && (
        <button
          className='w-max mt-10 px-2 py-1 bg-slate-200 border border-black'
          onClick={changeChartType}
        >
          {chartType === 'bar' ? 'Show Pie Chart' : 'Show Bar Chart'}
        </button>
      )}
    </section>
  );
}
