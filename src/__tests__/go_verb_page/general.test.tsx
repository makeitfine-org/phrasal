import { screen } from '@testing-library/react';
import { renderPage, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

const ALL_PARTICLES = [
  'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away', 'across',
  'forward', 'back', 'for', 'by', 'together', 'with', 'without',
  'over', 'ahead', 'after', 'behind', 'through', 'about', 'around / round',
  'to', 'against',
];

describe('GoVerbPage — general', () => {
  it('renders "Go" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Go' })).toBeInTheDocument();
  });

  it('renders all 25 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To explode or fire/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To increase or rise/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To experience a difficult situation/i)).not.toBeInTheDocument();
  });

  it('shows badge "7" in exactly 1 section (off)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('7')).toHaveLength(1);
  });

  it('shows badge "6" in exactly 2 sections (off and on)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('6')).toHaveLength(2);
  });

  it('shows badge "5" in exactly 5 sections (off, on, down, out, through)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('5')).toHaveLength(5);
  });

  it('shows badge "4" in exactly 8 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('4')).toHaveLength(8);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(25);
  });
});
