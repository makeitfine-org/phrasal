import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "forward" section definitions', () => {
  it('renders definition for progressing or advancing', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To progress or advance with a plan or idea/i)).toBeInTheDocument();
  });

  it('renders definition for moving clocks ahead', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move clocks ahead \(daylight saving time\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'forward', 'goForward_section_expanded', /To progress or advance with a plan or idea/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'goForward', /To progress or advance with a plan or idea/i, /"We are going forward with the new business strategy/i, renderPage, getCard);
