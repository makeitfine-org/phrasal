import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ChangeEmailForm from '../../components/account/ChangeEmailForm';
import { AuthContext, type AuthContextValue } from '../../auth/AuthContext';
import { ApiError } from '../../api/client';
import * as api from '../../api/accountApi';

vi.mock('../../api/accountApi');

const user = { id: 2, email: 'user@x.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false };

function renderForm() {
  const value = { status: 'authenticated', user, refresh: vi.fn() } as unknown as AuthContextValue;
  render(
    <AuthContext.Provider value={value}>
      <ChangeEmailForm />
    </AuthContext.Provider>
  );
}

function fill(newEmail: string, password: string) {
  fireEvent.change(screen.getByTestId('change-email-new'), { target: { value: newEmail } });
  fireEvent.change(screen.getByTestId('change-email-password'), { target: { value: password } });
}

const submit = () => fireEvent.click(screen.getByTestId('change-email-submit'));

describe('ChangeEmailForm', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('shows the heading, the current address and the fields', () => {
    renderForm();
    expect(screen.getByRole('heading', { name: 'Change email' })).toBeInTheDocument();
    expect(screen.getByText('Current: user@x.co')).toBeInTheDocument();
    expect(screen.getByTestId('change-email-new')).toHaveAttribute('type', 'email');
    expect(screen.getByTestId('change-email-password')).toHaveAttribute('autocomplete', 'current-password');
  });

  it('success names both addresses, clears the password and keeps the form', async () => {
    vi.mocked(api.requestEmailChange).mockResolvedValue(undefined);
    renderForm();
    fill(' new@x.co ', 'pw');
    submit();
    await waitFor(() => expect(screen.getByTestId('change-email-success')).toBeInTheDocument());
    expect(api.requestEmailChange).toHaveBeenCalledWith('new@x.co', 'pw');
    const message = screen.getByTestId('change-email-success');
    expect(message).toHaveTextContent('new@x.co');
    expect(message).toHaveTextContent('Your email stays user@x.co');
    expect(screen.getByTestId('change-email-password')).toHaveValue('');
    expect(screen.getByTestId('change-email-new')).toBeInTheDocument();
  });

  it('the same address in other letter case sends no request', () => {
    renderForm();
    fill('USER@x.co', 'pw');
    submit();
    expect(screen.getByTestId('field-error-newEmail')).toHaveTextContent('different');
    expect(api.requestEmailChange).not.toHaveBeenCalled();
  });

  it('wrong-password shows the error under the password field', async () => {
    vi.mocked(api.requestEmailChange).mockRejectedValue(
      new ApiError(400, 'x', { type: 'https://phrasal.net/problems/wrong-password' }));
    renderForm();
    fill('new@x.co', 'bad');
    submit();
    expect(await screen.findByTestId('field-error-currentPassword')).toHaveTextContent('Wrong password');
    expect(screen.queryByTestId('change-email-success')).toBeNull();
  });

  it('a 400 with errors.newEmail shows the error under the email field', async () => {
    vi.mocked(api.requestEmailChange).mockRejectedValue(
      new ApiError(400, 'Validation', { errors: { newEmail: 'must be a well-formed email address' } }));
    renderForm();
    fill('new@x.co', 'pw');
    submit();
    expect(await screen.findByTestId('field-error-newEmail')).toHaveTextContent('well-formed');
  });

  it('a 429 shows the server message in an alert', async () => {
    vi.mocked(api.requestEmailChange).mockRejectedValue(new ApiError(429, 'Too many requests. Try again later.'));
    renderForm();
    fill('new@x.co', 'pw');
    submit();
    expect(await screen.findByTestId('change-email-error')).toHaveTextContent('Too many requests');
  });

  it('shows a pending state and disables the button while the request runs', async () => {
    let finish: () => void = () => {};
    vi.mocked(api.requestEmailChange).mockReturnValue(new Promise<void>(resolve => { finish = resolve; }));
    renderForm();
    fill('new@x.co', 'pw');
    submit();
    expect(screen.getByTestId('change-email-submit')).toBeDisabled();
    expect(screen.getByTestId('change-email-submit')).toHaveTextContent('Sending…');
    finish();
    await waitFor(() => expect(screen.getByTestId('change-email-submit')).not.toBeDisabled());
  });
});
