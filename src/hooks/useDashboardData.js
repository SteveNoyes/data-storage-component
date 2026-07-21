import { useEffect, useCallback, useRef } from 'react';
import { useDashboard } from '../context/DashboardContext.jsx';
import { generateData } from '../services/dataGenerator.js';
import { computeAggregations } from '../utils/aggregators.js';

export function useDashboardData() {
  const { state, dispatch } = useDashboard();
  const intervalRef = useRef(null);

  const loadData = useCallback(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const data = generateData();
      dispatch({ type: 'SET_DATA', payload: data });
      const aggregated = computeAggregations(data);
      dispatch({ type: 'SET_AGGREGATED', payload: aggregated });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, [dispatch]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (state.refreshInterval > 0) {
      intervalRef.current = setInterval(loadData, state.refreshInterval);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [state.refreshInterval, loadData]);

  const refresh = () => {
    loadData();
  };

  return { ...state, refresh };
}
