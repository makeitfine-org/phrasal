import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- in ---

describe('CatchVerbPage — "in" section definitions', () => {
  it('renders definition for discovering someone doing something bad', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To discover someone in the middle of doing something \(usually bad\)\./i)).toBeInTheDocument();
  });

  it('renders definition for being trapped in an unavoidable situation', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be trapped or delayed by an unavoidable situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To discover someone in the middle of doing something \(usually bad\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To discover someone in the middle of doing something \(usually bad\)\./i)).toHaveAttribute(
      'title',
      'To discover someone in the middle of doing something (usually bad).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'catchIn_section_expanded', /To discover someone in the middle of doing something \(usually bad\)\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'catchIn', /To discover someone in the middle of doing something \(usually bad\)\./i, /The audit team caught the vendor in a lie/i, renderPage, getCard);

// --- on ---

describe('CatchVerbPage — "on" section definitions', () => {
  it('renders definition for understanding something after a delay', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To understand something \(often after a delay or difficulty\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming popular', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To become popular or widely accepted\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To understand something \(often after a delay or difficulty\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To understand something \(often after a delay or difficulty\)\./i)).toHaveAttribute(
      'title',
      'To understand something (often after a delay or difficulty).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'catchOn_section_expanded', /To understand something \(often after a delay or difficulty\)\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'catchOn', /To understand something \(often after a delay or difficulty\)\./i, /The syntax of the new Java library was confusing at first/i, renderPage, getCard);

// --- out ---

describe('CatchVerbPage — "out" section definitions', () => {
  it('renders definition for discovering a mistake or lie', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover that someone has made a mistake, lied, or done something wrong\./i)).toBeInTheDocument();
  });

  it('renders definition for putting someone in a difficult situation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put someone in a difficult, unexpected, or unprepared situation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover that someone has made a mistake, lied, or done something wrong\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discover that someone has made a mistake, lied, or done something wrong\./i)).toHaveAttribute(
      'title',
      'To discover that someone has made a mistake, lied, or done something wrong.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'catchOut_section_expanded', /To discover that someone has made a mistake, lied, or done something wrong\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'catchOut', /To discover that someone has made a mistake, lied, or done something wrong\./i, /The automated testing pipeline caught the developer out/i, renderPage, getCard);

// --- up ---

describe('CatchVerbPage — "up" section definitions', () => {
  it('renders definition for reaching the same level', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reach the same level, standard, or position as someone or something else\./i)).toBeInTheDocument();
  });

  it('renders definition for doing delayed work', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To do work or tasks that you did not have time to do earlier/i)).toBeInTheDocument();
  });

  it('renders definition for talking to find out latest news', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To talk to someone to find out the latest news about their life or work\./i)).toBeInTheDocument();
  });

  it('renders definition for involving someone in a situation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To involve someone in a situation, often against their will/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reach the same level, standard, or position as someone or something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To reach the same level, standard, or position as someone or something else\./i)).toHaveAttribute(
      'title',
      'To reach the same level, standard, or position as someone or something else.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'catchUp_section_expanded', /To reach the same level, standard, or position as someone or something else\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'catchUp', /To reach the same level, standard, or position as someone or something else\./i, /Our software is lacking some features/i, renderPage, getCard);
