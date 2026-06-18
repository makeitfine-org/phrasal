import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'SitVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('SitVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for spending time doing nothing productive', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time doing nothing productive or useful\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time doing nothing productive or useful\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To spend time doing nothing productive or useful\./i)).toHaveAttribute(
      'title',
      'To spend time doing nothing productive or useful.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'sitAbout_section_expanded', /To spend time doing nothing productive or useful\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'sitAbout', /To spend time doing nothing productive or useful\./i, /Instead of looking for a new job, he just sits around the house all day\./i, renderPage, getCard);

// --- back ---

describe('SitVerbPage — "back" section definitions', () => {
  it('renders definition for relaxing in a chair', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax in a chair\./i)).toBeInTheDocument();
  });

  it('renders definition for intentionally taking no action', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To intentionally take no action when you should probably do something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax in a chair\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To intentionally take no action when you should probably do something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax in a chair\./i)).toHaveAttribute(
      'title',
      'To relax in a chair.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'sitBack_section_expanded', /To relax in a chair\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'sitBack', /To relax in a chair\./i, /Now that the software release is finished, we can sit back and relax\./i, renderPage, getCard);

// --- by ---

describe('SitVerbPage — "by" section definitions', () => {
  it('renders definition for failing to take action', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To fail to take action to stop something bad from happening\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To fail to take action to stop something bad from happening\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To fail to take action to stop something bad from happening\./i)).toHaveAttribute(
      'title',
      'To fail to take action to stop something bad from happening.'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'sitBy_section_expanded', /To fail to take action to stop something bad from happening\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'sitBy', /To fail to take action to stop something bad from happening\./i, /I cannot sit by and let them make this terrible business decision\./i, renderPage, getCard);

// --- down ---

describe('SitVerbPage — "down" section definitions', () => {
  it('renders definition for taking a seat', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To take a seat \(literal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for having a serious conversation', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To have a serious conversation or a formal meeting with someone/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To take a seat \(literal\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To have a serious conversation or a formal meeting with someone/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To take a seat \(literal\)\./i)).toHaveAttribute(
      'title',
      'To take a seat (literal).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'sitDown_section_expanded', /To take a seat \(literal\)\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'sitDown', /To take a seat \(literal\)\./i, /Please sit down, the meeting will begin shortly\./i, renderPage, getCard);

// --- for ---

describe('SitVerbPage — "for" section definitions', () => {
  it('renders definition for taking an official exam', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take an official exam\./i)).toBeInTheDocument();
  });

  it('renders definition for posing for an artist or photographer', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To pose for an artist or photographer\./i)).toBeInTheDocument();
  });

  it('renders definition for taking care of children', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take care of children while their parents are out/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take an official exam\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To pose for an artist or photographer\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To take care of children while their parents are out/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To take an official exam\./i)).toHaveAttribute(
      'title',
      'To take an official exam.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'sitFor_section_expanded', /To take an official exam\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'sitFor', /To take an official exam\./i, /She is going to sit for her project management certification next month\./i, renderPage, getCard);

// --- in ---

describe('SitVerbPage — "in" section definitions', () => {
  it('renders definition for attending as an observer', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attend a meeting or class as an observer/i)).toBeInTheDocument();
  });

  it('renders definition for temporarily replacing someone', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To temporarily replace someone and do their job/i)).toBeInTheDocument();
  });

  it('renders definition for occupying a building as protest', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To occupy a building as a form of protest\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attend a meeting or class as an observer/i)).toHaveClass('truncate');
    expect(screen.getByText(/To temporarily replace someone and do their job/i)).toHaveClass('truncate');
    expect(screen.getByText(/To occupy a building as a form of protest\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To attend a meeting or class as an observer/i)).toHaveAttribute(
      'title',
      'To attend a meeting or class as an observer, rather than an active participant (sit in on).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'sitIn_section_expanded', /To attend a meeting or class as an observer/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'sitIn', /To attend a meeting or class as an observer/i, /As a junior developer, can I sit in on the architecture meeting to learn how it works\?/i, renderPage, getCard);

// --- on ---

describe('SitVerbPage — "on" section definitions', () => {
  it('renders definition for being an official member of a board', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be an official member of a board or committee\./i)).toBeInTheDocument();
  });

  it('renders definition for delaying a decision', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To delay making a decision or taking action on something\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be an official member of a board or committee\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To delay making a decision or taking action on something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To be an official member of a board or committee\./i)).toHaveAttribute(
      'title',
      'To be an official member of a board or committee.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'sitOn_section_expanded', /To be an official member of a board or committee\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'sitOn', /To be an official member of a board or committee\./i, /He sits on the board of directors for three different tech companies\./i, renderPage, getCard);

// --- out ---

describe('SitVerbPage — "out" section definitions', () => {
  it('renders definition for choosing not to participate', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose not to participate in an activity\./i)).toBeInTheDocument();
  });

  it('renders definition for waiting out a difficult situation', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To wait patiently until a difficult or unpleasant situation finishes\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose not to participate in an activity\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To wait patiently until a difficult or unpleasant situation finishes\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To choose not to participate in an activity\./i)).toHaveAttribute(
      'title',
      'To choose not to participate in an activity.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'sitOut_section_expanded', /To choose not to participate in an activity\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'sitOut', /To choose not to participate in an activity\./i, /I don't know much about this part of the project, so I will sit this discussion out\./i, renderPage, getCard);

