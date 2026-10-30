import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import * as authApi from '../api/authApi';

vi.mock('../api/authApi', () => ({ resendVerification: vi.fn() }));

function ForgotEmail() {
  const state = useLocation().state as { email?: string } | null;
  return <div data-testid="forgot-stub">{state?.email}</div>;
}

function TwoFactorStub() {
  const state = useLocation().state as { from?: string } | null;
  return <div data-testid="two-factor-stub">{state?.from ?? 'no-from'}</div>;
}

function ctx(overrides: Partial<AuthContextValue> = {}): AuthContextValue {
  return {
    status: 'anonymous', user: null,
    login: vi.fn().mockResolvedValue('authenticated'), completeTwoFactorLogin: vi.fn(), register: vi.fn(), logout: vi.fn(), refresh: vi.fn(),
    ...overrides,
  };
}

function renderPage(value: AuthContextValue, entry: string | { pathname: string; state: unknown } = '/login') {
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<div>home</div>} />
          <Route path="/grammar" element={<div>grammar</div>} />
          <Route path="/login/2fa" element={<TwoFactorStub />} />
          <Route path="/register" element={<div>register</div>} />
          <Route path="/forgot-password" element={<ForgotEmail />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

function fillAndSubmit() {
  fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'a@b.co' } });
  fireEvent.change(screen.getByTestId('login-password'), { target: { value: 'secret' } });
  fireEvent.click(screen.getByTestId('login-submit'));
}

describe('LoginPage', () => {
  it('renders the fields and signup link', () => {
    renderPage(ctx());
    expect(screen.getByTestId('login-email')).toHaveAttribute('type', 'email');
    expect(screen.getByTestId('login-password')).toHaveAttribute('autocomplete', 'current-password');
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute('href', '/register');
  });

  it('navigates to the code step and passes from along', async () => {
    const value = ctx({ login: vi.fn().mockResolvedValue('two-factor-required') });
    renderPage(value, { pathname: '/login', state: { from: '/grammar' } });
    fillAndSubmit();
    await waitFor(() => expect(screen.getByTestId('two-factor-stub')).toHaveTextContent('/grammar'));
  });

  it('submits typed values and navigates home', async () => {
    const value = ctx();
    renderPage(value);
    fillAndSubmit();
    await waitFor(() => expect(screen.getByText('home')).toBeInTheDocument());
    expect(value.login).toHaveBeenCalledWith('a@b.co', 'secret');
  });

  it('navigates to the from location', async () => {
    renderPage(ctx(), { pathname: '/login', state: { from: '/grammar' } });
    fillAndSubmit();
    await waitFor(() => expect(screen.getByText('grammar')).toBeInTheDocument());
  });

  it('disables the button while pending', async () => {
    let resolve!: () => void;
    const login = vi.fn(() => new Promise<void>(r => { resolve = r; }));
    renderPage(ctx({ login }));
    fillAndSubmit();
    await waitFor(() => expect(screen.getByTestId('login-submit')).toBeDisabled());
    expect(screen.getByTestId('login-submit')).toHaveTextContent('Logging in…');
    resolve();
    await waitFor(() => expect(screen.getByText('home')).toBeInTheDocument());
  });

  it('shows the server message on failure', async () => {
    const login = vi.fn().mockRejectedValue(new ApiError(401, 'Invalid email or password'));
    renderPage(ctx({ login }));
    fillAndSubmit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email or password');
    expect(screen.getByTestId('login-submit')).not.toBeDisabled();
  });

  it('offers a resend when the email is not verified', async () => {
    vi.mocked(authApi.resendVerification).mockResolvedValue(undefined);
    const problem = { type: 'https://phrasal.net/problems/email-not-verified', status: 403 };
    const login = vi.fn().mockRejectedValue(new ApiError(403, 'Email not verified', problem));
    renderPage(ctx({ login }));
    fillAndSubmit();
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Please confirm your email first. Check your inbox.');
    fireEvent.click(screen.getByTestId('resend-verification'));
    await waitFor(() => expect(authApi.resendVerification).toHaveBeenCalledWith('a@b.co'));
  });

  it('shows no resend for a 401', async () => {
    const login = vi.fn().mockRejectedValue(new ApiError(401, 'Invalid email or password'));
    renderPage(ctx({ login }));
    fillAndSubmit();
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid email or password');
    expect(screen.queryByTestId('resend-verification')).not.toBeInTheDocument();
  });

  it('links to forgot-password and carries the typed email', () => {
    renderPage(ctx());
    fireEvent.change(screen.getByTestId('login-email'), { target: { value: 'a@b.co' } });
    fireEvent.click(screen.getByTestId('forgot-password-link'));
    expect(screen.getByTestId('forgot-stub')).toHaveTextContent('a@b.co');
  });

  it('redirects an authenticated user', () => {
    renderPage(ctx({ status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER', twoFactorEnabled: false, twoFactorEnrollmentRequired: false } }));
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
