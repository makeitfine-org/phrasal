import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import UserMenu from '../components/UserMenu';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';

function ctx(overrides: Partial<AuthContextValue> = {}): AuthContextValue {
  return {
    status: 'anonymous', user: null,
    login: vi.fn(), register: vi.fn(), logout: vi.fn().mockResolvedValue(undefined), refresh: vi.fn(),
    ...overrides,
  };
}

const admin = { id: 1, email: 'admin@x.co', role: 'ADMIN' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false };
const plain = { id: 2, email: 'user@x.co', role: 'USER' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: false };

function renderMenu(value: AuthContextValue, variant?: 'desktop' | 'mobile') {
  return render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={['/grammar']}>
        <Routes>
          <Route path="/grammar" element={<><UserMenu variant={variant} /><div>grammar</div></>} />
          <Route path="/" element={<div>home</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('UserMenu', () => {
  it('anonymous shows login and sign-up links', () => {
    renderMenu(ctx());
    expect(screen.getByTestId('nav-login')).toHaveAttribute('href', '/login');
    expect(screen.getByTestId('nav-register')).toHaveAttribute('href', '/register');
  });

  it('loading renders nothing', () => {
    renderMenu(ctx({ status: 'loading' }));
    expect(screen.queryByTestId('nav-login')).toBeNull();
    expect(screen.queryByTestId('user-menu')).toBeNull();
  });

  it('authenticated shows the email', () => {
    renderMenu(ctx({ status: 'authenticated', user: plain }));
    expect(screen.getByTestId('user-menu')).toHaveTextContent('user@x.co');
    expect(screen.queryByTestId('nav-login')).toBeNull();
  });

  it('shows the admin badge only for ADMIN', () => {
    const { unmount } = renderMenu(ctx({ status: 'authenticated', user: admin }));
    fireEvent.click(screen.getByTestId('user-menu'));
    expect(screen.getByTestId('admin-badge')).toBeInTheDocument();
    unmount();

    renderMenu(ctx({ status: 'authenticated', user: plain }));
    fireEvent.click(screen.getByTestId('user-menu'));
    expect(screen.queryByTestId('admin-badge')).toBeNull();
  });

  it('logout calls logout and navigates home', async () => {
    const value = ctx({ status: 'authenticated', user: plain });
    renderMenu(value);
    fireEvent.click(screen.getByTestId('user-menu'));
    fireEvent.click(screen.getByTestId('nav-logout'));
    await waitFor(() => expect(screen.getByText('home')).toBeInTheDocument());
    expect(value.logout).toHaveBeenCalledTimes(1);
  });

  it('click outside closes the dropdown', () => {
    renderMenu(ctx({ status: 'authenticated', user: plain }));
    fireEvent.click(screen.getByTestId('user-menu'));
    expect(screen.getByTestId('user-menu-dropdown')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId('user-menu-dropdown')).toBeNull();
  });

  it('mobile variant renders prefixed auth links', () => {
    renderMenu(ctx(), 'mobile');
    expect(screen.getByTestId('nav-mobile-login')).toBeInTheDocument();
    expect(screen.getByTestId('nav-mobile-register')).toBeInTheDocument();
  });

  it('mobile variant logs out', async () => {
    const value = ctx({ status: 'authenticated', user: admin });
    renderMenu(value, 'mobile');
    expect(screen.getByTestId('admin-badge')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('nav-mobile-logout'));
    await waitFor(() => expect(screen.getByText('home')).toBeInTheDocument());
    expect(value.logout).toHaveBeenCalled();
  });

  it('desktop dropdown has an Account security link that closes the menu', () => {
    renderMenu(ctx({ status: 'authenticated', user: plain }));
    fireEvent.click(screen.getByTestId('user-menu'));
    const link = screen.getByTestId('nav-account-security');
    expect(link).toHaveAttribute('href', '/account/security');
    fireEvent.click(link);
    expect(screen.queryByTestId('user-menu-dropdown')).toBeNull();
  });

  it('mobile variant has an Account security link', () => {
    renderMenu(ctx({ status: 'authenticated', user: plain }), 'mobile');
    expect(screen.getByTestId('nav-mobile-account-security')).toHaveAttribute('href', '/account/security');
  });

  it('hides the Account security link when anonymous', () => {
    renderMenu(ctx());
    expect(screen.queryByTestId('nav-account-security')).toBeNull();
    expect(screen.queryByTestId('nav-mobile-account-security')).toBeNull();
  });
});
