import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "forward" section definitions', () => {
  it('renders definition for offering help or information', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To offer help, information, or take responsibility/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'forward', 'comeForward_section_expanded', /To offer help, information, or take responsibility/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'comeForward', /To offer help, information, or take responsibility/i, /"We need two volunteers to come forward and lead the new internal project/i, renderPage, getCard);
