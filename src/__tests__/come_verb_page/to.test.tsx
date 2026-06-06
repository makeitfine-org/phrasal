import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "to" section definitions', () => {
  it('renders definition for reaching a total amount', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a total amount/i)).toBeInTheDocument();
  });

  it('renders definition for reaching a state or decision', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a state, decision, or situation/i)).toBeInTheDocument();
  });

  it('renders definition for regaining consciousness', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To regain consciousness/i)).toBeInTheDocument();
  });

  it('renders definition for concerning a specific topic', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Concerning a specific topic \(when it comes to\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'to', 'comeTo_section_expanded', /To reach a total amount/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'comeTo', /To reach a total amount/i, /"The total cost for the new software licenses comes to \$15,000/i, renderPage, getCard);
