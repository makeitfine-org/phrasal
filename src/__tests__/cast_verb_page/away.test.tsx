import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "away" section definitions', () => {
  it('renders definition for discarding something no longer needed', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To throw something away because it is no longer wanted or needed/i)).toBeInTheDocument();
  });

  it('renders definition for being stranded after a shipwreck', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To be left stranded somewhere after a shipwreck/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'away', 'castAway_section_expanded', /To throw something away because it is no longer wanted or needed/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'castAway', /To throw something away because it is no longer wanted or needed/i, /"Do not cast away your old Java components/i, renderPage, getCard);
