import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "up" section definitions', () => {
  it('renders definition for starting a hobby', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new activity or hobby/i)).toBeInTheDocument();
  });

  it('renders definition for occupying time or space', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To use or fill an amount of time or space/i)).toBeInTheDocument();
  });

  it('renders definition for accepting an offer', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To accept an offer that has been made/i)).toBeInTheDocument();
  });

  it('renders definition for shortening clothing', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To shorten a piece of clothing/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To start a new activity or hobby/i)).toHaveClass('truncate');
    expect(screen.getByText(/To use or fill an amount of time or space/i)).toHaveClass('truncate');
    expect(screen.getByText(/To accept an offer that has been made/i)).toHaveClass('truncate');
    expect(screen.getByText(/To shorten a piece of clothing/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'up', 'takeUp_section_expanded', /To start a new activity or hobby/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describe('TakeVerbPage — "up" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"He took up golf to relax after work\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"These large files take up too much space on the server\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I will take you up on that job offer\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I need to take up these trousers; they are too long\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(screen.getByText(/"He took up golf to relax after work\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 4 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    fireEvent.click(getCard(/To use or fill an amount of time or space/i));
    fireEvent.click(getCard(/To accept an offer that has been made/i));
    fireEvent.click(getCard(/To shorten a piece of clothing/i));
    expect(screen.getByText(/"He took up golf to relax after work\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"These large files take up too much space on the server\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I will take you up on that job offer\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I need to take up these trousers; they are too long\."/i)).toBeInTheDocument();
  });

  it('renders 4 images when all cards are expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    fireEvent.click(getCard(/To use or fill an amount of time or space/i));
    fireEvent.click(getCard(/To accept an offer that has been made/i));
    fireEvent.click(getCard(/To shorten a piece of clothing/i));
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });
});

describe('TakeVerbPage — "up" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/To start a new activity or hobby/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/To start a new activity or hobby/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To start a new activity or hobby/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    const def = within(card).getByText(/To start a new activity or hobby/i);
    const example = within(card).getByText(/"He took up golf/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/"He took up golf/i)).toBeInTheDocument();
    expect(within(card).getByText(/"He took up golf/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/"He took up golf/i)).toHaveAttribute(
      'title',
      '"He took up golf to relax after work."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    const card = getCard(/To start a new activity or hobby/i);
    expect(within(card).getByText(/"He took up golf/i)).not.toHaveClass('truncate');
  });

  it('up card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('TakeVerbPage — "up" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(localStorage.getItem('takeUp_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('up');
    const card = getCard(/To start a new activity or hobby/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('takeUp_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('takeUp_section_expanded', 'true');
    localStorage.setItem('takeUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"He took up golf to relax after work\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('takeUp_section_expanded', 'true');
    localStorage.setItem('takeUp_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To use or fill an amount of time or space/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('TakeVerbPage — "up" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(within(getCard(/To start a new activity or hobby/i)).getByText(/"He took up golf/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(within(getCard(/To start a new activity or hobby/i)).getByText(/"He took up golf/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('up');
    fireEvent.click(getCard(/To start a new activity or hobby/i));
    expect(within(getCard(/To start a new activity or hobby/i)).getByText(/"He took up golf/i)).not.toHaveClass('truncate');
  });
});
