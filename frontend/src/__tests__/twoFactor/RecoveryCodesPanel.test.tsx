import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import RecoveryCodesPanel from '../../components/twoFactor/RecoveryCodesPanel';
import { AuthContext, type AuthContextValue } from '../../auth/AuthContext';
import * as file from '../../utils/recoveryCodesFile';

const codes = Array.from({ length: 10 }, (_, i) => `CODE-000${i}`);
const value = {
  status: 'authenticated', user: { id: 1, email: 'a@b.co', role: 'USER', twoFactorEnabled: true, twoFactorEnrollmentRequired: false },
} as unknown as AuthContextValue;

function renderPanel(onDone = vi.fn()) {
  render(<AuthContext.Provider value={value}><RecoveryCodesPanel codes={codes} onDone={onDone} /></AuthContext.Provider>);
  return onDone;
}

describe('RecoveryCodesPanel', () => {
  afterEach(() => vi.useRealTimers());

  it('shows every code and the warning', () => {
    renderPanel();
    expect(screen.getAllByTestId('recovery-code')).toHaveLength(10);
    expect(screen.getByText(/shown only once/)).toBeInTheDocument();
  });

  it('copies the codes and shows Copied for 2 seconds', async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    renderPanel();
    await act(async () => { fireEvent.click(screen.getByTestId('recovery-codes-copy')); });
    expect(writeText).toHaveBeenCalledWith(codes.join('\n'));
    expect(screen.getByTestId('recovery-codes-copy')).toHaveTextContent('Copied');
    act(() => { vi.advanceTimersByTime(2000); });
    expect(screen.getByTestId('recovery-codes-copy')).toHaveTextContent('Copy');
  });

  it('downloads through the util', () => {
    const spy = vi.spyOn(file, 'downloadRecoveryCodes').mockImplementation(() => {});
    renderPanel();
    fireEvent.click(screen.getByTestId('recovery-codes-download'));
    expect(spy).toHaveBeenCalledWith(expect.stringContaining('CODE-0000'));
    spy.mockRestore();
  });

  it('calls onDone', () => {
    const onDone = renderPanel();
    fireEvent.click(screen.getByTestId('recovery-codes-done'));
    expect(onDone).toHaveBeenCalledOnce();
  });
});
