import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('PutVerbPage — "behind" section toggle', () => {
  it('renders "behind" section toggle', () => {
    renderPage();
    expect(screen.getByText('behind')).toBeInTheDocument();
  });

  it('"behind" section starts collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To forget about a bad experience and move on/i)).not.toBeInTheDocument();
  });

  it('clicking "behind" expands meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    expect(screen.getByText(/To forget about a bad experience and move on/i)).toBeInTheDocument();
  });

  it('clicking "behind" twice collapses meaning card', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    fireEvent.click(screen.getByText('behind'));
    expect(screen.queryByText(/To forget about a bad experience and move on/i)).not.toBeInTheDocument();
  });

  it('saves "behind" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    expect(localStorage.getItem('putBehind_section_expanded')).toBe('true');
  });
});

describe('PutVerbPage — "behind" chevron and colour', () => {
  it('behind chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    const header = screen.getByText('behind').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('behind particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('behind')).toHaveClass('text-blue-600');
  });

  it('behind particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    expect(screen.getByText('behind')).toHaveClass('text-white');
  });
});

describe('PutVerbPage — "behind" card view (default image)', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/"We lost a big client, but we need to put it behind us/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('behind');
    expect(getCard(/To forget about a bad experience and move on/i)).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('behind');
    fireEvent.click(getCard(/To forget about a bad experience and move on/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
