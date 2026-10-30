import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginTwoFactorPage from '../pages/LoginTwoFactorPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import { ApiError } from '../api/client';

const problem = (slug: string) => ({ type: `https://phrasal.net/problems/${slug}` });

function ctx(overrides: Partial<AuthContextValue> = {}): AuthContextValue {
  return {
    status: 'anonymous', user: null,
    login: vi.fn(), completeTwoFactorLogin: vi.fn().mockResolvedValue(undefined),
    register: vi.fn(), logout: vi.fn(), refresh: vi.fn(),
    ...overrides,
  };
}

function renderPage(value: AuthContextValue, state: unknown = { from: '/grammar' }) {
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[{ pathname: '/login/2fa', state }]}>
        <Routes>
          <Route path="/login/2fa" element={<LoginTwoFactorPage />} />
          <Route path="/login" element={<div>login</div>} />
          <Route path="/" element={<div>home</div>} />
          <Route path="/grammar" element={<div>grammar</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

function submit(testId: string, value: string) {
  fireEvent.change(screen.getByTestId(testId), { target: { value } });
  fireEvent.click(screen.getByTestId('two-factor-submit'));
}

describe('LoginTwoFactorPage', () => {
  it('renders the code input with one-time-code attributes', () => {
    renderPage(ctx());
    const input = screen.getByTestId('two-factor-code');
    expect(input).toHaveAttribute('inputmode', 'numeric');
    expect(input).toHaveAttribute('autocomplete', 'one-time-code');
    expect(input).toHaveAttribute('pattern', '[0-9]{6}');
    expect(input).toHaveAttribute('maxlength', '6');
    expect(screen.getByText('Enter the 6-digit code from your authenticator app.')).toBeInTheDocument();
  });

  it('submits the typed code and navigates to from', async () => {
    const value = ctx();
    renderPage(value);
    submit('two-factor-code', '123456');
    await waitFor(() => expect(screen.getByText('grammar')).toBeInTheDocument());
    expect(value.completeTwoFactorLogin).toHaveBeenCalledWith('123456');
  });

  it('goes home when there is no from', async () => {
    renderPage(ctx(), null);
    submit('two-factor-code', '123456');
    await waitFor(() => expect(screen.getByText('home')).toBeInTheDocument());
  });

  it('switches to a recovery code and back', async () => {
    const value = ctx();
    renderPage(value);
    fireEvent.click(screen.getByTestId('two-factor-use-recovery'));
    const input = screen.getByTestId('two-factor-recovery-code');
    expect(input).toHaveAttribute('autocomplete', 'off');
    expect(screen.queryByTestId('two-factor-code')).toBeNull();
    fireEvent.click(screen.getByTestId('two-factor-use-recovery'));
    expect(screen.getByTestId('two-factor-code')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('two-factor-use-recovery'));
    submit('two-factor-recovery-code', 'abcde-12345');
    await waitFor(() => expect(value.completeTwoFactorLogin).toHaveBeenCalledWith('abcde-12345'));
  });

  it('shows a field error and clears the input for an invalid code', async () => {
    renderPage(ctx({
      completeTwoFactorLogin: vi.fn().mockRejectedValue(new ApiError(401, 'x', problem('invalid-two-factor-code'))),
    }));
    submit('two-factor-code', '000000');
    expect(await screen.findByText('Invalid or already used code')).toBeInTheDocument();
    expect(screen.getByTestId('two-factor-code')).toHaveValue('');
  });

  it('shows the timeout alert with a link back to login', async () => {
    renderPage(ctx({
      completeTwoFactorLogin: vi.fn().mockRejectedValue(new ApiError(401, 'x', problem('two-factor-login-expired'))),
    }));
    submit('two-factor-code', '123456');
    expect(await screen.findByText('Your sign-in timed out.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Log in again' })).toHaveAttribute('href', '/login');
  });

  it('shows the server detail for a 429', async () => {
    renderPage(ctx({
      completeTwoFactorLogin: vi.fn().mockRejectedValue(new ApiError(429, 'Too many attempts. Try later.')),
    }));
    submit('two-factor-code', '123456');
    expect(await screen.findByTestId('auth-error')).toHaveTextContent('Too many attempts. Try later.');
  });

  it('disables the button while pending', async () => {
    let finish: () => void = () => {};
    renderPage(ctx({
      completeTwoFactorLogin: vi.fn().mockReturnValue(new Promise<void>(resolve => { finish = resolve; })),
    }));
    submit('two-factor-code', '123456');
    const button = await screen.findByTestId('two-factor-submit');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Checking…');
    finish();
    await waitFor(() => expect(screen.getByText('grammar')).toBeInTheDocument());
  });

  it('redirects an authenticated visitor', () => {
    renderPage(ctx({ status: 'authenticated' }));
    expect(screen.getByText('grammar')).toBeInTheDocument();
  });
});
