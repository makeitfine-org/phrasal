import { fireEvent, screen, within } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- about_around_round ---

describeSectionToggle(LABEL, 'about / around / round', 'putAboutAroundRound_section_expanded', /To spread a rumour or false story/i, renderPage);

describeChevronAndColour(LABEL, 'about / around / round', renderPage);

describe('PutVerbPage — "about / around / round" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('about / around / round');
    expect(screen.getByText(/"Someone is putting it about that the company is going bankrupt\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('about / around / round');
    fireEvent.click(getCard(/To spread a rumour or false story/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'about / around / round', 'putAboutAroundRound', /To spread a rumour or false story/i, /"Someone is putting it about/i, renderPage, getCard);

// --- across_over ---

describeSectionToggle(LABEL, 'across / over', 'putAcrossOver_section_expanded', /To explain an idea clearly so people understand it/i, renderPage);

describeChevronAndColour(LABEL, 'across / over', renderPage);

describe('PutVerbPage — "across / over" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('across / over');
    expect(screen.getByText(/"The CEO put his vision across very well during the meeting\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('across / over');
    fireEvent.click(getCard(/To explain an idea clearly so people understand it/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'across / over', 'putAcrossOver', /To explain an idea clearly so people understand it/i, /"The CEO put his vision across/i, renderPage, getCard);

// --- ahead ---

describeSectionToggle(LABEL, 'ahead', 'putAhead_section_expanded', /To give someone an advantage over others/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describe('PutVerbPage — "ahead" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"Learning Java will really put you ahead in the job market\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To give someone an advantage over others/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'ahead', 'putAhead', /To give someone an advantage over others/i, /"Learning Java will really put you ahead/i, renderPage, getCard);

// --- away ---

describeSectionToggle(LABEL, 'away', 'putAway_section_expanded', /To store things in their correct place/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describe('PutVerbPage — "away" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/"Please put away those files when you finish reading them\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"She puts away a portion of her salary every month for retirement\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The judge put him away for ten years for fraud\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He can really put away a lot of coffee during a coding session\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('away');
    fireEvent.click(getCard(/To store things in their correct place/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'away', 'putAway', /To store things in their correct place/i, /"Please put away those files/i, renderPage, getCard);

// --- back ---

describeSectionToggle(LABEL, 'back', 'putBack_section_expanded', /To return something to its original place/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describe('PutVerbPage — "back" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/"Please put the laptop back in the cabinet\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The product launch was put back to November\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We put the clocks back one hour in the autumn\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('back');
    fireEvent.click(getCard(/To return something to its original place/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'back', 'putBack', /To return something to its original place/i, /"Please put the laptop back/i, renderPage, getCard);

// --- behind ---

describeSectionToggle(LABEL, 'behind', 'putBehind_section_expanded', /To forget about a bad experience and move on/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describe('PutVerbPage — "behind" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/"We lost a big client, but we need to put it behind us/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('behind');
    fireEvent.click(getCard(/To forget about a bad experience and move on/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'behind', 'putBehind', /To forget about a bad experience and move on/i, /"We lost a big client, but we need to put it behind us/i, renderPage, getCard);

// --- by ---

describeSectionToggle(LABEL, 'by', 'putBy_section_expanded', /To save money for the future/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describe('PutVerbPage — "by" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/"I try to put by some money each month for a new computer\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('by');
    fireEvent.click(getCard(/To save money for the future/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'by', 'putBy', /To save money for the future/i, /"I try to put by some money/i, renderPage, getCard);

// --- down ---

describeSectionToggle(LABEL, 'down', 'putDown_section_expanded', /To write something down/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describe('PutVerbPage — "down" section definitions', () => {
  it('all 6 "down" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To write something down/i)).toHaveClass('truncate');
    expect(screen.getByText(/To criticize or humiliate someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To pay a deposit/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suppress a rebellion or protest by force/i)).toHaveClass('truncate');
    expect(screen.getByText(/To euthanize an animal/i)).toHaveClass('truncate');
    expect(screen.getByText(/To attribute a cause to something/i)).toHaveClass('truncate');
  });
});

describe('PutVerbPage — "down" card view', () => {
  it('all 6 examples visible without expanding cards', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/"Let me put down your contact details\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"A good leader never puts down their team members\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We put down a 10% deposit for the new office space\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The government quickly put down the protests\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The vet had to put down the sick dog\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I put the project's success down to excellent teamwork\."/i)).toBeInTheDocument();
  });

  it('no "down" card renders an image regardless of clicks', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To write something down/i));
    fireEvent.click(getCard(/To criticize or humiliate someone/i));
    fireEvent.click(getCard(/To pay a deposit/i));
    fireEvent.click(getCard(/To suppress a rebellion or protest by force/i));
    fireEvent.click(getCard(/To euthanize an animal/i));
    fireEvent.click(getCard(/To attribute a cause to something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'down', 'putDown', /To write something down/i, /"Let me put down your contact details/i, renderPage, getCard);

// --- forward ---

describeSectionToggle(LABEL, 'forward', 'putForward_section_expanded', /To suggest an idea, plan, or person for consideration/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describe('PutVerbPage — "forward" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/"The manager put forward a new agile framework for the team\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Don't forget to put your clocks forward in the spring\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('forward');
    fireEvent.click(getCard(/To suggest an idea, plan, or person for consideration/i));
    fireEvent.click(getCard(/To change a clock to a later time/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'forward', 'putForward', /To suggest an idea, plan, or person for consideration/i, /"The manager put forward a new agile/i, renderPage, getCard);

// --- general ---

describe('PutVerbPage — general', () => {
  it('renders "Put" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Put' })).toBeInTheDocument();
  });

  it('renders all 19 section particles', () => {
    renderPage();
    const particles = [
      'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away',
      'across / over', 'forward', 'back', 'by', 'together', 'with',
      'ahead', 'behind', 'through', 'about / around / round', 'to',
    ];
    for (const p of particles) {
      expect(screen.getByText(p)).toBeInTheDocument();
    }
  });

  it('all sections start collapsed', () => {
    renderPage();
    expect(screen.queryByText(/To delay or postpone something/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To dress oneself in clothing/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To build or erect something/i)).not.toBeInTheDocument();
  });

  it('shows correct badge counts when all sections expanded', () => {
    renderPage();
    const particles = [
      'off', 'on', 'up', 'down', 'in', 'into', 'out', 'away',
      'across / over', 'forward', 'back', 'by', 'together', 'with',
      'ahead', 'behind', 'through', 'about / around / round', 'to',
    ];
    for (const p of particles) {
      expandSection(p);
    }
    // badge "1" appears in every section (19 sections = 19)
    expect(screen.getAllByText('1').length).toBeGreaterThanOrEqual(19);
    // badge "5" in "on" (5 meanings) and "down" (6 meanings) sections
    expect(screen.getAllByText('5')).toHaveLength(2);
    // badge "6" only in "down" section
    expect(screen.getAllByText('6')).toHaveLength(1);
  });
});

// --- in ---

describeSectionToggle(LABEL, 'in', 'putIn_section_expanded', /To spend time or effort on something/i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describe('PutVerbPage — "in" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/"The development team put in 50 hours a week/i)).toBeInTheDocument();
    expect(screen.getByText(/"We are putting in a new server system today\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I put in a request for more holiday time\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I think we should test the code first," the junior developer put in\./i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To spend time or effort on something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'in', 'putIn', /To spend time or effort on something/i, /"The development team put in 50 hours/i, renderPage, getCard);

// --- into ---

describeSectionToggle(LABEL, 'into', 'putInto_section_expanded', /To invest time, money, or effort into a project/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describe('PutVerbPage — "into" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/"The company put a lot of money into research and development\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"It is hard to put this complex business strategy into simple words\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To invest time, money, or effort into a project/i));
    fireEvent.click(getCard(/To express something in words/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'into', 'putInto', /To invest time, money, or effort into a project/i, /"The company put a lot of money into/i, renderPage, getCard);

// --- off ---

describeSectionToggle(LABEL, 'off', 'putOff_section_expanded', /To delay or postpone something/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describe('PutVerbPage — "off" section definitions', () => {
  it('all 3 "off" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay or postpone something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone not want to do something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To distract someone/i)).toHaveClass('truncate');
  });
});

describe('PutVerbPage — "off" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/"We have to put off the sprint planning meeting until tomorrow\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The complex code architecture put me off learning Java at first\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Please be quiet; your talking is putting me off my work\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To delay or postpone something/i));
    fireEvent.click(getCard(/To make someone not want to do something/i));
    fireEvent.click(getCard(/To distract someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'off', 'putOff', /To delay or postpone something/i, /"We have to put off the sprint planning/i, renderPage, getCard);

// --- on ---

describeSectionToggle(LABEL, 'on', 'putOn_section_expanded', /To dress oneself in clothing/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describe('PutVerbPage — "on" card view', () => {
  it('all 5 examples visible without expanding cards', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/"I put on my suit for the management interview\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The company put on a great training event for new developers\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He put on three kilos during the holidays\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Could you put the projector on for the presentation\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"She isn't really angry; she's just putting it on\."/i)).toBeInTheDocument();
  });

  it('no "on" card renders an image regardless of clicks', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To dress oneself in clothing/i));
    fireEvent.click(getCard(/To organize a performance or event/i));
    fireEvent.click(getCard(/To gain weight/i));
    fireEvent.click(getCard(/To turn on a machine or appliance/i));
    fireEvent.click(getCard(/To pretend to have a feeling or attitude/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'on', 'putOn', /To dress oneself in clothing/i, /"I put on my suit/i, renderPage, getCard);

// --- out ---

describeSectionToggle(LABEL, 'out', 'putOut_section_expanded', /To extinguish a fire or a cigarette/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describe('PutVerbPage — "out" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"The fire alarm rang, but they quickly put out the small fire\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The team put out a new version of the app last night\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I hope it doesn't put you out if we move the meeting to 5 PM\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Don't forget to put out the recycling bins\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To extinguish a fire or a cigarette/i));
    fireEvent.click(getCard(/To publish or release something/i));
    fireEvent.click(getCard(/To inconvenience someone/i));
    fireEvent.click(getCard(/To place something outside/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'out', 'putOut', /To extinguish a fire or a cigarette/i, /"The fire alarm rang, but they quickly put out/i, renderPage, getCard);

// --- separators ---

describe('PutVerbPage — separators', () => {
  it('renders 18 hr separators', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    expect(hrs).toHaveLength(18);
  });

  it('all hr separators have border-gray-600 class', () => {
    const { container } = renderPage();
    const hrs = container.querySelectorAll('hr');
    hrs.forEach(hr => {
      expect(hr.className).toMatch(/border-gray-600/);
    });
  });
});

// --- through ---

describeSectionToggle(LABEL, 'through', 'putThrough_section_expanded', /To connect someone on the telephone/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describe('PutVerbPage — "through" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/"Please hold the line, I will put you through to the IT department\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The tough interview process really put the candidates through a lot of stress\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We finally managed to put the deal through\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('through');
    fireEvent.click(getCard(/To connect someone on the telephone/i));
    fireEvent.click(getCard(/To make someone experience something very difficult/i));
    fireEvent.click(getCard(/To successfully complete a business transaction or proposal/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'through', 'putThrough', /To connect someone on the telephone/i, /"Please hold the line, I will put you through/i, renderPage, getCard);

// --- to ---

describeSectionToggle(LABEL, 'to', 'putTo_section_expanded', /To suggest an idea or a question to someone directly/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describe('PutVerbPage — "to" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/"I put it to the board of directors, but they rejected the idea\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Moving the server room put us to a lot of trouble\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('to');
    fireEvent.click(getCard(/To suggest an idea or a question to someone directly/i));
    fireEvent.click(getCard(/To cause trouble or expense for someone/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'to', 'putTo', /To suggest an idea or a question to someone directly/i, /"I put it to the board of directors/i, renderPage, getCard);

// --- together ---

describeSectionToggle(LABEL, 'together', 'putTogether_section_expanded', /To assemble the parts of something/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describe('PutVerbPage — "together" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/"We need to put together the new office furniture\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The HR director put together an excellent leadership training program\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('together');
    fireEvent.click(getCard(/To assemble the parts of something/i));
    fireEvent.click(getCard(/To organize or create a group or plan/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'together', 'putTogether', /To assemble the parts of something/i, /"We need to put together the new office furniture/i, renderPage, getCard);

// --- up ---

describeSectionToggle(LABEL, 'up', 'putUp_section_expanded', /To build or erect something/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describe('PutVerbPage — "up" card view', () => {
  it('all examples visible without expanding cards', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/"They put up a new office building in Warsaw\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The software provider put up their subscription fees\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I can put you up at my apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/"The competitor put up a strong fight for the market share\."/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To build or erect something/i));
    fireEvent.click(getCard(/To increase prices or rates/i));
    fireEvent.click(getCard(/To provide accommodation for someone/i));
    fireEvent.click(getCard(/To offer resistance or fight back/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'up', 'putUp', /To build or erect something/i, /"They put up a new office building/i, renderPage, getCard);

// --- with ---

describeSectionToggle(LABEL, 'with', 'putWith_section_expanded', /To tolerate or accept a difficult situation/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describe('PutVerbPage — "with" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"As a project manager, you have to put up with unexpected delays\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To tolerate or accept a difficult situation/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'with', 'putWith', /To tolerate or accept a difficult situation/i, /"As a project manager, you have to put up with/i, renderPage, getCard);
