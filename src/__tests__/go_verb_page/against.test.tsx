import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "against" section definitions', () => {
  it('renders definition for opposing or disagreeing', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or disagree with something/i)).toBeInTheDocument();
  });

  it('renders definition for being unfavorable to someone', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To be unfavorable to someone \(especially in contests or legal cases\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'against', 'goAgainst_section_expanded', /To oppose or disagree with something/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'goAgainst', /To oppose or disagree with something/i, /"Implementing this feature goes against our main design principles/i, renderPage, getCard);
