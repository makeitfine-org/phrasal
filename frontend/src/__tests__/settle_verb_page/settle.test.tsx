import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- back ---

describe('SettleVerbPage — "back" section definitions', () => {
  it('renders definition for relaxing into a comfortable position', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax into a comfortable physical position, usually leaning backward\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax into a comfortable physical position, usually leaning backward\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To relax into a comfortable physical position, usually leaning backward\./i)).toHaveAttribute(
      'title',
      'To relax into a comfortable physical position, usually leaning backward.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'settleBack_section_expanded', /To relax into a comfortable physical position, usually leaning backward\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'settleBack', /To relax into a comfortable physical position, usually leaning backward\./i, /After a very successful product launch, the CEO settled back in his chair with a smile\./i, renderPage, getCard);

// --- down ---

describe('SettleVerbPage — "down" section definitions', () => {
  it('renders definition for becoming quiet and relaxed', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To become quiet and relaxed after being excited, nervous, or angry\./i)).toBeInTheDocument();
  });

  it('renders definition for starting a quiet stable life', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To start living a quiet, stable life/i)).toBeInTheDocument();
  });

  it('renders definition for paying serious attention to a task', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To start paying serious attention to a task/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To become quiet and relaxed after being excited, nervous, or angry\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To become quiet and relaxed after being excited, nervous, or angry\./i)).toHaveAttribute(
      'title',
      'To become quiet and relaxed after being excited, nervous, or angry.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'settleDown_section_expanded', /To become quiet and relaxed after being excited, nervous, or angry\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'settleDown', /To become quiet and relaxed after being excited, nervous, or angry\./i, /The manager waited for the noisy room to settle down before starting her presentation\./i, renderPage, getCard);

// --- for ---

describe('SettleVerbPage — "for" section definitions', () => {
  it('renders definition for accepting something less than desired', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To accept something that is available, even though it is not exactly what you wanted or hoped for\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To accept something that is available, even though it is not exactly what you wanted or hoped for\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To accept something that is available, even though it is not exactly what you wanted or hoped for\./i)).toHaveAttribute(
      'title',
      'To accept something that is available, even though it is not exactly what you wanted or hoped for.'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'settleFor_section_expanded', /To accept something that is available, even though it is not exactly what you wanted or hoped for\./i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'settleFor', /To accept something that is available, even though it is not exactly what you wanted or hoped for\./i, /We wanted to hire a senior Java developer, but because of the budget, we had to settle for a mid-level programmer\./i, renderPage, getCard);

// --- in ---

describe('SettleVerbPage — "in" section definitions', () => {
  it('renders definition for becoming comfortable in a new environment', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become comfortable, relaxed, and familiar in a new home, environment, or job\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become comfortable, relaxed, and familiar in a new home, environment, or job\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To become comfortable, relaxed, and familiar in a new home, environment, or job\./i)).toHaveAttribute(
      'title',
      'To become comfortable, relaxed, and familiar in a new home, environment, or job.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'settleIn_section_expanded', /To become comfortable, relaxed, and familiar in a new home, environment, or job\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'settleIn', /To become comfortable, relaxed, and familiar in a new home, environment, or job\./i, /It takes about a month for a new employee to fully settle in and learn the company culture\./i, renderPage, getCard);

// --- into ---

describe('SettleVerbPage — "into" section definitions', () => {
  it('renders definition for getting used to a new role or situation', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get used to a new role, routine, or situation and become comfortable with it\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get used to a new role, routine, or situation and become comfortable with it\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To get used to a new role, routine, or situation and become comfortable with it\./i)).toHaveAttribute(
      'title',
      'To get used to a new role, routine, or situation and become comfortable with it.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'settleInto_section_expanded', /To get used to a new role, routine, or situation and become comfortable with it\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'settleInto', /To get used to a new role, routine, or situation and become comfortable with it\./i, /She quickly settled into her new position as the lead project manager\./i, renderPage, getCard);

// --- on ---

describe('SettleVerbPage — "on" section definitions', () => {
  it('renders definition for making a final decision', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make a final decision or choice after thinking about multiple options\./i)).toBeInTheDocument();
  });

  it('renders definition for landing on a surface', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To land or rest on a physical surface\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make a final decision or choice after thinking about multiple options\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To make a final decision or choice after thinking about multiple options\./i)).toHaveAttribute(
      'title',
      'To make a final decision or choice after thinking about multiple options.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'settleOn_section_expanded', /To make a final decision or choice after thinking about multiple options\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'settleOn', /To make a final decision or choice after thinking about multiple options\./i, /After reviewing several different programming languages, the development team settled on Java for the new project\./i, renderPage, getCard);

// --- out ---

describe('SettleVerbPage — "out" section definitions', () => {
  it('renders definition for reaching an agreement out of court', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reach an agreement without going through a full court trial/i)).toBeInTheDocument();
  });

  it('renders definition for sinking to the bottom of a liquid', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To sink to the bottom of a liquid\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reach an agreement without going through a full court trial/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To reach an agreement without going through a full court trial/i)).toHaveAttribute(
      'title',
      'To reach an agreement without going through a full court trial (often phrased as "settle out of court").'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'settleOut_section_expanded', /To reach an agreement without going through a full court trial/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'settleOut', /To reach an agreement without going through a full court trial/i, /The two companies decided to settle out of court to avoid a long and expensive legal battle\./i, renderPage, getCard);

// --- over ---

describe('SettleVerbPage — "over" section definitions', () => {
  it('renders definition for descending and covering something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To descend and cover something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To descend and cover something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To descend and cover something/i)).toHaveAttribute(
      'title',
      'To descend and cover something (often used to describe weather, a feeling, or a mood in a room).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'settleOver_section_expanded', /To descend and cover something/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'settleOver', /To descend and cover something/i, /A deep silence settled over the boardroom when the team saw the terrible financial results\./i, renderPage, getCard);

// --- to ---

describe('SettleVerbPage — "to" section definitions', () => {
  it('renders definition for beginning full attention to a task', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin giving your full attention and effort to a task/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin giving your full attention and effort to a task/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To begin giving your full attention and effort to a task/i)).toHaveAttribute(
      'title',
      'To begin giving your full attention and effort to a task (very similar to "settle down to").'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'settleTo_section_expanded', /To begin giving your full attention and effort to a task/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'settleTo', /To begin giving your full attention and effort to a task/i, /Once everyone had their coffee, the team settled to the task of fixing the software bugs\./i, renderPage, getCard);

// --- up ---

describe('SettleVerbPage — "up" section definitions', () => {
  it('renders definition for paying money owed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay money that you owe, usually to balance an account or share a bill\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay money that you owe, usually to balance an account or share a bill\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay money that you owe, usually to balance an account or share a bill\./i)).toHaveAttribute(
      'title',
      'To pay money that you owe, usually to balance an account or share a bill.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'settleUp_section_expanded', /To pay money that you owe, usually to balance an account or share a bill\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'settleUp', /To pay money that you owe, usually to balance an account or share a bill\./i, /I will pay for the client's lunch now, and we can settle up when we get back to the office\./i, renderPage, getCard);

// --- with ---

describe('SettleVerbPage — "with" section definitions', () => {
  it('renders definition for reaching a financial agreement', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To reach a financial agreement or pay a debt to a person or organization\./i)).toBeInTheDocument();
  });

  it('renders definition for punishing someone from the past', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To punish someone who has done something bad to you in the past\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To reach a financial agreement or pay a debt to a person or organization\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To reach a financial agreement or pay a debt to a person or organization\./i)).toHaveAttribute(
      'title',
      'To reach a financial agreement or pay a debt to a person or organization.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'settleWith_section_expanded', /To reach a financial agreement or pay a debt to a person or organization\./i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'settleWith', /To reach a financial agreement or pay a debt to a person or organization\./i, /The company finally settled with its suppliers after a long dispute over the late invoices\./i, renderPage, getCard);
