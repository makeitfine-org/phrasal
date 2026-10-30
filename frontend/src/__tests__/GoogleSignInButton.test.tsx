import { act, render, screen } from '@testing-library/react';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { fetchAuthProviders } from '../api/authApi';
import { resetAuthProvidersCache } from '../auth/useAuthProviders';
import { ApiError } from '../api/client';

vi.mock('../api/authApi', async () => {
  const actual = await vi.importActual<typeof import('../api/authApi')>('../api/authApi');
  return { ...actual, fetchAuthProviders: vi.fn() };
});

/** Lets the providers request settle, so "renders nothing" is checked after the answer, not before it. */
const settle = () => act(() => new Promise(resolve => setTimeout(resolve, 0)));

afterEach(() => {
  vi.mocked(fetchAuthProviders).mockReset();
  resetAuthProvidersCache();
});

describe('GoogleSignInButton', () => {
  it('renders nothing while the providers load', () => {
    vi.mocked(fetchAuthProviders).mockReturnValue(new Promise(() => {}));
    const { container } = render(<GoogleSignInButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when Google sign-in is off', async () => {
    vi.mocked(fetchAuthProviders).mockResolvedValue({ google: false });
    const { container } = render(<GoogleSignInButton />);
    await settle();
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing when the providers request fails', async () => {
    vi.mocked(fetchAuthProviders).mockRejectedValue(new ApiError(500, 'boom'));
    const { container } = render(<GoogleSignInButton />);
    await settle();
    expect(container).toBeEmptyDOMElement();
  });

  it('links to the backend start endpoint when Google sign-in is on', async () => {
    vi.mocked(fetchAuthProviders).mockResolvedValue({ google: true });
    render(<GoogleSignInButton />);
    const link = await screen.findByTestId('google-sign-in');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/api/v1/auth/oauth2/authorization/google');
    expect(link).toHaveTextContent('Continue with Google');
    expect(screen.getByRole('link', { name: 'Continue with Google' })).toBe(link);
    expect(link.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByTestId('auth-divider')).toHaveTextContent('or');
  });
});
