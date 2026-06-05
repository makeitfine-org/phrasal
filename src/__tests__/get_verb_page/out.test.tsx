import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "out" section toggle', () => {
  it('renders "out" section toggle', () => {
    renderPage();
    expect(screen.getByText('out')).toBeInTheDocument();
  });

  it('"out" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To leave a place or a car/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To become known/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To produce or publish something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To avoid doing something you do not want to do/i)).not.toBeInTheDocument();
  });

  it('clicking "out" expands all "out" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText(/To leave a place or a car/i)).toBeInTheDocument();
    expect(screen.getByText(/To become known/i)).toBeInTheDocument();
    expect(screen.queryByText(/To produce or publish something/i)).toBeInTheDocument();
    expect(screen.queryByText(/To avoid doing something you do not want to do/i)).toBeInTheDocument();
  });

  it('clicking "out" twice collapses all "out" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    fireEvent.click(screen.getByText('out'));
    expect(screen.queryByText(/To leave a place or a car/i)).not.toBeInTheDocument();
  });

  it('collapsing "out" section does not affect other sections', () => {
    renderPage();
    expandSection('off');
    expandSection('into');
    expandSection('out');
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To become interested or involved in something/i)).toBeInTheDocument();
  });

  it('saves "out" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    expect(localStorage.getItem('getOut_section_expanded')).toBe('true');
  });

  it('restores "out" section collapsed state from localStorage', () => {
    localStorage.setItem('getOut_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To leave a place or a car/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "out" chevron and colour', () => {
  it('out chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    const outHeader = screen.getByText('out').closest('div')!;
    expect(within(outHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('out chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const outHeader = screen.getByText('out').closest('div')!;
    expect(within(outHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('out chevron is blue when collapsed', () => {
    renderPage();
    const outHeader = screen.getByText('out').closest('div')!;
    expect(within(outHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('out chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    const outHeader = screen.getByText('out').closest('div')!;
    expect(within(outHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('out particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('out')).toHaveClass('text-blue-600');
  });

  it('out particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText('out')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "out" section definitions', () => {
  it('all 4 "out" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a place or a car/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become known/i)).toHaveClass('truncate');
    expect(screen.getByText(/To produce or publish something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To avoid doing something you do not want to do/i)).toHaveClass('truncate');
  });

  it('all 4 "out" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To leave a place or a car/i)).toHaveAttribute('title', 'To leave a place or a car');
    expect(screen.getByText(/To become known/i)).toHaveAttribute('title', 'To become known (usually a secret or hidden information)');
    expect(screen.getByText(/To produce or publish something/i)).toHaveAttribute('title', 'To produce or publish something');
    expect(screen.getByText(/To avoid doing something you do not want to do/i)).toHaveAttribute('title', 'To avoid doing something you do not want to do (often "get out of")');
  });
});

describe('GetVerbPage — "out" card expand / collapse', () => {
  it('"out" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The fire alarm rang, and everyone got out of the building\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The news of the CEO leaving got out to the press\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get this new application out by next month\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He tried to get out of doing the presentation, but his boss said no\."/i)).not.toBeInTheDocument();
  });

  it('example is visible in collapsed view without clicking', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, and everyone got out of the building\."/i)).toBeInTheDocument();
  });

  it('all 4 "out" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, and everyone got out of the building\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The news of the CEO leaving got out to the press\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get this new application out by next month\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He tried to get out of doing the presentation, but his boss said no\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "out" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveAttribute(
      'title',
      '"The fire alarm rang, and everyone got out of the building."'
    );
  });

  it('clicking "out" card does not remove truncate class (no image to show)', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To leave a place or a car/i));
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "out" non-expandable cards (default image)', () => {
  it('out card has cursor-default class', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To leave a place or a car/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "out" card never renders an image', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To leave a place or a car/i));
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "out" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To leave a place or a car/i));
    fireEvent.click(getCard(/To become known/i));
    fireEvent.click(getCard(/To produce or publish something/i));
    fireEvent.click(getCard(/To avoid doing something you do not want to do/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describe('GetVerbPage — "out" localStorage persistence', () => {
  it('clicking "out" card does not save to localStorage', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To leave a place or a car/i));
    expect(localStorage.getItem('getOut_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getOut_section_expanded', 'true');
    localStorage.setItem('getOut_meaning_1_collapsed', 'false');
    renderPage();
    const card = getCard(/To leave a place or a car/i);
    expect(within(card).getByText(/"The fire alarm rang/i)).toHaveClass('truncate');
  });
});
