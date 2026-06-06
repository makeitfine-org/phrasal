import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "up" section definitions', () => {
  it('renders definition for being mentioned in conversation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be mentioned or discussed in conversation/i)).toBeInTheDocument();
  });

  it('renders definition for happening unexpectedly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To happen unexpectedly \(often causing a problem\)/i)).toBeInTheDocument();
  });

  it('renders definition for approaching in time', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To approach in time/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'up', 'comeUp_section_expanded', /To be mentioned or discussed in conversation/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'comeUp', /To be mentioned or discussed in conversation/i, /"The topic of remote work came up during the board meeting/i, renderPage, getCard);
