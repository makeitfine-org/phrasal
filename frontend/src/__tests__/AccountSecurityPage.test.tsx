import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import AccountSecurityPage from '../pages/AccountSecurityPage';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';
import QRCode from 'qrcode';
import * as api from '../api/twoFactorApi';

vi.mock('../api/twoFactorApi');
vi.mock('qrcode', () => ({ default: { toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,AAA') } }));

const plain = { id: 2, email: 'user@x.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false };
const admin = { ...plain, id: 1, email: 'admin@x.co', role: 'ADMIN' as const, twoFactorEnrollmentRequired: true };
const off = { enabled: false, enabledAt: null, recoveryCodesRemaining: 0 };
const on = { enabled: true, enabledAt: '2026-10-01T10:00:00Z', recoveryCodesRemaining: 8 };

function renderPage(overrides: Partial<AuthContextValue> = {}) {
  const value = {
    status: 'authenticated', user: plain, refresh: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  } as unknown as AuthContextValue;
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={['/account/security']}>
        <Routes>
          <Route path="/account/security" element={<AccountSecurityPage />} />
          <Route path="/login" element={<div>login</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  return value;
}

describe('AccountSecurityPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(QRCode.toDataURL as unknown as () => Promise<string>).mockResolvedValue('data:image/png;base64,AAA');
  });

  it('redirects anonymous visitors to /login', () => {
    renderPage({ status: 'anonymous', user: null });
    expect(screen.getByText('login')).toBeInTheDocument();
    expect(api.fetchTwoFactorStatus).not.toHaveBeenCalled();
  });

  it('shows the change-password form for a user, no admin note', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValue(off);
    renderPage();
    expect(await screen.findByTestId('change-password-submit')).toBeInTheDocument();
    expect(screen.getByTestId('change-email-submit')).toBeInTheDocument();
    expect(screen.queryByTestId('admin-managed-note')).toBeNull();
  });

  it('hides the change-password form for an admin and shows the managed note', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValue(off);
    renderPage({ user: admin });
    expect(await screen.findByTestId('admin-managed-note')).toHaveTextContent('managed through server configuration');
    expect(screen.queryByTestId('change-password-submit')).toBeNull();
    expect(screen.queryByTestId('change-email-submit')).toBeNull();
  });

  it('renders nothing while loading', () => {
    renderPage({ status: 'loading', user: null });
    expect(screen.queryByRole('heading')).toBeNull();
  });

  it('off: shows Turn on, admin text only for an admin', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValue(off);
    renderPage();
    expect(await screen.findByTestId('two-factor-enable')).toBeInTheDocument();
    expect(screen.queryByText(/Required for administrators/)).toBeNull();
  });

  it('off: admin sees the required text', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValue(off);
    renderPage({ user: admin });
    expect(await screen.findByText(/Required for administrators/)).toBeInTheDocument();
  });

  it('on: shows the date and remaining count, no warning above 3', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValue(on);
    renderPage();
    expect(await screen.findByTestId('two-factor-status')).toHaveTextContent('is on since');
    expect(screen.getByTestId('recovery-codes-remaining')).toHaveTextContent('Recovery codes left: 8');
    expect(screen.queryByTestId('recovery-codes-low')).toBeNull();
  });

  it('on: warns when 3 or fewer codes are left', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValue({ ...on, recoveryCodesRemaining: 3 });
    renderPage();
    expect(await screen.findByTestId('recovery-codes-low')).toBeInTheDocument();
  });

  it('regenerate flow shows new codes and reloads the status', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValue(on);
    vi.mocked(api.regenerateRecoveryCodes).mockResolvedValue({ recoveryCodes: ['A-1', 'B-2'] });
    renderPage();
    fireEvent.click(await screen.findByTestId('recovery-codes-regenerate'));
    fireEvent.change(screen.getByTestId('recovery-codes-code'), { target: { value: '123456' } });
    fireEvent.click(screen.getByTestId('recovery-codes-submit'));
    expect(await screen.findAllByTestId('recovery-code')).toHaveLength(2);
    expect(api.regenerateRecoveryCodes).toHaveBeenCalledWith('123456');
    fireEvent.click(screen.getByTestId('recovery-codes-done'));
    await waitFor(() => expect(api.fetchTwoFactorStatus).toHaveBeenCalledTimes(2));
  });

  it('disable flow calls the API, refreshes the user and reloads the status', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockResolvedValueOnce(on).mockResolvedValue(off);
    vi.mocked(api.disableTwoFactor).mockResolvedValue(undefined);
    const value = renderPage({ user: { ...admin, twoFactorEnabled: true, twoFactorEnrollmentRequired: false } });
    fireEvent.click(await screen.findByTestId('two-factor-disable'));
    expect(screen.getByText(/lose admin rights/)).toBeInTheDocument();
    fireEvent.change(screen.getByTestId('two-factor-disable-code'), { target: { value: '123456' } });
    fireEvent.click(screen.getByTestId('two-factor-disable-submit'));
    expect(await screen.findByTestId('two-factor-enable')).toBeInTheDocument();
    expect(api.disableTwoFactor).toHaveBeenCalledWith('123456');
    expect(value.refresh).toHaveBeenCalled();
  });

  it('load error shows an alert and Try again retries', async () => {
    vi.mocked(api.fetchTwoFactorStatus).mockRejectedValueOnce(new Error('x')).mockResolvedValue(off);
    renderPage();
    expect(await screen.findByTestId('two-factor-load-error')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('two-factor-retry'));
    expect(await screen.findByTestId('two-factor-enable')).toBeInTheDocument();
  });
});
