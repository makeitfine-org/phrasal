import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "about" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/Literal use: to express an approximate amount/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'about', 'takeAbout_section_expanded', /Literal use: to express an approximate amount/i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'takeAbout', /Literal use: to express an approximate amount/i, /"It will take about two hours/i, renderPage, getCard);
