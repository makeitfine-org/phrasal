import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- away ---

describe('PayVerbPage — "away" section definitions', () => {
  it('renders definition for letting a rope slide through hands', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/Similar to "pay out," meaning to let a rope slide through your hands/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/Similar to "pay out," meaning to let a rope slide through your hands/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/Similar to "pay out," meaning to let a rope slide through your hands/i)).toHaveAttribute(
      'title',
      'Similar to "pay out," meaning to let a rope slide through your hands (nautical/rare).'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'payAway_section_expanded', /Similar to "pay out," meaning to let a rope slide through your hands/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'payAway', /Similar to "pay out," meaning to let a rope slide through your hands/i, /He paid away the line as the anchor dropped\./i, renderPage, getCard);

// --- back ---

describe('PayVerbPage — "back" section definitions', () => {
  it('renders definition for returning money loaned', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return money to someone who loaned it to you/i)).toBeInTheDocument();
  });

  it('renders definition for revenge', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To do something bad to someone because they did something bad to you/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return money to someone who loaned it to you/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return money to someone who loaned it to you/i)).toHaveAttribute(
      'title',
      'To return money to someone who loaned it to you.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'payBack_section_expanded', /To return money to someone who loaned it to you/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'payBack', /To return money to someone who loaned it to you/i, /If you lend me \$20 for lunch, I will pay you back tomorrow\./i, renderPage, getCard);

// --- down ---

describe('PayVerbPage — "down" section definitions', () => {
  it('renders definition for reducing total debt by paying a portion', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the total amount of a debt by paying a portion of it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the total amount of a debt by paying a portion of it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the total amount of a debt by paying a portion of it/i)).toHaveAttribute(
      'title',
      'To reduce the total amount of a debt by paying a portion of it.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'payDown_section_expanded', /To reduce the total amount of a debt by paying a portion of it/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'payDown', /To reduce the total amount of a debt by paying a portion of it/i, /The management team decided to pay down the company's debt before investing in new projects\./i, renderPage, getCard);

// --- for ---

describe('PayVerbPage — "for" section definitions', () => {
  it('renders definition for giving money in exchange for goods or services', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To give money in exchange for goods or services/i)).toBeInTheDocument();
  });

  it('renders definition for suffering negative results of a mistake', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suffer the negative results of a mistake or bad decision/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To give money in exchange for goods or services/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To give money in exchange for goods or services/i)).toHaveAttribute(
      'title',
      'To give money in exchange for goods or services.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'payFor_section_expanded', /To give money in exchange for goods or services/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'payFor', /To give money in exchange for goods or services/i, /The company will pay for your travel expenses\./i, renderPage, getCard);

// --- forward ---

describe('PayVerbPage — "forward" section definitions', () => {
  it('renders definition for responding to kindness with a good deed for someone else', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To respond to someone's kindness or help by doing a good deed for someone else/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To respond to someone's kindness or help by doing a good deed for someone else/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To respond to someone's kindness or help by doing a good deed for someone else/i)).toHaveAttribute(
      'title',
      "To respond to someone's kindness or help by doing a good deed for someone else, rather than returning the favor to the original person."
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'payForward_section_expanded', /To respond to someone's kindness or help by doing a good deed for someone else/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'payForward', /To respond to someone's kindness or help by doing a good deed for someone else/i, /My mentor helped me start my career, so I try to pay it forward by mentoring junior developers\./i, renderPage, getCard);

// --- in_into ---

describe('PayVerbPage — "in / into" section definitions', () => {
  it('renders definition for putting money into a bank account', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put money into a bank account, pension, or fund/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put money into a bank account, pension, or fund/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To put money into a bank account, pension, or fund/i)).toHaveAttribute(
      'title',
      'To put money into a bank account, pension, or fund.'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'payIn_section_expanded', /To put money into a bank account, pension, or fund/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'payIn', /To put money into a bank account, pension, or fund/i, /I need to go to the bank to pay in these checks\./i, renderPage, getCard);

// --- off ---

describe('PayVerbPage — "off" section definitions', () => {
  it('renders definition for completely paying back a debt', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To completely pay back a debt/i)).toBeInTheDocument();
  });

  it('renders definition for resulting in success after hard work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To result in success or yield good results after hard work or investment/i)).toBeInTheDocument();
  });

  it('renders definition for bribing someone', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To bribe someone so they keep quiet or do not cause trouble/i)).toBeInTheDocument();
  });

  it('renders definition for dismissing workers with final wages', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To dismiss workers and give them their final wages/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To completely pay back a debt/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To completely pay back a debt/i)).toHaveAttribute(
      'title',
      'To completely pay back a debt.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'payOff_section_expanded', /To completely pay back a debt/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'payOff', /To completely pay back a debt/i, /After five years, the company finally paid off its bank loan\./i, renderPage, getCard);

// --- out ---

describe('PayVerbPage — "out" section definitions', () => {
  it('renders definition for disbursing a large amount of money', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To disburse or spend a large amount of money/i)).toBeInTheDocument();
  });

  it('renders definition for slowly releasing a rope', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To slowly release or let out a rope/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To disburse or spend a large amount of money/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To disburse or spend a large amount of money/i)).toHaveAttribute(
      'title',
      'To disburse or spend a large amount of money, often from a fund, insurance, or company profit (like dividends).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'payOut_section_expanded', /To disburse or spend a large amount of money/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'payOut', /To disburse or spend a large amount of money/i, /The insurance policy paid out \$50,000 after the office roof leaked\./i, renderPage, getCard);

// --- over ---

describe('PayVerbPage — "over" section definitions', () => {
  it('renders definition for transferring money to someone in authority', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer money to someone in authority or to a third party/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer money to someone in authority or to a third party/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer money to someone in authority or to a third party/i)).toHaveAttribute(
      'title',
      'To transfer money to someone in authority or to a third party.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'payOver_section_expanded', /To transfer money to someone in authority or to a third party/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'payOver', /To transfer money to someone in authority or to a third party/i, /The business is required to pay over all collected taxes to the government at the end of the quarter\./i, renderPage, getCard);

// --- up ---

describe('PayVerbPage — "up" section definitions', () => {
  it('renders definition for giving money you owe when forced to', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To give someone the money you owe them, especially when you do not want to/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To give someone the money you owe them, especially when you do not want to/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To give someone the money you owe them, especially when you do not want to/i)).toHaveAttribute(
      'title',
      'To give someone the money you owe them, especially when you do not want to or when you are forced to do it.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'payUp_section_expanded', /To give someone the money you owe them, especially when you do not want to/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'payUp', /To give someone the money you owe them, especially when you do not want to/i, /The supplier threatened legal action until the client finally paid up\./i, renderPage, getCard);
