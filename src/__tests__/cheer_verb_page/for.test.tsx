import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheerVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheerVerbPage — "for" section definitions', () => {
  it('renders definition for publicly supporting a person, team, or idea', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly support a specific person, team, or idea, hoping they will succeed\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly support a specific person, team, or idea, hoping they will succeed\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To publicly support a specific person, team, or idea, hoping they will succeed\./i)).toHaveAttribute(
      'title',
      'To publicly support a specific person, team, or idea, hoping they will succeed.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'cheerFor_section_expanded', /To publicly support a specific person, team, or idea, hoping they will succeed\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'cheerFor', /To publicly support a specific person, team, or idea, hoping they will succeed\./i, /Everyone in the office is cheering for the new software release/i, renderPage, getCard);
