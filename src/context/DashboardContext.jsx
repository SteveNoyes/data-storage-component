import { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { STORAGE_KEYS } from '../utils/constants.js';

const DashboardContext = createContext(null);

function getInitialState() {
  const savedInterval = localStorage.getItem(STORAGE_KEYS.REFRESH_INTERVAL);
  const savedMonths = localStorage.getItem(STORAGE_KEYS.MONTHS_DISPLAY);
  return {
    rawData: [],
    aggregatedData: {},
    loading: true,
    error: null,
    theme: localStorage.getItem('theme') || 'light',
    lastRefreshed: null,
    refreshInterval: savedInterval ? Number(savedInterval) : 0,
    monthsDisplay: savedMonths ? Number(savedMonths) : 12,
  };
}

function dashboardReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, rawData: action.payload, loading: false, error: null, lastRefreshed: new Date() };
    case 'SET_AGGREGATED':
      return { ...state, aggregatedData: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'REFRESH':
      return { ...state, loading: true };
    case 'SET_REFRESH_INTERVAL':
      localStorage.setItem(STORAGE_KEYS.REFRESH_INTERVAL, String(action.payload));
      return { ...state, refreshInterval: action.payload };
    case 'SET_MONTHS_DISPLAY':
      localStorage.setItem(STORAGE_KEYS.MONTHS_DISPLAY, String(action.payload));
      return { ...state, monthsDisplay: action.payload };
    default:
      return state;
  }
}

export function DashboardProvider({ children }) {
  const [state, dispatch] = useReducer(dashboardReducer, null, getInitialState);
  const dispatchRef = useRef(dispatch);

  useEffect(() => {
    dispatchRef.current = dispatch;
  }, [dispatch]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
