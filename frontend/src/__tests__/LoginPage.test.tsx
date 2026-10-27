import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';

function ctx(overrides: Partial<AuthContextValue> = {}): AuthContextValue {
  return {
    status: 'anonymous', user: null,
    login: vi.fn().mockResolvedValue(undefined), register: vi.fn(), logout: vi.fn(), refresh: vi.fn(),
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
          <Route path="/register" element={<div>register</div>} />
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

  it('redirects an authenticated user', () => {
    renderPage(ctx({ status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER' } }));
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
