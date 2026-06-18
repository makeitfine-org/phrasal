import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describe('KeepVerbPage — "about / around / round" section definitions', () => {
  it('renders definition for keeping something near because it might be useful', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something near you because it might be useful\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to associate with someone', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To continue to associate with someone or let them stay in a group or company\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something near you because it might be useful\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/To keep something near you because it might be useful\./i)).toHaveAttribute(
      'title',
      'To keep something near you because it might be useful.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around / round', 'keepAbout_section_expanded', /To keep something near you because it might be useful\./i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describeDefaultImageCards(LABEL, 'about / around / round', 'keepAbout', /To keep something near you because it might be useful\./i, /I always keep a pen around just in case I need to take notes\./i, renderPage, getCard);

// --- across ---

describe('KeepVerbPage — "across" section definitions', () => {
  it('renders definition for staying informed about a situation', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To stay informed about a situation or topic/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To stay informed about a situation or topic/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To stay informed about a situation or topic/i)).toHaveAttribute(
      'title',
      'To stay informed about a situation or topic (mainly British English).'
    );
  });
});

describeSectionToggle(LABEL, 'across', 'keepAcross_section_expanded', /To stay informed about a situation or topic/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describeDefaultImageCards(LABEL, 'across', 'keepAcross', /To stay informed about a situation or topic/i, /As a project manager, I need to keep across all the software updates\./i, renderPage, getCard);

// --- after ---

describe('KeepVerbPage — "after" section definitions', () => {
  it('renders definition for repeatedly reminding someone to do something', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To repeatedly remind or nag someone to do something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To repeatedly remind or nag someone to do something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To repeatedly remind or nag someone to do something/i)).toHaveAttribute(
      'title',
      'To repeatedly remind or nag someone to do something (mainly US English).'
    );
  });
});

