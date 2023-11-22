export const getChartOptions = (chartName: string | undefined) => {
  return {
    //   responsive: true,
    plugins: {
      colors: {
        enabled: true,
      },
      title: {
        display: true,
        text: chartName || '',
        font: {
          size: 20,
        },
      },
    },
  };
};

export const chartColors = [
  '#ff3b3b',
  '#ff7f3b',
  '#ffbe3b',
  '#fff53b',
  '#c4ff3b',
  '#3bff86',
  '#3bd8ff',
  '#3b83ff',
  '#683bff',
  '#c43bff',
  '#ff3be5',
];
