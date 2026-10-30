import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SetPasswordPanel from '../../components/account/SetPasswordPanel';
import { AuthContext, type AuthContextValue } from '../../auth/AuthContext';
import { ApiError } from '../../api/client';
import * as authApi from '../../api/authApi';

vi.mock('../../api/authApi', () => ({ forgotPassword: vi.fn() }));

const user = { id: 3, email: 'google@x.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false, hasPassword: false };

function renderPanel(value: Partial<AuthContextValue> = { status: 'authenticated', user }) {
  return render(
    <AuthContext.Provider value={value as AuthContextValue}>
      <SetPasswordPanel />
    </AuthContext.Provider>
  );
}

const request = () => fireEvent.click(screen.getByTestId('set-password-request'));

describe('SetPasswordPanel', () => {
  beforeEach(() => {
    vi.mocked(authApi.forgotPassword).mockReset();
  });

  it('explains why a password is needed', () => {
    renderPanel();
    expect(screen.getByRole('heading', { name: 'Set a password' })).toBeInTheDocument();
    expect(screen.getByTestId('set-password-panel')).toHaveTextContent(
      'You sign in with Google. Set a password to change your email address, turn on two-factor authentication, or '
      + 'delete your account. You will be signed out everywhere after you set it.',
    );
    expect(screen.getByTestId('set-password-request')).toHaveTextContent('Email me a link to set a password');
    expect(screen.queryByTestId('set-password-sent')).toBeNull();
  });

  it("asks for a reset link to the user's own address and says when it expires", async () => {
    vi.mocked(authApi.forgotPassword).mockResolvedValue(undefined);
    renderPanel();
    request();
    expect(await screen.findByTestId('set-password-sent'))
      .toHaveTextContent('Check your inbox for a link. It expires in 1 hour.');
    expect(authApi.forgotPassword).toHaveBeenCalledWith('google@x.co');
    expect(screen.queryByTestId('set-password-error')).toBeNull();
  });

  it('disables the button while the request is pending', async () => {
    let resolve: () => void = () => {};
    vi.mocked(authApi.forgotPassword).mockReturnValue(new Promise<void>(r => { resolve = r; }));
    renderPanel();
    request();
    expect(screen.getByTestId('set-password-request')).toBeDisabled();
    expect(screen.getByTestId('set-password-request')).toHaveTextContent('Sending…');
    resolve();
    await waitFor(() => expect(screen.getByTestId('set-password-request')).toBeEnabled());
  });

  it('shows the server message of a 429 and no success text', async () => {
    vi.mocked(authApi.forgotPassword).mockRejectedValue(new ApiError(429, 'Too many requests. Try again later.'));
    renderPanel();
    request();
    expect(await screen.findByTestId('set-password-error')).toHaveTextContent('Too many requests. Try again later.');
    expect(screen.queryByTestId('set-password-sent')).toBeNull();
    expect(screen.getByTestId('set-password-request')).toBeEnabled();
  });

  it('shows a generic message for a network error', async () => {
    vi.mocked(authApi.forgotPassword).mockRejectedValue(new TypeError('Failed to fetch'));
    renderPanel();
    request();
    expect(await screen.findByTestId('set-password-error')).toHaveTextContent('Something went wrong. Please try again.');
  });

  it('clears an earlier error when asked again', async () => {
    vi.mocked(authApi.forgotPassword)
      .mockRejectedValueOnce(new ApiError(429, 'Too many requests. Try again later.'))
      .mockResolvedValueOnce(undefined);
    renderPanel();
    request();
    await screen.findByTestId('set-password-error');
    request();
    await screen.findByTestId('set-password-sent');
    expect(screen.queryByTestId('set-password-error')).toBeNull();
  });

  it('renders nothing without a user', () => {
    const { container } = renderPanel({ status: 'anonymous', user: null });
    expect(container).toBeEmptyDOMElement();
  });
});
