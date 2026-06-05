import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "up" section toggle', () => {
  it('renders "up" section toggle', () => {
    renderPage();
    expect(screen.getByText('up')).toBeInTheDocument();
  });

  it('"up" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To rise from bed after sleeping/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To stand up/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To organize or arrange something/i)).not.toBeInTheDocument();
  });

  it('clicking "up" expands all "up" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To rise from bed after sleeping/i)).toBeInTheDocument();
    expect(screen.getByText(/To stand up/i)).toBeInTheDocument();
    expect(screen.getByText(/To organize or arrange something/i)).toBeInTheDocument();
  });

  it('clicking "up" twice collapses all "up" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    fireEvent.click(screen.getByText('up'));
    expect(screen.queryByText(/To rise from bed after sleeping/i)).not.toBeInTheDocument();
  });

  it('collapsing "up" section does not affect "off" or "on" sections', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    expandSection('up');
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });

  it('saves "up" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(localStorage.getItem('getUp_section_expanded')).toBe('true');
  });

  it('restores "up" section collapsed state from localStorage', () => {
    localStorage.setItem('getUp_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To rise from bed after sleeping/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "up" chevron and colour', () => {
  it('up chevron is ▶ character', () => {
    renderPage();
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toBeInTheDocument();
  });

  it('up chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('up chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('up chevron is blue when collapsed', () => {
    renderPage();
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('up chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('up particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('up')).toHaveClass('text-blue-600');
  });

  it('up particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText('up')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "up" section definitions', () => {
  it('all 3 "up" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise from bed after sleeping/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stand up/i)).toHaveClass('truncate');
    expect(screen.getByText(/To organize or arrange something/i)).toHaveClass('truncate');
  });

  it('all 3 "up" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise from bed after sleeping/i)).toHaveAttribute(
      'title',
      'To rise from bed after sleeping'
    );
    expect(screen.getByText(/To stand up/i)).toHaveAttribute('title', 'To stand up');
    expect(screen.getByText(/To organize or arrange something/i)).toHaveAttribute(
      'title',
      'To organize or arrange something'
    );
  });
});

describe('GetVerbPage — "up" card expand / collapse', () => {
  it('"up" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I get up at 6:30 AM every morning\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He got up from his desk to welcome the visitors\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get up a team to handle this new software update\."/i)).not.toBeInTheDocument();
  });

  it('expands an "up" card when clicked', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });

  it('renders all 3 "up" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    fireEvent.click(getCard(/To stand up/i));
    fireEvent.click(getCard(/To organize or arrange something/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He got up from his desk to welcome the visitors\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get up a team to handle this new software update\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "up" localStorage persistence', () => {
  it('saves "up" card expanded state to localStorage', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(localStorage.getItem('getUp_meaning_1_collapsed')).toBe('false');
  });

  it('restores "up" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getUp_section_expanded', 'true');
    localStorage.setItem('getUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });
});
