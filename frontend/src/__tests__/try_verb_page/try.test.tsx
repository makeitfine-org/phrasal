import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'TryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- back ---

describe('TryVerbPage — "back" section definitions', () => {
  it('renders definition for making another attempt', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make another attempt to contact someone/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    const defs = [
      screen.getByText(/To make another attempt to contact someone/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make another attempt to contact someone/i)).toHaveAttribute(
      'title',
      'To make another attempt to contact someone or return to a place at a later time because the first attempt was unsuccessful.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'tryBack_section_expanded', /To make another attempt to contact someone/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'tryBack', /To make another attempt to contact someone/i, /I'll try back in an hour\./i, renderPage, getCard);

// --- for ---

describe('TryVerbPage — "for" section definitions', () => {
  it('renders definition for making a concerted effort to achieve something', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make a concerted effort to achieve/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To make a concerted effort to achieve/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To make a concerted effort to achieve/i)).toHaveAttribute(
      'title',
      'To make a concerted effort to achieve, win, or obtain something, often when success is not guaranteed.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'tryFor_section_expanded', /To make a concerted effort to achieve/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'tryFor', /To make a concerted effort to achieve/i, /Sam decided to try for the Senior Recruitment Coordinator position\./i, renderPage, getCard);

// --- on ---

describe('TryVerbPage — "on" section definitions', () => {
  it('renders definition for putting on clothing to check fit', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on an item of clothing/i)).toBeInTheDocument();
  });

  it('renders definition for attempting to deceive someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attempt to deceive someone/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To put on an item of clothing/i),
      screen.getByText(/To attempt to deceive someone/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To put on an item of clothing/i)).toHaveAttribute(
      'title',
      'To put on an item of clothing or accessories to see if it fits or looks good before buying or wearing it.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To attempt to deceive someone/i)).toHaveAttribute(
      'title',
      'To attempt to deceive someone or test someone\'s boundaries to see what you can get away with (primarily British/Australian English, "try it on").'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'tryOn_section_expanded', /To put on an item of clothing/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'tryOn', /To put on an item of clothing/i, /I need to try on this blazer/i, renderPage, getCard);

// --- out ---

describe('TryVerbPage — "out" section definitions', () => {
  it('renders definition for testing something in a practical setting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test something/i)).toBeInTheDocument();
  });

  it('renders definition for testing an idea on someone', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test an idea/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To test something/i),
      screen.getByText(/To test an idea/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test something/i)).toHaveAttribute(
      'title',
      'To test something (such as a new system, tool, or method) in a practical setting to evaluate its effectiveness or performance.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To test an idea/i)).toHaveAttribute(
      'title',
      'To test an idea, pitch, or product on someone to get their reaction (try out on).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'tryOut_section_expanded', /To test something/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'tryOut', /To test something/i, /We decided to try out a new GitHub sourcing extension/i, renderPage, getCard);

// --- out_for ---

describe('TryVerbPage — "out for" section definitions', () => {
  it('renders definition for undergoing a competitive evaluation', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To undergo a competitive evaluation/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out for');
    const defs = [
      screen.getByText(/To undergo a competitive evaluation/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out for');
    expect(screen.getByText(/To undergo a competitive evaluation/i)).toHaveAttribute(
      'title',
      'To undergo a competitive evaluation, audition, or test to earn a position on a team, in a play, or in a company.'
    );
  });
});

describeSectionToggle(LABEL, 'out for', 'tryOutFor_section_expanded', /To undergo a competitive evaluation/i, renderPage);

describeChevronAndColour(LABEL, 'out for', renderPage);

describeDefaultImageCards(LABEL, 'out for', 'tryOutFor', /To undergo a competitive evaluation/i, /Several junior developers are going to try out for the lead engineering vacancy/i, renderPage, getCard);

// --- over ---

describe('TryVerbPage — "over" section definitions', () => {
  it('renders definition for rehearsing something from beginning to end', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To practice, rehearse, or run through something/i)).toBeInTheDocument();
  });

  it('all 1 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To practice, rehearse, or run through something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To practice, rehearse, or run through something/i)).toHaveAttribute(
      'title',
      'To practice, rehearse, or run through something from beginning to end to check for flaws (slightly dated, most commonly used with music or speeches).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'tryOver_section_expanded', /To practice, rehearse, or run through something/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'tryOver', /To practice, rehearse, or run through something/i, /Let's try over the presentation one more time/i, renderPage, getCard);
