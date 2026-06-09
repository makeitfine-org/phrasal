import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "down" section definitions', () => {
  it('renders definition for saying numbers backwards to zero', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To say numbers backwards to zero, usually before a big event\./i)).toBeInTheDocument();
  });

  it('renders definition for waiting eagerly for an event', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wait eagerly for an event to happen\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To say numbers backwards to zero, usually before a big event\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To say numbers backwards to zero, usually before a big event\./i)).toHaveAttribute(
      'title',
      'To say numbers backwards to zero, usually before a big event.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'countDown_section_expanded', /To say numbers backwards to zero, usually before a big event\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'countDown', /To say numbers backwards to zero, usually before a big event\./i, /The crowd started to count down from ten/i, renderPage, getCard);
