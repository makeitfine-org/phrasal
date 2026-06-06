import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "against" section definitions', () => {
  it('renders definition for disliking without reason', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To start to dislike someone for no clear or obvious reason/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'against', 'takeAgainst_section_expanded', /To start to dislike someone for no clear or obvious reason/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'takeAgainst', /To start to dislike someone for no clear or obvious reason/i, /"I do not know why, but she took against me/i, renderPage, getCard);
