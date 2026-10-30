import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import * as authApi from '../api/authApi';
import { resetAuthProvidersCache } from '../auth/useAuthProviders';

vi.mock('../api/authApi', () => ({
  resendVerification: vi.fn(),
  fetchAuthProviders: vi.fn(),
  GOOGLE_SIGN_IN_URL: '/api/v1/auth/oauth2/authorization/google',
}));

beforeEach(() => {
  vi.mocked(authApi.fetchAuthProviders).mockResolvedValue({ google: false });
});

afterEach(() => {
  resetAuthProvidersCache();
});

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
    expect(screen.getByText(/At least 10 characters/)).toBeInTheDocument();
    expect(screen.getByTestId('password-tip')).toHaveTextContent('letters, digits and symbols');
    expect(screen.getByRole('link', { name: 'Log in' })).toHaveAttribute('href', '/login');
  });

  it('frames the rules and the tip together in one rounded yellow box', () => {
    renderPage(ctx());
    const box = screen.getByTestId('password-requirements');
    expect(box).toHaveClass('rounded-xl', 'border-2', 'border-yellow-400', 'bg-yellow-50');
    expect(box).toContainElement(screen.getByTestId('password-rule-min-length'));
    expect(box).toContainElement(screen.getByTestId('password-tip'));
    expect(screen.getByTestId('password-tip')).not.toHaveClass('border-2');
  });

  it('ticks the length rule live as the password is typed', () => {
    renderPage(ctx());
    const rule = () => screen.getByTestId('password-rule-min-length');
    expect(rule()).toHaveAttribute('data-met', 'false');
    fireEvent.change(screen.getByTestId('register-password'), { target: { value: '1234567890' } });
    expect(rule()).toHaveAttribute('data-met', 'true');
    fireEvent.change(screen.getByTestId('register-password'), { target: { value: '123456789' } });
    expect(rule()).toHaveAttribute('data-met', 'false');
  });

  it('flags a password over 72 UTF-8 bytes and does not submit it', () => {
    const value = ctx();
    renderPage(value);
    const tooLong = 'é'.repeat(37); // 74 bytes
    fireEvent.change(screen.getByTestId('register-password'), { target: { value: tooLong } });
    expect(screen.getByTestId('password-rule-max-bytes')).toHaveAttribute('data-met', 'false');
    fill(tooLong, tooLong);
    expect(screen.getByTestId('field-error-password')).toHaveTextContent('must not exceed 72 bytes');
    expect(value.register).not.toHaveBeenCalled();
  });

  it('rejects a password containing the email without a request', () => {
    const value = ctx();
    renderPage(value);
    fireEvent.change(screen.getByTestId('register-email'), { target: { value: 'janedoe@site.org' } });
    fireEvent.change(screen.getByTestId('register-password'), { target: { value: 'my-janedoe-pass' } });
    expect(screen.getByTestId('password-rule-no-email')).toHaveAttribute('data-met', 'false');
    fireEvent.change(screen.getByTestId('register-password-confirm'), { target: { value: 'my-janedoe-pass' } });
    fireEvent.click(screen.getByTestId('register-submit'));
    expect(screen.getByTestId('field-error-password')).toHaveTextContent('must not contain your email');
    expect(value.register).not.toHaveBeenCalled();
  });

  it('shows the breached-password error under the password field', async () => {
    const problem = { type: 't', title: 'Bad', status: 400, errors: { password: 'This password has appeared in a data breach. Choose a different one.' } };
    renderPage(ctx(vi.fn().mockRejectedValue(new ApiError(400, 'Bad', problem))));
    fill('password-from-a-leak', 'password-from-a-leak');
    expect(await screen.findByTestId('field-error-password')).toHaveTextContent('appeared in a data breach');
  });

  it('shows the server blocklist error under the password field', async () => {
    const problem = { type: 't', title: 'Bad', status: 400, errors: { password: 'Password is too common, choose a less predictable one' } };
    renderPage(ctx(vi.fn().mockRejectedValue(new ApiError(400, 'Bad', problem))));
    fill('password123', 'password123');
    expect(await screen.findByTestId('field-error-password')).toHaveTextContent('too common');
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
    expect(value.register).toHaveBeenCalledWith('a@b.co', 'long-enough-pw', '');
    expect(panel).toHaveTextContent('We sent a link to a@b.co. It expires in 24 hours.');
    expect(screen.queryByText('home')).not.toBeInTheDocument();
    expect(value.login).not.toHaveBeenCalled();
    expect(screen.queryByTestId('register-submit')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Back to log in' })).toHaveAttribute('href', '/login');
  });

  it('has a honeypot field that people cannot reach or see', () => {
    renderPage(ctx());
    const field = screen.getByTestId('register-website');
    expect(field).toHaveAttribute('tabindex', '-1');
    expect(field).toHaveAttribute('autocomplete', 'off');
    expect(field.parentElement).toHaveAttribute('aria-hidden', 'true');
  });

  it('sends a filled honeypot value to register', async () => {
    const value = ctx();
    renderPage(value);
    fireEvent.change(screen.getByTestId('register-website'), { target: { value: 'http://spam' } });
    fill('long-enough-pw', 'long-enough-pw');
    await screen.findByTestId('register-check-email');
    expect(value.register).toHaveBeenCalledWith('a@b.co', 'long-enough-pw', 'http://spam');
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

  it('shows the server detail when the request is rate limited', async () => {
    renderPage(ctx(vi.fn().mockRejectedValue(new ApiError(429, 'Too many attempts'))));
    fill('long-enough-pw', 'long-enough-pw');
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Too many attempts');
  });

  it('shows Continue with Google above the form when Google sign-in is on', async () => {
    vi.mocked(authApi.fetchAuthProviders).mockResolvedValue({ google: true });
    renderPage(ctx());
    const link = await screen.findByTestId('google-sign-in');
    expect(link).toHaveAttribute('href', authApi.GOOGLE_SIGN_IN_URL);
    expect(link.compareDocumentPosition(screen.getByTestId('register-email')) & Node.DOCUMENT_POSITION_FOLLOWING)
      .toBeTruthy();
    expect(screen.getByTestId('register-website')).toBeInTheDocument();
  });

  it('hides Continue with Google when Google sign-in is off', async () => {
    renderPage(ctx());
    await act(() => new Promise(resolve => setTimeout(resolve, 0)));
    expect(screen.queryByTestId('google-sign-in')).toBeNull();
    expect(screen.queryByTestId('auth-divider')).toBeNull();
  });
});
