import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "out" section definitions', () => {
  it('renders definition for asking someone on a date', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go to a movie, restaurant/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go to a movie, restaurant/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To invite someone to go to a movie, restaurant/i)).toHaveAttribute(
      'title',
      'To invite someone to go to a movie, restaurant, etc., because you want to start a romantic relationship with them.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'askOut_section_expanded', /To invite someone to go to a movie, restaurant/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'askOut', /To invite someone to go to a movie, restaurant/i, /He finally found the courage to ask her out/i, renderPage, getCard);
