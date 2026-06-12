import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WriteVerbPage — "out" section definitions', () => {
  it('renders definition for writing in full', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To write something completely in full rather than using abbreviations or numbers\./i)).toBeInTheDocument();
  });

  it('renders definition for removing a character from a TV series', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a character from a television series by not including them in future scripts\./i)).toBeInTheDocument();
  });

  it('renders definition for filling in details on a document', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To fill in all the necessary details on a document such as a check or prescription\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To write something completely in full rather than using abbreviations or numbers\./i),
      screen.getByText(/To remove a character from a television series by not including them in future scripts\./i),
      screen.getByText(/To fill in all the necessary details on a document such as a check or prescription\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To write something completely in full rather than using abbreviations or numbers\./i)).toHaveAttribute(
      'title',
      'To write something completely in full rather than using abbreviations or numbers.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'writeOut_section_expanded', /To write something completely in full rather than using abbreviations or numbers\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'writeOut', /To write something completely in full rather than using abbreviations or numbers\./i, /You need to write out the numbers one through ten, but you can use digits for 11 and up\./i, renderPage, getCard);
