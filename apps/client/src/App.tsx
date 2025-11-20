import { useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import { DashboardProvider } from './context/DashboardContext';
import Functions from './pages/Functions';
import Settings from './pages/Settings';
import Topics from './pages/Topics';

function AppContent() {
  const refTimeline = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isTopicsRoute = location.pathname === '/topics';

  return (
    <div
      data-name="dashboard-content"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0a0b0f 0%, #1a1b2f 100%)',
        display: 'flex',
        flexDirection: 'column',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Routes>
        <Route path="/" element={<>Hello</>} />
        <Route path="/topics" element={<Topics timelineRef={refTimeline} />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      {isTopicsRoute && <div ref={refTimeline} />}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <DashboardProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </DashboardProvider>
  );
}

export default App;
