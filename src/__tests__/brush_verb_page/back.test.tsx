import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "back" section definitions', () => {
  it('renders definition for pushing hair away from face', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To push hair away from your face\./i)).toBeInTheDocument();
  });

  it('renders definition for forcing someone to move backward', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To force someone to move backward/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To push hair away from your face\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To push hair away from your face\./i)).toHaveAttribute(
      'title',
      'To push hair away from your face.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'brushBack_section_expanded', /To push hair away from your face\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'brushBack', /To push hair away from your face\./i, /She brushed back her hair to look closer at the screen/i, renderPage, getCard);
