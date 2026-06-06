import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "after" section definitions', () => {
  it('renders definition for resembling a family member', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To look or behave like an older family member/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'after', 'takeAfter_section_expanded', /To look or behave like an older family member/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'takeAfter', /To look or behave like an older family member/i, /"She takes after her father/i, renderPage, getCard);
