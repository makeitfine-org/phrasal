import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "for" section definitions', () => {
  it('renders definition for being accepted as something else', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be accepted as something else, often despite not being it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be accepted as something else, often despite not being it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be accepted as something else, often despite not being it/i)).toHaveAttribute(
      'title',
      'To be accepted as something else, often despite not being it.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'passFor_section_expanded', /To be accepted as something else, often despite not being it/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'passFor', /To be accepted as something else, often despite not being it/i, /His Java skills are so good that he could easily pass for a senior developer\./i, renderPage, getCard);
