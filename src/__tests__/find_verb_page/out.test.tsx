import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FindVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FindVerbPage — "out" section definitions', () => {
  it('renders definition for discovering information', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover information, learn a fact, or solve a problem\./i)).toBeInTheDocument();
  });

  it('renders definition for discovering someone lied', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover that someone has lied, kept a secret, or done something wrong/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover information, learn a fact, or solve a problem\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover information, learn a fact, or solve a problem\./i)).toHaveAttribute(
      'title',
      'To discover information, learn a fact, or solve a problem.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'findOut_section_expanded', /To discover information, learn a fact, or solve a problem\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'findOut', /To discover information, learn a fact, or solve a problem\./i, /We need to review the server logs to find out why the Java application is crashing\./i, renderPage, getCard);
