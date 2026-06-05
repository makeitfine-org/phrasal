import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "down" section toggle', () => {
  it('renders "down" section toggle', () => {
    renderPage();
    expect(screen.getByText('down')).toBeInTheDocument();
  });

  it('"down" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To move to a lower position/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To make someone feel sad or depressed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To write something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To start focusing on a task seriously/i)).not.toBeInTheDocument();
  });

  it('clicking "down" expands all "down" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText(/To move to a lower position/i)).toBeInTheDocument();
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toBeInTheDocument();
    expect(screen.getByText(/To write something/i)).toBeInTheDocument();
    expect(screen.getByText(/To start focusing on a task seriously/i)).toBeInTheDocument();
  });

  it('clicking "down" twice collapses all "down" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    fireEvent.click(screen.getByText('down'));
    expect(screen.queryByText(/To move to a lower position/i)).not.toBeInTheDocument();
  });

  it('collapsing "down" section does not affect "off", "on", or "up" sections', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    expandSection('up');
    expandSection('down');
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To rise from bed after sleeping/i)).toBeInTheDocument();
  });

  it('saves "down" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(localStorage.getItem('getDown_section_expanded')).toBe('true');
  });

  it('restores "down" section collapsed state from localStorage', () => {
    localStorage.setItem('getDown_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To move to a lower position/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "down" chevron and colour', () => {
  it('down chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('down chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('down chevron is blue when collapsed', () => {
    renderPage();
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('down chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('down particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('down')).toHaveClass('text-blue-600');
  });

  it('down particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText('down')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "down" section definitions', () => {
  it('all 4 "down" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To move to a lower position/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveClass('truncate');
    expect(screen.getByText(/To write something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveClass('truncate');
  });

  it('all 4 "down" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To move to a lower position/i)).toHaveAttribute('title', 'To move to a lower position');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveAttribute('title', 'To make someone feel sad or depressed');
    expect(screen.getByText(/To write something/i)).toHaveAttribute('title', 'To write something');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveAttribute('title', 'To start focusing on a task seriously (often "get down to")');
  });
});

describe('GetVerbPage — "down" card expand / collapse', () => {
  it('"down" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"You need to get down from that ladder before you fall\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"This rainy weather is really getting me down\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Let me get your contact details down in my notebook\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Enough small talk; let's get down to business\."/i)).not.toBeInTheDocument();
  });

  it('expands a "down" card when clicked', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });

  it('renders all 4 "down" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    fireEvent.click(getCard(/To make someone feel sad or depressed/i));
    fireEvent.click(getCard(/To write something/i));
    fireEvent.click(getCard(/To start focusing on a task seriously/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"This rainy weather is really getting me down\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Let me get your contact details down in my notebook\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Enough small talk; let's get down to business\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "down" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toHaveAttribute(
      'title',
      '"You need to get down from that ladder before you fall."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "down" localStorage persistence', () => {
  it('saves "down" card expanded state to localStorage', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(localStorage.getItem('getDown_meaning_1_collapsed')).toBe('false');
  });

  it('restores "down" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getDown_section_expanded', 'true');
    localStorage.setItem('getDown_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });
});
