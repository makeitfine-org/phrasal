import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'down', 'getDown_section_expanded', /To move to a lower position/i, renderPage);

describe(`${LABEL} — "down" section independence`, () => {
  it('collapsing "down" section does not affect "off", "on", or "up" sections', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    expandSection('up');
    expandSection('down');
    fireEvent.click(screen.getByText('down'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To rise from bed after sleeping/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'down', renderPage);

describe('GetVerbPage — "down" section definitions', () => {
  it('all 4 "down" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To move to a lower position/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveClass('truncate');
    expect(screen.getByText(/To write something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveClass('truncate');
  });

  it('all 4 "down" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To move to a lower position/i)).toHaveAttribute('title', 'To move to a lower position');
    expect(screen.getByText(/To make someone feel sad or depressed/i)).toHaveAttribute('title', 'To make someone feel sad or depressed');
    expect(screen.getByText(/To write something/i)).toHaveAttribute('title', 'To write something');
    expect(screen.getByText(/To start focusing on a task seriously/i)).toHaveAttribute('title', 'To start focusing on a task seriously (often "get down to")');
  });
});

describe('GetVerbPage — "down" card expand / collapse', () => {
  it('"down" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"You need to get down from that ladder before you fall\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"This rainy weather is really getting me down\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Let me get your contact details down in my notebook\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Enough small talk; let's get down to business\."/i)).not.toBeInTheDocument();
  });

  it('expands a "down" card when clicked', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });

  it('renders all 4 "down" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    fireEvent.click(getCard(/To make someone feel sad or depressed/i));
    fireEvent.click(getCard(/To write something/i));
    fireEvent.click(getCard(/To start focusing on a task seriously/i));
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"This rainy weather is really getting me down\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Let me get your contact details down in my notebook\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Enough small talk; let's get down to business\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "down" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('down');
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).toHaveAttribute(
      'title',
      '"You need to get down from that ladder before you fall."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    const card = getCard(/To move to a lower position/i);
    expect(within(card).getByText(/"You need to get down from that ladder/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "down" localStorage persistence', () => {
  it('saves "down" card expanded state to localStorage', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(localStorage.getItem('getDown_meaning_1_collapsed')).toBe('false');
  });

  it('restores "down" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getDown_section_expanded', 'true');
    localStorage.setItem('getDown_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"You need to get down from that ladder before you fall\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "down" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(within(getCard(/To move to a lower position/i)).getByText(/"You need to get down from that ladder/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(within(getCard(/To move to a lower position/i)).getByText(/"You need to get down from that ladder/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('down');
    fireEvent.click(getCard(/To move to a lower position/i));
    expect(within(getCard(/To move to a lower position/i)).getByText(/"You need to get down from that ladder/i)).not.toHaveClass('truncate');
  });
});
