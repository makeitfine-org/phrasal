import { screen } from '@testing-library/react';
import { renderPage, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

const ALL_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'cross / across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without', 'apart',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

describe('TakeVerbPage — general', () => {
  it('renders "Take" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Take' })).toBeInTheDocument();
  });

  it('renders all 26 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To remove clothing or accessories/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To accept or take responsibility for work/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To start a new activity or hobby/i)).not.toBeInTheDocument();
  });

  it('shows badge "5" in exactly 2 sections (off and out)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('5')).toHaveLength(2);
  });

  it('shows badge "4" in exactly 6 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    // up(4), in(4), away(4), back(4), off(5), out(5) → sections with ≥4 meanings
    expect(screen.getAllByText('4').length).toBeGreaterThanOrEqual(6);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(26);
  });
});
