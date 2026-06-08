import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "across" section definitions', () => {
  it('renders definition for being familiar with a topic', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To be fully familiar with or understand a topic\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To be fully familiar with or understand a topic\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To be fully familiar with or understand a topic\./i)).toHaveAttribute(
      'title',
      'To be fully familiar with or understand a topic.'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'beAcross_section_expanded', /To be fully familiar with or understand a topic\./i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'beAcross', /To be fully familiar with or understand a topic\./i, /I need to be across all the new data privacy laws/i, renderPage, getCard);
