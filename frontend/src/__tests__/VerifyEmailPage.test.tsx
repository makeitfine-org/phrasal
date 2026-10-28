import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import VerifyEmailPage from '../pages/VerifyEmailPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import * as authApi from '../api/authApi';
import { ApiError } from '../api/client';

vi.mock('../api/authApi', () => ({ verifyEmail: vi.fn(), resendVerification: vi.fn() }));

const anonymous: AuthContextValue = {
  status: 'anonymous', user: null, login: vi.fn(), register: vi.fn(), logout: vi.fn(), refresh: vi.fn(),
};

function Location() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname + location.search}</span>;
}

function renderPage(entry = '/verify-email?token=abc', value = anonymous, strict = false) {
  const tree = (
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[entry]}>
        <Location />
        <Routes>
          <Route path="/verify-email" element={<VerifyEmailPage />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  return render(strict ? <React.StrictMode>{tree}</React.StrictMode> : tree);
}

const problem = (slug: string) => new ApiError(400, 'x', { type: `https://phrasal.net/problems/${slug}` });
const state = () => screen.getByTestId('verify-status').getAttribute('data-state');

beforeEach(() => {
  vi.mocked(authApi.verifyEmail).mockReset().mockResolvedValue(undefined);
  vi.mocked(authApi.resendVerification).mockReset().mockResolvedValue(undefined);
});

describe('VerifyEmailPage', () => {
  it('verifies exactly once, even under StrictMode', async () => {
    renderPage('/verify-email?token=abc', anonymous, true);
    await waitFor(() => expect(state()).toBe('success'));
    expect(authApi.verifyEmail).toHaveBeenCalledTimes(1);
    expect(authApi.verifyEmail).toHaveBeenCalledWith('abc');
  });

  it('removes the token from the location', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent(/^\/verify-email$/));
    await waitFor(() => expect(state()).toBe('success'));
  });

  it('shows success with a log in button', async () => {
    renderPage();
    expect(state()).toBe('verifying');
    expect(await screen.findByText('Your email is confirmed.')).toBeInTheDocument();
    expect(screen.getByTestId('verify-login-link')).toHaveAttribute('href', '/login');
  });

  it('offers the quiz to an authenticated visitor', async () => {
    renderPage('/verify-email?token=abc', { ...anonymous, status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER' } });
    expect(await screen.findByText('Your email is confirmed.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Go to the quiz' })).toHaveAttribute('href', '/');
  });

  it('shows expired with the resend form', async () => {
    vi.mocked(authApi.verifyEmail).mockRejectedValue(problem('verification-link-expired'));
    renderPage();
    expect(await screen.findByText('This link has expired.')).toBeInTheDocument();
    expect(state()).toBe('expired');
    expect(screen.getByTestId('resend-verification')).toBeInTheDocument();
  });

  it('shows invalid with the resend form and a log in link', async () => {
    vi.mocked(authApi.verifyEmail).mockRejectedValue(problem('verification-link-invalid'));
    renderPage();
    expect(await screen.findByText('This link is invalid or was already used.')).toBeInTheDocument();
    expect(state()).toBe('invalid');
    expect(screen.getByTestId('resend-verification')).toBeInTheDocument();
    expect(screen.getByTestId('verify-login-link')).toHaveAttribute('href', '/login');
  });

  it('shows an error with a retry that calls the API again', async () => {
    vi.mocked(authApi.verifyEmail).mockRejectedValueOnce(new ApiError(500, 'boom'));
    renderPage();
    expect(await screen.findByText('Something went wrong. Try the link again.')).toBeInTheDocument();
    screen.getByTestId('verify-retry').click();
    await waitFor(() => expect(state()).toBe('success'));
    expect(authApi.verifyEmail).toHaveBeenCalledTimes(2);
    expect(authApi.verifyEmail).toHaveBeenLastCalledWith('abc');
  });

  it('waits for the auth check (which sets the CSRF cookie) before posting', async () => {
    let finishAuthCheck!: () => void;
    function Harness() {
      const [status, setStatus] = React.useState<AuthContextValue['status']>('loading');
      finishAuthCheck = () => setStatus('anonymous');
      return (
        <AuthContext.Provider value={{ ...anonymous, status }}>
          <MemoryRouter initialEntries={['/verify-email?token=abc']}>
            <Routes><Route path="/verify-email" element={<VerifyEmailPage />} /></Routes>
          </MemoryRouter>
        </AuthContext.Provider>
      );
    }
    render(<Harness />);
    expect(authApi.verifyEmail).not.toHaveBeenCalled();
    expect(state()).toBe('verifying');
    act(() => finishAuthCheck());
    await waitFor(() => expect(authApi.verifyEmail).toHaveBeenCalledWith('abc'));
    expect(authApi.verifyEmail).toHaveBeenCalledTimes(1);
  });

  it('without a token makes no API call and shows the resend form', () => {
    renderPage('/verify-email');
    expect(state()).toBe('incomplete');
    expect(screen.getByText(/This link is incomplete/)).toBeInTheDocument();
    expect(screen.getByTestId('resend-email')).toBeInTheDocument();
    expect(authApi.verifyEmail).not.toHaveBeenCalled();
  });
});
