import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "back" section definitions', () => {
  it('renders definition for returning quickly', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return quickly/i)).toBeInTheDocument();
  });

  it('renders definition for replaying audio or video', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To replay audio or video/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return quickly/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return quickly/i)).toHaveAttribute(
      'title',
      'To return quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'runBack_section_expanded', /To return quickly/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'runBack', /To return quickly/i, /I need to run back to the office/i, renderPage, getCard);
