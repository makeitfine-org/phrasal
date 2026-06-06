import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "over" section definitions', () => {
  it('renders definition for reviewing or examining carefully', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To review, check, or examine something carefully/i)).toBeInTheDocument();
  });

  it('renders definition for moving toward someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To move toward someone or something/i)).toBeInTheDocument();
  });

  it('renders definition for being received by an audience', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To be received in a specific way by an audience/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'goOver_section_expanded', /To review, check, or examine something carefully/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'goOver', /To review, check, or examine something carefully/i, /"Let's go over the project requirements/i, renderPage, getCard);
