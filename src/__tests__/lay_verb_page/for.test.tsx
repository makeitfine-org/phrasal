import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "for" section definitions', () => {
  it('renders definition for waiting to ambush someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To wait secretly to attack someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To wait secretly to attack someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To wait secretly to attack someone/i)).toHaveAttribute(
      'title',
      'To wait secretly to attack someone; to ambush (old-fashioned/rare).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'layFor_section_expanded', /To wait secretly to attack someone/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'layFor', /To wait secretly to attack someone/i, /The thieves were laying for the manager outside the bank\./i, renderPage, getCard);
