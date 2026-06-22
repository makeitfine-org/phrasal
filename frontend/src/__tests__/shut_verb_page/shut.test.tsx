import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'ShutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- away ---

describe('ShutVerbPage — "away" section definitions', () => {
  it('renders definition for isolating someone in a place', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To isolate someone or something in a place where they cannot be seen or disturbed\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To isolate someone or something in a place where they cannot be seen or disturbed\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To isolate someone or something in a place where they cannot be seen or disturbed\./i)).toHaveAttribute(
      'title',
      'To isolate someone or something in a place where they cannot be seen or disturbed.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'shutAway_section_expanded', /To isolate someone or something in a place where they cannot be seen or disturbed\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'shutAway', /To isolate someone or something in a place where they cannot be seen or disturbed\./i, /Before the exams, she shut herself away in the library for a week\./i, renderPage, getCard);

// --- down ---

describe('ShutVerbPage — "down" section definitions', () => {
  it('renders definition for turning off a computer or machine', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To turn off a computer, machine, or system completely\./i)).toBeInTheDocument();
  });

  it('renders definition for closing a business permanently', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To close a business or factory permanently or for a long time\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping an opponent from succeeding', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop an opponent from playing well or succeeding/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To turn off a computer, machine, or system completely\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To close a business or factory permanently or for a long time\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop an opponent from playing well or succeeding/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To turn off a computer, machine, or system completely\./i)).toHaveAttribute(
      'title',
      'To turn off a computer, machine, or system completely.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'shutDown_section_expanded', /To turn off a computer, machine, or system completely\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'shutDown', /To turn off a computer, machine, or system completely\./i, /Always remember to shut down your laptop before putting it in your bag\./i, renderPage, getCard);

// --- in ---

describe('ShutVerbPage — "in" section definitions', () => {
  it('renders definition for preventing someone from leaving', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent someone or an animal from leaving a room or building by closing the door\./i)).toBeInTheDocument();
  });

  it('renders definition for accidentally catching clothing in a door', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To accidentally catch a body part or clothing in a closing door\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent someone or an animal from leaving a room or building by closing the door\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To accidentally catch a body part or clothing in a closing door\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent someone or an animal from leaving a room or building by closing the door\./i)).toHaveAttribute(
      'title',
      'To prevent someone or an animal from leaving a room or building by closing the door.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'shutIn_section_expanded', /To prevent someone or an animal from leaving a room or building by closing the door\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'shutIn', /To prevent someone or an animal from leaving a room or building by closing the door\./i, /It's raining heavily, so the cat has been shut in all day\./i, renderPage, getCard);

// --- off ---

describe('ShutVerbPage — "off" section definitions', () => {
  it('renders definition for stopping the supply of something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop the supply of something \(like water, gas, or electricity\)\./i)).toBeInTheDocument();
  });

  it('renders definition for turning off a machine or engine', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To turn off a machine or engine\./i)).toBeInTheDocument();
  });

  it('renders definition for isolating or separating a place', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To isolate or separate a place from other areas\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop the supply of something \(like water, gas, or electricity\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To turn off a machine or engine\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To isolate or separate a place from other areas\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop the supply of something \(like water, gas, or electricity\)\./i)).toHaveAttribute(
      'title',
      'To stop the supply of something (like water, gas, or electricity).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'shutOff_section_expanded', /To stop the supply of something \(like water, gas, or electricity\)\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'shutOff', /To stop the supply of something \(like water, gas, or electricity\)\./i, /The plumber had to shut off the water before fixing the pipe\./i, renderPage, getCard);

// --- out ---

describe('ShutVerbPage — "out" section definitions', () => {
  it('renders definition for preventing something from entering', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent something from entering a place \(like light or noise\)\./i)).toBeInTheDocument();
  });

  it('renders definition for excluding someone from an activity', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exclude someone from an activity, or from your thoughts and feelings\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing an opposing team from scoring', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent an opposing team from scoring any points/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent something from entering a place \(like light or noise\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To exclude someone from an activity, or from your thoughts and feelings\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To prevent an opposing team from scoring any points/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent something from entering a place \(like light or noise\)\./i)).toHaveAttribute(
      'title',
      'To prevent something from entering a place (like light or noise).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'shutOut_section_expanded', /To prevent something from entering a place \(like light or noise\)\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'shutOut', /To prevent something from entering a place \(like light or noise\)\./i, /We use heavy curtains to shut out the street lights at night\./i, renderPage, getCard);

// --- up ---

describe('ShutVerbPage — "up" section definitions', () => {
  it('renders definition for stopping talking or making noise', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop talking or making a noise \(informal, considered rude\)\./i)).toBeInTheDocument();
  });

  it('renders definition for closing and locking a building', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To close and lock a building completely/i)).toBeInTheDocument();
  });

  it('renders definition for keeping someone securely in a place', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To keep someone or an animal securely in a room or place\./i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop talking or making a noise \(informal, considered rude\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To close and lock a building completely/i)).toHaveClass('truncate');
    expect(screen.getByText(/To keep someone or an animal securely in a room or place\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stop talking or making a noise \(informal, considered rude\)\./i)).toHaveAttribute(
      'title',
      'To stop talking or making a noise (informal, considered rude).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'shutUp_section_expanded', /To stop talking or making a noise \(informal, considered rude\)\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'shutUp', /To stop talking or making a noise \(informal, considered rude\)\./i, /I wish the dog next door would shut up; I'm trying to sleep\./i, renderPage, getCard);
