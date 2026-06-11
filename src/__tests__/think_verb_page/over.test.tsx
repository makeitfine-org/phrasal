import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "over" section definitions', () => {
  it('renders definition for reflecting on a suggestion before deciding', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To take time to reflect on a suggestion, offer, or problem/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To take time to reflect on a suggestion, offer, or problem/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To take time to reflect on a suggestion, offer, or problem/i)).toHaveAttribute(
      'title',
      'To take time to reflect on a suggestion, offer, or problem before making a final decision.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'thinkOver_section_expanded', /To take time to reflect on a suggestion, offer, or problem/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'thinkOver', /To take time to reflect on a suggestion, offer, or problem/i, /Take the weekend to think over the job offer\./i, renderPage, getCard);
