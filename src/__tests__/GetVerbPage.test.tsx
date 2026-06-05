import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders all 4 numbered meanings', () => {
    renderPage();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
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

  // --- Chevron direction ---

  it('chevron is ▶ character', () => {
    renderPage();
    expect(screen.getByText('▶')).toBeInTheDocument();
  });

  it('chevron has rotate-90 class when expanded', () => {
    renderPage();
    expect(screen.getByText('▶')).toHaveClass('rotate-90');
  });

  it('chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('chevron regains rotate-90 class when re-expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('off'));
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText('▶')).toHaveClass('rotate-90');
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
