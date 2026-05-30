import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import GrammarPage from './pages/GrammarPage';
import IWishPage from './pages/IWishPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import PageShell from './components/PageShell';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route element={<PageShell><Outlet /></PageShell>}>
            <Route path="/" element={<HomePage />} />
            <Route path="/phrasal-verbs" element={<App />} />
            <Route path="/grammar" element={<GrammarPage />} />
            <Route path="/grammar/i-wish-if-only" element={<IWishPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
