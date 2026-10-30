import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import DeleteAccountSection from '../../components/account/DeleteAccountSection';
import { AuthContext, type AuthContextValue } from '../../auth/AuthContext';
import { ApiError } from '../../api/client';

const plain = { id: 2, email: 'user@x.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true };
const withTwoFactor = { ...plain, twoFactorEnabled: true };

function LoginStub() {
  const state = useLocation().state as { notice?: string } | null;
  return <div data-testid="login-stub">{state?.notice}</div>;
}

function renderSection(user = plain) {
  const deleteAccount = vi.fn().mockResolvedValue(undefined);
  const value = { status: 'authenticated', user, deleteAccount } as unknown as AuthContextValue;
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={['/account/security']}>
        <Routes>
          <Route path="/account/security" element={<DeleteAccountSection />} />
          <Route path="/login" element={<LoginStub />} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
  return deleteAccount;
}

const open = () => fireEvent.click(screen.getByTestId('delete-account-open'));
const typePassword = (value: string) =>
  fireEvent.change(screen.getByTestId('delete-account-password'), { target: { value } });
const tick = () => fireEvent.click(screen.getByTestId('delete-account-confirm'));
const submit = () => fireEvent.click(screen.getByTestId('delete-account-submit'));

describe('DeleteAccountSection', () => {
  it('shows only the heading and the button until opened', () => {
    renderSection();
    expect(screen.getByRole('heading', { name: 'Delete account' })).toBeInTheDocument();
    expect(screen.getByTestId('delete-account-open')).toHaveTextContent('Delete my account');
    expect(screen.queryByTestId('delete-account-password')).toBeNull();
  });

  it('opening shows the warning, and submit stays disabled until the box is ticked', () => {
    renderSection();
    open();
    expect(screen.getByText(/permanently deletes your account/)).toBeInTheDocument();
    expect(screen.getByTestId('delete-account-submit')).toBeDisabled();
    tick();
    expect(screen.getByTestId('delete-account-submit')).toBeEnabled();
  });

  it('the code field is shown only when 2FA is on', () => {
    renderSection();
    open();
    expect(screen.queryByTestId('delete-account-code')).toBeNull();
  });

  it('the code field is shown for a 2FA account', () => {
    renderSection(withTwoFactor);
    open();
    expect(screen.getByTestId('delete-account-code')).toBeInTheDocument();
  });

  it('success deletes without a code, then goes to /login with the notice', async () => {
    const deleteAccount = renderSection();
    open();
    typePassword('pw');
    tick();
    submit();
    await waitFor(() => expect(screen.getByTestId('login-stub')).toHaveTextContent('Your account was deleted.'));
    expect(deleteAccount).toHaveBeenCalledWith('pw', undefined);
  });

  it('a 2FA account sends the trimmed code', async () => {
    const deleteAccount = renderSection(withTwoFactor);
    open();
    typePassword('pw');
    fireEvent.change(screen.getByTestId('delete-account-code'), { target: { value: ' 123456 ' } });
    tick();
    submit();
    await waitFor(() => expect(deleteAccount).toHaveBeenCalledWith('pw', '123456'));
  });

  it('wrong-password lands under the password field and keeps the form', async () => {
    const deleteAccount = renderSection();
    deleteAccount.mockRejectedValue(new ApiError(400, 'Wrong password', {
      type: 'https://phrasal/problems/wrong-password', title: 'Wrong password', status: 400,
    }));
    open();
    typePassword('bad');
    tick();
    submit();
    expect(await screen.findByTestId('field-error-password')).toHaveTextContent('Wrong password');
    expect(screen.getByTestId('delete-account-submit')).toBeEnabled();
    expect(screen.queryByTestId('login-stub')).toBeNull();
  });

  it('invalid-two-factor-code lands under the code field and clears it', async () => {
    const deleteAccount = renderSection(withTwoFactor);
    deleteAccount.mockRejectedValue(new ApiError(400, 'Invalid code', {
      type: 'https://phrasal/problems/invalid-two-factor-code', title: 'Invalid code', status: 400,
    }));
    open();
    typePassword('pw');
    fireEvent.change(screen.getByTestId('delete-account-code'), { target: { value: '000000' } });
    tick();
    submit();
    expect(await screen.findByTestId('field-error-code')).toHaveTextContent('Invalid or already used code');
    expect(screen.getByTestId('delete-account-code')).toHaveValue('');
  });

  it('another error shows an alert', async () => {
    const deleteAccount = renderSection();
    deleteAccount.mockRejectedValue(new ApiError(429, 'Too many attempts'));
    open();
    typePassword('pw');
    tick();
    submit();
    expect(await screen.findByTestId('delete-account-error')).toHaveTextContent('Too many attempts');
  });

  it('Cancel closes the form and forgets what was typed', () => {
    renderSection();
    open();
    typePassword('pw');
    fireEvent.click(screen.getByTestId('delete-account-cancel'));
    expect(screen.queryByTestId('delete-account-password')).toBeNull();
    open();
    expect(screen.getByTestId('delete-account-password')).toHaveValue('');
    expect(screen.getByTestId('delete-account-submit')).toBeDisabled();
  });
});
