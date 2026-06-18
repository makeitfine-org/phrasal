import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'WorkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('WorkVerbPage — "against" section definitions', () => {
  it('renders definition for acting as a disadvantage', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make it harder for someone to succeed; to act as a disadvantage\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    const def = screen.getByText(/To make it harder for someone to succeed; to act as a disadvantage\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To make it harder for someone to succeed; to act as a disadvantage\./i)).toHaveAttribute(
      'title',
      'To make it harder for someone to succeed; to act as a disadvantage.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'workAgainst_section_expanded', /To make it harder for someone to succeed; to act as a disadvantage\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'workAgainst', /To make it harder for someone to succeed; to act as a disadvantage\./i, /His lack of formal experience might work against him in the interview\./i, renderPage, getCard);

// --- ahead ---

describe('WorkVerbPage — "ahead" section definitions', () => {
  it('renders definition for completing tasks before they are due', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To complete tasks before they are due or scheduled\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    const def = screen.getByText(/To complete tasks before they are due or scheduled\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To complete tasks before they are due or scheduled\./i)).toHaveAttribute(
      'title',
      'To complete tasks before they are due or scheduled.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'workAhead_section_expanded', /To complete tasks before they are due or scheduled\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'workAhead', /To complete tasks before they are due or scheduled\./i, /Whenever I have free time, I try to work ahead on my assignments\./i, renderPage, getCard);

// --- around_round ---

describe('WorkVerbPage — "around / round" section definitions', () => {
  it('renders definition for bypassing an obstacle without fixing the core issue', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To find a way to bypass or overcome an obstacle without actually fixing the core issue/i)).toBeInTheDocument();
  });

  it("renders definition for accommodating someone else's constraints", () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To schedule or arrange plans to accommodate someone else's constraints\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To find a way to bypass or overcome an obstacle without actually fixing the core issue/i),
      screen.getByText(/To schedule or arrange plans to accommodate someone else's constraints\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To find a way to bypass or overcome an obstacle without actually fixing the core issue/i)).toHaveAttribute(
      'title',
      'To find a way to bypass or overcome an obstacle without actually fixing the core issue (giving the noun: workaround).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To schedule or arrange plans to accommodate someone else's constraints\./i)).toHaveAttribute(
      'title',
      "To schedule or arrange plans to accommodate someone else's constraints."
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'workAround_section_expanded', /To find a way to bypass or overcome an obstacle without actually fixing the core issue/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'workAround', /To find a way to bypass or overcome an obstacle without actually fixing the core issue/i, /The software has a bug, but we found a way to work around it\./i, renderPage, getCard);

// --- away ---

describe('WorkVerbPage — "away" section definitions', () => {
  it('renders definition for continuing to work hard for a sustained period', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue working hard and diligently for a sustained period\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    const def = screen.getByText(/To continue working hard and diligently for a sustained period\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To continue working hard and diligently for a sustained period\./i)).toHaveAttribute(
      'title',
      'To continue working hard and diligently for a sustained period.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'workAway_section_expanded', /To continue working hard and diligently for a sustained period\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'workAway', /To continue working hard and diligently for a sustained period\./i, /She was happily working away at her desk all afternoon\./i, renderPage, getCard);

// --- back ---

describe('WorkVerbPage — "back" section definitions', () => {
  it('renders definition for calculating backwards from a deadline', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To start from an end result or deadline and calculate backwards to determine when to begin\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To start from an end result or deadline and calculate backwards to determine when to begin\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To start from an end result or deadline and calculate backwards to determine when to begin\./i)).toHaveAttribute(
      'title',
      'To start from an end result or deadline and calculate backwards to determine when to begin.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'workBack_section_expanded', /To start from an end result or deadline and calculate backwards to determine when to begin\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'workBack', /To start from an end result or deadline and calculate backwards to determine when to begin\./i, /If the project is due on Friday, we need to work back to see when we must start\./i, renderPage, getCard);

// --- down ---

describe('WorkVerbPage — "down" section definitions', () => {
  it('renders definition for progressing downwards systematically through a list or pile', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To gradually reduce something or progress downwards systematically, often through a list or pile\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    const def = screen.getByText(/To gradually reduce something or progress downwards systematically, often through a list or pile\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To gradually reduce something or progress downwards systematically, often through a list or pile\./i)).toHaveAttribute(
      'title',
      'To gradually reduce something or progress downwards systematically, often through a list or pile.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'workDown_section_expanded', /To gradually reduce something or progress downwards systematically, often through a list or pile\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'workDown', /To gradually reduce something or progress downwards systematically, often through a list or pile\./i, /I have a huge stack of files; I'm just going to start at the top and work down\./i, renderPage, getCard);

// --- for ---

describe('WorkVerbPage — "for" section definitions', () => {
  it('renders definition for being employed by a person or organization', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by a person or organization\./i)).toBeInTheDocument();
  });

  it("renders definition for being suitable or effective for someone's needs", () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be suitable, convenient, or effective for someone's needs\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To be employed by a person or organization\./i),
      screen.getByText(/To be suitable, convenient, or effective for someone's needs\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by a person or organization\./i)).toHaveAttribute(
      'title',
      'To be employed by a person or organization.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be suitable, convenient, or effective for someone's needs\./i)).toHaveAttribute(
      'title',
      "To be suitable, convenient, or effective for someone's needs."
    );
  });
});

describeSectionToggle(LABEL, 'for', 'workFor_section_expanded', /To be employed by a person or organization\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'workFor', /To be employed by a person or organization\./i, /I work for an IT consultancy firm\./i, renderPage, getCard);

// --- in ---

describe('WorkVerbPage — "in" section definitions', () => {
  it('renders definition for making time in a busy schedule', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make time or space for something or someone in a busy schedule\./i)).toBeInTheDocument();
  });

  it('renders definition for mixing a substance thoroughly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To mix a substance into another substance thoroughly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To make time or space for something or someone in a busy schedule\./i),
      screen.getByText(/To mix a substance into another substance thoroughly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make time or space for something or someone in a busy schedule\./i)).toHaveAttribute(
      'title',
      'To make time or space for something or someone in a busy schedule.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To mix a substance into another substance thoroughly\./i)).toHaveAttribute(
      'title',
      'To mix a substance into another substance thoroughly.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'workIn_section_expanded', /To make time or space for something or someone in a busy schedule\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'workIn', /To make time or space for something or someone in a busy schedule\./i, /My schedule is packed, but I can work a quick meeting in at 3:00 PM\./i, renderPage, getCard);

// --- into ---

describe('WorkVerbPage — "into" section definitions', () => {
  it('renders definition for fitting someone into a busy schedule', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To successfully fit someone or something into a busy schedule\./i)).toBeInTheDocument();
  });

  it('renders definition for blending or pushing material into another', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To blend or push one material into another\./i)).toBeInTheDocument();
  });

  it('renders definition for gradually reaching an emotional state', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To gradually reach a certain emotional state, usually negative\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To successfully fit someone or something into a busy schedule\./i),
      screen.getByText(/To blend or push one material into another\./i),
      screen.getByText(/To gradually reach a certain emotional state, usually negative\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To successfully fit someone or something into a busy schedule\./i)).toHaveAttribute(
      'title',
      'To successfully fit someone or something into a busy schedule.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To blend or push one material into another\./i)).toHaveAttribute(
      'title',
      'To blend or push one material into another.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To gradually reach a certain emotional state, usually negative\./i)).toHaveAttribute(
      'title',
      'To gradually reach a certain emotional state, usually negative.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'workInto_section_expanded', /To successfully fit someone or something into a busy schedule\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'workInto', /To successfully fit someone or something into a busy schedule\./i, /The dentist was able to work me into her schedule\./i, renderPage, getCard);

// --- off ---

describe('WorkVerbPage — "off" section definitions', () => {
  it('renders definition for eliminating stress through physical activity', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To eliminate something like stress, anger, or calories through physical activity\./i)).toBeInTheDocument();
  });

  it('renders definition for repaying a debt through labor', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To repay a debt by providing labor or services instead of money\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To eliminate something like stress, anger, or calories through physical activity\./i),
      screen.getByText(/To repay a debt by providing labor or services instead of money\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To eliminate something like stress, anger, or calories through physical activity\./i)).toHaveAttribute(
      'title',
      'To eliminate something like stress, anger, or calories through physical activity.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To repay a debt by providing labor or services instead of money\./i)).toHaveAttribute(
      'title',
      'To repay a debt by providing labor or services instead of money.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'workOff_section_expanded', /To eliminate something like stress, anger, or calories through physical activity\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'workOff', /To eliminate something like stress, anger, or calories through physical activity\./i, /After a frustrating meeting, I went to the gym to work off my anger\./i, renderPage, getCard);

// --- on ---

describe('WorkVerbPage — "on" section definitions', () => {
  it('renders definition for spending time improving or developing something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time repairing, improving, or developing something\./i)).toBeInTheDocument();
  });

  it('renders definition for trying to persuade someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To try to persuade or influence someone to do something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To spend time repairing, improving, or developing something\./i),
      screen.getByText(/To try to persuade or influence someone to do something\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time repairing, improving, or developing something\./i)).toHaveAttribute(
      'title',
      'To spend time repairing, improving, or developing something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To try to persuade or influence someone to do something\./i)).toHaveAttribute(
      'title',
      'To try to persuade or influence someone to do something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'workOn_section_expanded', /To spend time repairing, improving, or developing something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'workOn', /To spend time repairing, improving, or developing something\./i, /She is working on her pronunciation to sound more fluent\./i, renderPage, getCard);

// --- out ---

describe('WorkVerbPage — "out" section definitions', () => {
  it('renders definition for exercising to improve physical fitness', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exercise to improve physical fitness\./i)).toBeInTheDocument();
  });

  it('renders definition for solving a problem or calculating an answer', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To solve a problem or calculate an answer\./i)).toBeInTheDocument();
  });

  it('renders definition for happening or developing in a successful way', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To happen or develop in a particular, usually successful, way\./i)).toBeInTheDocument();
  });

  it("renders definition for understanding someone's character", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand someone's character or a confusing situation\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To exercise to improve physical fitness\./i),
      screen.getByText(/To solve a problem or calculate an answer\./i),
      screen.getByText(/To happen or develop in a particular, usually successful, way\./i),
      screen.getByText(/To understand someone's character or a confusing situation\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exercise to improve physical fitness\./i)).toHaveAttribute(
      'title',
      'To exercise to improve physical fitness.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To solve a problem or calculate an answer\./i)).toHaveAttribute(
      'title',
      'To solve a problem or calculate an answer.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To happen or develop in a particular, usually successful, way\./i)).toHaveAttribute(
      'title',
      'To happen or develop in a particular, usually successful, way.'
    );
  });

  it('fourth definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To understand someone's character or a confusing situation\./i)).toHaveAttribute(
      'title',
      "To understand someone's character or a confusing situation."
    );
  });
});

