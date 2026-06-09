import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "over" section definitions', () => {
  it('renders definition for examining something carefully from start to finish', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine something carefully from start to finish to find errors or problems\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine something carefully from start to finish to find errors or problems\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine something carefully from start to finish to find errors or problems\./i)).toHaveAttribute(
      'title',
      'To examine something carefully from start to finish to find errors or problems.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'checkOver_section_expanded', /To examine something carefully from start to finish to find errors or problems\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'checkOver', /To examine something carefully from start to finish to find errors or problems\./i, /Please check over the business contract before you sign it\./i, renderPage, getCard);
