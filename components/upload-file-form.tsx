'use client';

import React, { useState } from 'react';
import Papa from 'papaparse';
import { useDataStore } from '@/utils/use-bear-store';

export default function UploadFileForm() {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const dataStore = useDataStore();
  const [renderKey, setRenderKey] = useState(0);

  const onSurveyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    dataStore.setChartname(value);
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!csvFile) {
      alert('Please upload a .csv file');
      return;
    }

    Papa.parse(csvFile, {
      download: true,
      header: false,
      skipEmptyLines: true,
      complete: processCSVOutput,
    });
  };

  const resetData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCsvFile(null);
    dataStore.reset();
    //force re-render the file input
    setRenderKey(!renderKey ? 1 : 0);
  };

  const processCSVOutput = (results: Papa.ParseResult<unknown>) => {
    const { data } = results;
    let csvData = new Map<string, number>();
    let count = 0;

    for (let i = 0; i < data.length; i++) {
      let str = (data[i] as string[])[0];
      let arr = str.split(',');
      arr.forEach((item) => {
        count++;
        let key = item.trim();
        csvData.set(key, (csvData.get(key) || 0) + 1);
      });
    }

    dataStore.setCsvData(csvData);
    dataStore.setCount(count);
  };

  const onCsvUploaded = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setCsvFile(file);
  };

  return (
    <>
      <form className='flex flex-col'>
        <label htmlFor='uploadFile' className='mb-1 font-semibold text-2xl'>
          Upload a CSV file
        </label>
        <input
          className='mb-4'
          id='uploadFile'
          name='uploadFile'
          type='file'
          onChange={onCsvUploaded}
          key={renderKey}
          accept='.csv'
        />
        <label htmlFor='surveyName'>Survey Name (Optional)</label>
        <input
          type='text'
          name='surveyName'
          className='px-4 py-2 border border-black rounded-md'
          onChange={(e) => onSurveyNameChange(e)}
          value={dataStore.chartName}
        />
        <div className='flex gap-x-4'>
          <button
            className='w-max px-2 py-1 mt-4 bg-slate-200 border border-black disabled:opacity-50'
            onClick={submit}
            disabled={csvFile === null}
          >
            Generate Data
          </button>
          <button
            className='w-max px-2 py-1 mt-4 bg-slate-200 border border-black disabled:opacity-50'
            onClick={resetData}
            disabled={csvFile === null}
          >
            Reset Data
          </button>
        </div>
      </form>
    </>
  );
}
