import { calculatePercentage } from './calculation-helper';

export const convertNumbersToPercentage = (
  values: IterableIterator<number>,
  total: number
) => {
  if (total === 0) {
    return new Array([...values].length).fill(0);
  }

  let arr = [];

  for (let value of values) {
    arr.push(calculatePercentage(value, total));
  }

  return arr;
};

export const convertKeyValuePairToArray = (
  data: Map<string, number>
): (string | number | string)[][] => {
  let arr = [];

  for (let [key, value] of data) {
    arr.push([key, value]);
  }

  return arr;
};
