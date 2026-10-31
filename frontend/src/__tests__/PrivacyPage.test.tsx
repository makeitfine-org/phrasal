import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivacyPage, { PRIVACY_CONTACT_EMAIL } from '../pages/PrivacyPage';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/privacy']}>
      <PrivacyPage />
    </MemoryRouter>,
  );
}

describe('PrivacyPage', () => {
  it('renders the policy heading and its sections', () => {
    renderPage();
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    for (const name of ['What we store', 'Why', 'Cookies and browser storage', 'Who else handles data',
      'Deleting your data', 'Your rights and contact']) {
      expect(screen.getByRole('heading', { level: 2, name })).toBeInTheDocument();
    }
  });

  it('names the data and providers the app really uses', () => {
    renderPage();
    const page = screen.getByTestId('privacy-page');
    for (const term of ['Google', 'Brevo', 'Have I Been Pwned', 'Hetzner', 'Cloudflare', 'SESSION', 'XSRF-TOKEN']) {
      expect(page).toHaveTextContent(term);
    }
  });

  it('links to the contact email and the account page', () => {
    renderPage();
    expect(screen.getByRole('link', { name: PRIVACY_CONTACT_EMAIL }))
      .toHaveAttribute('href', `mailto:${PRIVACY_CONTACT_EMAIL}`);
    expect(screen.getByRole('link', { name: 'Account security' })).toHaveAttribute('href', '/account/security');
  });
});
