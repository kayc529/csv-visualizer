import { create } from 'zustand';

interface UseDataStoreProps {
  count: number;
  chartName: string;
  csvData: Map<string, number>;
  isShowChart: boolean;
  showChart: () => void;
  setCsvData: (newData: Map<string, number>) => void;
  setCount: (newCount: number) => void;
  setChartname: (newName: string) => void;
  reset: () => void;
}
export const useDataStore = create<UseDataStoreProps>((set) => ({
  count: 0,
  chartName: '',
  csvData: new Map(),
  isShowChart: false,
  showChart: () => set({ isShowChart: true }),
  setCsvData: (newData: Map<string, number>) => set({ csvData: newData }),
  setCount: (newCount: number) => set({ count: newCount }),
  setChartname: (newName: string) => set({ chartName: newName }),
  reset: () =>
    set({ count: 0, chartName: '', csvData: new Map(), isShowChart: false }),
}));
