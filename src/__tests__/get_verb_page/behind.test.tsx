import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "behind" section toggle', () => {
  it('renders "behind" section toggle', () => {
    renderPage();
    expect(screen.getByText('behind')).toBeInTheDocument();
  });

  it('"behind" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To fall behind schedule/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To support a person, idea, or project/i)).not.toBeInTheDocument();
  });

  it('clicking "behind" expands all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    expect(screen.getByText(/To fall behind schedule/i)).toBeInTheDocument();
    expect(screen.getByText(/To support a person, idea, or project/i)).toBeInTheDocument();
  });

  it('clicking "behind" twice collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    fireEvent.click(screen.getByText('behind'));
    expect(screen.queryByText(/To fall behind schedule/i)).not.toBeInTheDocument();
  });

  it('saves "behind" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    expect(localStorage.getItem('getBehind_section_expanded')).toBe('true');
  });

  it('restores "behind" section collapsed state from localStorage', () => {
    localStorage.setItem('getBehind_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To fall behind schedule/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "behind" chevron and colour', () => {
  it('behind chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    const header = screen.getByText('behind').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('rotate-90');
  });

  it('behind chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const header = screen.getByText('behind').closest('div')!;
    expect(within(header).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('behind chevron is blue when collapsed', () => {
    renderPage();
    const header = screen.getByText('behind').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('behind chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('behind'));
    const header = screen.getByText('behind').closest('div')!;
    expect(within(header).getByText('▶')).toHaveClass('text-white');
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

describe('GetVerbPage — "behind" section definitions', () => {
  it('all 2 "behind" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fall behind schedule/i)).toHaveClass('truncate');
    expect(screen.getByText(/To support a person, idea, or project/i)).toHaveClass('truncate');
  });

  it('all 2 "behind" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To fall behind schedule/i)).toHaveAttribute(
      'title',
      'To fall behind schedule or fail to keep up with work or payments'
    );
    expect(screen.getByText(/To support a person, idea, or project/i)).toHaveAttribute(
      'title',
      'To support a person, idea, or project'
    );
  });
});

describe('GetVerbPage — "behind" card expand / collapse', () => {
  it('"behind" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I was sick for a week, and I got behind/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The whole team got behind the new manager/i)).not.toBeInTheDocument();
  });

  it('all 2 "behind" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/"I was sick for a week, and I got behind on my emails\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The whole team got behind the new manager's plan\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "behind" non-expandable cards (default image)', () => {
  it('behind card has cursor-default class', () => {
    renderPage();
    expandSection('behind');
    const card = getCard(/To fall behind schedule/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "behind" card never renders an image', () => {
    renderPage();
    expandSection('behind');
    fireEvent.click(getCard(/To fall behind schedule/i));
    expect(within(getCard(/To fall behind schedule/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "behind" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('behind');
    fireEvent.click(getCard(/To fall behind schedule/i));
    fireEvent.click(getCard(/To support a person, idea, or project/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "behind" card does not remove truncate class', () => {
    renderPage();
    expandSection('behind');
    fireEvent.click(getCard(/To fall behind schedule/i));
    expect(within(getCard(/To fall behind schedule/i)).getByText(/"I was sick for a week/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "behind" localStorage persistence', () => {
  it('clicking "behind" card does not save to localStorage', () => {
    renderPage();
    expandSection('behind');
    fireEvent.click(getCard(/To fall behind schedule/i));
    expect(localStorage.getItem('getBehind_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getBehind_section_expanded', 'true');
    localStorage.setItem('getBehind_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To fall behind schedule/i)).getByText(/"I was sick for a week/i)).toHaveClass('truncate');
  });
});
