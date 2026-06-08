import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'AskVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('AskVerbPage — "for" section definitions', () => {
  it('renders definition for requesting something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something to be given to you/i)).toBeInTheDocument();
  });

  it('renders definition for asking to speak to a specific person', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To say that you want to speak to a specific person/i)).toBeInTheDocument();
  });

  it('renders definition for asking for trouble', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To behave in a way that will clearly cause trouble/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something to be given to you/i)).toHaveClass('truncate');
    expect(screen.getByText(/To say that you want to speak to a specific person/i)).toHaveClass('truncate');
    expect(screen.getByText(/To behave in a way that will clearly cause trouble/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something to be given to you/i)).toHaveAttribute(
      'title',
      'To request something to be given to you.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'askFor_section_expanded', /To request something to be given to you/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'askFor', /To request something to be given to you/i, /I am going to the boss's office to ask for a pay rise/i, renderPage, getCard);
