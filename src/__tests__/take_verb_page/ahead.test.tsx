import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "ahead" section definitions', () => {
  it('renders definition for literal use', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/Literal use: to carry or move something to the front/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'ahead', 'takeAhead_section_expanded', /Literal use: to carry or move something to the front/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'takeAhead', /Literal use: to carry or move something to the front/i, /"Could you take this report ahead/i, renderPage, getCard);
