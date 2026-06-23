import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import GrammarPage from './pages/GrammarPage';
import PhrasalVerbsPage from './pages/PhrasalVerbsPage';
import PhrasalVerbsListPage from './pages/PhrasalVerbsListPage';
import VerbDetailPage from './pages/VerbDetailPage';
import ParticlesPage from './pages/particles/ParticlesPage';
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
            <Route path="/phrasal-verbs" element={<PhrasalVerbsPage />} />
            <Route path="/phrasal-verbs/test-most-popular" element={<App />} />
            <Route path="/phrasal-verbs/particles" element={<ParticlesPage />} />
            <Route path="/phrasal-verbs/list" element={<PhrasalVerbsListPage />} />
            <Route path="/phrasal-verbs/list/:verb" element={<VerbDetailPage />} />
            <Route path="/grammar" element={<GrammarPage />} />
            <Route path="/grammar/i-wish-if-only" element={<IWishPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
