import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "without" section definitions', () => {
  it('renders definition for functioning lacking something', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To function lacking something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To function lacking something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To function lacking something/i)).toHaveAttribute(
      'title',
      'To function lacking something.'
    );
  });
});

describeSectionToggle(LABEL, 'without', 'runWithout_section_expanded', /To function lacking something/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'runWithout', /To function lacking something/i, /The microservice is designed to run without/i, renderPage, getCard);
