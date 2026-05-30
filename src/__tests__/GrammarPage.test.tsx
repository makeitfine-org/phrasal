import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GrammarPage from '../pages/GrammarPage';

function renderGrammarPage() {
  return render(
    <MemoryRouter>
      <GrammarPage />
    </MemoryRouter>
  );
}

describe('GrammarPage', () => {
  it('renders "Grammar" heading', () => {
    renderGrammarPage();
    expect(screen.getByRole('heading', { name: 'Grammar' })).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    renderGrammarPage();
    expect(screen.getByText('Choose a grammar topic to practice')).toBeInTheDocument();
  });

  it('renders the "I wish / If only" topic card', () => {
    renderGrammarPage();
    expect(screen.getByRole('heading', { name: 'I wish / If only' })).toBeInTheDocument();
  });

  it('"I wish / If only" link points to /grammar/i-wish-if-only', () => {
    renderGrammarPage();
    const link = screen.getByRole('link', { name: /I wish \/ If only/i });
    expect(link).toHaveAttribute('href', '/grammar/i-wish-if-only');
  });
});
