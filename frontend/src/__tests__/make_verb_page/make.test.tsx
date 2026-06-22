import { fireEvent, screen, within } from '@testing-library/react';
import { expandSection, getCard, getSection, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- after ---

describeSectionToggle(LABEL, 'after', 'makeAfter_section_expanded', /To chase someone or something/i, renderPage);

describe(`${LABEL} — "after" section independence`, () => {
  it('collapsing "after" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('after');
    fireEvent.click(screen.getByText('after'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'after', renderPage);

describe('MakeVerbPage — "after" section definitions', () => {
  it('"after" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i)).toHaveClass('truncate');
  });

  it('"after" title attribute contains full definition text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To chase someone or something/i))
      .toHaveAttribute('title', 'To chase someone or something');
  });
});

describe('MakeVerbPage — "after" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/"The security guard made after the shoplifter\."/i)).toBeInTheDocument();
  });

  it('card example has truncate class', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To chase someone or something/i);
    expect(within(card).getByText(/"The security guard made after the shoplifter\."/i)).toHaveClass('truncate');
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To chase someone or something/i);
    expect(within(card).getByText(/"The security guard made after the shoplifter\."/i))
      .toHaveAttribute('title', '"The security guard made after the shoplifter."');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To chase someone or something/i));
    expect(within(getCard(/To chase someone or something/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'after', 'makeAfter', /To chase someone or something/i, /"The security guard made after/i, renderPage, getCard);

// --- away ---

describeSectionToggle(LABEL, 'away (with)', 'makeAway_section_expanded', /To steal something and escape with it/i, renderPage);

describe(`${LABEL} — "away (with)" section independence`, () => {
  it('collapsing "away (with)" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('away (with)');
    fireEvent.click(screen.getByText('away (with)'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'away (with)', renderPage);

describe('MakeVerbPage — "away (with)" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('away (with)');
    expect(screen.getByText(/"Hackers made away with thousands of encrypted passwords\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('away (with)');
    fireEvent.click(getCard(/To steal something and escape with it/i));
    expect(within(getCard(/To steal something and escape with it/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'away (with)', 'makeAway', /To steal something and escape with it/i, /"Hackers made away with/i, renderPage, getCard);

// --- for ---

describeSectionToggle(LABEL, 'for', 'makeFor_section_expanded', /To move directly towards a place/i, renderPage);

describe(`${LABEL} — "for" section independence`, () => {
  it('collapsing "for" section does not affect other sections', () => {
    renderPage();
    expandSection('after');
    expandSection('out');
    expandSection('for');
    fireEvent.click(screen.getByText('for'));
    expect(screen.getByText(/To chase someone or something/i)).toBeInTheDocument();
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'for', renderPage);

describe('MakeVerbPage — "for" section definitions', () => {
  it('all 2 "for" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To move directly towards a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To help make something possible/i)).toHaveClass('truncate');
  });

  it('all 2 "for" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To move directly towards a place/i))
      .toHaveAttribute('title', 'To move directly towards a place');
    expect(screen.getByText(/To help make something possible/i))
      .toHaveAttribute('title', 'To help make something possible or produce a specific result');
  });
});

describe('MakeVerbPage — "for" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/"After the meeting ended, we made for the exit\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Clear communication makes for a highly effective management team\."/i)).toBeInTheDocument();
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('for');
    const card = getCard(/To move directly towards a place/i);
    expect(within(card).getByText(/"After the meeting ended/i))
      .toHaveAttribute('title', '"After the meeting ended, we made for the exit."');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('for');
    fireEvent.click(getCard(/To move directly towards a place/i));
    expect(within(getCard(/To move directly towards a place/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'for', 'makeFor', /To move directly towards a place/i, /"After the meeting ended, we made for the exit/i, renderPage, getCard);

// --- general ---

describe('MakeVerbPage — general', () => {
  it('renders "Make" heading', () => {
    renderPage();
    expect(screen.getByRole('heading', { name: 'Make' })).toBeInTheDocument();
  });

  it('does not render subtitle text on initial load', () => {
    renderPage();
    expect(screen.queryByText(/To chase someone or something/i)).not.toBeInTheDocument();
  });

  it('renders correct numbered badges across all sections when expanded', () => {
    renderPage();
    ['after', 'away (with)', 'for', 'into', 'off (with)', 'out', 'over', 'up', 'up for', 'with']
      .forEach(p => fireEvent.click(screen.getByText(p)));
    expect(screen.getAllByText('1')).toHaveLength(10);
    expect(screen.getAllByText('2')).toHaveLength(4);
    expect(screen.getAllByText('3')).toHaveLength(2);
    expect(screen.getAllByText('4')).toHaveLength(2);
    expect(screen.getAllByText('5')).toHaveLength(1);
    expect(screen.getAllByText('6')).toHaveLength(1);
  });
});

// --- into ---

describeSectionToggle(LABEL, 'into', 'makeInto_section_expanded', /To change or transform something into something else/i, renderPage);

describe(`${LABEL} — "into" section independence`, () => {
  it('collapsing "into" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('into');
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'into', renderPage);

describe('MakeVerbPage — "into" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/"The developers made the old legacy system into a modern Java application\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To change or transform something into something else/i));
    expect(within(getCard(/To change or transform something into something else/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'into', 'makeInto', /To change or transform something into something else/i, /"The developers made the old legacy system/i, renderPage, getCard);

// --- off ---

describeSectionToggle(LABEL, 'off (with)', 'makeOff_section_expanded', /To leave quickly, especially to escape/i, renderPage);

describe(`${LABEL} — "off (with)" section independence`, () => {
  it('collapsing "off (with)" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('off (with)');
    fireEvent.click(screen.getByText('off (with)'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'off (with)', renderPage);

describe('MakeVerbPage — "off (with)" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('off (with)');
    expect(screen.getByText(/"The thieves made off before the police arrived\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('off (with)');
    fireEvent.click(getCard(/To leave quickly, especially to escape/i));
    expect(within(getCard(/To leave quickly, especially to escape/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'off (with)', 'makeOff', /To leave quickly, especially to escape/i, /"The thieves made off/i, renderPage, getCard);

// --- out ---

describeSectionToggle(LABEL, 'out', 'makeOut_section_expanded', /To manage to see, hear, or read something with difficulty/i, renderPage);

describe(`${LABEL} — "out" section independence`, () => {
  it('collapsing "out" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('into');
    expandSection('out');
    fireEvent.click(screen.getByText('out'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
    expect(screen.getByText(/To change or transform something into something else/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'out', renderPage);

describe('MakeVerbPage — "out" section definitions', () => {
  it('all 6 "out" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i)).toHaveClass('truncate');
    expect(screen.getByText(/To understand someone's character/i)).toHaveClass('truncate');
    expect(screen.getByText(/To write all the necessary information on an official document/i)).toHaveClass('truncate');
    expect(screen.getByText(/To claim or pretend that something is true/i)).toHaveClass('truncate');
    expect(screen.getByText(/To progress, perform, or succeed in a situation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To kiss and touch romantically/i)).toHaveClass('truncate');
  });

  it('all 6 "out" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i))
      .toHaveAttribute('title', 'To manage to see, hear, or read something with difficulty');
    expect(screen.getByText(/To understand someone's character/i))
      .toHaveAttribute('title', "To understand someone's character or a situation");
    expect(screen.getByText(/To write all the necessary information on an official document/i))
      .toHaveAttribute('title', 'To write all the necessary information on an official document (like a check or invoice)');
    expect(screen.getByText(/To claim or pretend that something is true/i))
      .toHaveAttribute('title', 'To claim or pretend that something is true');
    expect(screen.getByText(/To progress, perform, or succeed in a situation/i))
      .toHaveAttribute('title', 'To progress, perform, or succeed in a situation');
    expect(screen.getByText(/To kiss and touch romantically/i))
      .toHaveAttribute('title', 'To kiss and touch romantically (informal)');
  });
});

describe('MakeVerbPage — "out" card view', () => {
  it('all 6 examples visible without expanding cards', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/"I could not make out the error message/i)).toBeInTheDocument();
    expect(screen.getByText(/"He is a very quiet team leader/i)).toBeInTheDocument();
    expect(screen.getByText(/"Please make the invoice out/i)).toBeInTheDocument();
    expect(screen.getByText(/"The software vendor made out/i)).toBeInTheDocument();
    expect(screen.getByText(/"How did you make out with/i)).toBeInTheDocument();
    expect(screen.getByText(/"The teenagers were making out/i)).toBeInTheDocument();
  });

  it('no "out" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('out');
    fireEvent.click(getCard(/To manage to see, hear, or read something with difficulty/i));
    fireEvent.click(getCard(/To understand someone's character/i));
    fireEvent.click(getCard(/To write all the necessary information on an official document/i));
    fireEvent.click(getCard(/To claim or pretend that something is true/i));
    fireEvent.click(getCard(/To progress, perform, or succeed in a situation/i));
    fireEvent.click(getCard(/To kiss and touch romantically/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('out');
    const card = getCard(/To manage to see, hear, or read something with difficulty/i);
    expect(within(card).getByText(/"I could not make out the error message/i))
      .toHaveAttribute('title', '"I could not make out the error message on the monitor because the screen was too bright."');
  });
});

describeDefaultImageCards(LABEL, 'out', 'makeOut', /To manage to see, hear, or read something with difficulty/i, /"I could not make out the error message/i, renderPage, getCard);

// --- over ---

describeSectionToggle(LABEL, 'over', 'makeOver_section_expanded', /To change or improve the appearance/i, renderPage);

describe(`${LABEL} — "over" section independence`, () => {
  it('collapsing "over" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('over');
    fireEvent.click(screen.getByText('over'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'over', renderPage);

describe('MakeVerbPage — "over" section definitions', () => {
  it('all 2 "over" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To change or improve the appearance/i)).toHaveClass('truncate');
    expect(screen.getByText(/To legally transfer ownership/i)).toHaveClass('truncate');
  });

  it('all 2 "over" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To change or improve the appearance/i))
      .toHaveAttribute('title', 'To change or improve the appearance of someone or something');
    expect(screen.getByText(/To legally transfer ownership/i))
      .toHaveAttribute('title', 'To legally transfer ownership of property or money to someone else');
  });
});

describe('MakeVerbPage — "over" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/"We made over the entire office space/i)).toBeInTheDocument();
    expect(screen.getByText(/"The CEO made over his shares/i)).toBeInTheDocument();
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('over');
    fireEvent.click(getCard(/To change or improve the appearance/i));
    fireEvent.click(getCard(/To legally transfer ownership/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'over', 'makeOver', /To change or improve the appearance/i, /"We made over the entire office space/i, renderPage, getCard);

// --- separators ---

describe('MakeVerbPage — section separators', () => {
  it('renders nine horizontal rule separators', () => {
    renderPage();
    expect(document.querySelectorAll('hr')).toHaveLength(9);
  });

  it('all separators have border-gray-600 class', () => {
    renderPage();
    document.querySelectorAll('hr').forEach(hr => {
      expect(hr).toHaveClass('border-gray-600');
    });
  });

  it('first separator appears between after and away sections in DOM order', () => {
    renderPage();
    const [hr1] = document.querySelectorAll('hr');
    const afterSection = getSection('after');
    const awaySection = getSection('away (with)');
    expect(afterSection.compareDocumentPosition(hr1) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr1.compareDocumentPosition(awaySection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('second separator appears between away and for sections in DOM order', () => {
    renderPage();
    const [, hr2] = document.querySelectorAll('hr');
    const awaySection = getSection('away (with)');
    const forSection = getSection('for');
    expect(awaySection.compareDocumentPosition(hr2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr2.compareDocumentPosition(forSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('third separator appears between for and into sections in DOM order', () => {
    renderPage();
    const [,, hr3] = document.querySelectorAll('hr');
    const forSection = getSection('for');
    const intoSection = getSection('into');
    expect(forSection.compareDocumentPosition(hr3) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr3.compareDocumentPosition(intoSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fourth separator appears between into and off sections in DOM order', () => {
    renderPage();
    const [,,, hr4] = document.querySelectorAll('hr');
    const intoSection = getSection('into');
    const offSection = getSection('off (with)');
    expect(intoSection.compareDocumentPosition(hr4) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr4.compareDocumentPosition(offSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('fifth separator appears between off and out sections in DOM order', () => {
    renderPage();
    const [,,,, hr5] = document.querySelectorAll('hr');
    const offSection = getSection('off (with)');
    const outSection = getSection('out');
    expect(offSection.compareDocumentPosition(hr5) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr5.compareDocumentPosition(outSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('sixth separator appears between out and over sections in DOM order', () => {
    renderPage();
    const [,,,,, hr6] = document.querySelectorAll('hr');
    const outSection = getSection('out');
    const overSection = getSection('over');
    expect(outSection.compareDocumentPosition(hr6) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hr6.compareDocumentPosition(overSection) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});

describe('MakeVerbPage — section spacing', () => {
  it('"after" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('after')).toHaveClass('mb-5');
  });

  it('"for" section wrapper has mb-5 class', () => {
    renderPage();
    expect(getSection('for')).toHaveClass('mb-5');
  });

  it('"after" section wrapper does not have mb-10 class', () => {
    renderPage();
    expect(getSection('after')).not.toHaveClass('mb-10');
  });
});

// --- up ---

describeSectionToggle(LABEL, 'up', 'makeUp_section_expanded', /To invent a story, excuse, or explanation/i, renderPage);

describe(`${LABEL} — "up" section independence`, () => {
  it('collapsing "up" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('out');
    expandSection('up');
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'up', renderPage);

describe('MakeVerbPage — "up" section definitions', () => {
  it('all 4 "up" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invent a story, excuse, or explanation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To form the whole of something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become friendly again after an argument/i)).toHaveClass('truncate');
    expect(screen.getByText(/To prepare, build, or arrange something from parts/i)).toHaveClass('truncate');
  });

  it('all 4 "up" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To invent a story, excuse, or explanation/i))
      .toHaveAttribute('title', 'To invent a story, excuse, or explanation');
    expect(screen.getByText(/To form the whole of something/i))
      .toHaveAttribute('title', 'To form the whole of something');
    expect(screen.getByText(/To become friendly again after an argument/i))
      .toHaveAttribute('title', 'To become friendly again after an argument');
    expect(screen.getByText(/To prepare, build, or arrange something from parts/i))
      .toHaveAttribute('title', 'To prepare, build, or arrange something from parts');
  });
});

describe('MakeVerbPage — "up" card view', () => {
  it('all 4 examples visible without expanding cards', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/"He made up an excuse for missing the daily stand-up meeting\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Senior developers make up 40% of our engineering department\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The co-founders argued over the budget, but they made up the next day\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Can you make up a list of requirements for the new software module\?"/i)).toBeInTheDocument();
  });

  it('no "up" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To invent a story, excuse, or explanation/i));
    fireEvent.click(getCard(/To form the whole of something/i));
    fireEvent.click(getCard(/To become friendly again after an argument/i));
    fireEvent.click(getCard(/To prepare, build, or arrange something from parts/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'up', 'makeUp', /To invent a story, excuse, or explanation/i, /"He made up an excuse/i, renderPage, getCard);

// --- up_for ---

describeSectionToggle(LABEL, 'up for', 'makeUpFor_section_expanded', /To compensate for something bad, missing, or lost/i, renderPage);

describe(`${LABEL} — "up for" section independence`, () => {
  it('collapsing "up for" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('up for');
    fireEvent.click(screen.getByText('up for'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'up for', renderPage);

describe('MakeVerbPage — "up for" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('up for');
    expect(screen.getByText(/"We worked late on Friday to make up for the time lost/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('up for');
    fireEvent.click(getCard(/To compensate for something bad, missing, or lost/i));
    expect(within(getCard(/To compensate for something bad, missing, or lost/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'up for', 'makeUpFor', /To compensate for something bad, missing, or lost/i, /"We worked late on Friday to make up for/i, renderPage, getCard);

// --- with ---

describeSectionToggle(LABEL, 'with', 'makeWith_section_expanded', /To produce, supply, or give something quickly/i, renderPage);

describe(`${LABEL} — "with" section independence`, () => {
  it('collapsing "with" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('with');
    fireEvent.click(screen.getByText('with'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'with', renderPage);

describe('MakeVerbPage — "with" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"Make with the financial reports, the board is waiting!"/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To produce, supply, or give something quickly/i));
    expect(within(getCard(/To produce, supply, or give something quickly/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'with', 'makeWith', /To produce, supply, or give something quickly/i, /"Make with the financial reports/i, renderPage, getCard);
