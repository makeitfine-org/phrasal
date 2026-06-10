import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "up" section definitions', () => {
  it('renders definition for failing to take advantage of an opportunity', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to take advantage of an opportunity/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to take advantage of an opportunity/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fail to take advantage of an opportunity/i)).toHaveAttribute(
      'title',
      'To fail to take advantage of an opportunity.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'passUp_section_expanded', /To fail to take advantage of an opportunity/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'passUp', /To fail to take advantage of an opportunity/i, /You should not pass up the chance to lead this new team\./i, renderPage, getCard);
