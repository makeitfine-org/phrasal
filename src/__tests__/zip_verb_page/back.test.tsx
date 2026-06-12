import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "back" section definitions', () => {
  it('renders definition for returning quickly to a place', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place very quickly for a short duration\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To return to a place very quickly for a short duration\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a place very quickly for a short duration\./i)).toHaveAttribute(
      'title',
      'To return to a place very quickly for a short duration.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'zipBack_section_expanded', /To return to a place very quickly for a short duration\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'zipBack', /To return to a place very quickly for a short duration\./i, /I just need to zip back to the office to grab my laptop\./i, renderPage, getCard);
