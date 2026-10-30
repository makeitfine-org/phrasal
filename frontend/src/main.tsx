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
import LoginTwoFactorPage from './pages/LoginTwoFactorPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import VerifyEmailPage from './pages/VerifyEmailPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/ErrorBoundary';
import PageShell from './components/PageShell';
import { AuthProvider } from './auth/AuthContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
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
            <Route path="/login" element={<LoginPage />} />
            <Route path="/login/2fa" element={<LoginTwoFactorPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