describeSectionToggle(LABEL, 'out', 'workOut_section_expanded', /To exercise to improve physical fitness\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'workOut', /To exercise to improve physical fitness\./i, /I try to work out at the gym three times a week\./i, renderPage, getCard);

// --- over ---

describe('WorkVerbPage — "over" section definitions', () => {
  it('renders definition for physically assaulting someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To physically assault or beat someone up severely \(informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for examining or revising something thoroughly', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine, treat, or revise something very thoroughly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To physically assault or beat someone up severely \(informal\)\./i),
      screen.getByText(/To examine, treat, or revise something very thoroughly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To physically assault or beat someone up severely \(informal\)\./i)).toHaveAttribute(
      'title',
      'To physically assault or beat someone up severely (informal).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine, treat, or revise something very thoroughly\./i)).toHaveAttribute(
      'title',
      'To examine, treat, or revise something very thoroughly.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'workOver_section_expanded', /To physically assault or beat someone up severely \(informal\)\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'workOver', /To physically assault or beat someone up severely \(informal\)\./i, /The gang threatened to work him over if he didn't pay\./i, renderPage, getCard);

// --- through ---

describe('WorkVerbPage — "through" section definitions', () => {
  it('renders definition for dealing with a complex problem step by step', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i)).toBeInTheDocument();
  });

  it('renders definition for reading or completing a large amount of material', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read, process, or complete a large amount of material from beginning to end\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    const defs = [
      screen.getByText(/To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i),
      screen.getByText(/To read, process, or complete a large amount of material from beginning to end\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i)).toHaveAttribute(
      'title',
      'To deal with, resolve, or overcome a complex problem or difficult emotion step by step.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To read, process, or complete a large amount of material from beginning to end\./i)).toHaveAttribute(
      'title',
      'To read, process, or complete a large amount of material from beginning to end.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'workThrough_section_expanded', /To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'workThrough', /To deal with, resolve, or overcome a complex problem or difficult emotion step by step\./i, /Couples counseling helped them work through their trust issues\./i, renderPage, getCard);

// --- to ---

describe('WorkVerbPage — "to" section definitions', () => {
  it('renders definition for operating according to a specific schedule or constraint', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To operate according to a specific schedule, rule, or constraint\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    const def = screen.getByText(/To operate according to a specific schedule, rule, or constraint\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To operate according to a specific schedule, rule, or constraint\./i)).toHaveAttribute(
      'title',
      'To operate according to a specific schedule, rule, or constraint.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'workTo_section_expanded', /To operate according to a specific schedule, rule, or constraint\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'workTo', /To operate according to a specific schedule, rule, or constraint\./i, /We are working to a very tight deadline\./i, renderPage, getCard);

// --- together ---

describe('WorkVerbPage — "together" section definitions', () => {
  it('renders definition for collaborating as a team', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To collaborate or cooperate as a team\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    const def = screen.getByText(/To collaborate or cooperate as a team\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To collaborate or cooperate as a team\./i)).toHaveAttribute(
      'title',
      'To collaborate or cooperate as a team.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'workTogether_section_expanded', /To collaborate or cooperate as a team\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'workTogether', /To collaborate or cooperate as a team\./i, /If we work together, we can finish this much faster\./i, renderPage, getCard);

// --- up ---

describe('WorkVerbPage — "up" section definitions', () => {
  it('renders definition for gradually building something like an appetite', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone feel upset or anxious', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make oneself or someone else feel upset, excited, or anxious/i)).toBeInTheDocument();
  });

  it('renders definition for gradually progressing to something more demanding', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually progress to something more advanced or demanding\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i),
      screen.getByText(/To make oneself or someone else feel upset, excited, or anxious/i),
      screen.getByText(/To gradually progress to something more advanced or demanding\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i)).toHaveAttribute(
      'title',
      'To gradually develop or build something, often a feeling like an appetite, courage, or sweat.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make oneself or someone else feel upset, excited, or anxious/i)).toHaveAttribute(
      'title',
      'To make oneself or someone else feel upset, excited, or anxious (often used in the passive: worked up).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To gradually progress to something more advanced or demanding\./i)).toHaveAttribute(
      'title',
      'To gradually progress to something more advanced or demanding.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'workUp_section_expanded', /To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'workUp', /To gradually develop or build something, often a feeling like an appetite, courage, or sweat\./i, /We went for a long hike and worked up a huge appetite\./i, renderPage, getCard);

// --- with ---

describe('WorkVerbPage — "with" section definitions', () => {
  it('renders definition for collaborating alongside someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To collaborate alongside someone\./i)).toBeInTheDocument();
  });

  it('renders definition for using something as a tool or material', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To use something as a tool, material, or basis for a project\./i)).toBeInTheDocument();
  });

  it('renders definition for accommodating or adapting to a constraint', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To accommodate or adapt to a situation or constraint\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    const defs = [
      screen.getByText(/To collaborate alongside someone\./i),
      screen.getByText(/To use something as a tool, material, or basis for a project\./i),
      screen.getByText(/To accommodate or adapt to a situation or constraint\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To collaborate alongside someone\./i)).toHaveAttribute(
      'title',
      'To collaborate alongside someone.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To use something as a tool, material, or basis for a project\./i)).toHaveAttribute(
      'title',
      'To use something as a tool, material, or basis for a project.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To accommodate or adapt to a situation or constraint\./i)).toHaveAttribute(
      'title',
      'To accommodate or adapt to a situation or constraint.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'workWith_section_expanded', /To collaborate alongside someone\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'workWith', /To collaborate alongside someone\./i, /I love working with my new team\./i, renderPage, getCard);
