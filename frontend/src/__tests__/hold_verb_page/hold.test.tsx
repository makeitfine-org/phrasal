import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('HoldVerbPage — "against" section definitions', () => {
  it('renders definition for holding a grudge', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To let a past mistake or negative action influence your opinion of someone/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To let a past mistake or negative action influence your opinion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To let a past mistake or negative action influence your opinion/i)).toHaveAttribute(
      'title',
      'To let a past mistake or negative action influence your opinion of someone; to hold a grudge.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'holdAgainst_section_expanded', /To let a past mistake or negative action influence your opinion/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'holdAgainst', /To let a past mistake or negative action influence your opinion/i, /The developer made a major error in the code, but the manager did not hold it against him/i, renderPage, getCard);

// --- back ---

describe('HoldVerbPage — "back" section definitions', () => {
  it('renders definition for hesitating to act or speak', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate to act or speak\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping something from moving forward', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stop something from moving forward, developing, or succeeding\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping information secret', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To keep information a secret\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate to act or speak\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hesitate to act or speak\./i)).toHaveAttribute(
      'title',
      'To hesitate to act or speak.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'holdBack_section_expanded', /To hesitate to act or speak\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'holdBack', /To hesitate to act or speak\./i, /We need all your ideas for this project, so please do not hold back in the meeting\./i, renderPage, getCard);

// --- down ---

describe('HoldVerbPage — "down" section definitions', () => {
  it('renders definition for keeping a job', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep a job for a period of time\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping costs low', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To keep costs, prices, or numbers at a low level\./i)).toBeInTheDocument();
  });

  it('renders definition for physically preventing movement', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To physically prevent someone or something from moving\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep a job for a period of time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep a job for a period of time\./i)).toHaveAttribute(
      'title',
      'To manage to keep a job for a period of time.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'holdDown_section_expanded', /To manage to keep a job for a period of time\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'holdDown', /To manage to keep a job for a period of time\./i, /It requires excellent leadership skills to hold down a management position/i, renderPage, getCard);

// --- in ---

describe('HoldVerbPage — "in" section definitions', () => {
  it('renders definition for hiding emotions', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hide or control your emotions\./i)).toBeInTheDocument();
  });

  it('renders definition for pulling stomach inwards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To pull your stomach inwards\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hide or control your emotions\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To hide or control your emotions\./i)).toHaveAttribute(
      'title',
      'To hide or control your emotions.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'holdIn_section_expanded', /To hide or control your emotions\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'holdIn', /To hide or control your emotions\./i, /The CEO was furious about the delayed release, but she managed to hold in her anger\./i, renderPage, getCard);

// --- off ---

describe('HoldVerbPage — "off" section definitions', () => {
  it('renders definition for delaying something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay doing something\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping a competitor', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop an opponent or competitor from defeating you\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay doing something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay doing something\./i)).toHaveAttribute(
      'title',
      'To delay doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'holdOff_section_expanded', /To delay doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'holdOff', /To delay doing something\./i, /We decided to hold off on deploying the new Java application/i, renderPage, getCard);

// --- on ---

describe('HoldVerbPage — "on" section definitions', () => {
  it('renders definition for waiting a short time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time \(often used on the phone\)\./i)).toBeInTheDocument();
  });

  it('renders definition for surviving a difficult situation', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To survive in a difficult or dangerous situation\./i)).toBeInTheDocument();
  });

  it('renders definition for gripping tightly', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To grip something tightly\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time \(often used on the phone\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time \(often used on the phone\)\./i)).toHaveAttribute(
      'title',
      'To wait for a short time (often used on the phone).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'holdOn_section_expanded', /To wait for a short time \(often used on the phone\)\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'holdOn', /To wait for a short time \(often used on the phone\)\./i, /Could you hold on a minute while I check the project schedule\?/i, renderPage, getCard);

// --- out ---

describe('HoldVerbPage — "out" section definitions', () => {
  it('renders definition for continuing to defend yourself', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to defend yourself or survive in a difficult situation\./i)).toBeInTheDocument();
  });

  it('renders definition for offering a possibility or hope', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To offer a possibility, chance, or hope\./i)).toBeInTheDocument();
  });

  it('renders definition for extending a body part', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To extend a part of your body \(like a hand\) or an object\./i)).toBeInTheDocument();
  });

  it('renders definition for holding out for something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To wait and refuse to accept anything less than what you want/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to defend yourself or survive in a difficult situation\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To continue to defend yourself or survive in a difficult situation\./i)).toHaveAttribute(
      'title',
      'To continue to defend yourself or survive in a difficult situation.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'holdOut_section_expanded', /To continue to defend yourself or survive in a difficult situation\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'holdOut', /To continue to defend yourself or survive in a difficult situation\./i, /The team held out against the pressure from the clients and delivered high-quality work\./i, renderPage, getCard);

// --- over ---

describe('HoldVerbPage — "over" section definitions', () => {
  it('renders definition for postponing a discussion', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To postpone or delay an event or discussion until a later time\./i)).toBeInTheDocument();
  });

  it('renders definition for staying in a job longer', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To allow someone to stay in a job or position longer than originally planned\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To postpone or delay an event or discussion until a later time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To postpone or delay an event or discussion until a later time\./i)).toHaveAttribute(
      'title',
      'To postpone or delay an event or discussion until a later time.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'holdOver_section_expanded', /To postpone or delay an event or discussion until a later time\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'holdOver', /To postpone or delay an event or discussion until a later time\./i, /we will hold over the architecture discussion until tomorrow/i, renderPage, getCard);

// --- to ---

describe('HoldVerbPage — "to" section definitions', () => {
  it('renders definition for making someone keep a promise', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone keep a promise or follow a standard\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to believe an idea', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To continue to believe an idea or follow a plan, even when it is difficult\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone keep a promise or follow a standard\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To make someone keep a promise or follow a standard\./i)).toHaveAttribute(
      'title',
      'To make someone keep a promise or follow a standard.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'holdTo_section_expanded', /To make someone keep a promise or follow a standard\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'holdTo', /To make someone keep a promise or follow a standard\./i, /We agreed to deliver the software by Friday, and the client will hold us to that deadline\./i, renderPage, getCard);

// --- together ---

describe('HoldVerbPage — "together" section definitions', () => {
  it('renders definition for staying united', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united or to keep a group united\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining intact', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain intact and not break into pieces\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united or to keep a group united\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To remain united or to keep a group united\./i)).toHaveAttribute(
      'title',
      'To remain united or to keep a group united.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'holdTogether_section_expanded', /To remain united or to keep a group united\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'holdTogether', /To remain united or to keep a group united\./i, /A strong manager knows how to hold a team together during stressful project sprints\./i, renderPage, getCard);

// --- up ---

describe('HoldVerbPage — "up" section definitions', () => {
  it('renders definition for delaying someone or something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To delay someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for remaining strong when tested', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To remain strong, successful, or true when tested\./i)).toBeInTheDocument();
  });

  it('renders definition for supporting weight', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To support the weight of something\./i)).toBeInTheDocument();
  });

  it('renders definition for robbing someone', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rob a bank, shop, or person using violence or a weapon\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To delay someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To delay someone or something\./i)).toHaveAttribute(
      'title',
      'To delay someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'holdUp_section_expanded', /To delay someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'holdUp', /To delay someone or something\./i, /A critical bug in the code is holding up the entire product release\./i, renderPage, getCard);

// --- with ---

describe('HoldVerbPage — "with" section definitions', () => {
  it('renders definition for approving of an idea', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To approve of an idea or activity \(almost always used in the negative\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To approve of an idea or activity/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To approve of an idea or activity/i)).toHaveAttribute(
      'title',
      'To approve of an idea or activity (almost always used in the negative).'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'holdWith_section_expanded', /To approve of an idea or activity/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'holdWith', /To approve of an idea or activity/i, /I do not hold with micromanaging experienced developers/i, renderPage, getCard);
