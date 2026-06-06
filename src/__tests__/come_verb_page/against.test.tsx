import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "against" section definitions', () => {
  it('renders definition for facing a difficult problem or opposition', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To face a difficult problem or strong opposition \(come up against\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'against', 'comeAgainst_section_expanded', /To face a difficult problem or strong opposition \(come up against\)/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'comeAgainst', /To face a difficult problem or strong opposition \(come up against\)/i, /"We came up against several security issues during deployment/i, renderPage, getCard);
