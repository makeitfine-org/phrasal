import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "back" section definitions', () => {
  it('renders definition for hesitating or staying behind the rest of a group', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate or stay behind the rest of a group because of fear, shyness, or uncertainty\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate or stay behind the rest of a group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate or stay behind the rest of a group/i)).toHaveAttribute(
      'title',
      'To hesitate or stay behind the rest of a group because of fear, shyness, or uncertainty.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'hangBack_section_expanded', /To hesitate or stay behind the rest of a group/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'hangBack', /To hesitate or stay behind the rest of a group/i, /She hung back while the other candidates rushed to introduce themselves to the CEO\./i, renderPage, getCard);
