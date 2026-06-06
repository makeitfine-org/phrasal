import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "forward" section definitions', () => {
  it('renders definition for progressing a plan', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To develop, promote, or make progress with a plan/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'forward', 'takeForward_section_expanded', /To develop, promote, or make progress with a plan/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'takeForward', /To develop, promote, or make progress with a plan/i, /"We need a new manager to take this project forward/i, renderPage, getCard);
