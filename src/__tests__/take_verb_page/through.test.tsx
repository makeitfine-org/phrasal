import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "through" section definitions', () => {
  it('renders definition for explaining step by step', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To explain or describe a process step by step/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'through', 'takeThrough_section_expanded', /To explain or describe a process step by step/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'takeThrough', /To explain or describe a process step by step/i, /"Let me take you through the new software setup/i, renderPage, getCard);
