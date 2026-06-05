import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "off" section definitions', () => {
  it('renders definition for leaving transport', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });

  it('renders definition for finishing work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To finish work/i)).toBeInTheDocument();
  });

  it('renders definition for escaping punishment', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To escape punishment/i)).toBeInTheDocument();
  });

  it('renders definition for sending something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To send something/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveClass('truncate');
    expect(screen.getByText(/To finish work/i)).toHaveClass('truncate');
    expect(screen.getByText(/To escape punishment/i)).toHaveClass('truncate');
    expect(screen.getByText(/To send something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveAttribute(
      'title',
      'To leave a form of public transport (bus, train, plane)'
    );
  });

  it('all 4 title attributes contain the full definition text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveAttribute(
      'title',
      'To leave a form of public transport (bus, train, plane)'
    );
    expect(screen.getByText(/To finish work/i)).toHaveAttribute('title', 'To finish work');
    expect(screen.getByText(/To escape punishment/i)).toHaveAttribute('title', 'To escape punishment');
    expect(screen.getByText(/To send something/i)).toHaveAttribute(
      'title',
      'To send something (like a letter or email)'
    );
  });

  it('hovering over a definition exposes the full text via title attribute', () => {
    renderPage();
    expandSection('off');
    const p = screen.getByText(/To leave a form of public transport/i);
    fireEvent.mouseEnter(p);
    expect(p).toHaveAttribute('title', 'To leave a form of public transport (bus, train, plane)');
  });

  it('title attribute is present on all definitions after mouse enters each one', () => {
    renderPage();
    expandSection('off');
    const defs = [
      { pattern: /To leave a form of public transport/i, full: 'To leave a form of public transport (bus, train, plane)' },
      { pattern: /To finish work/i, full: 'To finish work' },
      { pattern: /To escape punishment/i, full: 'To escape punishment' },
      { pattern: /To send something/i, full: 'To send something (like a letter or email)' },
    ];
    for (const { pattern, full } of defs) {
      const p = screen.getByText(pattern);
      fireEvent.mouseEnter(p);
      expect(p).toHaveAttribute('title', full);
    }
  });
});

describe('GetVerbPage — "off" section toggle', () => {
  it('renders "off" section toggle', () => {
    renderPage();
    expect(screen.getByText('off')).toBeInTheDocument();
  });

  it('"off" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To leave a form of public transport/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To finish work/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To escape punishment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To send something/i)).not.toBeInTheDocument();
  });

  it('clicking "off" expands all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To finish work/i)).toBeInTheDocument();
    expect(screen.getByText(/To escape punishment/i)).toBeInTheDocument();
    expect(screen.getByText(/To send something/i)).toBeInTheDocument();
  });

  it('clicking "off" twice collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    fireEvent.click(screen.getByText('off'));
    expect(screen.queryByText(/To leave a form of public transport/i)).not.toBeInTheDocument();
  });

  it('saves "off" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(localStorage.getItem('getOff_section_expanded')).toBe('true');
  });

  it('restores "off" section collapsed state from localStorage', () => {
    localStorage.setItem('getOff_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To leave a form of public transport/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "off" chevron and colour', () => {
  it('off chevron is ▶ character', () => {
    renderPage();
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toBeInTheDocument();
  });

  it('off chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('off chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('off chevron regains rotate-90 class when re-expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    fireEvent.click(screen.getByText('off'));
    fireEvent.click(screen.getByText('off'));
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('off chevron is blue when collapsed', () => {
    renderPage();
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('off chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('off particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('off')).toHaveClass('text-blue-600');
  });

  it('off particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText('off')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "off" card borders', () => {
  it('meaning card has dark border class for light theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('border-gray-600');
  });

  it('meaning card has light border class for dark theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('dark:border-gray-400');
  });

  it('all 4 cards have dark border class for light theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('border-gray-600');
    expect(getCard(/To finish work/i)).toHaveClass('border-gray-600');
    expect(getCard(/To escape punishment/i)).toHaveClass('border-gray-600');
    expect(getCard(/To send something/i)).toHaveClass('border-gray-600');
  });

  it('all 4 cards have light border class for dark theme', () => {
    renderPage();
    expandSection('off');
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To finish work/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To escape punishment/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To send something/i)).toHaveClass('dark:border-gray-400');
  });
});

describe('GetVerbPage — "off" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"We need to get off the train at the next station\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I usually get off work at 5:00 PM\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The manager made a huge mistake, but he got off with just a warning\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I will get this report off to the client before the end of the day\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 4 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    fireEvent.click(getCard(/To finish work/i));
    fireEvent.click(getCard(/To escape punishment/i));
    fireEvent.click(getCard(/To send something/i));
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I usually get off work at 5:00 PM\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The manager made a huge mistake, but he got off with just a warning\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I will get this report off to the client before the end of the day\."/i)).toBeInTheDocument();
  });

  it('renders 4 images when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    fireEvent.click(getCard(/To finish work/i));
    fireEvent.click(getCard(/To escape punishment/i));
    fireEvent.click(getCard(/To send something/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });
});

describe('GetVerbPage — "off" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/To leave a form of public transport/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/To leave a form of public transport/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To leave a form of public transport/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const def = within(card).getByText(/To leave a form of public transport/i);
    const example = within(card).getByText(/"We need to get off the train/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/"We need to get off the train/i)).toBeInTheDocument();
    expect(within(card).getByText(/"We need to get off the train/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/"We need to get off the train/i)).toHaveAttribute(
      'title',
      '"We need to get off the train at the next station."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/"We need to get off the train/i)).not.toHaveClass('truncate');
  });

  it('off card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('GetVerbPage — "off" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(localStorage.getItem('getOff_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To leave a form of public transport/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('getOff_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('getOff_section_expanded', 'true');
    localStorage.setItem('getOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('getOff_section_expanded', 'true');
    localStorage.setItem('getOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To finish work/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});
