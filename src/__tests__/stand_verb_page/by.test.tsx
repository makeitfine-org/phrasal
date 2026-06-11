import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "by" section definitions', () => {
  it('renders definition for being ready for action', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be ready for action\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining loyal to someone', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To remain loyal to someone in a difficult situation\./i)).toBeInTheDocument();
  });

  it('renders definition for adhering to a promise', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To adhere to a promise, decision, or belief\./i)).toBeInTheDocument();
  });

  it('renders definition for watching without helping', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To watch something bad happen without trying to help\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be ready for action\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To remain loyal to someone in a difficult situation\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To adhere to a promise, decision, or belief\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To watch something bad happen without trying to help\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To be ready for action\./i)).toHaveAttribute(
      'title',
      'To be ready for action.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'standBy_section_expanded', /To be ready for action\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'standBy', /To be ready for action\./i, /The IT support team is standing by to fix the network issue\./i, renderPage, getCard);
