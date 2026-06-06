import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "across" section definitions', () => {
  it('renders definition for moving to the other side', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To move to the other side of something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'across', 'goAcross_section_expanded', /To move to the other side of something/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'goAcross', /To move to the other side of something/i, /"We need to go across the street/i, renderPage, getCard);
