import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "in" section definitions', () => {
  it('renders definition for beginning and seeming likely to continue', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To begin and seem likely to continue for a long time/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To begin and seem likely to continue for a long time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To begin and seem likely to continue for a long time/i)).toHaveAttribute(
      'title',
      'To begin and seem likely to continue for a long time (usually used for negative situations, feelings, or bad weather).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'setIn_section_expanded', /To begin and seem likely to continue for a long time/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'setIn', /To begin and seem likely to continue for a long time/i, /Panic set in when the main production server crashed\./i, renderPage, getCard);
