import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WorkVerbPage — "for" section definitions', () => {
  it('renders definition for being employed by a person or organization', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by a person or organization\./i)).toBeInTheDocument();
  });

  it("renders definition for being suitable or effective for someone's needs", () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be suitable, convenient, or effective for someone's needs\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To be employed by a person or organization\./i),
      screen.getByText(/To be suitable, convenient, or effective for someone's needs\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by a person or organization\./i)).toHaveAttribute(
      'title',
      'To be employed by a person or organization.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be suitable, convenient, or effective for someone's needs\./i)).toHaveAttribute(
      'title',
      "To be suitable, convenient, or effective for someone's needs."
    );
  });
});

describeSectionToggle(LABEL, 'for', 'workFor_section_expanded', /To be employed by a person or organization\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'workFor', /To be employed by a person or organization\./i, /I work for an IT consultancy firm\./i, renderPage, getCard);
