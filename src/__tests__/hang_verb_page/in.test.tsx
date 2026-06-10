import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "in" section definitions', () => {
  it('renders definition for remaining positive and not giving up', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain positive and not give up during a difficult situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain positive and not give up during a difficult situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain positive and not give up during a difficult situation/i)).toHaveAttribute(
      'title',
      'To remain positive and not give up during a difficult situation. (Almost always used in the phrase "hang in there".)'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'hangIn_section_expanded', /To remain positive and not give up during a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'hangIn', /To remain positive and not give up during a difficult situation/i, /The Java migration project is really tough right now, but hang in there/i, renderPage, getCard);
