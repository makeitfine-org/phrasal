import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "in" section definitions', () => {
  it('renders definition for including someone in an activity', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, group, or plan\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, group, or plan\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To include someone in an activity, group, or plan\./i)).toHaveAttribute(
      'title',
      'To include someone in an activity, group, or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'countIn_section_expanded', /To include someone in an activity, group, or plan\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'countIn', /To include someone in an activity, group, or plan\./i, /please count me in/i, renderPage, getCard);
