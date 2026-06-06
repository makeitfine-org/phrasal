import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "by" section definitions', () => {
  it('renders definition for take by surprise', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To happen unexpectedly/i)).toBeInTheDocument();
  });

  it('renders definition for take by storm', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To rapidly become very popular or widely admired/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'by', 'takeBy_section_expanded', /To happen unexpectedly/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'takeBy', /To happen unexpectedly/i, /"The sudden market crash took us by surprise/i, renderPage, getCard);
