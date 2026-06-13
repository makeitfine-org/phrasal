import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "back" section definitions', () => {
  it('renders definition for thinking about the past', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To think about things that happened in the past/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'back', 'castBack_section_expanded', /To think about things that happened in the past/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'castBack', /To think about things that happened in the past/i, /"If we cast our minds back to the last Agile sprint/i, renderPage, getCard);
