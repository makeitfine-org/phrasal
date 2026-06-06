import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "without" section definitions', () => {
  it('renders definition for managing without something', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To manage or live without something you usually have/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'without', 'goWithout_section_expanded', /To manage or live without something you usually have/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'goWithout', /To manage or live without something you usually have/i, /"The budget is tight, so we will have to go without/i, renderPage, getCard);
