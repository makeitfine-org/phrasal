import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "for" section definitions', () => {
  it('renders definition for mistaking identity', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To mistake someone's identity or character/i)).toBeInTheDocument();
  });

  it('renders definition for take for granted', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To fail to appreciate something or someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'for', 'takeFor_section_expanded', /To mistake someone's identity or character/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'takeFor', /To mistake someone's identity or character/i, /"Do you take me for a fool/i, renderPage, getCard);
