import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';
const PARTICLE = 'about / around / round';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for searching anxiously', () => {
    renderPage();
    expandSection(PARTICLE);
    expect(screen.getByText(/To search anxiously or desperately for something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, PARTICLE, 'castAboutAroundRound_section_expanded', /To search anxiously or desperately for something/i, renderPage);

describeChevronAndColour(LABEL, PARTICLE, renderPage);

describeDefaultImageCards(LABEL, PARTICLE, 'castAboutAroundRound', /To search anxiously or desperately for something/i, /"After the system crashed/i, renderPage, getCard);