describeSectionToggle(LABEL, 'after', 'keepAfter_section_expanded', /To repeatedly remind or nag someone to do something/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describeDefaultImageCards(LABEL, 'after', 'keepAfter', /To repeatedly remind or nag someone to do something/i, /I have to keep after my team to submit their timesheets on Friday\./i, renderPage, getCard);

// --- ahead ---

describe('KeepVerbPage — "ahead" section definitions', () => {
  it('renders definition for staying in front of competitors', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To stay in front of others or stay more advanced than competitors\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To stay in front of others or stay more advanced than competitors\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To stay in front of others or stay more advanced than competitors\./i)).toHaveAttribute(
      'title',
      'To stay in front of others or stay more advanced than competitors.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'keepAhead_section_expanded', /To stay in front of others or stay more advanced than competitors\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'keepAhead', /To stay in front of others or stay more advanced than competitors\./i, /To succeed in business, you must innovate to keep ahead of your rivals\./i, renderPage, getCard);

// --- apart ---

describe('KeepVerbPage — "apart" section definitions', () => {
  it('renders definition for preventing people from coming together', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To prevent people, animals, or things from coming together\./i)).toBeInTheDocument();
  });

  it('renders definition for staying away from each other', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To stay away from each other\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To prevent people, animals, or things from coming together\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To prevent people, animals, or things from coming together\./i)).toHaveAttribute(
      'title',
      'To prevent people, animals, or things from coming together.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'keepApart_section_expanded', /To prevent people, animals, or things from coming together\./i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'keepApart', /To prevent people, animals, or things from coming together\./i, /The two dogs were fighting, so we had to keep them apart\./i, renderPage, getCard);

// --- away ---

describe('KeepVerbPage — "away" section definitions', () => {
  it('renders definition for avoiding going near something', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To avoid going near something or someone\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing someone from going near', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To prevent someone or something from going near\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To avoid going near something or someone\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To avoid going near something or someone\./i)).toHaveAttribute(
      'title',
      'To avoid going near something or someone.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'keepAway_section_expanded', /To avoid going near something or someone\./i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'keepAway', /To avoid going near something or someone\./i, /You should keep away from that dog; it looks aggressive\./i, renderPage, getCard);

// --- back ---

describe('KeepVerbPage — "back" section definitions', () => {
  it('renders definition for staying at a safe distance', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stay at a safe distance, or make someone stay back\./i)).toBeInTheDocument();
  });

  it('renders definition for hiding information', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To hide information; to not tell someone everything you know\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping yourself from showing an emotion', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stop yourself from showing an emotion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stay at a safe distance, or make someone stay back\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To stay at a safe distance, or make someone stay back\./i)).toHaveAttribute(
      'title',
      'To stay at a safe distance, or make someone stay back.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'keepBack_section_expanded', /To stay at a safe distance, or make someone stay back\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'keepBack', /To stay at a safe distance, or make someone stay back\./i, /The police told the crowd to keep back from the accident\./i, renderPage, getCard);

// --- behind ---

describe('KeepVerbPage — "behind" section definitions', () => {
  it('renders definition for staying in a place after everyone else has left', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after everyone else has left\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone stay after others have left', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To make someone stay after others have left\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after everyone else has left\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/To stay in a place after everyone else has left\./i)).toHaveAttribute(
      'title',
      'To stay in a place after everyone else has left.'
    );
  });
});

describeSectionToggle(LABEL, 'behind', 'keepBehind_section_expanded', /To stay in a place after everyone else has left\./i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describeDefaultImageCards(LABEL, 'behind', 'keepBehind', /To stay in a place after everyone else has left\./i, /I kept behind after the meeting to ask the speaker a question\./i, renderPage, getCard);

// --- down ---

describe('KeepVerbPage — "down" section definitions', () => {
  it('renders definition for stopping something from increasing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop the number, level, or size of something from increasing\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping food in your stomach', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep food or medicine in your stomach without vomiting\./i)).toBeInTheDocument();
  });

  it('renders definition for staying hidden', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stay hidden by crouching or lying flat\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing people from having power', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To prevent a person or group of people from having power or freedom\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop the number, level, or size of something from increasing\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop the number, level, or size of something from increasing\./i)).toHaveAttribute(
      'title',
      'To stop the number, level, or size of something from increasing.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'keepDown_section_expanded', /To stop the number, level, or size of something from increasing\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'keepDown', /To stop the number, level, or size of something from increasing\./i, /We need to keep our expenses down this quarter\./i, renderPage, getCard);

// --- in ---

describe('KeepVerbPage — "in" section definitions', () => {
  it('renders definition for making someone stay inside as punishment', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone stay inside as a punishment\./i)).toBeInTheDocument();
  });

  it('renders definition for controlling an emotion', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To control or hide an emotion\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing a fire from dying out', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To prevent a fire from dying out\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone stay inside as a punishment\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To make someone stay inside as a punishment\./i)).toHaveAttribute(
      'title',
      'To make someone stay inside as a punishment.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'keepIn_section_expanded', /To make someone stay inside as a punishment\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'keepIn', /To make someone stay inside as a punishment\./i, /The teacher kept him in after school because he didn't do his homework\./i, renderPage, getCard);

// --- off ---

describe('KeepVerbPage — "off" section definitions', () => {
  it('renders definition for avoiding touching or walking on something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid touching or walking on something\./i)).toBeInTheDocument();
  });

  it('renders definition for avoiding discussing a topic', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid mentioning or discussing a specific topic\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing something from touching something else', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To prevent something from touching or harming something else\./i)).toBeInTheDocument();
  });

  it('renders definition for avoiding eating or drinking something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid eating, drinking, or using something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid touching or walking on something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To avoid touching or walking on something\./i)).toHaveAttribute(
      'title',
      'To avoid touching or walking on something.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'keepOff_section_expanded', /To avoid touching or walking on something\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'keepOff', /To avoid touching or walking on something\./i, /Please keep off the grass while the park is being maintained\./i, renderPage, getCard);

// --- on ---

describe('KeepVerbPage — "on" section definitions', () => {
  it('renders definition for continuing doing something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue doing something\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing to employ someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue to employ someone\./i)).toBeInTheDocument();
  });

  it('renders definition for leaving clothing on', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To leave a piece of clothing on your body\./i)).toBeInTheDocument();
  });

  it('renders definition for repeatedly reminding or complaining to someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To repeatedly remind or complain to someone\./i)).toBeInTheDocument();
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

describeSectionToggle(LABEL, 'on', 'keepOn_section_expanded', /To continue doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'keepOn', /To continue doing something\./i, /Even though the project was difficult, the team kept on working\./i, renderPage, getCard);

// --- out ---

describe('KeepVerbPage — "out" section definitions', () => {
  it('renders definition for not entering a place', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not enter a place, or to stop someone or something from entering\./i)).toBeInTheDocument();
  });

  it('renders definition for staying away from a problem or argument', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To stay away from a problem, argument, or situation\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not enter a place, or to stop someone or something from entering\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To not enter a place, or to stop someone or something from entering\./i)).toHaveAttribute(
      'title',
      'To not enter a place, or to stop someone or something from entering.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'keepOut_section_expanded', /To not enter a place, or to stop someone or something from entering\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'keepOut', /To not enter a place, or to stop someone or something from entering\./i, /There is a sign on the door that says 'Danger: Keep Out\.'/i, renderPage, getCard);

// --- to ---

describe('KeepVerbPage — "to" section definitions', () => {
  it('renders definition for following a plan or agreement', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To follow a plan, rule, or agreement\./i)).toBeInTheDocument();
  });

  it('renders definition for limiting something to a certain amount', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To limit something to a certain amount\./i)).toBeInTheDocument();
  });

  it('renders definition for staying on a path', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To stay on a particular path or road\./i)).toBeInTheDocument();
  });

  it('renders definition for avoiding talking to other people', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To avoid talking to other people; to stay private\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To follow a plan, rule, or agreement\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To follow a plan, rule, or agreement\./i)).toHaveAttribute(
      'title',
      'To follow a plan, rule, or agreement.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'keepTo_section_expanded', /To follow a plan, rule, or agreement\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'keepTo', /To follow a plan, rule, or agreement\./i, /We have a tight deadline, so let's keep to the schedule\./i, renderPage, getCard);

