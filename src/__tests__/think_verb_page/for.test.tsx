import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "for" section definitions', () => {
  it('renders definition for forming your own opinions', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To form your own opinions and make your own choices/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To form your own opinions and make your own choices/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To form your own opinions and make your own choices/i)).toHaveAttribute(
      'title',
      'To form your own opinions and make your own choices, rather than letting others decide for you (think for yourself).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'thinkFor_section_expanded', /To form your own opinions and make your own choices/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'thinkFor', /To form your own opinions and make your own choices/i, /A good leader encourages their team to think for themselves\./i, renderPage, getCard);
