import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "into" section definitions', () => {
  it('renders definition for causing involvement in a situation', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To cause someone or something to become involved in a specific situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To cause someone or something to become involved in a specific situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To cause someone or something to become involved in a specific situation/i)).toHaveAttribute(
      'title',
      'To cause someone or something to become involved in a specific situation, state, or condition.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'bringInto_section_expanded', /To cause someone or something to become involved in a specific situation/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'bringInto', /To cause someone or something to become involved in a specific situation/i, /Please don't bring me into your argument/i, renderPage, getCard);
