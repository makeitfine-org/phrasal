import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

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

describeDefaultImageCards(LABEL, 'together', 'getTogether', /To meet socially/i, /"Let's get together/i, renderPage, getCard);
