import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- around_round_about ---

describe('HandVerbPage — "around / round / about" section definitions', () => {
  it('renders definition for offering or passing something to each person in a group', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or pass something to each person in a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or pass something to each person in a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round / about');
    expect(screen.getByText(/To offer or pass something to each person in a group\./i)).toHaveAttribute(
      'title',
      'To offer or pass something to each person in a group.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round / about', 'handAround_section_expanded', /To offer or pass something to each person in a group\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round / about', renderPage);

describeDefaultImageCards(LABEL, 'around / round / about', 'handAround', /To offer or pass something to each person in a group\./i, /They handed around the new smartphones so the development team could test them\./i, renderPage, getCard);

// --- back ---

describe('HandVerbPage — "back" section definitions', () => {
  it('renders definition for returning something to the person who owned it', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the person who owned it or gave it to you\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the person who owned it or gave it to you\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to the person who owned it or gave it to you\./i)).toHaveAttribute(
      'title',
      'To return something to the person who owned it or gave it to you.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'handBack_section_expanded', /To return something to the person who owned it or gave it to you\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'handBack', /To return something to the person who owned it or gave it to you\./i, /After reviewing the code, please hand back the printed reports to the project manager\./i, renderPage, getCard);

// --- down ---

describe('HandVerbPage — "down" section definitions', () => {
  it('renders definition for passing knowledge from an older person to a younger person', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To pass knowledge, traditions, or items from an older person to a younger person/i)).toBeInTheDocument();
  });

  it('renders definition for officially announcing a formal or legal decision', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially announce a formal or legal decision\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To pass knowledge, traditions, or items from an older person to a younger person/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To pass knowledge, traditions, or items from an older person to a younger person/i)).toHaveAttribute(
      'title',
      'To pass knowledge, traditions, or items from an older person to a younger person (or from a predecessor to a successor).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'handDown_section_expanded', /To pass knowledge, traditions, or items from an older person to a younger person/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'handDown', /To pass knowledge, traditions, or items from an older person to a younger person/i, /The retiring CEO handed down his leadership principles to the new management team\./i, renderPage, getCard);

// --- in ---

describe('HandVerbPage — "in" section definitions', () => {
  it('renders definition for submitting something to a person in authority', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit something or give it to a person in authority/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit something or give it to a person in authority/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To submit something or give it to a person in authority/i)).toHaveAttribute(
      'title',
      'To submit something or give it to a person in authority (like a boss, teacher, or official).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'handIn_section_expanded', /To submit something or give it to a person in authority/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'handIn', /To submit something or give it to a person in authority/i, /He decided to hand in his resignation because he found a new job in software development\./i, renderPage, getCard);

// --- off ---

describe('HandVerbPage — "off" section definitions', () => {
  it('renders definition for passing responsibility or control to someone else', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To pass the responsibility, control, or execution of a task to someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To pass the responsibility, control, or execution of a task to someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To pass the responsibility, control, or execution of a task to someone else\./i)).toHaveAttribute(
      'title',
      'To pass the responsibility, control, or execution of a task to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'handOff_section_expanded', /To pass the responsibility, control, or execution of a task to someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'handOff', /To pass the responsibility, control, or execution of a task to someone else\./i, /I will hand off the server maintenance tasks to the junior Java developers tomorrow\./i, renderPage, getCard);

// --- on ---

describe('HandVerbPage — "on" section definitions', () => {
  it('renders definition for giving something to the next person in a sequence', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give something to the next person, often in a sequence/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give something to the next person, often in a sequence/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To give something to the next person, often in a sequence/i)).toHaveAttribute(
      'title',
      'To give something to the next person, often in a sequence (similar to passing a message or object along).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'handOn_section_expanded', /To give something to the next person, often in a sequence/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'handOn', /To give something to the next person, often in a sequence/i, /Please read this project update and hand it on to the rest of the management team\./i, renderPage, getCard);

// --- out ---

describe('HandVerbPage — "out" section definitions', () => {
  it('renders definition for distributing something to multiple people in a group', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to multiple people in a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to multiple people in a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To distribute something to multiple people in a group\./i)).toHaveAttribute(
      'title',
      'To distribute something to multiple people in a group.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'handOut_section_expanded', /To distribute something to multiple people in a group\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'handOut', /To distribute something to multiple people in a group\./i, /The team leader handed out the new coding guidelines during the meeting\./i, renderPage, getCard);

// --- over ---

describe('HandVerbPage — "over" section definitions', () => {
  it('renders definition for giving control or responsibility to someone else', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give control, responsibility, or ownership of something to someone else\./i)).toBeInTheDocument();
  });

  it('renders definition for giving something because someone demands it', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give something to someone because they demand it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give control, responsibility, or ownership of something to someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To give control, responsibility, or ownership of something to someone else\./i)).toHaveAttribute(
      'title',
      'To give control, responsibility, or ownership of something to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'handOver_section_expanded', /To give control, responsibility, or ownership of something to someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'handOver', /To give control, responsibility, or ownership of something to someone else\./i, /When the project is finished, we will hand over the new application to the client\./i, renderPage, getCard);

// --- to ---

describe('HandVerbPage — "to" section definitions', () => {
  it('renders definition for the phrase "have to hand it to someone"', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Used in the phrase "have to hand it to someone"/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Used in the phrase "have to hand it to someone"/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/Used in the phrase "have to hand it to someone"/i)).toHaveAttribute(
      'title',
      'Used in the phrase "have to hand it to someone" — to admit that someone has done something very well and give them credit for it.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'handTo_section_expanded', /Used in the phrase "have to hand it to someone"/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'handTo', /Used in the phrase "have to hand it to someone"/i, /You have to hand it to her; she managed that difficult software project perfectly\./i, renderPage, getCard);
