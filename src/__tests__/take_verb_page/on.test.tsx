import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "on" section definitions', () => {
  it('renders definition for accepting responsibility', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To accept or take responsibility for work/i)).toBeInTheDocument();
  });

  it('renders definition for hiring someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To employ or hire someone/i)).toBeInTheDocument();
  });

  it('renders definition for competing against', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To compete or fight against someone/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To accept or take responsibility for work/i)).toHaveClass('truncate');
    expect(screen.getByText(/To employ or hire someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To compete or fight against someone/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'on', 'takeOn_section_expanded', /To accept or take responsibility for work/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describe('TakeVerbPage — "on" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I cannot take on any new projects right now\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The company is taking on fifty new developers\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Our team will take on the market leader next year\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(screen.getByText(/"I cannot take on any new projects right now\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 3 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    fireEvent.click(getCard(/To employ or hire someone/i));
    fireEvent.click(getCard(/To compete or fight against someone/i));
    expect(screen.getByText(/"I cannot take on any new projects right now\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The company is taking on fifty new developers\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Our team will take on the market leader next year\."/i)).toBeInTheDocument();
  });

  it('renders 3 images when all cards are expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    fireEvent.click(getCard(/To employ or hire someone/i));
    fireEvent.click(getCard(/To compete or fight against someone/i));
    expect(screen.getAllByRole('img')).toHaveLength(3);
  });
});

describe('TakeVerbPage — "on" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/To accept or take responsibility for work/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/To accept or take responsibility for work/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To accept or take responsibility for work/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    const def = within(card).getByText(/To accept or take responsibility for work/i);
    const example = within(card).getByText(/"I cannot take on any new projects/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/"I cannot take on any new projects/i)).toBeInTheDocument();
    expect(within(card).getByText(/"I cannot take on any new projects/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/"I cannot take on any new projects/i)).toHaveAttribute(
      'title',
      '"I cannot take on any new projects right now."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    const card = getCard(/To accept or take responsibility for work/i);
    expect(within(card).getByText(/"I cannot take on any new projects/i)).not.toHaveClass('truncate');
  });

  it('on card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('TakeVerbPage — "on" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(localStorage.getItem('takeOn_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('on');
    const card = getCard(/To accept or take responsibility for work/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('takeOn_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('takeOn_section_expanded', 'true');
    localStorage.setItem('takeOn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"I cannot take on any new projects right now\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('takeOn_section_expanded', 'true');
    localStorage.setItem('takeOn_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To employ or hire someone/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('TakeVerbPage — "on" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(within(getCard(/To accept or take responsibility for work/i)).getByText(/"I cannot take on any new projects/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(within(getCard(/To accept or take responsibility for work/i)).getByText(/"I cannot take on any new projects/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('on');
    fireEvent.click(getCard(/To accept or take responsibility for work/i));
    expect(within(getCard(/To accept or take responsibility for work/i)).getByText(/"I cannot take on any new projects/i)).not.toHaveClass('truncate');
  });
});
