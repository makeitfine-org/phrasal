import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around ---

describe('LeaveVerbPage — "about / around" section definitions', () => {
  it('renders definition for putting things in random places', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To put things in random places in an untidy way/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To put things in random places in an untidy way/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To put things in random places in an untidy way/i)).toHaveAttribute(
      'title',
      'To put things in random places in an untidy way, making a mess.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around', 'leaveAbout_section_expanded', /To put things in random places in an untidy way/i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describeDefaultImageCards(LABEL, 'about / around', 'leaveAbout', /To put things in random places in an untidy way/i, /Please don't leave your dirty clothes around the house\./i, renderPage, getCard);

// --- back ---

describe('LeaveVerbPage — "back" section definitions', () => {
  it('renders definition for making a student repeat a school year', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make a student repeat a school year/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make a student repeat a school year/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To make a student repeat a school year/i)).toHaveAttribute(
      'title',
      'To make a student repeat a school year because their grades were too low (mainly used in US English).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'leaveBack_section_expanded', /To make a student repeat a school year/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'leaveBack', /To make a student repeat a school year/i, /He failed his math and science exams, so the school left him back a year\./i, renderPage, getCard);

// --- behind ---

describe('LeaveVerbPage — "behind" section definitions', () => {
  it('renders definition for forgetting to take something when departing', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To forget to take someone or something with you when you depart/i)).toBeInTheDocument();
  });

  it('renders definition for permanently moving on', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To permanently move on from a situation/i)).toBeInTheDocument();
  });

  it('renders definition for progressing faster than competitors', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To progress much faster than competitors/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To forget to take someone or something with you when you depart/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To forget to take someone or something with you when you depart/i)).toHaveAttribute(
      'title',
      'To forget to take someone or something with you when you depart.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'leaveBehind_section_expanded', /To forget to take someone or something with you when you depart/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'leaveBehind', /To forget to take someone or something with you when you depart/i, /I accidentally left my umbrella behind at the coffee shop\./i, renderPage, getCard);

// --- for ---

describe('LeaveVerbPage — "for" section definitions', () => {
  it('renders definition for beginning a journey', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To begin a journey with a specific destination in mind/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To begin a journey with a specific destination in mind/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To begin a journey with a specific destination in mind/i)).toHaveAttribute(
      'title',
      'To begin a journey with a specific destination in mind.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'leaveFor_section_expanded', /To begin a journey with a specific destination in mind/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'leaveFor', /To begin a journey with a specific destination in mind/i, /We need to pack our bags because we leave for London early tomorrow morning\./i, renderPage, getCard);

// --- in ---

describe('LeaveVerbPage — "in" section definitions', () => {
  it('renders definition for not removing something', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To not remove something; to let it stay where it is/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To not remove something; to let it stay where it is/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To not remove something; to let it stay where it is/i)).toHaveAttribute(
      'title',
      'To not remove something; to let it stay where it is.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'leaveIn_section_expanded', /To not remove something; to let it stay where it is/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'leaveIn', /To not remove something; to let it stay where it is/i, /The editor decided to leave that paragraph in the final article\./i, renderPage, getCard);

// --- off ---

describe('LeaveVerbPage — "off" section definitions', () => {
  it('renders definition for stopping doing something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop doing something/i)).toBeInTheDocument();
  });

  it('renders definition for excluding from a list', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To purposefully or accidentally exclude someone or something from a list/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop doing something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop doing something/i)).toHaveAttribute(
      'title',
      'To stop doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'leaveOff_section_expanded', /To stop doing something/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'leaveOff', /To stop doing something/i, /Let's start the meeting exactly where we left off yesterday\./i, renderPage, getCard);

// --- on ---

describe('LeaveVerbPage — "on" section definitions', () => {
  it('renders definition for letting a machine continue working', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To let a machine, device, or light continue working/i)).toBeInTheDocument();
  });

  it('renders definition for continuing to wear clothing', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue wearing a piece of clothing/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To let a machine, device, or light continue working/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To let a machine, device, or light continue working/i)).toHaveAttribute(
      'title',
      'To let a machine, device, or light continue working.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'leaveOn_section_expanded', /To let a machine, device, or light continue working/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'leaveOn', /To let a machine, device, or light continue working/i, /Don't leave the TV on when you go to sleep\./i, renderPage, getCard);

// --- out ---

describe('LeaveVerbPage — "out" section definitions', () => {
  it('renders definition for not including someone or something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone or something/i)).toBeInTheDocument();
  });

  it('renders definition for making a person feel excluded', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make a person feel excluded from a group or activity/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone or something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not include someone or something/i)).toHaveAttribute(
      'title',
      'To not include someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'leaveOut_section_expanded', /To not include someone or something/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'leaveOut', /To not include someone or something/i, /You can leave out the last exercise; it is optional\./i, renderPage, getCard);

// --- over ---

describe('LeaveVerbPage — "over" section definitions', () => {
  it('renders definition for having a portion remaining', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To have a portion of something remaining after the rest has been used/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To have a portion of something remaining after the rest has been used/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To have a portion of something remaining after the rest has been used/i)).toHaveAttribute(
      'title',
      'To have a portion of something remaining after the rest has been used or eaten (almost always used in the passive as "left over").'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'leaveOver_section_expanded', /To have a portion of something remaining after the rest has been used/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'leaveOver', /To have a portion of something remaining after the rest has been used/i, /We have a lot of pizza left over from the project launch party\./i, renderPage, getCard);

// --- to ---

describe('LeaveVerbPage — "to" section definitions', () => {
  it('renders definition for giving responsibility to someone else', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give someone else the responsibility or authority to handle a task/i)).toBeInTheDocument();
  });

  it('renders definition for giving money in a will', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give money or property to someone in a will/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give someone else the responsibility or authority to handle a task/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give someone else the responsibility or authority to handle a task/i)).toHaveAttribute(
      'title',
      'To give someone else the responsibility or authority to handle a task.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'leaveTo_section_expanded', /To give someone else the responsibility or authority to handle a task/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'leaveTo', /To give someone else the responsibility or authority to handle a task/i, /I don't know how to fix this server error; I'll leave it to the IT department\./i, renderPage, getCard);

// --- up_to ---

describe('LeaveVerbPage — "up (to)" section definitions', () => {
  it('renders definition for letting someone else make a decision', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let someone else make a decision or choose an option/i)).toBeInTheDocument();
  });

  it('renders definition for letting a decoration remain hanging', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let a physical object or decoration remain hanging/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let someone else make a decision or choose an option/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up (to)');
    expect(screen.getByText(/To let someone else make a decision or choose an option/i)).toHaveAttribute(
      'title',
      'To let someone else make a decision or choose an option.'
    );
  });
});

describeSectionToggle(LABEL, 'up (to)', 'leaveUp_section_expanded', /To let someone else make a decision or choose an option/i, renderPage);

describeChevronAndColour(LABEL, 'up (to)', renderPage);

describeDefaultImageCards(LABEL, 'up (to)', 'leaveUp', /To let someone else make a decision or choose an option/i, /We can eat pizza or sushi for lunch; I will leave it up to you\./i, renderPage, getCard);

// --- with ---

describe('LeaveVerbPage — "with" section definitions', () => {
  it('renders definition for giving an object to someone temporarily', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To give an object to someone so they can keep it safe or take care of it temporarily/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To give an object to someone so they can keep it safe or take care of it temporarily/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To give an object to someone so they can keep it safe or take care of it temporarily/i)).toHaveAttribute(
      'title',
      'To give an object to someone so they can keep it safe or take care of it temporarily.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'leaveWith_section_expanded', /To give an object to someone so they can keep it safe or take care of it temporarily/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'leaveWith', /To give an object to someone so they can keep it safe or take care of it temporarily/i, /Can I leave my heavy bags with you while I quickly run to the store\?/i, renderPage, getCard);
