import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "for" section definitions', () => {
  it('renders definition for looking closely to find a specific thing', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look closely to find a specific thing \(often errors, signs, or problems\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look closely to find a specific thing \(often errors, signs, or problems\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look closely to find a specific thing \(often errors, signs, or problems\)\./i)).toHaveAttribute(
      'title',
      'To look closely to find a specific thing (often errors, signs, or problems).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'checkFor_section_expanded', /To look closely to find a specific thing \(often errors, signs, or problems\)\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'checkFor', /To look closely to find a specific thing \(often errors, signs, or problems\)\./i, /We ran automated tests to check for security bugs in the code\./i, renderPage, getCard);
