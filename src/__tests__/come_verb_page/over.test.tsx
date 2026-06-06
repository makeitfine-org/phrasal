import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "over" section definitions', () => {
  it("renders definition for visiting someone's house or office", () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To visit someone's house, office, or country/i)).toBeInTheDocument();
  });

  it('renders definition for affecting someone with a strong feeling', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To affect someone suddenly with a strong feeling/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'comeOver_section_expanded', /To visit someone's house, office, or country/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'comeOver', /To visit someone's house, office, or country/i, /"The regional manager is coming over from London next week/i, renderPage, getCard);
