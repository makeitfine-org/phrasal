import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "over" section definitions', () => {
  it('renders definition for a bad situation ending', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/When a bad situation, argument, or storm ends or is forgotten/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/When a bad situation, argument, or storm ends or is forgotten/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/When a bad situation, argument, or storm ends or is forgotten/i)).toHaveAttribute(
      'title',
      'When a bad situation, argument, or storm ends or is forgotten without causing serious damage.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'blowOver_section_expanded', /When a bad situation, argument, or storm ends or is forgotten/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'blowOver', /When a bad situation, argument, or storm ends or is forgotten/i, /wait for the PR scandal to blow over/i, renderPage, getCard);
