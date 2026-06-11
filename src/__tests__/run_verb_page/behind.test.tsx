import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "behind" section definitions', () => {
  it('renders definition for being late or delayed according to a schedule', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed according to a schedule/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed according to a schedule/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To be late or delayed according to a schedule/i)).toHaveAttribute(
      'title',
      'To be late or delayed according to a schedule.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'runBehind_section_expanded', /To be late or delayed according to a schedule/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'runBehind', /To be late or delayed according to a schedule/i, /We are running behind on the backend integration/i, renderPage, getCard);
