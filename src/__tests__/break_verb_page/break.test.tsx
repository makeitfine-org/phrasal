import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- against ---

describe('BreakVerbPage — "against" section definitions', () => {
  it('renders definition for crashing into something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To crash forcefully into something/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To crash forcefully into something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To crash forcefully into something/i)).toHaveAttribute(
      'title',
      'To crash forcefully into something.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'breakAgainst_section_expanded', /To crash forcefully into something/i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'breakAgainst', /To crash forcefully into something/i, /We sat and watched the waves break against/i, renderPage, getCard);

// --- apart ---

describe('BreakVerbPage — "apart" section definitions', () => {
  it('renders definition for separating into pieces violently', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or shatter into pieces \(often violently\)/i)).toBeInTheDocument();
  });

  it('renders definition for destroying a relationship or organization', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To destroy a relationship, organization, or group/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or shatter into pieces \(often violently\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To destroy a relationship, organization, or group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate or shatter into pieces \(often violently\)/i)).toHaveAttribute(
      'title',
      'To separate or shatter into pieces (often violently).'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'breakApart_section_expanded', /To separate or shatter into pieces \(often violently\)/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'breakApart', /To separate or shatter into pieces \(often violently\)/i, /The space shuttle broke apart/i, renderPage, getCard);

// --- away ---

describe('BreakVerbPage — "away" section definitions', () => {
  it('renders definition for physically escaping someone', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To physically escape from someone who is holding you/i)).toBeInTheDocument();
  });

  it('renders definition for separating from a group in a race', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To separate from a group, crowd, or pack/i)).toBeInTheDocument();
  });

  it('renders definition for leaving a political party or organization', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To leave a political party, country, or organization to form a new one/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To physically escape from someone who is holding you/i)).toHaveClass('truncate');
    expect(screen.getByText(/To separate from a group, crowd, or pack/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave a political party, country, or organization to form a new one/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To physically escape from someone who is holding you/i)).toHaveAttribute(
      'title',
      'To physically escape from someone who is holding you.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'breakAway_section_expanded', /To physically escape from someone who is holding you/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'breakAway', /To physically escape from someone who is holding you/i, /He grabbed her arm, but she managed to break away/i, renderPage, getCard);

// --- back ---

describe('BreakVerbPage — "back" section definitions', () => {
  it('renders definition for regaining a lost advantage in sports', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To regain a lost advantage \(specifically in sports like tennis\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To regain a lost advantage \(specifically in sports like tennis\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To regain a lost advantage \(specifically in sports like tennis\)/i)).toHaveAttribute(
      'title',
      'To regain a lost advantage (specifically in sports like tennis).'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'breakBack_section_expanded', /To regain a lost advantage \(specifically in sports like tennis\)/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'breakBack', /To regain a lost advantage \(specifically in sports like tennis\)/i, /He lost his serve in the first set/i, renderPage, getCard);

// --- down ---

describe('BreakVerbPage — "down" section definitions', () => {
  it('renders definition for machinery stopping working', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(machinery or vehicles\)/i)).toBeInTheDocument();
  });

  it('renders definition for losing control of emotions', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose control of one's emotions and start crying/i)).toBeInTheDocument();
  });

  it('renders definition for negotiations failing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fail or collapse \(negotiations, systems, or relationships\)/i)).toBeInTheDocument();
  });

  it('renders definition for dividing information for analysis', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To divide information into smaller parts for easier analysis/i)).toBeInTheDocument();
  });

  it('renders definition for destroying a barrier', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy or remove a barrier or obstacle/i)).toBeInTheDocument();
  });

  it('renders definition for decomposing chemically', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decompose or separate into basic chemical elements/i)).toBeInTheDocument();
  });

  it('all 6 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(machinery or vehicles\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To lose control of one's emotions and start crying/i)).toHaveClass('truncate');
    expect(screen.getByText(/To fail or collapse \(negotiations, systems, or relationships\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To divide information into smaller parts for easier analysis/i)).toHaveClass('truncate');
    expect(screen.getByText(/To destroy or remove a barrier or obstacle/i)).toHaveClass('truncate');
    expect(screen.getByText(/To decompose or separate into basic chemical elements/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(machinery or vehicles\)/i)).toHaveAttribute(
      'title',
      'To stop working (machinery or vehicles).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'breakDown_section_expanded', /To stop working \(machinery or vehicles\)/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'breakDown', /To stop working \(machinery or vehicles\)/i, /My car broke down on the highway/i, renderPage, getCard);

// --- for ---

describe('BreakVerbPage — "for" section definitions', () => {
  it('renders definition for running toward safety or cover', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suddenly run toward something \(usually safety or cover\)/i)).toBeInTheDocument();
  });

  it('renders definition for pausing an activity', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To pause an activity for a short period/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suddenly run toward something \(usually safety or cover\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To pause an activity for a short period/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To suddenly run toward something \(usually safety or cover\)/i)).toHaveAttribute(
      'title',
      'To suddenly run toward something (usually safety or cover).'
    );
  });
});

