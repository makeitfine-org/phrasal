import { screen } from '@testing-library/react';
import { renderPage, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

const ALL_PARTICLES = [
  'away', 'back', 'in', 'in to', 'off', 'on / onto', 'out', 'over', 'up', '(it) up for', 'with',
];

describe('GiveVerbPage — general', () => {
  it('renders "Give" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Give' })).toBeInTheDocument();
  });

  it('renders all 11 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To provide something for free/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To stop trying to do something or accept defeat/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To distribute something to a group/i)).not.toBeInTheDocument();
  });

  it('shows badge "4" in exactly 2 sections (away and up)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('4')).toHaveLength(2);
  });

  it('shows badge "3" in exactly 4 sections (away, out, over, up)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('3')).toHaveLength(4);
  });

  it('shows badge "2" in at least 6 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('2').length).toBeGreaterThanOrEqual(6);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(11);
  });
});
