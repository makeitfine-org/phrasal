import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import * as authApi from '../api/authApi';

vi.mock('../api/authApi', () => ({ resetPassword: vi.fn() }));

const VALID = 'new-secret-password';

function ctx(overrides: Partial<AuthContextValue> = {}): AuthContextValue {
  return {
    status: 'anonymous', user: null, login: vi.fn(), register: vi.fn(), logout: vi.fn(),
    refresh: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

function Location() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname + location.search}</span>;
}

function renderPage(entry = '/reset-password?token=abc', value = ctx()) {
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[entry]}>
        <Location />
        <Routes>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/" element={<div>home</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  return value;
}

function fill(password = VALID, confirm = password) {
  fireEvent.change(screen.getByTestId('reset-password'), { target: { value: password } });
  fireEvent.change(screen.getByTestId('reset-password-confirm'), { target: { value: confirm } });
}

const submit = () => fireEvent.click(screen.getByTestId('reset-submit'));
const state = () => screen.getByTestId('reset-status').getAttribute('data-state');
const problem = (slug: string) => new ApiError(400, 'x', { type: `https://phrasal.net/problems/${slug}` });

beforeEach(() => {
  vi.mocked(authApi.resetPassword).mockReset().mockResolvedValue(undefined);
});

describe('ResetPasswordPage', () => {
  it('removes the token from the location and calls nothing before submit', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent(/^\/reset-password$/));
    expect(state()).toBe('form');
    expect(authApi.resetPassword).not.toHaveBeenCalled();
  });

  it('shows incomplete with a request-a-new-link link when there is no token', () => {
    renderPage('/reset-password');
    expect(state()).toBe('incomplete');
    expect(screen.getByTestId('reset-request-new-link')).toHaveAttribute('href', '/forgot-password');
  });

  it('rejects mismatched passwords without a request', () => {
    renderPage();
    fill(VALID, 'something-else-entirely');
    submit();
    expect(screen.getByTestId('field-error-confirm')).toHaveTextContent('Passwords do not match');
    expect(authApi.resetPassword).not.toHaveBeenCalled();
  });

  it('rejects a 9-character password without a request', () => {
    renderPage();
    fill('123456789');
    submit();
    expect(screen.getByTestId('field-error-password')).toHaveTextContent('at least 10 characters');
    expect(authApi.resetPassword).not.toHaveBeenCalled();
  });

  it('submits once with the token, disables the button while pending, then shows success', async () => {
    let resolve: () => void = () => {};
    vi.mocked(authApi.resetPassword).mockReturnValue(new Promise<void>(r => { resolve = r; }));
    const value = renderPage();
    fill();
    submit();
    await waitFor(() => expect(screen.getByTestId('reset-submit')).toBeDisabled());
    expect(screen.getByTestId('reset-submit')).toHaveTextContent('Saving…');
    resolve();
    await waitFor(() => expect(state()).toBe('success'));
    expect(authApi.resetPassword).toHaveBeenCalledTimes(1);
    expect(authApi.resetPassword).toHaveBeenCalledWith('abc', VALID);
    expect(screen.getByTestId('reset-login-link')).toHaveAttribute('href', '/login');
    expect(value.refresh).toHaveBeenCalled();
  });

  it('does not redirect an authenticated visitor', () => {
    renderPage('/reset-password?token=abc', ctx({
      status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER', twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true },
    }));
    expect(state()).toBe('form');
  });

  it('shows expired for an expired link', async () => {
    vi.mocked(authApi.resetPassword).mockRejectedValue(problem('reset-link-expired'));
    renderPage();
    fill();
    submit();
    await waitFor(() => expect(state()).toBe('expired'));
    expect(screen.getByText('This link has expired.')).toBeInTheDocument();
    expect(screen.getByTestId('reset-request-new-link')).toBeInTheDocument();
  });

  it('shows invalid for an invalid or used link', async () => {
    vi.mocked(authApi.resetPassword).mockRejectedValue(problem('reset-link-invalid'));
    renderPage();
    fill();
    submit();
    await waitFor(() => expect(state()).toBe('invalid'));
    expect(screen.getByTestId('reset-request-new-link')).toBeInTheDocument();
  });

  it('shows the breached-password error under the password field', async () => {
    vi.mocked(authApi.resetPassword).mockRejectedValueOnce(
      new ApiError(400, 'Validation Error', { errors: { password: 'This password has appeared in a data breach. Choose a different one.' } }),
    );
    renderPage();
    fill();
    submit();
    expect(await screen.findByTestId('field-error-password')).toHaveTextContent('appeared in a data breach');
    expect(state()).toBe('form');
  });

  it('keeps the form after a server password error and lets the same link be used again', async () => {
    vi.mocked(authApi.resetPassword).mockRejectedValueOnce(
      new ApiError(400, 'Validation Error', { errors: { password: 'Password must not contain your email address' } }),
    );
    renderPage();
    fill();
    submit();
    expect(await screen.findByTestId('field-error-password')).toHaveTextContent('email address');
    expect(state()).toBe('form');
    submit();
    await waitFor(() => expect(state()).toBe('success'));
    expect(authApi.resetPassword).toHaveBeenCalledTimes(2);
    expect(authApi.resetPassword).toHaveBeenLastCalledWith('abc', VALID);
  });

  it('shows the server detail for a 429 and keeps the form', async () => {
    vi.mocked(authApi.resetPassword).mockRejectedValue(new ApiError(429, 'Too many requests, try later'));
    renderPage();
    fill();
    submit();
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Too many requests, try later');
    expect(state()).toBe('form');
  });

  it('shows the generic message for a network error and keeps the form', async () => {
    vi.mocked(authApi.resetPassword).mockRejectedValue(new TypeError('Failed to fetch'));
    renderPage();
    fill();
    submit();
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Something went wrong. Please try again.');
    expect(state()).toBe('form');
  });

  it('has no "contains your email" rule in the requirements box', () => {
    renderPage();
    expect(screen.getByTestId('password-requirements')).toBeInTheDocument();
    expect(screen.queryByTestId('password-rule-no-email')).not.toBeInTheDocument();
  });

  it('disables the submit while the auth status is loading', () => {
    renderPage('/reset-password?token=abc', ctx({ status: 'loading' }));
    expect(screen.getByTestId('reset-submit')).toBeDisabled();
  });
});
