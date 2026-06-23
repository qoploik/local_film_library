import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import WatchedPage from './pages/WatchedPage';
import ToWatchPage from './pages/ToWatchPage';
import ComparePage from './pages/ComparePage';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <Navigation />
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <Routes>
              <Route path="/" element={<Navigate to="/watched" replace />} />
              <Route path="/watched" element={<WatchedPage />} />
              <Route path="/to-watch" element={<ToWatchPage />} />
              <Route path="/compare" element={<ComparePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
