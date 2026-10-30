import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import ConfirmEmailChangePage from '../pages/ConfirmEmailChangePage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import * as accountApi from '../api/accountApi';
import { ApiError } from '../api/client';

vi.mock('../api/accountApi', () => ({ confirmEmailChange: vi.fn() }));

const refresh = vi.fn();
const anonymous: AuthContextValue = {
  status: 'anonymous', user: null, login: vi.fn(), register: vi.fn(), logout: vi.fn(), refresh,
};

function Location() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname + location.search}</span>;
}

function renderPage(entry = '/confirm-email-change?token=abc', strict = false) {
  const tree = (
    <AuthContext.Provider value={anonymous}>
      <MemoryRouter initialEntries={[entry]}>
        <Location />
        <Routes>
          <Route path="/confirm-email-change" element={<ConfirmEmailChangePage />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  return render(strict ? <React.StrictMode>{tree}</React.StrictMode> : tree);
}

const problem = (status: number, slug: string) =>
  new ApiError(status, 'x', { type: `https://phrasal.net/problems/${slug}` });

beforeEach(() => {
  refresh.mockReset().mockResolvedValue(undefined);
  vi.mocked(accountApi.confirmEmailChange).mockReset().mockResolvedValue(undefined);
});

describe('ConfirmEmailChangePage', () => {
  it('no token → invalid, without a request', () => {
    renderPage('/confirm-email-change');
    expect(screen.getByTestId('email-change-state-invalid')).toBeInTheDocument();
    expect(accountApi.confirmEmailChange).not.toHaveBeenCalled();
  });

  it('success → done, refresh is called and the login link is offered', async () => {
    renderPage();
    expect(await screen.findByTestId('email-change-state-done')).toHaveTextContent('Your email address was changed');
    expect(accountApi.confirmEmailChange).toHaveBeenCalledWith('abc');
    expect(refresh).toHaveBeenCalled();
    expect(screen.getByTestId('email-change-login-link')).toHaveAttribute('href', '/login');
  });

  it('removes the token from the location', async () => {
    renderPage();
    await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent(/^\/confirm-email-change$/));
    await screen.findByTestId('email-change-state-done');
  });

  it('invalid link → invalid state with a link to the account page', async () => {
    vi.mocked(accountApi.confirmEmailChange).mockRejectedValue(problem(400, 'email-change-link-invalid'));
    renderPage();
    expect(await screen.findByTestId('email-change-state-invalid')).toHaveTextContent('invalid or has expired');
    expect(screen.getByRole('link', { name: 'Account security' })).toHaveAttribute('href', '/account/security');
    expect(refresh).not.toHaveBeenCalled();
  });

  it('expired link → expired state', async () => {
    vi.mocked(accountApi.confirmEmailChange).mockRejectedValue(problem(400, 'email-change-link-expired'));
    renderPage();
    expect(await screen.findByTestId('email-change-state-expired')).toBeInTheDocument();
  });

  it('taken address → conflict state', async () => {
    vi.mocked(accountApi.confirmEmailChange).mockRejectedValue(problem(409, 'email-change-conflict'));
    renderPage();
    expect(await screen.findByTestId('email-change-state-conflict'))
      .toHaveTextContent('already used by another account');
  });

  it('other errors → error state with the server message', async () => {
    vi.mocked(accountApi.confirmEmailChange).mockRejectedValue(new ApiError(429, 'Too many requests'));
    renderPage();
    expect(await screen.findByTestId('email-change-state-error')).toHaveTextContent('Too many requests');
  });

  it('a non-API error → error state with the generic message', async () => {
    vi.mocked(accountApi.confirmEmailChange).mockRejectedValue(new Error('network'));
    renderPage();
    expect(await screen.findByTestId('email-change-state-error')).toHaveTextContent('Something went wrong');
  });

  it('confirms exactly once under StrictMode', async () => {
    renderPage('/confirm-email-change?token=abc', true);
    await screen.findByTestId('email-change-state-done');
    expect(accountApi.confirmEmailChange).toHaveBeenCalledTimes(1);
  });
});
