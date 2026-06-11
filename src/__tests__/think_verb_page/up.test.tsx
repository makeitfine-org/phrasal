import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "up" section definitions', () => {
  it('renders definition for using imagination to create a plan or idea', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use your imagination to create a plan, an idea, or an excuse\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use your imagination to create a plan, an idea, or an excuse\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use your imagination to create a plan, an idea, or an excuse\./i)).toHaveAttribute(
      'title',
      'To use your imagination to create a plan, an idea, or an excuse.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'thinkUp_section_expanded', /To use your imagination to create a plan, an idea, or an excuse\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'thinkUp', /To use your imagination to create a plan, an idea, or an excuse\./i, /The developers thought up a brilliant solution to the software bug\./i, renderPage, getCard);
