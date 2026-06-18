import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'FindVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('FindVerbPage — "against" section definitions', () => {
  it('renders definition for making an official decision that someone is guilty', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make an official decision that someone is guilty or loses a dispute/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make an official decision that someone is guilty or loses a dispute/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make an official decision that someone is guilty or loses a dispute/i)).toHaveAttribute(
      'title',
      'To make an official decision that someone is guilty or loses a dispute (formal, used in legal or official settings).'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'findAgainst_section_expanded', /To make an official decision that someone is guilty or loses a dispute/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'findAgainst', /To make an official decision that someone is guilty or loses a dispute/i, /The court found against the leadership team because they did not follow labor laws\./i, renderPage, getCard);

// --- for ---

describe('FindVerbPage — "for" section definitions', () => {
  it('renders definition for making an official decision in favor of someone', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make an official decision in favor of someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make an official decision in favor of someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make an official decision in favor of someone/i)).toHaveAttribute(
      'title',
      'To make an official decision in favor of someone (formal, used in legal or official settings).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'findFor_section_expanded', /To make an official decision in favor of someone/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'findFor', /To make an official decision in favor of someone/i, /After reviewing the contract, the judge found for the software developer/i, renderPage, getCard);

// --- out ---

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
