import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PhrasalVerbsListPage from '../pages/PhrasalVerbsListPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <PhrasalVerbsListPage />
    </MemoryRouter>
  );
}

describe('PhrasalVerbsListPage', () => {
  it('renders "Phrasal Verbs List" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Phrasal Verbs List' })).toBeInTheDocument();
  });

  it('renders the "Get" card', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Get' })).toBeInTheDocument();
  });

  it('"Get" link points to /phrasal-verbs/list/get', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Get/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list/get');
  });
});