describeSectionToggle(LABEL, 'for', 'breakFor_section_expanded', /To suddenly run toward something \(usually safety or cover\)/i, renderPage);

describeChevronAndColour(LABEL, 'for', renderPage);

describeDefaultImageCards(LABEL, 'for', 'breakFor', /To suddenly run toward something \(usually safety or cover\)/i, /When the rain started pouring, we broke for the trees/i, renderPage, getCard);

// --- in ---

describe('BreakVerbPage — "in" section definitions', () => {
  it('renders definition for entering a building illegally', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a building by force or illegally \(intransitive\)/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting a conversation', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To interrupt a conversation/i)).toBeInTheDocument();
  });

  it('renders definition for wearing in new shoes', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To wear new shoes or use new equipment until they become comfortable/i)).toBeInTheDocument();
  });

  it('renders definition for training a new employee or animal', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To train a new employee, or to train an animal/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a building by force or illegally \(intransitive\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt a conversation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To wear new shoes or use new equipment until they become comfortable/i)).toHaveClass('truncate');
    expect(screen.getByText(/To train a new employee, or to train an animal/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a building by force or illegally \(intransitive\)/i)).toHaveAttribute(
      'title',
      'To enter a building by force or illegally (intransitive).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'breakIn_section_expanded', /To enter a building by force or illegally \(intransitive\)/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'breakIn', /To enter a building by force or illegally \(intransitive\)/i, /Thieves broke in while we were away/i, renderPage, getCard);

// --- into ---

describe('BreakVerbPage — "into" section definitions', () => {
  it('renders definition for entering a building by force transitive', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a building by force \(transitive/i)).toBeInTheDocument();
  });

  it('renders definition for suddenly beginning an action', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To suddenly begin doing something/i)).toBeInTheDocument();
  });

  it('renders definition for entering a new profession or market', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To successfully enter a new profession, industry, or market/i)).toBeInTheDocument();
  });

  it('renders definition for opening something by force', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To open something by force or use emergency supplies\/funds/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a building by force \(transitive/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly begin doing something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To successfully enter a new profession, industry, or market/i)).toHaveClass('truncate');
    expect(screen.getByText(/To open something by force or use emergency supplies\/funds/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a building by force \(transitive/i)).toHaveAttribute(
      'title',
      'To enter a building by force (transitive — requires an object).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'breakInto_section_expanded', /To enter a building by force \(transitive/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'breakInto', /To enter a building by force \(transitive/i, /Someone broke into my apartment/i, renderPage, getCard);

// --- off ---

describe('BreakVerbPage — "off" section definitions', () => {
  it('renders definition for removing a part by force', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a part of something \(by force or snapping\)/i)).toBeInTheDocument();
  });

  it('renders definition for suddenly stopping speaking', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To suddenly stop speaking or doing something/i)).toBeInTheDocument();
  });

  it('renders definition for ending a relationship or agreement', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To end a relationship, agreement, or negotiation/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a part of something \(by force or snapping\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly stop speaking or doing something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end a relationship, agreement, or negotiation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a part of something \(by force or snapping\)/i)).toHaveAttribute(
      'title',
      'To remove a part of something (by force or snapping).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'breakOff_section_expanded', /To remove a part of something \(by force or snapping\)/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'breakOff', /To remove a part of something \(by force or snapping\)/i, /He broke off a square of chocolate/i, renderPage, getCard);

// --- out ---

describe('BreakVerbPage — "out" section definitions', () => {
  it('renders definition for starting suddenly', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start suddenly \(war, fire, disease, riots\)/i)).toBeInTheDocument();
  });

  it('renders definition for escaping from a place', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To escape from a place \(like a prison\)/i)).toBeInTheDocument();
  });

  it('renders definition for developing a skin condition', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To develop a skin condition/i)).toBeInTheDocument();
  });

  it('renders definition for bringing something out to celebrate', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To bring something out to use or celebrate with/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start suddenly \(war, fire, disease, riots\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To escape from a place \(like a prison\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To develop a skin condition/i)).toHaveClass('truncate');
    expect(screen.getByText(/To bring something out to use or celebrate with/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To start suddenly \(war, fire, disease, riots\)/i)).toHaveAttribute(
      'title',
      'To start suddenly (war, fire, disease, riots).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'breakOut_section_expanded', /To start suddenly \(war, fire, disease, riots\)/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'breakOut', /To start suddenly \(war, fire, disease, riots\)/i, /World War II broke out in 1939/i, renderPage, getCard);

// --- over ---

describe('BreakVerbPage — "over" section definitions', () => {
  it('renders definition for waves washing over something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To wash or burst over something \(like waves\)/i)).toBeInTheDocument();
  });

  it('renders definition for weather happening suddenly in a location', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To happen suddenly and intensely in a specific location/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To wash or burst over something \(like waves\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To happen suddenly and intensely in a specific location/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To wash or burst over something \(like waves\)/i)).toHaveAttribute(
      'title',
      'To wash or burst over something (like waves).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'breakOver_section_expanded', /To wash or burst over something \(like waves\)/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'breakOver', /To wash or burst over something \(like waves\)/i, /The massive wave broke over the bow/i, renderPage, getCard);

// --- through ---

describe('BreakVerbPage — "through" section definitions', () => {
  it('renders definition for forcing a way through an obstacle', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To force a way through an obstacle, barrier, or defense/i)).toBeInTheDocument();
  });

  it('renders definition for making a significant discovery', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To make a significant discovery or overcome a major limitation/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To force a way through an obstacle, barrier, or defense/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make a significant discovery or overcome a major limitation/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To force a way through an obstacle, barrier, or defense/i)).toHaveAttribute(
      'title',
      'To force a way through an obstacle, barrier, or defense.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'breakThrough_section_expanded', /To force a way through an obstacle, barrier, or defense/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'breakThrough', /To force a way through an obstacle, barrier, or defense/i, /The sun finally broke through the heavy clouds/i, renderPage, getCard);

// --- to ---

describe('BreakVerbPage — "to" section definitions', () => {
  it('renders definition for gently telling someone bad news', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To tell someone bad or surprising news gently/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To tell someone bad or surprising news gently/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To tell someone bad or surprising news gently/i)).toHaveAttribute(
      'title',
      'To tell someone bad or surprising news gently (used as "break it to" or "break the news to").'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'breakTo_section_expanded', /To tell someone bad or surprising news gently/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'breakTo', /To tell someone bad or surprising news gently/i, /I hate to break it to you/i, renderPage, getCard);

// --- up ---

describe('BreakVerbPage — "up" section definitions', () => {
  it('renders definition for separating into smaller pieces', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To separate into smaller pieces/i)).toBeInTheDocument();
  });

  it('renders definition for ending a romantic relationship', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a romantic relationship or marriage/i)).toBeInTheDocument();
  });

  it('renders definition for dispersing a crowd or stopping a fight', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To force a crowd to disperse or to stop a fight/i)).toBeInTheDocument();
  });

  it('renders definition for dividing into smaller manageable parts', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To divide something into smaller, manageable parts/i)).toBeInTheDocument();
  });

  it('renders definition for losing audio signal', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lose audio signal \(telecommunications\)/i)).toBeInTheDocument();
  });

  it('renders definition for ending the school term', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end the school term for holidays/i)).toBeInTheDocument();
  });

  it('renders definition for bursting into laughter', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To burst into laughter, or make someone else laugh/i)).toBeInTheDocument();
  });

  it('all 7 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To separate into smaller pieces/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end a romantic relationship or marriage/i)).toHaveClass('truncate');
    expect(screen.getByText(/To force a crowd to disperse or to stop a fight/i)).toHaveClass('truncate');
    expect(screen.getByText(/To divide something into smaller, manageable parts/i)).toHaveClass('truncate');
    expect(screen.getByText(/To lose audio signal \(telecommunications\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end the school term for holidays/i)).toHaveClass('truncate');
    expect(screen.getByText(/To burst into laughter, or make someone else laugh/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To separate into smaller pieces/i)).toHaveAttribute(
      'title',
      'To separate into smaller pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'breakUp_section_expanded', /To separate into smaller pieces/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'breakUp', /To separate into smaller pieces/i, /The ship broke up on the rocks/i, renderPage, getCard);

// --- with ---

describe('BreakVerbPage — "with" section definitions', () => {
  it('renders definition for stopping following a tradition', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stop following a tradition, habit, or custom/i)).toBeInTheDocument();
  });

  it('renders definition for ending a relationship with a person or group', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To end a relationship or association with a person or group/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stop following a tradition, habit, or custom/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end a relationship or association with a person or group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To stop following a tradition, habit, or custom/i)).toHaveAttribute(
      'title',
      'To stop following a tradition, habit, or custom.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'breakWith_section_expanded', /To stop following a tradition, habit, or custom/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'breakWith', /To stop following a tradition, habit, or custom/i, /The designer broke with tradition/i, renderPage, getCard);
