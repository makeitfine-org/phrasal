import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import GrammarPage from './pages/GrammarPage';
import PhrasalVerbsPage from './pages/PhrasalVerbsPage';
import PhrasalVerbsListPage from './pages/PhrasalVerbsListPage';
import GetVerbPage from './pages/get/GetVerbPage';
import MakeVerbPage from './pages/make/MakeVerbPage';
import PutVerbPage from './pages/put/PutVerbPage';
import TakeVerbPage from './pages/take/TakeVerbPage';
import GiveVerbPage from './pages/give/GiveVerbPage';
import GoVerbPage from './pages/go/GoVerbPage';
import ComeVerbPage from './pages/come/ComeVerbPage';
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
            <Route path="/phrasal-verbs/list" element={<PhrasalVerbsListPage />} />
            <Route path="/phrasal-verbs/list/get" element={<GetVerbPage />} />
            <Route path="/phrasal-verbs/list/make" element={<MakeVerbPage />} />
            <Route path="/phrasal-verbs/list/put" element={<PutVerbPage />} />
            <Route path="/phrasal-verbs/list/take" element={<TakeVerbPage />} />
            <Route path="/phrasal-verbs/list/give" element={<GiveVerbPage />} />
            <Route path="/phrasal-verbs/list/go" element={<GoVerbPage />} />
            <Route path="/phrasal-verbs/list/come" element={<ComeVerbPage />} />
            <Route path="/grammar" element={<GrammarPage />} />
            <Route path="/grammar/i-wish-if-only" element={<IWishPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
