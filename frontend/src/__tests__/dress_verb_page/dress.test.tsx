import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'DressVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- back ---

describe('DressVerbPage — "back" section definitions', () => {
  it('renders definition for stepping backward to form a straight line', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To step backward in order to form a straight line/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To step backward in order to form a straight line/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To step backward in order to form a straight line/i)).toHaveAttribute(
      'title',
      'To step backward in order to form a straight line (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'dressBack_section_expanded', /To step backward in order to form a straight line/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'dressBack', /To step backward in order to form a straight line/i, /The front row had to dress back/i, renderPage, getCard);

// --- by ---

describe('DressVerbPage — "by" section definitions', () => {
  it('renders definition for using a reference point to form a straight line', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To use a specific person or point on one side as a guide to form a straight line/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To use a specific person or point on one side as a guide to form a straight line/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To use a specific person or point on one side as a guide to form a straight line/i)).toHaveAttribute(
      'title',
      'To use a specific person or point on one side as a guide to form a straight line (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'dressBy_section_expanded', /To use a specific person or point on one side as a guide to form a straight line/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'dressBy', /To use a specific person or point on one side as a guide to form a straight line/i, /The marching band had to dress by the right/i, renderPage, getCard);

// --- down ---

describe('DressVerbPage — "down" section definitions', () => {
  it('renders definition for wearing casual clothes', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wear clothes that are more informal or casual than what you usually wear\./i)).toBeInTheDocument();
  });

  it('renders definition for criticizing or scolding someone', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To strongly criticize or scold someone because they did something wrong\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wear clothes that are more informal or casual than what you usually wear\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To wear clothes that are more informal or casual than what you usually wear\./i)).toHaveAttribute(
      'title',
      'To wear clothes that are more informal or casual than what you usually wear.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'dressDown_section_expanded', /To wear clothes that are more informal or casual than what you usually wear\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'dressDown', /To wear clothes that are more informal or casual than what you usually wear\./i, /allows us to dress down on Fridays/i, renderPage, getCard);

// --- off ---

describe('DressVerbPage — "off" section definitions', () => {
  it('renders definition for using a reference point to form a straight line in a formation', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use a specific reference point to form a straight line in a formation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use a specific reference point to form a straight line in a formation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To use a specific reference point to form a straight line in a formation/i)).toHaveAttribute(
      'title',
      'To use a specific reference point to form a straight line in a formation (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'dressOff_section_expanded', /To use a specific reference point to form a straight line in a formation/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'dressOff', /To use a specific reference point to form a straight line in a formation/i, /The soldiers were ordered to dress off the right flank/i, renderPage, getCard);

// --- on ---

describe('DressVerbPage — "on" section definitions', () => {
  it('renders definition for using a point as a guide to align a formation', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a specific person or point directly as a guide to align a formation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a specific person or point directly as a guide to align a formation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To use a specific person or point directly as a guide to align a formation/i)).toHaveAttribute(
      'title',
      'To use a specific person or point directly as a guide to align a formation (military / marching context).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'dressOn_section_expanded', /To use a specific person or point directly as a guide to align a formation/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'dressOn', /To use a specific person or point directly as a guide to align a formation/i, /The captain ordered the soldiers to dress on the center guide/i, renderPage, getCard);

// --- out ---

describe('DressVerbPage — "out" section definitions', () => {
  it('renders definition for putting on a sports uniform', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put on a sports uniform or equipment to get ready to play in a game\./i)).toBeInTheDocument();
  });

  it("renders definition for preparing an animal's body", () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To clean and prepare an animal's body so the meat can be eaten or sold\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put on a sports uniform or equipment to get ready to play in a game\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To put on a sports uniform or equipment to get ready to play in a game\./i)).toHaveAttribute(
      'title',
      'To put on a sports uniform or equipment to get ready to play in a game.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'dressOut_section_expanded', /To put on a sports uniform or equipment to get ready to play in a game\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'dressOut', /To put on a sports uniform or equipment to get ready to play in a game\./i, /Only twenty players will dress out for the football game/i, renderPage, getCard);

// --- up ---

describe('DressVerbPage — "up" section definitions', () => {
  it('renders definition for wearing formal clothes for an event', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wear formal, elegant, or special clothes, usually for an event\./i)).toBeInTheDocument();
  });

  it('renders definition for putting on a costume', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To put on a costume to look like someone or something else\./i)).toBeInTheDocument();
  });

  it('renders definition for making something look more attractive', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To make something look more attractive, interesting, or better than it really is\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wear formal, elegant, or special clothes, usually for an event\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To wear formal, elegant, or special clothes, usually for an event\./i)).toHaveAttribute(
      'title',
      'To wear formal, elegant, or special clothes, usually for an event.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'dressUp_section_expanded', /To wear formal, elegant, or special clothes, usually for an event\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'dressUp', /To wear formal, elegant, or special clothes, usually for an event\./i, /we need to dress up/i, renderPage, getCard);
