import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'CarryVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('CarryVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for keeping something with you everywhere', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something with you everywhere you go/i)).toBeInTheDocument();
  });

  it('renders definition for holding onto a feeling', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To hold onto a feeling or emotion/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something with you everywhere you go/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something with you everywhere you go/i)).toHaveAttribute(
      'title',
      'To keep something with you everywhere you go (physical).'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'carryAbout_section_expanded', /To keep something with you everywhere you go/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'carryAbout', /To keep something with you everywhere you go/i, /carries around a notebook to write down new software ideas/i, renderPage, getCard);

// --- away ---

describe('CarryVerbPage — "away" section definitions', () => {
  it('renders definition for becoming too excited', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become too excited and lose control of your behavior/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become too excited and lose control of your behavior/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To become too excited and lose control of your behavior/i)).toHaveAttribute(
      'title',
      'To become too excited and lose control of your behavior (almost always used in the passive voice: "get/be carried away").'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'carryAway_section_expanded', /To become too excited and lose control of your behavior/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'carryAway', /To become too excited and lose control of your behavior/i, /got carried away with the new features/i, renderPage, getCard);

// --- back ---

describe('CarryVerbPage — "back" section definitions', () => {
  it('renders definition for bringing a past memory to mind', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To bring a past memory to mind/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To bring a past memory to mind/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To bring a past memory to mind/i)).toHaveAttribute(
      'title',
      'To bring a past memory to mind; to make someone remember a specific time.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'carryBack_section_expanded', /To bring a past memory to mind/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'carryBack', /To bring a past memory to mind/i, /carried the CEO back to his first year in business/i, renderPage, getCard);

// --- forward ---

describe('CarryVerbPage — "forward" section definitions', () => {
  it('renders definition for making a project progress', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To make a project or idea progress to the next stage\./i)).toBeInTheDocument();
  });

  it('renders definition for transferring a financial total', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To transfer a financial total or a specific benefit/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To make a project or idea progress to the next stage\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To make a project or idea progress to the next stage\./i)).toHaveAttribute(
      'title',
      'To make a project or idea progress to the next stage.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'carryForward_section_expanded', /To make a project or idea progress to the next stage\./i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'carryForward', /To make a project or idea progress to the next stage\./i, /carry this initiative forward/i, renderPage, getCard);

// --- off ---

describe('CarryVerbPage — "off" section definitions', () => {
  it('renders definition for succeeding in something difficult', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something difficult/i)).toBeInTheDocument();
  });

  it('renders definition for winning a prize', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To win a prize, competition, or award\./i)).toBeInTheDocument();
  });

  it('renders definition for causing death', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause death, usually due to a disease/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something difficult/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To succeed in doing something difficult/i)).toHaveAttribute(
      'title',
      'To succeed in doing something difficult, often when others did not expect you to.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'carryOff_section_expanded', /To succeed in doing something difficult/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'carryOff', /To succeed in doing something difficult/i, /carried it off perfectly/i, renderPage, getCard);

// --- on ---

describe('CarryVerbPage — "on" section definitions', () => {
  it('renders definition for continuing something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toBeInTheDocument();
  });

  it('renders definition for managing a business', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To manage, run, or take part in a business or activity\./i)).toBeInTheDocument();
  });

  it('renders definition for behaving in an uncontrolled way', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To behave in an uncontrolled, angry, or childish way\./i)).toBeInTheDocument();
  });

  it('renders definition for having a secret relationship', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To have a secret, often romantic or sexual, relationship\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toHaveAttribute(
      'title',
      'To continue doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'carryOn_section_expanded', /To continue doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'carryOn', /To continue doing something\./i, /carry on with your coding/i, renderPage, getCard);

// --- out ---

describe('CarryVerbPage — "out" section definitions', () => {
  it('renders definition for performing a task', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform, execute, or complete a task/i)).toBeInTheDocument();
  });

  it('renders definition for fulfilling a promise', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To fulfill a promise or a threat\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform, execute, or complete a task/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform, execute, or complete a task/i)).toHaveAttribute(
      'title',
      'To perform, execute, or complete a task, instruction, experiment, or plan.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'carryOut_section_expanded', /To perform, execute, or complete a task/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'carryOut', /To perform, execute, or complete a task/i, /carried out the system update over the weekend/i, renderPage, getCard);

// --- over ---

describe('CarryVerbPage — "over" section definitions', () => {
  it('renders definition for continuing to exist in a different situation', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To continue to exist in a different situation/i)).toBeInTheDocument();
  });

  it('renders definition for delaying something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To delay or postpone something to a later time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To continue to exist in a different situation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To continue to exist in a different situation/i)).toHaveAttribute(
      'title',
      'To continue to exist in a different situation, environment, or time.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'carryOver_section_expanded', /To continue to exist in a different situation/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'carryOver', /To continue to exist in a different situation/i, /carried over perfectly into his new role/i, renderPage, getCard);

// --- through ---

describe('CarryVerbPage — "through" section definitions', () => {
  it('renders definition for completing a task despite difficulties', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To complete a task successfully despite facing significant difficulties\./i)).toBeInTheDocument();
  });

  it('renders definition for helping someone survive a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone or something survive a difficult situation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To complete a task successfully despite facing significant difficulties\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To complete a task successfully despite facing significant difficulties\./i)).toHaveAttribute(
      'title',
      'To complete a task successfully despite facing significant difficulties.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'carryThrough_section_expanded', /To complete a task successfully despite facing significant difficulties\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'carryThrough', /To complete a task successfully despite facing significant difficulties\./i, /carried the software release through to a successful launch/i, renderPage, getCard);
