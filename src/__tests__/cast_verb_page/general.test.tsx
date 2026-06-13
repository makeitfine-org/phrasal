import { screen } from '@testing-library/react';
import { renderPage, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

const ALL_PARTICLES = [
  'about / around / round', 'away', 'back', 'down', 'forward',
  'off', 'on', 'out', 'up',
];

describe('CastVerbPage — general', () => {
  it('renders "Cast" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Cast' })).toBeInTheDocument();
  });

  it('renders all 9 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To search anxiously or desperately for something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To throw something away because it is no longer wanted/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To get rid of something or someone/i)).not.toBeInTheDocument();
  });

  it('shows badge "3" in exactly 1 section (off)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('3')).toHaveLength(1);
  });

  it('shows badge "2" in exactly 3 sections (away, off, and up)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('2')).toHaveLength(3);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(9);
  });
});
