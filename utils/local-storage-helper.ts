'use client';
export const getDataFromLocalStorage = () => {
  const jsonStr = localStorage.getItem('chartData');
  if (!jsonStr) {
    return {
      fileName: null,
      chartName: '',
      chartData: new Map<string, string | number>(),
    };
  }

  try {
    const obj = JSON.parse(jsonStr);
    return obj;
  } catch (error) {
    console.log(error);
    return {
      fileName: null,
      chartName: '',
      chartData: new Map<string, string | number>(),
    };
  }
};

export const saveDataToLocalStorage = (
  fileName: string,
  chartName: string,
  chartData: Map<string, number | string>
) => {
  const data = { fileName, chartName, chartData };
  localStorage.setItem('chartData', JSON.stringify(data));
};
