import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "without" section definitions', () => {
  it('renders definition for lacking a normally included feature', () => {
    renderPage();
    expandSection('without');
    expect(screen.getByText(/To lack a feature or item that is normally included/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'without', 'comeWithout_section_expanded', /To lack a feature or item that is normally included/i, renderPage);

describeChevronAndColour(LABEL, 'without', renderPage);

describeDefaultImageCards(LABEL, 'without', 'comeWithout', /To lack a feature or item that is normally included/i, /"The basic version of the app comes without the advanced analytics dashboard/i, renderPage, getCard);
