import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PointVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PointVerbPage — "back" section definitions', () => {
  it('renders definition for showing connection to a past event', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To show that something is connected to a past event/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To show that something is connected to a past event/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To show that something is connected to a past event/i)).toHaveAttribute(
      'title',
      'To show that something is connected to a past event, or to remind someone of the past.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'pointBack_section_expanded', /To show that something is connected to a past event/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'pointBack', /To show that something is connected to a past event/i, /Most of these software bugs point back/i, renderPage, getCard);