// --- over ---

describe('SitVerbPage — "over" section definitions', () => {
  it('renders definition for spending a long time doing something while conversing', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To spend a long time doing something, usually eating or drinking/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To spend a long time doing something, usually eating or drinking/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To spend a long time doing something, usually eating or drinking/i)).toHaveAttribute(
      'title',
      'To spend a long time doing something, usually eating or drinking, while having a conversation.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'sitOver_section_expanded', /To spend a long time doing something, usually eating or drinking/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'sitOver', /To spend a long time doing something, usually eating or drinking/i, /We sat over coffee for hours discussing the new business strategy\./i, renderPage, getCard);

// --- through ---

describe('SitVerbPage — "through" section definitions', () => {
  it('renders definition for staying until the end of a difficult event', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To stay until the end of an event that is long, boring, or difficult\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To stay until the end of an event that is long, boring, or difficult\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To stay until the end of an event that is long, boring, or difficult\./i)).toHaveAttribute(
      'title',
      'To stay until the end of an event that is long, boring, or difficult.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'sitThrough_section_expanded', /To stay until the end of an event that is long, boring, or difficult\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'sitThrough', /To stay until the end of an event that is long, boring, or difficult\./i, /I had to sit through a three-hour presentation on software compliance\./i, renderPage, getCard);

// --- up ---

describe('SitVerbPage — "up" section definitions', () => {
  it('renders definition for moving to a sitting position or sitting straight', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move from a lying down position to a sitting position, or to sit straight\./i)).toBeInTheDocument();
  });

  it('renders definition for staying awake late', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stay awake late into the night\./i)).toBeInTheDocument();
  });

  it('renders definition for suddenly paying attention', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To suddenly pay attention to something because it is surprising or important/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move from a lying down position to a sitting position, or to sit straight\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To stay awake late into the night\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly pay attention to something because it is surprising or important/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move from a lying down position to a sitting position, or to sit straight\./i)).toHaveAttribute(
      'title',
      'To move from a lying down position to a sitting position, or to sit straight.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'sitUp_section_expanded', /To move from a lying down position to a sitting position, or to sit straight\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'sitUp', /To move from a lying down position to a sitting position, or to sit straight\./i, /You should sit up straight during your job interview\./i, renderPage, getCard);

// --- with ---

describe('SitVerbPage — "with" section definitions', () => {
  it('renders definition for being acceptable or causing a feeling', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be acceptable to someone, or to cause a certain feeling\./i)).toBeInTheDocument();
  });

  it('renders definition for spending time with someone upset or sick', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To spend time with someone who is upset or sick to give them support\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be acceptable to someone, or to cause a certain feeling\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To spend time with someone who is upset or sick to give them support\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To be acceptable to someone, or to cause a certain feeling\./i)).toHaveAttribute(
      'title',
      'To be acceptable to someone, or to cause a certain feeling.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'sitWith_section_expanded', /To be acceptable to someone, or to cause a certain feeling\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'sitWith', /To be acceptable to someone, or to cause a certain feeling\./i, /The new remote work policy does not sit well with the development team\./i, renderPage, getCard);
