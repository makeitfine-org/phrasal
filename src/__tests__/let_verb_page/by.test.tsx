import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "by" section definitions', () => {
  it('renders definition for moving aside to let someone pass', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To move aside to allow someone or something to pass you/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To move aside to allow someone or something to pass you/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To move aside to allow someone or something to pass you/i)).toHaveAttribute(
      'title',
      'To move aside to allow someone or something to pass you.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'letBy_section_expanded', /To move aside to allow someone or something to pass you/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'letBy', /To move aside to allow someone or something to pass you/i, /Please step aside and let the paramedics by\./i, renderPage, getCard);
