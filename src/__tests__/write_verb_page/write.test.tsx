import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'WriteVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about ---

describe('WriteVerbPage — "about" section definitions', () => {
  it('renders definition for discussing a subject in writing', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a particular subject in writing\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about');
    const def = screen.getByText(/To discuss a particular subject in writing\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about');
    expect(screen.getByText(/To discuss a particular subject in writing\./i)).toHaveAttribute(
      'title',
      'To discuss a particular subject in writing.'
    );
  });
});

describeSectionToggle(LABEL, 'about', 'writeAbout_section_expanded', /To discuss a particular subject in writing\./i, renderPage);

describeChevronAndColour(LABEL, 'about', renderPage);

describeDefaultImageCards(LABEL, 'about', 'writeAbout', /To discuss a particular subject in writing\./i, /I want to write about the impact of artificial intelligence on the job market\./i, renderPage, getCard);

// --- against ---

describe('WriteVerbPage — "against" section definitions', () => {
  it('renders definition for opposing an idea in writing', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To write essays, articles, or books opposing a specific idea, policy, or person\./i)).toBeInTheDocument();
  });

  it('renders definition for deducting an expense', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To deduct an expense from a specific account or budget \(finance\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('against');
    const defs = [
      screen.getByText(/To write essays, articles, or books opposing a specific idea, policy, or person\./i),
      screen.getByText(/To deduct an expense from a specific account or budget \(finance\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To write essays, articles, or books opposing a specific idea, policy, or person\./i)).toHaveAttribute(
      'title',
      'To write essays, articles, or books opposing a specific idea, policy, or person.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To deduct an expense from a specific account or budget \(finance\)\./i)).toHaveAttribute(
      'title',
      'To deduct an expense from a specific account or budget (finance).'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'writeAgainst_section_expanded', /To write essays, articles, or books opposing a specific idea, policy, or person\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'writeAgainst', /To write essays, articles, or books opposing a specific idea, policy, or person\./i, /He spent his later years writing against the dangers of censorship\./i, renderPage, getCard);

// --- around_round ---

describe('WriteVerbPage — "around / round" section definitions', () => {
  it('renders definition for avoiding the main point', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To intentionally avoid addressing the main point or a difficult topic in a text\./i)).toBeInTheDocument();
  });

  it('renders definition for circulating a memo', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To circulate a memo or letter to a group of people \(British: write round\)\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To intentionally avoid addressing the main point or a difficult topic in a text\./i),
      screen.getByText(/To circulate a memo or letter to a group of people \(British: write round\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To intentionally avoid addressing the main point or a difficult topic in a text\./i)).toHaveAttribute(
      'title',
      'To intentionally avoid addressing the main point or a difficult topic in a text.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To circulate a memo or letter to a group of people \(British: write round\)\./i)).toHaveAttribute(
      'title',
      'To circulate a memo or letter to a group of people (British: write round).'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'writeAround_section_expanded', /To intentionally avoid addressing the main point or a difficult topic in a text\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'writeAround', /To intentionally avoid addressing the main point or a difficult topic in a text\./i, /The biography is frustrating because the author writes around the politician's well-known scandals\./i, renderPage, getCard);

// --- away ---

describe('WriteVerbPage — "away" section definitions', () => {
  it('renders definition for sending a letter requesting something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To send a letter requesting something \(synonymous with write off for\)\./i)).toBeInTheDocument();
  });

  it('renders definition for writing continuously', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To write continuously and diligently\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    const defs = [
      screen.getByText(/To send a letter requesting something \(synonymous with write off for\)\./i),
      screen.getByText(/To write continuously and diligently\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To send a letter requesting something \(synonymous with write off for\)\./i)).toHaveAttribute(
      'title',
      'To send a letter requesting something (synonymous with write off for).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To write continuously and diligently\./i)).toHaveAttribute(
      'title',
      'To write continuously and diligently.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'writeAway_section_expanded', /To send a letter requesting something \(synonymous with write off for\)\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'writeAway', /To send a letter requesting something \(synonymous with write off for\)\./i, /When I was a kid, I used to write away for x-ray glasses I saw in comic books\./i, renderPage, getCard);

// --- back ---

describe('WriteVerbPage — "back" section definitions', () => {
  it('renders definition for replying to a letter or email', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply to someone's letter, email, or message\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    const def = screen.getByText(/To reply to someone's letter, email, or message\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reply to someone's letter, email, or message\./i)).toHaveAttribute(
      'title',
      "To reply to someone's letter, email, or message."
    );
  });
});

describeSectionToggle(LABEL, 'back', 'writeBack_section_expanded', /To reply to someone's letter, email, or message\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'writeBack', /To reply to someone's letter, email, or message\./i, /I sent him an email last week, but he still hasn't written back\./i, renderPage, getCard);

// --- down ---

describe('WriteVerbPage — "down" section definitions', () => {
  it('renders definition for recording something on paper', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To record something on paper so it is not forgotten\./i)).toBeInTheDocument();
  });

  it('renders definition for reducing asset value', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the estimated or nominal value of an asset \(finance\)\./i)).toBeInTheDocument();
  });

  it('renders definition for writing condescendingly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write in a condescendingly simple way \(usually write down to\)\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    const defs = [
      screen.getByText(/To record something on paper so it is not forgotten\./i),
      screen.getByText(/To reduce the estimated or nominal value of an asset \(finance\)\./i),
      screen.getByText(/To write in a condescendingly simple way \(usually write down to\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To record something on paper so it is not forgotten\./i)).toHaveAttribute(
      'title',
      'To record something on paper so it is not forgotten.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the estimated or nominal value of an asset \(finance\)\./i)).toHaveAttribute(
      'title',
      'To reduce the estimated or nominal value of an asset (finance).'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write in a condescendingly simple way \(usually write down to\)\./i)).toHaveAttribute(
      'title',
      'To write in a condescendingly simple way (usually write down to).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'writeDown_section_expanded', /To record something on paper so it is not forgotten\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'writeDown', /To record something on paper so it is not forgotten\./i, /Please write down my phone number before you lose it\./i, renderPage, getCard);

// --- for ---

describe('WriteVerbPage — "for" section definitions', () => {
  it('renders definition for being employed by a publication', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by or submit writing to a specific publication\./i)).toBeInTheDocument();
  });

  it('renders definition for requesting something by mail', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something by mail\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    const defs = [
      screen.getByText(/To be employed by or submit writing to a specific publication\./i),
      screen.getByText(/To request something by mail\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To be employed by or submit writing to a specific publication\./i)).toHaveAttribute(
      'title',
      'To be employed by or submit writing to a specific publication.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To request something by mail\./i)).toHaveAttribute(
      'title',
      'To request something by mail.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'writeFor_section_expanded', /To be employed by or submit writing to a specific publication\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'writeFor', /To be employed by or submit writing to a specific publication\./i, /She writes for several major technology magazines\./i, renderPage, getCard);

// --- in ---

describe('WriteVerbPage — "in" section definitions', () => {
  it('renders definition for sending a letter to express an opinion', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To send a letter or email to an organization or television station to express an opinion\./i)).toBeInTheDocument();
  });

  it('renders definition for casting a write-in vote', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To cast a vote for a candidate whose name is not on the official ballot by writing their name\./i)).toBeInTheDocument();
  });

  it('renders definition for inserting text into a document', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To insert text into a document or form\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    const defs = [
      screen.getByText(/To send a letter or email to an organization or television station to express an opinion\./i),
      screen.getByText(/To cast a vote for a candidate whose name is not on the official ballot by writing their name\./i),
      screen.getByText(/To insert text into a document or form\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To send a letter or email to an organization or television station to express an opinion\./i)).toHaveAttribute(
      'title',
      'To send a letter or email to an organization or television station to express an opinion.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To cast a vote for a candidate whose name is not on the official ballot by writing their name\./i)).toHaveAttribute(
      'title',
      'To cast a vote for a candidate whose name is not on the official ballot by writing their name.'
    );
  });

  it('third definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To insert text into a document or form\./i)).toHaveAttribute(
      'title',
      'To insert text into a document or form.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'writeIn_section_expanded', /To send a letter or email to an organization or television station to express an opinion\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'writeIn', /To send a letter or email to an organization or television station to express an opinion\./i, /Hundreds of viewers wrote in to complain about the controversial episode\./i, renderPage, getCard);

// --- into ---

describe('WriteVerbPage — "into" section definitions', () => {
  it('renders definition for including a clause in a contract', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To formally include a specific clause, rule, or condition in a contract or script\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    const def = screen.getByText(/To formally include a specific clause, rule, or condition in a contract or script\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To formally include a specific clause, rule, or condition in a contract or script\./i)).toHaveAttribute(
      'title',
      'To formally include a specific clause, rule, or condition in a contract or script.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'writeInto_section_expanded', /To formally include a specific clause, rule, or condition in a contract or script\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'writeInto', /To formally include a specific clause, rule, or condition in a contract or script\./i, /We made sure to write a penalty clause into the agreement to protect our investment\./i, renderPage, getCard);

// --- off ---

describe('WriteVerbPage — "off" section definitions', () => {
  it('renders definition for cancelling a bad debt', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel a bad debt or accept a financial loss\./i)).toBeInTheDocument();
  });

  it('renders definition for dismissing someone as a failure', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To decide that someone or something is useless, unimportant, or a failure\./i)).toBeInTheDocument();
  });

  it('renders definition for damaging a vehicle', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To damage a vehicle so badly that it cannot be repaired \(British\/Commonwealth\)\./i)).toBeInTheDocument();
  });

  it('renders definition for deducting an expense', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To deduct an expense to reduce taxable income\./i)).toBeInTheDocument();
  });

  it('renders definition for sending a letter requesting something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To send a letter requesting something \(often write off for\)\./i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    const defs = [
      screen.getByText(/To cancel a bad debt or accept a financial loss\./i),
      screen.getByText(/To decide that someone or something is useless, unimportant, or a failure\./i),
      screen.getByText(/To damage a vehicle so badly that it cannot be repaired \(British\/Commonwealth\)\./i),
      screen.getByText(/To deduct an expense to reduce taxable income\./i),
      screen.getByText(/To send a letter requesting something \(often write off for\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel a bad debt or accept a financial loss\./i)).toHaveAttribute(
      'title',
      'To cancel a bad debt or accept a financial loss.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'writeOff_section_expanded', /To cancel a bad debt or accept a financial loss\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'writeOff', /To cancel a bad debt or accept a financial loss\./i, /The bank decided to write off the unpaid loan\./i, renderPage, getCard);

// --- on ---

describe('WriteVerbPage — "on" section definitions', () => {
  it('renders definition for writing about a topic formally', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To write about a specific topic or subject \(formal\/academic\)\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to write', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue writing despite distractions or obstacles\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To write about a specific topic or subject \(formal\/academic\)\./i),
      screen.getByText(/To continue writing despite distractions or obstacles\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To write about a specific topic or subject \(formal\/academic\)\./i)).toHaveAttribute(
      'title',
      'To write about a specific topic or subject (formal/academic).'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue writing despite distractions or obstacles\./i)).toHaveAttribute(
      'title',
      'To continue writing despite distractions or obstacles.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'writeOn_section_expanded', /To write about a specific topic or subject \(formal\/academic\)\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'writeOn', /To write about a specific topic or subject \(formal\/academic\)\./i, /Professor Smith writes primarily on medieval European history\./i, renderPage, getCard);

// --- out ---

describe('WriteVerbPage — "out" section definitions', () => {
  it('renders definition for writing in full', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To write something completely in full rather than using abbreviations or numbers\./i)).toBeInTheDocument();
  });

  it('renders definition for removing a character from a TV series', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To remove a character from a television series by not including them in future scripts\./i)).toBeInTheDocument();
  });

  it('renders definition for filling in details on a document', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To fill in all the necessary details on a document such as a check or prescription\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To write something completely in full rather than using abbreviations or numbers\./i),
      screen.getByText(/To remove a character from a television series by not including them in future scripts\./i),
      screen.getByText(/To fill in all the necessary details on a document such as a check or prescription\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To write something completely in full rather than using abbreviations or numbers\./i)).toHaveAttribute(
      'title',
      'To write something completely in full rather than using abbreviations or numbers.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'writeOut_section_expanded', /To write something completely in full rather than using abbreviations or numbers\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'writeOut', /To write something completely in full rather than using abbreviations or numbers\./i, /You need to write out the numbers one through ten, but you can use digits for 11 and up\./i, renderPage, getCard);

// --- over ---

describe('WriteVerbPage — "over" section definitions', () => {
  it('renders definition for overwriting computer data', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To replace old computer data with new data; to overwrite\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    const def = screen.getByText(/To replace old computer data with new data; to overwrite\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To replace old computer data with new data; to overwrite\./i)).toHaveAttribute(
      'title',
      'To replace old computer data with new data; to overwrite.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'writeOver_section_expanded', /To replace old computer data with new data; to overwrite\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'writeOver', /To replace old computer data with new data; to overwrite\./i, /Be careful when saving the document, or you might write over yesterday's work\./i, renderPage, getCard);

// --- through ---

describe('WriteVerbPage — "through" section definitions', () => {
  it('renders definition for revising a piece of writing', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i)).toHaveAttribute(
      'title',
      'To revise a piece of writing completely from beginning to end (journalism/editing).'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'writeThrough_section_expanded', /To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'writeThrough', /To revise a piece of writing completely from beginning to end \(journalism\/editing\)\./i, /The editor told the reporter to write through the draft to make the narrative flow better\./i, renderPage, getCard);

// --- to ---

describe('WriteVerbPage — "to" section definitions', () => {
  it('renders definition for sending a written message to someone', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To send a written message or letter to a specific person or entity\./i)).toBeInTheDocument();
  });

  it('renders definition for targeting writing toward a demographic', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To target a piece of writing toward a specific demographic\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    const defs = [
      screen.getByText(/To send a written message or letter to a specific person or entity\./i),
      screen.getByText(/To target a piece of writing toward a specific demographic\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To send a written message or letter to a specific person or entity\./i)).toHaveAttribute(
      'title',
      'To send a written message or letter to a specific person or entity.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To target a piece of writing toward a specific demographic\./i)).toHaveAttribute(
      'title',
      'To target a piece of writing toward a specific demographic.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'writeTo_section_expanded', /To send a written message or letter to a specific person or entity\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'writeTo', /To send a written message or letter to a specific person or entity\./i, /I write to my grandmother at least once a month\./i, renderPage, getCard);

// --- up ---

describe('WriteVerbPage — "up" section definitions', () => {
  it('renders definition for producing a formal document', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce a formal, complete written document based on notes or a draft\./i)).toBeInTheDocument();
  });

  it('renders definition for recording a rule violation', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To officially record someone's poor performance or rule violation in a disciplinary file\./i)).toBeInTheDocument();
  });

  it('renders definition for publishing a praising article', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To publish a review or article praising someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for increasing asset value', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To artificially increase the recorded, nominal value of an asset \(finance\)\./i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    const defs = [
      screen.getByText(/To produce a formal, complete written document based on notes or a draft\./i),
      screen.getByText(/To officially record someone's poor performance or rule violation in a disciplinary file\./i),
      screen.getByText(/To publish a review or article praising someone or something\./i),
      screen.getByText(/To artificially increase the recorded, nominal value of an asset \(finance\)\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To produce a formal, complete written document based on notes or a draft\./i)).toHaveAttribute(
      'title',
      'To produce a formal, complete written document based on notes or a draft.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'writeUp_section_expanded', /To produce a formal, complete written document based on notes or a draft\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'writeUp', /To produce a formal, complete written document based on notes or a draft\./i, /Give me an hour to write up the minutes from our meeting\./i, renderPage, getCard);
