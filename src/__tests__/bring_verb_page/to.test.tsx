import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "to" section definitions', () => {
  it('renders definition for making someone conscious again', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone conscious again after they have fainted/i)).toBeInTheDocument();
  });

  it('renders definition for reaching a mathematical total', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a mathematical total/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone conscious again after they have fainted/i)).toHaveClass('truncate');
    expect(screen.getByText(/To reach a mathematical total/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone conscious again after they have fainted/i)).toHaveAttribute(
      'title',
      'To make someone conscious again after they have fainted.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'bringTo_section_expanded', /To make someone conscious again after they have fainted/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'bringTo', /To make someone conscious again after they have fainted/i, /The paramedics used smelling salts/i, renderPage, getCard);
