import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import * as authApi from '../api/authApi';

vi.mock('../api/authApi', () => ({ forgotPassword: vi.fn() }));

const anonymous: AuthContextValue = {
  status: 'anonymous', user: null, login: vi.fn(), register: vi.fn(), logout: vi.fn(), refresh: vi.fn(),
};

function renderPage(
  value: AuthContextValue = anonymous,
  entry: string | { pathname: string; state: unknown } = '/forgot-password',
) {
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={<div>home</div>} />
          <Route path="/login" element={<div>login</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

function submit(email = 'a@b.co') {
  fireEvent.change(screen.getByTestId('forgot-email'), { target: { value: email } });
  fireEvent.click(screen.getByTestId('forgot-submit'));
}

beforeEach(() => {
  vi.mocked(authApi.forgotPassword).mockReset().mockResolvedValue(undefined);
});

describe('ForgotPasswordPage', () => {
  it('is empty without router state', () => {
    renderPage();
    expect(screen.getByTestId('forgot-email')).toHaveValue('');
  });

  it('prefills the email from the router state', () => {
    renderPage(anonymous, { pathname: '/forgot-password', state: { email: 'x@y.co' } });
    expect(screen.getByTestId('forgot-email')).toHaveValue('x@y.co');
  });

  it('submits the typed email and shows the check-your-inbox panel', async () => {
    renderPage();
    submit('typed@y.co');
    const panel = await screen.findByTestId('forgot-check-email');
    expect(authApi.forgotPassword).toHaveBeenCalledWith('typed@y.co');
    expect(panel).toHaveTextContent('typed@y.co');
    expect(panel).toHaveTextContent('1 hour');
    expect(screen.queryByTestId('forgot-email')).not.toBeInTheDocument();
    expect(screen.getByTestId('forgot-login-link')).toHaveAttribute('href', '/login');
  });

  it('disables the button while pending', async () => {
    let resolve: () => void = () => {};
    vi.mocked(authApi.forgotPassword).mockReturnValue(new Promise<void>(r => { resolve = r; }));
    renderPage();
    submit();
    await waitFor(() => expect(screen.getByTestId('forgot-submit')).toBeDisabled());
    expect(screen.getByTestId('forgot-submit')).toHaveTextContent('Sending…');
    resolve();
    await screen.findByTestId('forgot-check-email');
  });

  it('shows the server detail for a 429 and no panel', async () => {
    vi.mocked(authApi.forgotPassword).mockRejectedValue(new ApiError(429, 'Too many requests, try later'));
    renderPage();
    submit();
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Too many requests, try later');
    expect(screen.queryByTestId('forgot-check-email')).not.toBeInTheDocument();
    expect(screen.getByTestId('forgot-submit')).not.toBeDisabled();
  });

  it('shows a field error from a 400', async () => {
    vi.mocked(authApi.forgotPassword).mockRejectedValue(
      new ApiError(400, 'Validation Error', { errors: { email: 'must be a well-formed email address' } }),
    );
    renderPage();
    submit();
    expect(await screen.findByTestId('field-error-email')).toHaveTextContent('well-formed');
    expect(screen.queryByTestId('forgot-check-email')).not.toBeInTheDocument();
  });

  it('shows the generic message for a network error and no panel', async () => {
    vi.mocked(authApi.forgotPassword).mockRejectedValue(new TypeError('Failed to fetch'));
    renderPage();
    submit();
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Something went wrong. Please try again.');
    expect(screen.queryByTestId('forgot-check-email')).not.toBeInTheDocument();
  });

  it('redirects an authenticated user', () => {
    renderPage({ ...anonymous, status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER', twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true } });
    expect(screen.getByText('home')).toBeInTheDocument();
  });
});
