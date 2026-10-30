import React from 'react';
import { act, render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';
import * as authApi from '../api/authApi';
import { resetAuthProvidersCache } from '../auth/useAuthProviders';

vi.mock('../api/authApi', () => ({
  resendVerification: vi.fn(),
  fetchAuthProviders: vi.fn(),
  GOOGLE_SIGN_IN_URL: '/api/v1/auth/oauth2/authorization/google',
}));

const GOOGLE_GENERIC = "Google sign-in didn't finish. Please try again.";

beforeEach(() => {
  vi.mocked(authApi.fetchAuthProviders).mockResolvedValue({ google: false });
});

afterEach(() => {
  resetAuthProvidersCache();
});

/** Lets the providers request settle before checking that something is absent. */
const settle = () => act(() => new Promise(resolve => setTimeout(resolve, 0)));

function SearchProbe() {
  return <div data-testid="search-probe">{useLocation().search}</div>;
}

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
    login: vi.fn().mockResolvedValue('authenticated'), completeTwoFactorLogin: vi.fn(), register: vi.fn(), logout: vi.fn(), deleteAccount: vi.fn(), refresh: vi.fn(),
    ...overrides,
  };
}

function renderPage(
  value: AuthContextValue,
  entry: string | { pathname: string; search?: string; state: unknown } = '/login',
) {
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[entry]}>
        <Routes>
          <Route path="/login" element={<><LoginPage /><SearchProbe /></>} />
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
    renderPage(ctx({ status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER', twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true } }));
    expect(screen.getByText('home')).toBeInTheDocument();
  });

  it('shows a notice passed in the navigation state', () => {
    renderPage(ctx(), { pathname: '/login', state: { notice: 'Your account was deleted.' } });
    expect(screen.getByTestId('login-notice')).toHaveTextContent('Your account was deleted.');
  });

  it('shows no notice by default', () => {
    renderPage(ctx());
    expect(screen.queryByTestId('login-notice')).toBeNull();
  });

  describe('Google sign-in', () => {
    it('shows the button and the hint when Google sign-in is on', async () => {
      vi.mocked(authApi.fetchAuthProviders).mockResolvedValue({ google: true });
      renderPage(ctx());
      expect(await screen.findByTestId('google-sign-in')).toHaveAttribute('href', authApi.GOOGLE_SIGN_IN_URL);
      expect(screen.getByTestId('login-google-hint')).toHaveTextContent('Signed up with Google? Use Continue with Google.');
    });

    it('shows neither the button nor the hint when Google sign-in is off', async () => {
      renderPage(ctx());
      await settle();
      expect(screen.queryByTestId('google-sign-in')).toBeNull();
      expect(screen.queryByTestId('login-google-hint')).toBeNull();
      expect(screen.getByTestId('login-email')).toBeInTheDocument();
    });

    it('shows the text for a known error code and removes the code from the URL', async () => {
      renderPage(ctx(), '/login?error=google-email-unverified');
      expect(screen.getByTestId('auth-error')).toHaveTextContent("Google hasn't confirmed this email address");
      await waitFor(() => expect(screen.getByTestId('search-probe')).toHaveTextContent(/^$/));
      expect(screen.getByTestId('auth-error')).toHaveTextContent("Google hasn't confirmed this email address");
    });

    it('shows the generic text for an unknown code and never the raw value', () => {
      renderPage(ctx(), '/login?error=%3Cb%3Ewhatever%3C%2Fb%3E');
      expect(screen.getByTestId('auth-error')).toHaveTextContent(GOOGLE_GENERIC);
      expect(screen.queryByText(/whatever/)).toBeNull();
    });

    it('keeps the other parameters and the navigation state when it removes the code', async () => {
      renderPage(ctx(), { pathname: '/login', search: '?error=google&keep=1', state: { notice: 'Hello.' } });
      await waitFor(() => expect(screen.getByTestId('search-probe')).toHaveTextContent('?keep=1'));
      expect(screen.getByTestId('login-notice')).toHaveTextContent('Hello.');
      expect(screen.getByTestId('auth-error')).toHaveTextContent(GOOGLE_GENERIC);
    });

    it('shows no error without a code', () => {
      renderPage(ctx(), '/login?error=');
      expect(screen.queryByTestId('auth-error')).toBeNull();
    });

    it('clears the Google error when the form is submitted', async () => {
      renderPage(ctx({ login: vi.fn().mockReturnValue(new Promise(() => {})) }), '/login?error=google');
      expect(screen.getByTestId('auth-error')).toHaveTextContent(GOOGLE_GENERIC);
      fillAndSubmit();
      await waitFor(() => expect(screen.queryByTestId('auth-error')).toBeNull());
    });
  });
});
