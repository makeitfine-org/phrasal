import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "over" section definitions', () => {
  it('renders definition for stopping temporarily during a journey', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop somewhere temporarily during a long journey/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop somewhere temporarily during a long journey/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop somewhere temporarily during a long journey/i)).toHaveAttribute(
      'title',
      'To stop somewhere temporarily during a long journey (this creates the noun "layover").'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'layOver_section_expanded', /To stop somewhere temporarily during a long journey/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'layOver', /To stop somewhere temporarily during a long journey/i, /I had to lay over in Frankfurt for six hours before my connecting flight to New York\./i, renderPage, getCard);
