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
  it('renders "Get off" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Get off' })).toBeInTheDocument();
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
