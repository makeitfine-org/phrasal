import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "together" section definitions', () => {
  it('renders definition for uniting as a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To unite as a group for a common purpose/i)).toBeInTheDocument();
  });

  it('renders definition for forming a coherent whole', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To begin to form a coherent, successful whole/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'together', 'comeTogether_section_expanded', /To unite as a group for a common purpose/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'comeTogether', /To unite as a group for a common purpose/i, /"The entire IT department came together to resolve the server outage/i, renderPage, getCard);
