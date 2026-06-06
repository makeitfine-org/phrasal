import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'on', 'getOn_section_expanded', /To step onto a form of public transport/i, renderPage);

describe(`${LABEL} — "on" section independence`, () => {
  it('collapsing "on" section does not affect "off" section', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    fireEvent.click(screen.getByText('on'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
  });
  it('collapsing "off" section does not affect "on" section', () => {
    renderPage();
    expandSection('on');
    expandSection('off');
    fireEvent.click(screen.getByText('off'));
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'on', renderPage);

describe('GetVerbPage — "on" section definitions', () => {
  it('all 4 "on" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To step onto a form of public transport/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make progress or handle a situation/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have a good relationship/i)).toHaveClass('truncate');
    expect(screen.getByText(/To continue doing something/i)).toHaveClass('truncate');
  });

  it('all 4 "on" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To step onto a form of public transport/i)).toHaveAttribute(
      'title',
      'To step onto a form of public transport'
    );
    expect(screen.getByText(/To make progress or handle a situation/i)).toHaveAttribute(
      'title',
      'To make progress or handle a situation'
    );
    expect(screen.getByText(/To have a good relationship/i)).toHaveAttribute(
      'title',
      'To have a good relationship (often "get on with")'
    );
    expect(screen.getByText(/To continue doing something/i)).toHaveAttribute(
      'title',
      'To continue doing something'
    );
  });
});

describe('GetVerbPage — "on" card expand / collapse', () => {
  it('"on" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Hurry up and get on the bus before it leaves!"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"How are you getting on with the new Java project\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I get on very well with my team members\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Let's stop chatting and get on with the meeting\."/i)).not.toBeInTheDocument();
  });

  it('expands an "on" card when clicked', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
  });

  it('shows image when an "on" card is expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('renders all 4 "on" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    fireEvent.click(getCard(/To make progress or handle a situation/i));
    fireEvent.click(getCard(/To have a good relationship/i));
    fireEvent.click(getCard(/To continue doing something/i));
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
    expect(screen.getByText(/"How are you getting on with the new Java project\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"I get on very well with my team members\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Let's stop chatting and get on with the meeting\."/i)).toBeInTheDocument();
  });

  it('renders 4 images when all "on" cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    fireEvent.click(getCard(/To make progress or handle a situation/i));
    fireEvent.click(getCard(/To have a good relationship/i));
    fireEvent.click(getCard(/To continue doing something/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });
});

describe('GetVerbPage — "on" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).toHaveAttribute(
      'title',
      '"Hurry up and get on the bus before it leaves!"'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    const card = getCard(/To step onto a form of public transport/i);
    expect(within(card).getByText(/"Hurry up and get on the bus/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "on" localStorage persistence', () => {
  it('saves "on" card expanded state to localStorage', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(localStorage.getItem('getOn_meaning_1_collapsed')).toBe('false');
  });

  it('restores "on" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getOn_section_expanded', 'true');
    localStorage.setItem('getOn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Hurry up and get on the bus before it leaves!"/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "on" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(within(getCard(/To step onto a form of public transport/i)).getByText(/"Hurry up and get on the bus/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(within(getCard(/To step onto a form of public transport/i)).getByText(/"Hurry up and get on the bus/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To step onto a form of public transport/i));
    expect(within(getCard(/To step onto a form of public transport/i)).getByText(/"Hurry up and get on the bus/i)).not.toHaveClass('truncate');
  });
});
