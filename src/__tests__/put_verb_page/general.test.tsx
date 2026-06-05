import { screen, fireEvent } from '@testing-library/react';
import { renderPage, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — general', () => {
  it('renders "Put" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Put' })).toBeInTheDocument();
  });

  it('renders all 19 section particles', () => {
    renderPage();
    const particles = [
      'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away',
      'across / over', 'forward', 'back', 'by', 'together', 'with',
      'ahead', 'behind', 'through', 'about / around / round', 'to',
    ];
    for (const p of particles) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To delay or postpone something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To dress oneself in clothing/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To build or erect something/i)).not.toBeInTheDocument();
  });

  it('shows correct badge counts when all sections expanded', () => {
    renderPage();
    const particles = [
      'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away',
      'across / over', 'forward', 'back', 'by', 'together', 'with',
      'ahead', 'behind', 'through', 'about / around / round', 'to',
    ];
    for (const p of particles) {
      expandSection(p);
    }
    // badge "1" appears in every section (19 sections = 19)
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(19);
    // badge "5" in "on" (5 meanings) and "down" (6 meanings) sections
    expect(screen.getAllByText('5')).toHaveLength(2);
    // badge "6" only in "down" section
    expect(screen.getAllByText('6')).toHaveLength(1);
  });
});
