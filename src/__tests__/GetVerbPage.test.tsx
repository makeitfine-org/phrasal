import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GetVerbPage from '../pages/get/GetVerbPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <GetVerbPage />
    </MemoryRouter>
  );
}

function getCard(definitionPattern: RegExp) {
  return screen.getByText(definitionPattern).closest('[class*="rounded-2xl"]')!;
}

function getSection(particle: string) {
  return screen.getByText(particle).closest('[class*="mb-5"]')!;
}

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage', () => {
  it('renders "Get" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Get' })).toBeInTheDocument();
  });

  it('does not render "4 meanings" subtitle', () => {
    renderPage();
    expect(screen.queryByText(/4 meanings/i)).not.toBeInTheDocument();
  });

  it('renders correct numbered badges across all 5 sections (off:4, on:4, up:3, down:4, in:4)', () => {
    renderPage();
    expect(screen.getAllByText('1')).toHaveLength(5);
    expect(screen.getAllByText('2')).toHaveLength(5);
    expect(screen.getAllByText('3')).toHaveLength(5);
    expect(screen.getAllByText('4')).toHaveLength(4);
  });

  it('renders definition for leaving transport', () => {
    renderPage();
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });

  it('renders definition for finishing work', () => {
    renderPage();
    expect(screen.getByText(/To finish work/i)).toBeInTheDocument();
  });

  it('renders definition for escaping punishment', () => {
    renderPage();
    expect(screen.getByText(/To escape punishment/i)).toBeInTheDocument();
  });

  it('renders definition for sending something', () => {
    renderPage();
    expect(screen.getByText(/To send something/i)).toBeInTheDocument();
  });

  // --- Single-line truncation + hover tooltip ---

  it('definition paragraph has truncate class', () => {
    renderPage();
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveClass('truncate');
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveClass('truncate');
    expect(screen.getByText(/To finish work/i)).toHaveClass('truncate');
    expect(screen.getByText(/To escape punishment/i)).toHaveClass('truncate');
    expect(screen.getByText(/To send something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveAttribute(
      'title',
      'To leave a form of public transport (bus, train, plane)'
    );
  });

  it('all 4 title attributes contain the full definition text', () => {
    renderPage();
    expect(screen.getByText(/To leave a form of public transport/i)).toHaveAttribute(
      'title',
      'To leave a form of public transport (bus, train, plane)'
    );
    expect(screen.getByText(/To finish work/i)).toHaveAttribute('title', 'To finish work');
    expect(screen.getByText(/To escape punishment/i)).toHaveAttribute(
      'title',
      'To escape punishment'
    );
    expect(screen.getByText(/To send something/i)).toHaveAttribute(
      'title',
      'To send something (like a letter or email)'
    );
  });

  it('hovering over a definition exposes the full text via title attribute', () => {
    renderPage();
    const p = screen.getByText(/To leave a form of public transport/i);
    fireEvent.mouseEnter(p);
    expect(p).toHaveAttribute('title', 'To leave a form of public transport (bus, train, plane)');
  });

  it('title attribute is present on all definitions after mouse enters each one', () => {
    renderPage();
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

  // --- Section separators ---

  it('renders four horizontal rule separators', () => {
    renderPage();
    expect(document.querySelectorAll('hr')).toHaveLength(4);
  });

  it('all separators have border-gray-600 class', () => {
    renderPage();
    document.querySelectorAll('hr').forEach(hr => {
      expect(hr).toHaveClass('border-gray-600');
    });
  });

  it('first separator appears between off and on sections in DOM order', () => {
    renderPage();
    const [hr1] = document.querySelectorAll('hr');
    const offSection = getSection('off');
    const onSection = getSection('on');
    expect(offSection.compareDocumentPosition(hr1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr1.compareDocumentPosition(onSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('second separator appears between on and up sections in DOM order', () => {
    renderPage();
    const [, hr2] = document.querySelectorAll('hr');
    const onSection = getSection('on');
    const upSection = getSection('up');
    expect(onSection.compareDocumentPosition(hr2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr2.compareDocumentPosition(upSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('third separator appears between up and down sections in DOM order', () => {
    renderPage();
    const [,, hr3] = document.querySelectorAll('hr');
    const upSection = getSection('up');
    const downSection = getSection('down');
    expect(upSection.compareDocumentPosition(hr3) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr3.compareDocumentPosition(downSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fourth separator appears between down and in sections in DOM order', () => {
    renderPage();
    const [,,, hr4] = document.querySelectorAll('hr');
    const downSection = getSection('down');
    const inSection = getSection('in');
    expect(downSection.compareDocumentPosition(hr4) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr4.compareDocumentPosition(inSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  // --- Section spacing ---

  it('"off" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('off')).toHaveClass('mb-5');
  });

  it('"on" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('on')).toHaveClass('mb-5');
  });

  it('"off" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('off')).not.toHaveClass('mb-10');
  });

  it('"on" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('on')).not.toHaveClass('mb-10');
  });

  // --- "off" section toggle ---

  it('renders "off" section toggle', () => {
    renderPage();
    expect(screen.getByText('off')).toBeInTheDocument();
  });

  it('"off" section starts expanded showing all 4 definitions', () => {
    renderPage();
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To finish work/i)).toBeInTheDocument();
    expect(screen.getByText(/To escape punishment/i)).toBeInTheDocument();
    expect(screen.getByText(/To send something/i)).toBeInTheDocument();
  });

  it('clicking "off" collapses all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.queryByText(/To leave a form of public transport/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To finish work/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To escape punishment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To send something/i)).not.toBeInTheDocument();
  });

  it('clicking "off" twice restores all meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });

  it('saves "off" section state to localStorage when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(localStorage.getItem('getOff_section_expanded')).toBe('false');
  });

  it('restores "off" section collapsed state from localStorage', () => {
    localStorage.setItem('getOff_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To leave a form of public transport/i)).not.toBeInTheDocument();
  });

  // --- Chevron direction (off) ---

  it('off chevron is ▶ character', () => {
    renderPage();
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toBeInTheDocument();
  });

  it('off chevron has rotate-90 class when expanded', () => {
    renderPage();
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('off chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('off chevron regains rotate-90 class when re-expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    fireEvent.click(screen.getByText('off'));
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  // --- Chevron and text colour (off) ---

  it('off chevron is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('off chevron is white when expanded', () => {
    renderPage();
    const offHeader = screen.getByText('off').closest('div')!;
    expect(within(offHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('off particle text is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText('off')).toHaveClass('text-blue-600');
  });

  it('off particle text is white when expanded', () => {
    renderPage();
    expect(screen.getByText('off')).toHaveClass('text-white');
  });

  // --- "on" section toggle ---

  it('renders "on" section toggle', () => {
    renderPage();
    expect(screen.getByText('on')).toBeInTheDocument();
  });

  it('"on" section starts expanded showing all 4 definitions', () => {
    renderPage();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To make progress or handle a situation/i)).toBeInTheDocument();
    expect(screen.getByText(/To have a good relationship/i)).toBeInTheDocument();
    expect(screen.getByText(/To continue doing something/i)).toBeInTheDocument();
  });

  it('clicking "on" collapses all "on" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    expect(screen.queryByText(/To step onto a form of public transport/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To make progress or handle a situation/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To have a good relationship/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To continue doing something/i)).not.toBeInTheDocument();
  });

  it('clicking "on" twice restores all "on" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    fireEvent.click(screen.getByText('on'));
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });

  it('collapsing "on" section does not affect "off" section', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });

  it('collapsing "off" section does not affect "on" section', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });

  it('saves "on" section state to localStorage when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    expect(localStorage.getItem('getOn_section_expanded')).toBe('false');
  });

  it('restores "on" section collapsed state from localStorage', () => {
    localStorage.setItem('getOn_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To step onto a form of public transport/i)).not.toBeInTheDocument();
  });

  // --- Chevron direction (on) ---

  it('on chevron is ▶ character', () => {
    renderPage();
    const onHeader = screen.getByText('on').closest('div')!;
    expect(within(onHeader).getByText('▶')).toBeInTheDocument();
  });

  it('on chevron has rotate-90 class when expanded', () => {
    renderPage();
    const onHeader = screen.getByText('on').closest('div')!;
    expect(within(onHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('on chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    const onHeader = screen.getByText('on').closest('div')!;
    expect(within(onHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('on chevron regains rotate-90 class when re-expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    fireEvent.click(screen.getByText('on'));
    const onHeader = screen.getByText('on').closest('div')!;
    expect(within(onHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  // --- Chevron and text colour (on) ---

  it('on chevron is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    const onHeader = screen.getByText('on').closest('div')!;
    expect(within(onHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('on chevron is white when expanded', () => {
    renderPage();
    const onHeader = screen.getByText('on').closest('div')!;
    expect(within(onHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('on particle text is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('on'));
    expect(screen.getByText('on')).toHaveClass('text-blue-600');
  });

  it('on particle text is white when expanded', () => {
    renderPage();
    expect(screen.getByText('on')).toHaveClass('text-white');
  });

  // --- "on" section definitions ---

  it('all 4 "on" definition paragraphs have truncate class', () => {
    renderPage();
    expect(screen.getByText(/To step onto a form of public transport/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make progress or handle a situation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have a good relationship/i)).toHaveClass('truncate');
    expect(screen.getByText(/To continue doing something/i)).toHaveClass('truncate');
  });

  it('all 4 "on" title attributes contain the full definition text', () => {
    renderPage();
    expect(screen.getByText(/To step onto a form of public transport/i)).toHaveAttribute(
      'title',
      'To step onto a form of public transport'
    );
    expect(screen.getByText(/To make progress or handle a situation/i)).toHaveAttribute(
      'title',
      'To make progress or handle a situation'
    );
    expect(screen.getByText(/To have a good relationship/i)).toHaveAttribute(
      'title',
      'To have a good relationship (often "get on with")'
    );
    expect(screen.getByText(/To continue doing something/i)).toHaveAttribute(
      'title',
      'To continue doing something'
    );
  });

  // --- "on" expand / collapse ---

  it('"on" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Hurry up and get on the bus before it leaves!"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"How are you getting on with the new Java project\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I get on very well with my team members\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Let's stop chatting and get on with the meeting\."/i)).not.toBeInTheDocument();
  });

  it('expands an "on" card when clicked', () => {
    renderPage();
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
  });

  it('shows image when an "on" card is expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('renders all 4 "on" example sentences when all cards are expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    fireEvent.click(getCard(/To make progress or handle a situation/i));
    fireEvent.click(getCard(/To have a good relationship/i));
    fireEvent.click(getCard(/To continue doing something/i));
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
    expect(screen.getByText(/"How are you getting on with the new Java project\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"I get on very well with my team members\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Let's stop chatting and get on with the meeting\."/i)).toBeInTheDocument();
  });

  it('renders 4 images when all "on" cards are expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    fireEvent.click(getCard(/To make progress or handle a situation/i));
    fireEvent.click(getCard(/To have a good relationship/i));
    fireEvent.click(getCard(/To continue doing something/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  // --- "on" localStorage persistence ---

  it('saves "on" card expanded state to localStorage', () => {
    renderPage();
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(localStorage.getItem('getOn_meaning_1_collapsed')).toBe('false');
  });

  it('restores "on" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getOn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
  });

  // --- Card border ---

  it('meaning card has dark border class for light theme', () => {
    renderPage();
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('border-gray-600');
  });

  it('meaning card has light border class for dark theme', () => {
    renderPage();
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('dark:border-gray-400');
  });

  it('all 4 cards have dark border class for light theme', () => {
    renderPage();
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('border-gray-600');
    expect(getCard(/To finish work/i)).toHaveClass('border-gray-600');
    expect(getCard(/To escape punishment/i)).toHaveClass('border-gray-600');
    expect(getCard(/To send something/i)).toHaveClass('border-gray-600');
  });

  it('all 4 cards have light border class for dark theme', () => {
    renderPage();
    expect(getCard(/To leave a form of public transport/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To finish work/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To escape punishment/i)).toHaveClass('dark:border-gray-400');
    expect(getCard(/To send something/i)).toHaveClass('dark:border-gray-400');
  });

  // --- Collapsed by default ---

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

  // --- Expand / collapse ---

  it('expands a card when clicked', () => {
    renderPage();
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    const card = getCard(/To leave a form of public transport/i);
    fireEvent.click(card); // expand
    fireEvent.click(card); // collapse
    expect(screen.queryByText(/"We need to get off the train at the next station\."/i)).not.toBeInTheDocument();
  });

  it('renders all 4 example sentences when all cards are expanded', () => {
    renderPage();
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
    fireEvent.click(getCard(/To leave a form of public transport/i));
    fireEvent.click(getCard(/To finish work/i));
    fireEvent.click(getCard(/To escape punishment/i));
    fireEvent.click(getCard(/To send something/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  // --- Expanded layout: image first, then number + definition + example ---

  it('collapsed card definition has truncate class', () => {
    renderPage();
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/To leave a form of public transport/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText(/To leave a form of public transport/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To leave a form of public transport/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const def = within(card).getByText(/To leave a form of public transport/i);
    const example = within(card).getByText(/"We need to get off the train/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    fireEvent.click(getCard(/To leave a form of public transport/i));
    const card = getCard(/To leave a form of public transport/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card has no example text', () => {
    renderPage();
    const card = getCard(/To leave a form of public transport/i);
    expect(within(card).queryByText(/"We need to get off the train/i)).not.toBeInTheDocument();
  });

  // --- "up" section toggle ---

  it('renders "up" section toggle', () => {
    renderPage();
    expect(screen.getByText('up')).toBeInTheDocument();
  });

  it('"up" section starts expanded showing all 3 definitions', () => {
    renderPage();
    expect(screen.getByText(/To rise from bed after sleeping/i)).toBeInTheDocument();
    expect(screen.getByText(/To stand up/i)).toBeInTheDocument();
    expect(screen.getByText(/To organize or arrange something/i)).toBeInTheDocument();
  });

  it('clicking "up" collapses all "up" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.queryByText(/To rise from bed after sleeping/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To stand up/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To organize or arrange something/i)).not.toBeInTheDocument();
  });

  it('clicking "up" twice restores all "up" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To rise from bed after sleeping/i)).toBeInTheDocument();
  });

  it('collapsing "up" section does not affect "off" or "on" sections', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });

  it('saves "up" section state to localStorage when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(localStorage.getItem('getUp_section_expanded')).toBe('false');
  });

  it('restores "up" section collapsed state from localStorage', () => {
    localStorage.setItem('getUp_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To rise from bed after sleeping/i)).not.toBeInTheDocument();
  });

  // --- Chevron direction (up) ---

  it('up chevron is ▶ character', () => {
    renderPage();
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toBeInTheDocument();
  });

  it('up chevron has rotate-90 class when expanded', () => {
    renderPage();
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('up chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  // --- Chevron and text colour (up) ---

  it('up chevron is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('up chevron is white when expanded', () => {
    renderPage();
    const upHeader = screen.getByText('up').closest('div')!;
    expect(within(upHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('up particle text is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText('up')).toHaveClass('text-blue-600');
  });

  it('up particle text is white when expanded', () => {
    renderPage();
    expect(screen.getByText('up')).toHaveClass('text-white');
  });

  // --- "up" section definitions ---

  it('all 3 "up" definition paragraphs have truncate class', () => {
    renderPage();
    expect(screen.getByText(/To rise from bed after sleeping/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stand up/i)).toHaveClass('truncate');
    expect(screen.getByText(/To organize or arrange something/i)).toHaveClass('truncate');
  });

  it('all 3 "up" title attributes contain the full definition text', () => {
    renderPage();
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

  // --- "up" expand / collapse ---

  it('"up" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I get up at 6:30 AM every morning\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He got up from his desk to welcome the visitors\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get up a team to handle this new software update\."/i)).not.toBeInTheDocument();
  });

  it('expands an "up" card when clicked', () => {
    renderPage();
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });

  it('renders all 3 "up" example sentences when all cards are expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    fireEvent.click(getCard(/To stand up/i));
    fireEvent.click(getCard(/To organize or arrange something/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He got up from his desk to welcome the visitors\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get up a team to handle this new software update\."/i)).toBeInTheDocument();
  });

  // --- "up" localStorage persistence ---

  it('saves "up" card expanded state to localStorage', () => {
    renderPage();
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(localStorage.getItem('getUp_meaning_1_collapsed')).toBe('false');
  });

  it('restores "up" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });

  // --- "down" section toggle ---

  it('renders "down" section toggle', () => {
    renderPage();
    expect(screen.getByText('down')).toBeInTheDocument();
  });

  it('"down" section starts expanded showing all 4 definitions', () => {
    renderPage();
    expect(screen.getByText(/To move to a lower position/i)).toBeInTheDocument();
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toBeInTheDocument();
    expect(screen.getByText(/To write something/i)).toBeInTheDocument();
    expect(screen.getByText(/To start focusing on a task seriously/i)).toBeInTheDocument();
  });

  it('clicking "down" collapses all "down" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(screen.queryByText(/To move to a lower position/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To make someone feel sad or depressed/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To write something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To start focusing on a task seriously/i)).not.toBeInTheDocument();
  });

  it('clicking "down" twice restores all "down" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText(/To move to a lower position/i)).toBeInTheDocument();
  });

  it('collapsing "down" section does not affect "off", "on", or "up" sections', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To rise from bed after sleeping/i)).toBeInTheDocument();
  });

  it('saves "down" section state to localStorage when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(localStorage.getItem('getDown_section_expanded')).toBe('false');
  });

  it('restores "down" section collapsed state from localStorage', () => {
    localStorage.setItem('getDown_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To move to a lower position/i)).not.toBeInTheDocument();
  });

  // --- Chevron direction (down) ---

  it('down chevron has rotate-90 class when expanded', () => {
    renderPage();
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('down chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  // --- Chevron and text colour (down) ---

  it('down chevron is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('down chevron is white when expanded', () => {
    renderPage();
    const downHeader = screen.getByText('down').closest('div')!;
    expect(within(downHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('down particle text is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText('down')).toHaveClass('text-blue-600');
  });

  it('down particle text is white when expanded', () => {
    renderPage();
    expect(screen.getByText('down')).toHaveClass('text-white');
  });

  // --- "down" section definitions ---

  it('all 4 "down" definition paragraphs have truncate class', () => {
    renderPage();
    expect(screen.getByText(/To move to a lower position/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveClass('truncate');
    expect(screen.getByText(/To write something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveClass('truncate');
  });

  it('all 4 "down" title attributes contain the full definition text', () => {
    renderPage();
    expect(screen.getByText(/To move to a lower position/i)).toHaveAttribute('title', 'To move to a lower position');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveAttribute('title', 'To make someone feel sad or depressed');
    expect(screen.getByText(/To write something/i)).toHaveAttribute('title', 'To write something');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveAttribute('title', 'To start focusing on a task seriously (often "get down to")');
  });

  // --- "down" expand / collapse ---

  it('"down" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"You need to get down from that ladder before you fall\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"This rainy weather is really getting me down\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Let me get your contact details down in my notebook\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Enough small talk; let's get down to business\."/i)).not.toBeInTheDocument();
  });

  it('expands a "down" card when clicked', () => {
    renderPage();
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });

  it('renders all 4 "down" example sentences when all cards are expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To move to a lower position/i));
    fireEvent.click(getCard(/To make someone feel sad or depressed/i));
    fireEvent.click(getCard(/To write something/i));
    fireEvent.click(getCard(/To start focusing on a task seriously/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"This rainy weather is really getting me down\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Let me get your contact details down in my notebook\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Enough small talk; let's get down to business\."/i)).toBeInTheDocument();
  });

  // --- "down" localStorage persistence ---

  it('saves "down" card expanded state to localStorage', () => {
    renderPage();
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(localStorage.getItem('getDown_meaning_1_collapsed')).toBe('false');
  });

  it('restores "down" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getDown_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });

  // --- "in" section toggle ---

  it('renders "in" section toggle', () => {
    renderPage();
    expect(screen.getByText('in')).toBeInTheDocument();
  });

  it('"in" section starts expanded showing all 4 definitions', () => {
    renderPage();
    expect(screen.getByText(/To enter a car, room, or building/i)).toBeInTheDocument();
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toBeInTheDocument();
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit something/i)).toBeInTheDocument();
  });

  it('clicking "in" collapses all "in" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(screen.queryByText(/To enter a car, room, or building/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To arrive \(usually a train, flight/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To be accepted into a school, club, or organization/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To submit something/i)).not.toBeInTheDocument();
  });

  it('clicking "in" twice restores all "in" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText(/To enter a car, room, or building/i)).toBeInTheDocument();
  });

  it('collapsing "in" section does not affect other sections', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To move to a lower position/i)).toBeInTheDocument();
  });

  it('saves "in" section state to localStorage when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(localStorage.getItem('getIn_section_expanded')).toBe('false');
  });

  it('restores "in" section collapsed state from localStorage', () => {
    localStorage.setItem('getIn_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To enter a car, room, or building/i)).not.toBeInTheDocument();
  });

  // --- Chevron direction (in) ---

  it('in chevron has rotate-90 class when expanded', () => {
    renderPage();
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('in chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  // --- Chevron and text colour (in) ---

  it('in chevron is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('in chevron is white when expanded', () => {
    renderPage();
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('in particle text is blue when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText('in')).toHaveClass('text-blue-600');
  });

  it('in particle text is white when expanded', () => {
    renderPage();
    expect(screen.getByText('in')).toHaveClass('text-white');
  });

  // --- "in" section definitions ---

  it('all 4 "in" definition paragraphs have truncate class', () => {
    renderPage();
    expect(screen.getByText(/To enter a car, room, or building/i)).toHaveClass('truncate');
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toHaveClass('truncate');
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toHaveClass('truncate');
    expect(screen.getByText(/To submit something/i)).toHaveClass('truncate');
  });

  it('all 4 "in" title attributes contain the full definition text', () => {
    renderPage();
    expect(screen.getByText(/To enter a car, room, or building/i)).toHaveAttribute('title', 'To enter a car, room, or building');
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toHaveAttribute('title', 'To arrive (usually a train, flight, or arriving at home/work)');
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toHaveAttribute('title', 'To be accepted into a school, club, or organization');
    expect(screen.getByText(/To submit something/i)).toHaveAttribute('title', 'To submit something');
  });

  // --- "in" expand / collapse ---

  it('"in" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Get in the car, we are going to be late\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"What time does your flight get in\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"She applied to a top university and she got in\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I need to get my expenses application in by Friday\."/i)).not.toBeInTheDocument();
  });

  it('expands an "in" card when clicked', () => {
    renderPage();
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
  });

  it('renders all 4 "in" example sentences when all cards are expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    fireEvent.click(getCard(/To arrive \(usually a train, flight/i));
    fireEvent.click(getCard(/To be accepted into a school, club, or organization/i));
    fireEvent.click(getCard(/To submit something/i));
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"What time does your flight get in\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"She applied to a top university and she got in\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I need to get my expenses application in by Friday\."/i)).toBeInTheDocument();
  });

  // --- "in" localStorage persistence ---

  it('saves "in" card expanded state to localStorage', () => {
    renderPage();
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(localStorage.getItem('getIn_meaning_1_collapsed')).toBe('false');
  });

  it('restores "in" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getIn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
  });

  // --- localStorage persistence ---

  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    fireEvent.click(getCard(/To leave a form of public transport/i));
    expect(localStorage.getItem('getOff_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    const card = getCard(/To leave a form of public transport/i);
    fireEvent.click(card); // expand → false
    fireEvent.click(card); // collapse → true
    expect(localStorage.getItem('getOff_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('getOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"We need to get off the train at the next station\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('getOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.queryByText(/"I usually get off work at 5:00 PM\."/i)).not.toBeInTheDocument();
  });
});
