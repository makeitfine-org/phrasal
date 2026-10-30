import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChangePasswordForm from '../../components/account/ChangePasswordForm';
import { AuthContext, type AuthContextValue } from '../../auth/AuthContext';
import { ApiError } from '../../api/client';
import * as api from '../../api/accountApi';

vi.mock('../../api/accountApi');

const user = { id: 2, email: 'user@x.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: true };
const OLD = 'old password 1';
const NEW = 'brand new passphrase';

function renderForm() {
  const refresh = vi.fn().mockResolvedValue(undefined);
  const value = { status: 'authenticated', user, refresh } as unknown as AuthContextValue;
  render(
    <AuthContext.Provider value={value}>
      <ChangePasswordForm />
    </AuthContext.Provider>
  );
  return refresh;
}

function fill(current: string, next: string, confirm: string) {
  fireEvent.change(screen.getByTestId('change-password-current'), { target: { value: current } });
  fireEvent.change(screen.getByTestId('change-password-new'), { target: { value: next } });
  fireEvent.change(screen.getByTestId('change-password-confirm'), { target: { value: confirm } });
}

const submit = () => fireEvent.click(screen.getByTestId('change-password-submit'));

describe('ChangePasswordForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the three fields under a labelled section', () => {
    renderForm();
    expect(screen.getByRole('heading', { name: 'Change password' })).toBeInTheDocument();
    expect(screen.getByTestId('change-password-current')).toHaveAttribute('autocomplete', 'current-password');
    expect(screen.getByTestId('change-password-new')).toHaveAttribute('autocomplete', 'new-password');
    expect(screen.getByTestId('change-password-confirm')).toBeInTheDocument();
    expect(screen.getByTestId('password-requirements')).toBeInTheDocument();
  });

  it('a mismatch sends no request', () => {
    renderForm();
    fill(OLD, NEW, 'something else entirely');
    submit();
    expect(screen.getByTestId('field-error-confirm')).toHaveTextContent('Passwords do not match');
    expect(api.changePassword).not.toHaveBeenCalled();
  });

  it('a short new password sends no request', () => {
    renderForm();
    fill(OLD, 'short', 'short');
    submit();
    expect(screen.getByTestId('field-error-newPassword')).toHaveTextContent('at least 10');
    expect(api.changePassword).not.toHaveBeenCalled();
  });

  it('success calls the API, shows the status, refreshes and clears the fields', async () => {
    vi.mocked(api.changePassword).mockResolvedValue(undefined);
    const refresh = renderForm();
    fill(OLD, NEW, NEW);
    submit();
    expect(await screen.findByTestId('change-password-success')).toHaveTextContent(
      'Password changed. You were logged out on your other devices.');
    expect(api.changePassword).toHaveBeenCalledWith(OLD, NEW);
    expect(refresh).toHaveBeenCalled();
    expect(screen.getByTestId('change-password-current')).toHaveValue('');
    expect(screen.getByTestId('change-password-new')).toHaveValue('');
    expect(screen.getByTestId('change-password-confirm')).toHaveValue('');
  });

  it('wrong-password shows the error under the current field and keeps the input', async () => {
    vi.mocked(api.changePassword).mockRejectedValue(
      new ApiError(400, 'Wrong Password', { type: 'https://phrasalbox.com/errors/wrong-password' }));
    renderForm();
    fill(OLD, NEW, NEW);
    submit();
    expect(await screen.findByTestId('field-error-currentPassword')).toHaveTextContent('Wrong password');
    expect(screen.queryByTestId('change-password-success')).toBeNull();
    expect(screen.getByTestId('change-password-new')).toHaveValue(NEW);
  });

  it('a breached new password shows under the new field', async () => {
    vi.mocked(api.changePassword).mockRejectedValue(
      new ApiError(400, 'Validation Error', { errors: { newPassword: 'This password has appeared in a data breach. Choose a different one.' } }));
    renderForm();
    fill(OLD, NEW, NEW);
    submit();
    expect(await screen.findByTestId('field-error-newPassword')).toHaveTextContent('appeared in a data breach');
  });

  it('a server error on newPassword shows under the new field', async () => {
    vi.mocked(api.changePassword).mockRejectedValue(
      new ApiError(400, 'Validation Error', { errors: { newPassword: 'New password must be different from your current one' } }));
    renderForm();
    fill(OLD, NEW, NEW);
    submit();
    expect(await screen.findByTestId('field-error-newPassword')).toHaveTextContent('must be different');
  });

  it('429 shows an alert with the server message', async () => {
    vi.mocked(api.changePassword).mockRejectedValue(new ApiError(429, 'Too many attempts. Try again later.'));
    renderForm();
    fill(OLD, NEW, NEW);
    submit();
    expect(await screen.findByTestId('change-password-error')).toHaveTextContent('Too many attempts');
  });

  it('a non-API failure shows the generic alert', async () => {
    vi.mocked(api.changePassword).mockRejectedValue(new Error('network'));
    renderForm();
    fill(OLD, NEW, NEW);
    submit();
    expect(await screen.findByTestId('change-password-error')).toHaveTextContent('Something went wrong');
  });

  it('disables the button and shows Saving… while pending', async () => {
    let resolve: () => void = () => undefined;
    vi.mocked(api.changePassword).mockReturnValue(new Promise<void>(r => { resolve = r; }));
    renderForm();
    fill(OLD, NEW, NEW);
    submit();
    const button = await screen.findByTestId('change-password-submit');
    await waitFor(() => expect(button).toBeDisabled());
    expect(button).toHaveTextContent('Saving…');
    resolve();
    await waitFor(() => expect(button).not.toBeDisabled());
  });
});
