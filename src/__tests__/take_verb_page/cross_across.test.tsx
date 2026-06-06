import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "cross / across" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('cross / across');
    expect(screen.getByText(/Literal use: to physically guide or lead someone across/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'cross / across', 'takeCrossAcross_section_expanded', /Literal use: to physically guide or lead someone across/i, renderPage);

describeChevronAndColour(LABEL, 'cross / across', renderPage);

describeDefaultImageCards(LABEL, 'cross / across', 'takeCrossAcross', /Literal use: to physically guide or lead someone across/i, /"She took the blind man across the street/i, renderPage, getCard);
