import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "forward" section definitions', () => {
  it('renders definition for directing thoughts toward the future', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To direct your thoughts toward the future/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'forward', 'castForward_section_expanded', /To direct your thoughts toward the future/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'castForward', /To direct your thoughts toward the future/i, /"Let's cast our minds forward to next year/i, renderPage, getCard);
