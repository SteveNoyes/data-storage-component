import { Routes, Route } from 'react-router-dom';
import { DashboardProvider } from './context/DashboardContext.jsx';
import Layout from './components/Layout/Layout.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Settings from './pages/Settings/Settings.jsx';

export default function App() {
  return (
    <DashboardProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </DashboardProvider>
  );
}