// --- together ---

describe('KeepVerbPage — "together" section definitions', () => {
  it('renders definition for staying in a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To stay in a group and not separate\./i)).toBeInTheDocument();
  });

  it('renders definition for not breaking apart', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To not break apart or fall to pieces\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To stay in a group and not separate\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To stay in a group and not separate\./i)).toHaveAttribute(
      'title',
      'To stay in a group and not separate.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'keepTogether_section_expanded', /To stay in a group and not separate\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'keepTogether', /To stay in a group and not separate\./i, /We need to keep together so we don't get lost in the city\./i, renderPage, getCard);

// --- up ---

describe('KeepVerbPage — "up" section definitions', () => {
  it('renders definition for moving at the same speed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move at the same speed as someone or something else\./i)).toBeInTheDocument();
  });

  it('renders definition for continuing at a high level', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To continue doing something at a high level\./i)).toBeInTheDocument();
  });

  it('renders definition for staying awake', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To stay awake, or to prevent someone from sleeping\./i)).toBeInTheDocument();
  });

  it('renders definition for maintaining something in good condition', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To maintain something in good condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move at the same speed as someone or something else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move at the same speed as someone or something else\./i)).toHaveAttribute(
      'title',
      'To move at the same speed as someone or something else.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'keepUp_section_expanded', /To move at the same speed as someone or something else\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'keepUp', /To move at the same speed as someone or something else\./i, /The software industry changes so fast that it's hard to keep up\./i, renderPage, getCard);
