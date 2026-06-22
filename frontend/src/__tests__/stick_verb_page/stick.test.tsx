import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'StickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around ---

describe('StickVerbPage — "about / around" section definitions', () => {
  it('renders definition for staying in a place for a little while', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To stay in a place for a little while, often waiting for something to happen\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To stay in a place for a little while, often waiting for something to happen\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To stay in a place for a little while, often waiting for something to happen\./i)).toHaveAttribute(
      'title',
      'To stay in a place for a little while, often waiting for something to happen.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around', 'stickAbout_section_expanded', /To stay in a place for a little while, often waiting for something to happen\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describeDefaultImageCards(LABEL, 'about / around', 'stickAbout', /To stay in a place for a little while, often waiting for something to happen\./i, /Stick around after the sprint review; we need to discuss the Java 21 migration\./i, renderPage, getCard);

// --- away ---

describe('StickVerbPage — "away" section definitions', () => {
  it('renders definition for storing something in a safe or hidden place', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To store or put something in a safe or hidden place\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To store or put something in a safe or hidden place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To store or put something in a safe or hidden place\./i)).toHaveAttribute(
      'title',
      'To store or put something in a safe or hidden place.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'stickAway_section_expanded', /To store or put something in a safe or hidden place\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'stickAway', /To store or put something in a safe or hidden place\./i, /I stuck the old project contracts away in the archive cabinet\./i, renderPage, getCard);

// --- by ---

describe('StickVerbPage — "by" section definitions', () => {
  it('renders definition for remaining loyal to someone', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To remain loyal to someone during difficult times\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping a promise', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To keep a promise or remain committed to a decision\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('by');
    const defs = [
      screen.getByText(/To remain loyal to someone during difficult times\./i),
      screen.getByText(/To keep a promise or remain committed to a decision\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To remain loyal to someone during difficult times\./i)).toHaveAttribute(
      'title',
      'To remain loyal to someone during difficult times.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'stickBy_section_expanded', /To remain loyal to someone during difficult times\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'stickBy', /To remain loyal to someone during difficult times\./i, /The founders stuck by each other when the company almost went bankrupt\./i, renderPage, getCard);

// --- down ---

describe('StickVerbPage — "down" section definitions', () => {
  it('renders definition for attaching something to a surface', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To attach something to a surface using glue or tape\./i)).toBeInTheDocument();
  });

  it('renders definition for writing something quickly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something quickly/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To attach something to a surface using glue or tape\./i),
      screen.getByText(/To write something quickly/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To attach something to a surface using glue or tape\./i)).toHaveAttribute(
      'title',
      'To attach something to a surface using glue or tape.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something quickly/i)).toHaveAttribute(
      'title',
      'To write something quickly (informal).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'stickDown_section_expanded', /To attach something to a surface using glue or tape\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'stickDown', /To attach something to a surface using glue or tape\./i, /Stick down the network cables so nobody trips in the server room\./i, renderPage, getCard);

// --- for ---

describe('StickVerbPage — "for" section definitions', () => {
  it('renders definition for lacking something necessary', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To lack something necessary/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To lack something necessary/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To lack something necessary/i)).toHaveAttribute(
      'title',
      'To lack something necessary (used in the passive form "be stuck for").'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'stickFor_section_expanded', /To lack something necessary/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'stickFor', /To lack something necessary/i, /We are stuck for ideas on how to improve the application's performance\./i, renderPage, getCard);

// --- in ---

describe('StickVerbPage — "in" section definitions', () => {
  it('renders definition for remaining strongly in memory', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain strongly in someone's memory/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain strongly in someone's memory/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To remain strongly in someone's memory/i)).toHaveAttribute(
      'title',
      'To remain strongly in someone\'s memory (often used as "stick in your mind").'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'stickIn_section_expanded', /To remain strongly in someone's memory/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'stickIn', /To remain strongly in someone's memory/i, /The CEO's speech on agile leadership really stuck in my mind\./i, renderPage, getCard);

// --- out ---

describe('StickVerbPage — "out" section definitions', () => {
  it('renders definition for being easy to see or notice', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice because of being different\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to the end of a difficult situation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to the end of a difficult situation/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To be very easy to see or notice because of being different\./i),
      screen.getByText(/To continue to the end of a difficult situation/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be very easy to see or notice because of being different\./i)).toHaveAttribute(
      'title',
      'To be very easy to see or notice because of being different.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to the end of a difficult situation/i)).toHaveAttribute(
      'title',
      'To continue to the end of a difficult situation (used as "stick it out").'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'stickOut_section_expanded', /To be very easy to see or notice because of being different\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'stickOut', /To be very easy to see or notice because of being different\./i, /The memory leak in the backend logic really sticks out when you look at the server logs\./i, renderPage, getCard);

// --- to ---

describe('StickVerbPage — "to" section definitions', () => {
  it('renders definition for continuing to follow a plan without changing', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To continue doing or following a specific plan, rule, or subject without changing\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping a promise or agreement', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To keep a promise or agreement\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To continue doing or following a specific plan, rule, or subject without changing\./i),
      screen.getByText(/To keep a promise or agreement\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To continue doing or following a specific plan, rule, or subject without changing\./i)).toHaveAttribute(
      'title',
      'To continue doing or following a specific plan, rule, or subject without changing.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'stickTo_section_expanded', /To continue doing or following a specific plan, rule, or subject without changing\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'stickTo', /To continue doing or following a specific plan, rule, or subject without changing\./i, /Let's stick to the meeting agenda so we finish on time\./i, renderPage, getCard);

// --- together ---

describe('StickVerbPage — "together" section definitions', () => {
  it('renders definition for supporting each other as a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other as a group, especially in hard times\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other as a group, especially in hard times\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To support each other as a group, especially in hard times\./i)).toHaveAttribute(
      'title',
      'To support each other as a group, especially in hard times.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'stickTogether_section_expanded', /To support each other as a group, especially in hard times\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'stickTogether', /To support each other as a group, especially in hard times\./i, /A successful development team sticks together during a stressful product release\./i, renderPage, getCard);

// --- up ---

describe('StickVerbPage — "up" section definitions', () => {
  it('renders definition for pointing upwards or standing above a surface', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To point upwards or stand above a surface\./i)).toBeInTheDocument();
  });

  it('renders definition for defending or supporting someone or an idea', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To defend or support someone or an idea/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To point upwards or stand above a surface\./i),
      screen.getByText(/To defend or support someone or an idea/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To point upwards or stand above a surface\./i)).toHaveAttribute(
      'title',
      'To point upwards or stand above a surface.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To defend or support someone or an idea/i)).toHaveAttribute(
      'title',
      'To defend or support someone or an idea (used as "stick up for").'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'stickUp_section_expanded', /To point upwards or stand above a surface\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'stickUp', /To point upwards or stand above a surface\./i, /The cooling fan on the new server model sticks up higher than the old one\./i, renderPage, getCard);

// --- with ---

describe('StickVerbPage — "with" section definitions', () => {
  it('renders definition for continuing using something rather than changing it', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To continue using or doing something, rather than changing it\./i)).toBeInTheDocument();
  });

  it('renders definition for staying close to someone for guidance or safety', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stay close to someone for guidance or safety\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    const defs = [
      screen.getByText(/To continue using or doing something, rather than changing it\./i),
      screen.getByText(/To stay close to someone for guidance or safety\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To continue using or doing something, rather than changing it\./i)).toHaveAttribute(
      'title',
      'To continue using or doing something, rather than changing it.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'stickWith_section_expanded', /To continue using or doing something, rather than changing it\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'stickWith', /To continue using or doing something, rather than changing it\./i, /We decided to stick with the Spring Boot framework instead of learning a new ecosystem\./i, renderPage, getCard);
