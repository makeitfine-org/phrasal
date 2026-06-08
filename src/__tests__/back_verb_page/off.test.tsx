import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BackVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BackVerbPage — "off" section definitions', () => {
  it('renders definition for moving away from danger', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To move backward away from danger or a threat/i)).toBeInTheDocument();
  });

  it('renders definition for stopping criticism', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop criticizing someone or telling them what to do/i)).toBeInTheDocument();
  });

  it('renders definition for withdrawing from a plan', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop supporting an idea, or to decide not to do something/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To move backward away from danger or a threat/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop criticizing someone or telling them what to do/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop supporting an idea, or to decide not to do something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To move backward away from danger or a threat/i)).toHaveAttribute(
      'title',
      'To move backward away from danger or a threat.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'backOff_section_expanded', /To move backward away from danger or a threat/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'backOff', /To move backward away from danger or a threat/i, /The security guard told the angry customer to back off/i, renderPage, getCard);
