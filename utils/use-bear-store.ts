import { create } from 'zustand';

interface UseDataStoreProps {
  count: number;
  chartName: string;
  csvData: Map<string, number>;
  setCsvData: (newData: Map<string, number>) => void;
  setCount: (newCount: number) => void;
  setChartname: (newName: string) => void;
}
export const useDataStore = create<UseDataStoreProps>((set) => ({
  count: 0,
  chartName: '',
  csvData: new Map(),
  setCsvData: (newData: Map<string, number>) => set({ csvData: newData }),
  setCount: (newCount: number) => set({ count: newCount }),
  setChartname: (newName: string) => set({ chartName: newName }),
}));
