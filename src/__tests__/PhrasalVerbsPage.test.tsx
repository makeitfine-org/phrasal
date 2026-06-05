import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PhrasalVerbsPage from '../pages/PhrasalVerbsPage';

function renderPhrasalVerbsPage() {
  return render(
    <MemoryRouter>
      <PhrasalVerbsPage />
    </MemoryRouter>
  );
}

describe('PhrasalVerbsPage', () => {
  it('renders "Phrasal Verbs" heading', () => {
    renderPhrasalVerbsPage();
    expect(screen.getByRole('heading', { name: 'Phrasal Verbs' })).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    renderPhrasalVerbsPage();
    expect(screen.getByText('Choose a topic to practice')).toBeInTheDocument();
  });

  it('renders the "Test most popular" topic card', () => {
    renderPhrasalVerbsPage();
    expect(screen.getByRole('heading', { name: 'Test most popular' })).toBeInTheDocument();
  });

  it('"Test most popular" link points to /phrasal-verbs/test-most-popular', () => {
    renderPhrasalVerbsPage();
    const link = screen.getByRole('link', { name: /Test most popular/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/test-most-popular');
  });

  it('renders the "List" topic card', () => {
    renderPhrasalVerbsPage();
    expect(screen.getByRole('heading', { name: 'List' })).toBeInTheDocument();
  });

  it('"List" link points to /phrasal-verbs/list', () => {
    renderPhrasalVerbsPage();
    const link = screen.getByRole('link', { name: /List/i });
    expect(link).toHaveAttribute('href', '/phrasal-verbs/list');
  });
});
