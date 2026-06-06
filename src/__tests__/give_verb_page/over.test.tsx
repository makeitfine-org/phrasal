import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GiveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GiveVerbPage — "over" section definitions', () => {
  it('renders definition for handing over control', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hand over control, responsibility, or possession/i)).toBeInTheDocument();
  });

  it('renders definition for dedicating time or space', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To dedicate time or space to a specific purpose/i)).toBeInTheDocument();
  });

  it('renders definition for stopping something annoying', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To stop doing something annoying/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'over', 'giveOver_section_expanded', /To hand over control, responsibility, or possession/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'giveOver', /To hand over control, responsibility, or possession/i, /"The founder gave over control/i, renderPage, getCard);
