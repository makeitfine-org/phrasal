import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "around / round" section definitions', () => {
  it('renders definition for circulating or spreading', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To circulate or spread \(illness or news\)/i)).toBeInTheDocument();
  });

  it('renders definition for being enough for everyone', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To be enough for everyone to have a share/i)).toBeInTheDocument();
  });

  it('renders definition for visiting someone at their location', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To visit someone at their location/i)).toBeInTheDocument();
  });

  it('renders definition for spinning or rotating', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To spin or rotate/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'around / round', 'goAround_section_expanded', /To circulate or spread \(illness or news\)/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'goAround', /To circulate or spread \(illness or news\)/i, /"There is a rumor going around about a new software release/i, renderPage, getCard);
