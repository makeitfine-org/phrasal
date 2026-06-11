import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "for" section definitions', () => {
  it('renders definition for trying to be elected to a position', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to be elected to an official/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to be elected to an official/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To try to be elected to an official/i)).toHaveAttribute(
      'title',
      'To try to be elected to an official or leadership position.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'runFor_section_expanded', /To try to be elected to an official/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'runFor', /To try to be elected to an official/i, /She decided to run for the board of directors/i, renderPage, getCard);
