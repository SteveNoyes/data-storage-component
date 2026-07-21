import { useRef, useEffect } from 'react';

export function useChart(createChartFn, data, options) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    if (chartRef.current) {
      chartRef.current.config.data = data;
      chartRef.current.update();
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    chartRef.current = createChartFn(ctx, data, options);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, options, createChartFn]);

  return canvasRef;
}
