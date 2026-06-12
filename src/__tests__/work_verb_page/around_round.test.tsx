import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "around / round" section definitions', () => {
  it('renders definition for bypassing an obstacle without fixing the core issue', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To find a way to bypass or overcome an obstacle without actually fixing the core issue/i)).toBeInTheDocument();
  });

  it("renders definition for accommodating someone else's constraints", () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To schedule or arrange plans to accommodate someone else's constraints\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To find a way to bypass or overcome an obstacle without actually fixing the core issue/i),
      screen.getByText(/To schedule or arrange plans to accommodate someone else's constraints\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To find a way to bypass or overcome an obstacle without actually fixing the core issue/i)).toHaveAttribute(
      'title',
      'To find a way to bypass or overcome an obstacle without actually fixing the core issue (giving the noun: workaround).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To schedule or arrange plans to accommodate someone else's constraints\./i)).toHaveAttribute(
      'title',
      "To schedule or arrange plans to accommodate someone else's constraints."
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'workAround_section_expanded', /To find a way to bypass or overcome an obstacle without actually fixing the core issue/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'workAround', /To find a way to bypass or overcome an obstacle without actually fixing the core issue/i, /The software has a bug, but we found a way to work around it\./i, renderPage, getCard);
