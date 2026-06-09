import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "for" section definitions', () => {
  it('renders definition for severely damaging or ruining', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To severely damage, ruin, or kill/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To severely damage, ruin, or kill/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To severely damage, ruin, or kill/i)).toHaveAttribute(
      'title',
      'To severely damage, ruin, or kill (usually used in the passive "be done for").'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'doFor_section_expanded', /To severely damage, ruin, or kill/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'doFor', /To severely damage, ruin, or kill/i, /we are done for/i, renderPage, getCard);
