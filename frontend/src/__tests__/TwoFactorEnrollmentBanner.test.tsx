import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TwoFactorEnrollmentBanner from '../components/TwoFactorEnrollmentBanner';
import { AuthContext, type AuthContextValue } from '../auth/AuthContext';

const base = { id: 1, email: 'a@x.co', role: 'ADMIN' as const, twoFactorEnabled: false, twoFactorEnrollmentRequired: true };

function renderBanner(user: typeof base | null, path = '/') {
  const value = { status: user ? 'authenticated' : 'anonymous', user } as unknown as AuthContextValue;
  render(
    <AuthContext.Provider value={value}>
      <MemoryRouter initialEntries={[path]}><TwoFactorEnrollmentBanner /></MemoryRouter>
    </AuthContext.Provider>
  );
}

describe('TwoFactorEnrollmentBanner', () => {
  it('shows for an unenrolled admin with a link to the security page', () => {
    renderBanner(base);
    expect(screen.getByTestId('two-factor-enrollment-banner')).toHaveTextContent('before editing content');
    expect(screen.getByRole('link', { name: 'Set it up' })).toHaveAttribute('href', '/account/security');
  });

  it('is hidden for a user, an enrolled admin and anonymous visitors', () => {
    for (const user of [
      { ...base, role: 'USER' as const, twoFactorEnrollmentRequired: false },
      { ...base, twoFactorEnabled: true, twoFactorEnrollmentRequired: false },
      null,
    ]) {
      renderBanner(user);
      expect(screen.queryByTestId('two-factor-enrollment-banner')).toBeNull();
    }
  });

  it('is hidden on the security page', () => {
    renderBanner(base, '/account/security');
    expect(screen.queryByTestId('two-factor-enrollment-banner')).toBeNull();
  });
});
