import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'together', 'getTogether_section_expanded', /To meet socially/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describe('GetVerbPage — "together" section definitions', () => {
  it('all 2 "together" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To meet socially/i)).toHaveClass('truncate');
    expect(screen.getByText(/To organize your thoughts/i)).toHaveClass('truncate');
  });

  it('all 2 "together" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To meet socially/i)).toHaveAttribute('title', 'To meet socially');
    expect(screen.getByText(/To organize your thoughts/i)).toHaveAttribute(
      'title',
      'To organize your thoughts, life, or things (often "get your act together")'
    );
  });
});

describe('GetVerbPage — "together" card expand / collapse', () => {
  it('"together" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Let's get together for a coffee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"If he wants a promotion/i)).not.toBeInTheDocument();
  });

  it('all 2 "together" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/"Let's get together for a coffee next week\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"If he wants a promotion, he needs to get his act together and work harder\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "together" non-expandable cards (default image)', () => {
  it('together card has cursor-default class', () => {
    renderPage();
    expandSection('together');
    const card = getCard(/To meet socially/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "together" card never renders an image', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    expect(within(getCard(/To meet socially/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "together" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    fireEvent.click(getCard(/To organize your thoughts/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "together" card does not remove truncate class', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    expect(within(getCard(/To meet socially/i)).getByText(/"Let's get together/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "together" localStorage persistence', () => {
  it('clicking "together" card does not save to localStorage', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To meet socially/i));
    expect(localStorage.getItem('getTogether_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getTogether_section_expanded', 'true');
    localStorage.setItem('getTogether_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To meet socially/i)).getByText(/"Let's get together/i)).toHaveClass('truncate');
  });
});
