import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TwoFactorSetup from '../../components/twoFactor/TwoFactorSetup';
import { AuthContext, type AuthContextValue } from '../../auth/AuthContext';
import { ApiError } from '../../api/client';
import QRCode from 'qrcode';
import * as api from '../../api/twoFactorApi';

vi.mock('../../api/twoFactorApi');
vi.mock('qrcode', () => ({ default: { toDataURL: vi.fn().mockResolvedValue('data:image/png;base64,AAA') } }));

const problem = (slug: string) => ({ type: `https://phrasal.net/problems/${slug}` });
const codes = Array.from({ length: 10 }, (_, i) => `CODE-000${i}`);

function renderSetup() {
  const refresh = vi.fn().mockResolvedValue(undefined);
  const onEnabled = vi.fn();
  const onCancel = vi.fn();
  const value = {
    status: 'authenticated', refresh,
    user: { id: 1, email: 'a@b.co', role: 'ADMIN', twoFactorEnabled: false, twoFactorEnrollmentRequired: true, hasPassword: true },
  } as unknown as AuthContextValue;
  render(<AuthContext.Provider value={value}><TwoFactorSetup onEnabled={onEnabled} onCancel={onCancel} /></AuthContext.Provider>);
  return { refresh, onEnabled, onCancel };
}

async function toScanStep() {
  vi.mocked(api.startTwoFactorSetup).mockResolvedValue({ secret: 'ABCDEFGHIJKL', otpauthUri: 'otpauth://totp/x' });
  fireEvent.change(screen.getByTestId('two-factor-password'), { target: { value: 'pw' } });
  fireEvent.click(screen.getByTestId('two-factor-password-submit'));
  await screen.findByTestId('two-factor-secret');
}

function confirm(code: string) {
  fireEvent.change(screen.getByTestId('two-factor-confirm-code'), { target: { value: code } });
  fireEvent.click(screen.getByTestId('two-factor-confirm-submit'));
}

describe('TwoFactorSetup', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(QRCode.toDataURL as unknown as () => Promise<string>).mockResolvedValue('data:image/png;base64,AAA');
  });

  it('wrong password shows a field error and stays on the password step', async () => {
    renderSetup();
    vi.mocked(api.startTwoFactorSetup).mockRejectedValue(new ApiError(400, 'x', problem('wrong-password')));
    fireEvent.change(screen.getByTestId('two-factor-password'), { target: { value: 'bad' } });
    fireEvent.click(screen.getByTestId('two-factor-password-submit'));
    expect(await screen.findByTestId('two-factor-password-error')).toBeInTheDocument();
    expect(screen.queryByTestId('two-factor-secret')).toBeNull();
  });

  it('right password shows the QR code and the grouped secret', async () => {
    renderSetup();
    await toScanStep();
    expect(api.startTwoFactorSetup).toHaveBeenCalledWith('pw');
    expect(screen.getByTestId('two-factor-secret')).toHaveTextContent('ABCD EFGH IJKL');
    expect(await screen.findByTestId('two-factor-qr')).toBeInTheDocument();
  });

  it('wrong code shows a field error and stays on scan', async () => {
    renderSetup();
    await toScanStep();
    vi.mocked(api.confirmTwoFactorSetup).mockRejectedValue(new ApiError(400, 'x', problem('invalid-two-factor-code')));
    confirm('000000');
    expect(await screen.findByTestId('two-factor-confirm-error')).toBeInTheDocument();
    expect(screen.getByTestId('two-factor-secret')).toBeInTheDocument();
  });

  it('right code shows the recovery codes; Done refreshes and calls onEnabled', async () => {
    const { refresh, onEnabled } = renderSetup();
    await toScanStep();
    vi.mocked(api.confirmTwoFactorSetup).mockResolvedValue({ recoveryCodes: codes });
    confirm('123456');
    expect(await screen.findAllByTestId('recovery-code')).toHaveLength(10);
    fireEvent.click(screen.getByTestId('recovery-codes-done'));
    await waitFor(() => expect(onEnabled).toHaveBeenCalled());
    expect(refresh).toHaveBeenCalled();
  });

  it('Cancel calls onCancel', () => {
    const { onCancel } = renderSetup();
    fireEvent.click(screen.getByTestId('two-factor-cancel'));
    expect(onCancel).toHaveBeenCalledOnce();
  });
});
