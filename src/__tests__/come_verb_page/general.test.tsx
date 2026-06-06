import { screen } from '@testing-library/react';
import { renderPage, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

const ALL_PARTICLES = [
  'about', 'across', 'after', 'against', 'ahead', 'apart', 'around / round',
  'away', 'back', 'behind', 'by', 'down', 'for', 'forward', 'in', 'into',
  'off', 'on', 'out', 'over', 'through', 'to', 'together', 'up', 'with', 'without',
];

describe('ComeVerbPage — general', () => {
  it('renders "Come" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Come' })).toBeInTheDocument();
  });

  it('renders all 26 section particles', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To happen or occur/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To find or meet something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To reach a total amount/i)).not.toBeInTheDocument();
  });

  it('shows badge "4" in exactly 1 section (to)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('4')).toHaveLength(1);
  });

  it('shows badge "3" in exactly 7 sections (around/round, in, on, out, through, up, to)', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('3')).toHaveLength(7);
  });

  it('shows badge "2" in exactly 17 sections', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('2')).toHaveLength(17);
  });

  it('badge "1" appears in every expanded section', () => {
    renderPage();
    for (const p of ALL_PARTICLES) {
      expandSection(p);
    }
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(26);
  });
});
