import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'up', 'getUp_section_expanded', /To rise from bed after sleeping/i, renderPage);

describe(`${LABEL} — "up" section independence`, () => {
  it('collapsing "up" section does not affect "off" or "on" sections', () => {
    renderPage();
    expandSection('off');
    expandSection('on');
    expandSection('up');
    fireEvent.click(screen.getByText('up'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To step onto a form of public transport/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'up', renderPage);

describe('GetVerbPage — "up" section definitions', () => {
  it('all 3 "up" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise from bed after sleeping/i)).toHaveClass('truncate');
    expect(screen.getByText(/To stand up/i)).toHaveClass('truncate');
    expect(screen.getByText(/To organize or arrange something/i)).toHaveClass('truncate');
  });

  it('all 3 "up" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To rise from bed after sleeping/i)).toHaveAttribute(
      'title',
      'To rise from bed after sleeping'
    );
    expect(screen.getByText(/To stand up/i)).toHaveAttribute('title', 'To stand up');
    expect(screen.getByText(/To organize or arrange something/i)).toHaveAttribute(
      'title',
      'To organize or arrange something'
    );
  });
});

describe('GetVerbPage — "up" card expand / collapse', () => {
  it('"up" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I get up at 6:30 AM every morning\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He got up from his desk to welcome the visitors\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get up a team to handle this new software update\."/i)).not.toBeInTheDocument();
  });

  it('expands an "up" card when clicked', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });

  it('renders all 3 "up" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    fireEvent.click(getCard(/To stand up/i));
    fireEvent.click(getCard(/To organize or arrange something/i));
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He got up from his desk to welcome the visitors\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get up a team to handle this new software update\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "up" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).toHaveAttribute(
      'title',
      '"I get up at 6:30 AM every morning."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    const card = getCard(/To rise from bed after sleeping/i);
    expect(within(card).getByText(/"I get up at 6:30 AM/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "up" localStorage persistence', () => {
  it('saves "up" card expanded state to localStorage', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(localStorage.getItem('getUp_meaning_1_collapsed')).toBe('false');
  });

  it('restores "up" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getUp_section_expanded', 'true');
    localStorage.setItem('getUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I get up at 6:30 AM every morning\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "up" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(within(getCard(/To rise from bed after sleeping/i)).getByText(/"I get up at 6:30 AM/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(within(getCard(/To rise from bed after sleeping/i)).getByText(/"I get up at 6:30 AM/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To rise from bed after sleeping/i));
    expect(within(getCard(/To rise from bed after sleeping/i)).getByText(/"I get up at 6:30 AM/i)).not.toHaveClass('truncate');
  });
});
