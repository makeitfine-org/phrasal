import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import * as authApi from '../api/authApi';

vi.mock('../api/authApi', () => ({ resendVerification: vi.fn() }));

function ctx(register = vi.fn().mockResolvedValue(undefined)): AuthContextValue {
  return { status: 'anonymous', user: null, login: vi.fn(), register, logout: vi.fn(), refresh: vi.fn() };
}

function renderPage(value: AuthContextValue) {
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={['/register']}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/" element={<div>home</div>} />
          <Route path="/login" element={<div>login</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

function fill(password: string, confirm: string) {
  fireEvent.change(screen.getByTestId('register-email'), { target: { value: 'a@b.co' } });
  fireEvent.change(screen.getByTestId('register-password'), { target: { value: password } });
  fireEvent.change(screen.getByTestId('register-password-confirm'), { target: { value: confirm } });
  fireEvent.click(screen.getByTestId('register-submit'));
}

describe('RegisterPage', () => {
  it('shows the length hint and login link', () => {
    renderPage(ctx());
    expect(screen.getByText('At least 10 characters')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute('href', '/login');
  });

  it('rejects mismatched passwords without a request', () => {
    const value = ctx();
    renderPage(value);
    fill('long-enough-pw', 'different-pw-x');
    expect(screen.getByTestId('field-error-confirm')).toBeInTheDocument();
    expect(value.register).not.toHaveBeenCalled();
  });

  it('rejects short passwords without a request', () => {
    const value = ctx();
    renderPage(value);
    fill('short', 'short');
    expect(screen.getByTestId('field-error-password')).toBeInTheDocument();
    expect(value.register).not.toHaveBeenCalled();
  });

  it('shows the check-your-inbox panel without navigating or logging in', async () => {
    const value = ctx();
    renderPage(value);
    fill('long-enough-pw', 'long-enough-pw');
    const panel = await screen.findByTestId('register-check-email');
    expect(value.register).toHaveBeenCalledWith('a@b.co', 'long-enough-pw');
    expect(panel).toHaveTextContent('We sent a link to a@b.co. It expires in 24 hours.');
    expect(screen.queryByText('home')).not.toBeInTheDocument();
    expect(value.login).not.toHaveBeenCalled();
    expect(screen.queryByTestId('register-submit')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to log in' })).toHaveAttribute('href', '/login');
  });

  it('offers to resend to the entered email', async () => {
    vi.mocked(authApi.resendVerification).mockResolvedValue(undefined);
    renderPage(ctx());
    fill('long-enough-pw', 'long-enough-pw');
    fireEvent.click(await screen.findByTestId('resend-verification'));
    await waitFor(() => expect(authApi.resendVerification).toHaveBeenCalledWith('a@b.co'));
    expect(await screen.findByTestId('resend-done')).toBeInTheDocument();
  });

  it('shows a server field error under the field', async () => {
    const problem = { type: 't', title: 'Bad', status: 400, errors: { password: 'Too weak' } };
    renderPage(ctx(vi.fn().mockRejectedValue(new ApiError(400, 'Bad', problem))));
    fill('long-enough-pw', 'long-enough-pw');
    expect(await screen.findByTestId('field-error-password')).toHaveTextContent('Too weak');
  });

  it('shows duplicate-email message with a login link', async () => {
    renderPage(ctx(vi.fn().mockRejectedValue(new ApiError(409, 'Conflict'))));
    fill('long-enough-pw', 'long-enough-pw');
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('An account with this email already exists');
    expect(screen.getAllByRole('link', { name: 'Log in' })).toHaveLength(2);
  });

  it('shows other errors in an alert', async () => {
    renderPage(ctx(vi.fn().mockRejectedValue(new ApiError(429, 'Too many attempts'))));
    fill('long-enough-pw', 'long-enough-pw');
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Too many attempts');
  });
});
