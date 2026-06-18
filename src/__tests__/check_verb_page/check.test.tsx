import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('CheckVerbPage — "against" section definitions', () => {
  it('renders definition for comparing one thing with another', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compare one thing with another to see if they match or to find differences\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compare one thing with another to see if they match or to find differences\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To compare one thing with another to see if they match or to find differences\./i)).toHaveAttribute(
      'title',
      'To compare one thing with another to see if they match or to find differences.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'checkAgainst_section_expanded', /To compare one thing with another to see if they match or to find differences\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'checkAgainst', /To compare one thing with another to see if they match or to find differences\./i, /The finance team must check the monthly expenses against the budget\./i, renderPage, getCard);

// --- around_round ---

describe('CheckVerbPage — "around / round" section definitions', () => {
  it('renders definition for looking in various places', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To look in various places or ask several people for information/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To look in various places or ask several people for information/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To look in various places or ask several people for information/i)).toHaveAttribute(
      'title',
      'To look in various places or ask several people for information (often to compare prices or options).'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'checkAround_section_expanded', /To look in various places or ask several people for information/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'checkAround', /To look in various places or ask several people for information/i, /We should check around for a cheaper cloud hosting provider/i, renderPage, getCard);

// --- back ---

describe('CheckVerbPage — "back" section definitions', () => {
  it('renders definition for returning later to see if something is ready', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return later to see if something has happened or is ready\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return later to see if something has happened or is ready\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return later to see if something has happened or is ready\./i)).toHaveAttribute(
      'title',
      'To return later to see if something has happened or is ready.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'checkBack_section_expanded', /To return later to see if something has happened or is ready\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'checkBack', /To return later to see if something has happened or is ready\./i, /The system is still restarting; please check back in five minutes\./i, renderPage, getCard);

// --- down ---

describe('CheckVerbPage — "down" section definitions', () => {
  it('renders definition for going down a list of options', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To go down a list of options until you find one that works/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To go down a list of options until you find one that works/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To go down a list of options until you find one that works/i)).toHaveAttribute(
      'title',
      'To go down a list of options until you find one that works (often used in processes or sports).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'checkDown_section_expanded', /To go down a list of options until you find one that works/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'checkDown', /To go down a list of options until you find one that works/i, /If the main database fails, the system will check down the list/i, renderPage, getCard);

// --- for ---

describe('CheckVerbPage — "for" section definitions', () => {
  it('renders definition for looking closely to find a specific thing', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look closely to find a specific thing \(often errors, signs, or problems\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look closely to find a specific thing \(often errors, signs, or problems\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To look closely to find a specific thing \(often errors, signs, or problems\)\./i)).toHaveAttribute(
      'title',
      'To look closely to find a specific thing (often errors, signs, or problems).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'checkFor_section_expanded', /To look closely to find a specific thing \(often errors, signs, or problems\)\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'checkFor', /To look closely to find a specific thing \(often errors, signs, or problems\)\./i, /We ran automated tests to check for security bugs in the code\./i, renderPage, getCard);

// --- in ---

describe('CheckVerbPage — "in" section definitions', () => {
  it('renders definition for registering arrival at a hotel', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To register your arrival at a hotel, airport, or event\./i)).toBeInTheDocument();
  });

  it('renders definition for contacting someone briefly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To contact someone briefly to give an update or make sure everything is okay\./i)).toBeInTheDocument();
  });

  it('renders definition for uploading source code to version control', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To upload or save source code to a version control system/i)).toBeInTheDocument();
  });

  it('renders definition for leaving bags at the airport', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To leave your bags at the airport before a flight\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To register your arrival at a hotel, airport, or event\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To register your arrival at a hotel, airport, or event\./i)).toHaveAttribute(
      'title',
      'To register your arrival at a hotel, airport, or event.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'checkIn_section_expanded', /To register your arrival at a hotel, airport, or event\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'checkIn', /To register your arrival at a hotel, airport, or event\./i, /The CEO checked in at the hotel right before the leadership conference\./i, renderPage, getCard);

// --- into ---

describe('CheckVerbPage — "into" section definitions', () => {
  it('renders definition for arriving and registering at a hotel', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive and register at a hotel, clinic, or hospital\./i)).toBeInTheDocument();
  });

  it('renders definition for investigating a problem', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To investigate or look for more information about a problem\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive and register at a hotel, clinic, or hospital\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To arrive and register at a hotel, clinic, or hospital\./i)).toHaveAttribute(
      'title',
      'To arrive and register at a hotel, clinic, or hospital.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'checkInto_section_expanded', /To arrive and register at a hotel, clinic, or hospital\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'checkInto', /To arrive and register at a hotel, clinic, or hospital\./i, /We checked into the Hilton at 3:00 PM\./i, renderPage, getCard);

// --- off ---

describe('CheckVerbPage — "off" section definitions', () => {
  it('renders definition for marking an item on a list', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To mark an item on a list to show that it has been completed or verified\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To mark an item on a list to show that it has been completed or verified\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To mark an item on a list to show that it has been completed or verified\./i)).toHaveAttribute(
      'title',
      'To mark an item on a list to show that it has been completed or verified.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'checkOff_section_expanded', /To mark an item on a list to show that it has been completed or verified\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'checkOff', /To mark an item on a list to show that it has been completed or verified\./i, /After completing the code review, I checked off the task in Jira\./i, renderPage, getCard);

// --- on ---

describe('CheckVerbPage — "on" section definitions', () => {
  it('renders definition for looking at someone to make sure they are okay', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To look at someone or something to make sure they are safe, progressing well, or in good condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To look at someone or something to make sure they are safe, progressing well, or in good condition\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To look at someone or something to make sure they are safe, progressing well, or in good condition\./i)).toHaveAttribute(
      'title',
      'To look at someone or something to make sure they are safe, progressing well, or in good condition.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'checkOn_section_expanded', /To look at someone or something to make sure they are safe, progressing well, or in good condition\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'checkOn', /To look at someone or something to make sure they are safe, progressing well, or in good condition\./i, /The manager stopped by to check on the new Java developers\./i, renderPage, getCard);

// --- out ---

describe('CheckVerbPage — "out" section definitions', () => {
  it('renders definition for paying bill and leaving a hotel', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay your bill and leave a hotel\./i)).toBeInTheDocument();
  });

  it('renders definition for examining something interesting', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To examine, investigate, or look at something interesting\./i)).toBeInTheDocument();
  });

  it('renders definition for proving to be true', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prove to be true or correct after investigation\./i)).toBeInTheDocument();
  });

  it('renders definition for paying for goods', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay for goods at a store or online\./i)).toBeInTheDocument();
  });

  it('renders definition for downloading a branch from a repository', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To download or switch to a specific version of code from a repository/i)).toBeInTheDocument();
  });

  it('renders definition for stopping paying attention', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stop paying attention or disconnect mentally because you are tired or bored\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay your bill and leave a hotel\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To pay your bill and leave a hotel\./i)).toHaveAttribute(
      'title',
      'To pay your bill and leave a hotel.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'checkOut_section_expanded', /To pay your bill and leave a hotel\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'checkOut', /To pay your bill and leave a hotel\./i, /We have to check out of our rooms by 11:00 AM\./i, renderPage, getCard);

// --- over ---

describe('CheckVerbPage — "over" section definitions', () => {
  it('renders definition for examining something carefully from start to finish', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine something carefully from start to finish to find errors or problems\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine something carefully from start to finish to find errors or problems\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To examine something carefully from start to finish to find errors or problems\./i)).toHaveAttribute(
      'title',
      'To examine something carefully from start to finish to find errors or problems.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'checkOver_section_expanded', /To examine something carefully from start to finish to find errors or problems\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'checkOver', /To examine something carefully from start to finish to find errors or problems\./i, /Please check over the business contract before you sign it\./i, renderPage, getCard);

// --- through ---

describe('CheckVerbPage — "through" section definitions', () => {
  it('renders definition for looking at a collection of items carefully', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To look at or read a collection of items carefully\./i)).toBeInTheDocument();
  });

  it('renders definition for sending luggage directly to a final destination', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To send luggage directly to a final destination without needing to collect it during a connection\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To look at or read a collection of items carefully\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To look at or read a collection of items carefully\./i)).toHaveAttribute(
      'title',
      'To look at or read a collection of items carefully.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'checkThrough_section_expanded', /To look at or read a collection of items carefully\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'checkThrough', /To look at or read a collection of items carefully\./i, /I checked through the error logs to find where the Java exception happened\./i, renderPage, getCard);

// --- up ---

describe('CheckVerbPage — "up" section definitions', () => {
  it('renders definition for investigating someone or something', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To investigate someone or something to discover what they are doing or if they are okay\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To investigate someone or something to discover what they are doing or if they are okay\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To investigate someone or something to discover what they are doing or if they are okay\./i)).toHaveAttribute(
      'title',
      'To investigate someone or something to discover what they are doing or if they are okay.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'checkUp_section_expanded', /To investigate someone or something to discover what they are doing or if they are okay\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'checkUp', /To investigate someone or something to discover what they are doing or if they are okay\./i, /The client called to check up on the progress of the software release\./i, renderPage, getCard);

// --- with ---

describe('CheckVerbPage — "with" section definitions', () => {
  it('renders definition for asking someone for permission before doing something', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To ask someone for permission, advice, or information before doing something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To ask someone for permission, advice, or information before doing something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To ask someone for permission, advice, or information before doing something\./i)).toHaveAttribute(
      'title',
      'To ask someone for permission, advice, or information before doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'checkWith_section_expanded', /To ask someone for permission, advice, or information before doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'checkWith', /To ask someone for permission, advice, or information before doing something\./i, /You need to check with the project manager before changing the database structure\./i, renderPage, getCard);
