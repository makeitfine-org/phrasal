import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "off" section definitions', () => {
  it('renders definition for removing clothing', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing or accessories/i)).toBeInTheDocument();
  });

  it('renders definition for leaving the ground', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave the ground and begin flying/i)).toBeInTheDocument();
  });

  it('renders definition for becoming successful quickly', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To become very successful very quickly/i)).toBeInTheDocument();
  });

  it('renders definition for leaving without warning', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To leave quickly or without warning/i)).toBeInTheDocument();
  });

  it('renders definition for time away from work', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To have time away from work/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove clothing or accessories/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave the ground and begin flying/i)).toHaveClass('truncate');
    expect(screen.getByText(/To become very successful very quickly/i)).toHaveClass('truncate');
    expect(screen.getByText(/To leave quickly or without warning/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have time away from work/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'off', 'takeOff_section_expanded', /To remove clothing or accessories/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describe('TakeVerbPage — "off" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Please take off your shoes inside the house\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The flight will take off in ten minutes\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Her new software company really took off this year\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He took off before the meeting ended\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I need to take a few days off to rest\."/i)).not.toBeInTheDocument();
  });

  it('starts all cards collapsed (no images visible)', () => {
    renderPage();
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(screen.getByText(/"Please take off your shoes inside the house\."/i)).toBeInTheDocument();
  });

  it('shows the image when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('renders all 5 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    fireEvent.click(getCard(/To leave the ground and begin flying/i));
    fireEvent.click(getCard(/To become very successful very quickly/i));
    fireEvent.click(getCard(/To leave quickly or without warning/i));
    fireEvent.click(getCard(/To have time away from work/i));
    expect(screen.getByText(/"Please take off your shoes inside the house\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The flight will take off in ten minutes\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Her new software company really took off this year\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He took off before the meeting ended\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I need to take a few days off to rest\."/i)).toBeInTheDocument();
  });

  it('renders 5 images when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    fireEvent.click(getCard(/To leave the ground and begin flying/i));
    fireEvent.click(getCard(/To become very successful very quickly/i));
    fireEvent.click(getCard(/To leave quickly or without warning/i));
    fireEvent.click(getCard(/To have time away from work/i));
    expect(screen.getAllByRole('img')).toHaveLength(5);
  });
});

describe('TakeVerbPage — "off" expanded card layout', () => {
  it('collapsed card definition has truncate class', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/To remove clothing or accessories/i)).toHaveClass('truncate');
  });

  it('expanded card definition does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/To remove clothing or accessories/i)).not.toHaveClass('truncate');
  });

  it('expanded card image appears before definition in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    const img = within(card).getByRole('img');
    const def = within(card).getByText(/To remove clothing or accessories/i);
    expect(img.compareDocumentPosition(def) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('expanded card definition appears before example in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    const def = within(card).getByText(/To remove clothing or accessories/i);
    const example = within(card).getByText(/"Please take off your shoes/i);
    expect(def.compareDocumentPosition(example) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card shows number badge', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('expanded card number badge appears after image in DOM order', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    const img = within(card).getByRole('img');
    const badge = within(card).getByText('1');
    expect(img.compareDocumentPosition(badge) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('collapsed card has no image', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).queryByRole('img')).not.toBeInTheDocument();
  });

  it('collapsed card shows example text truncated', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/"Please take off your shoes/i)).toBeInTheDocument();
    expect(within(card).getByText(/"Please take off your shoes/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/"Please take off your shoes/i)).toHaveAttribute(
      'title',
      '"Please take off your shoes inside the house."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    const card = getCard(/To remove clothing or accessories/i);
    expect(within(card).getByText(/"Please take off your shoes/i)).not.toHaveClass('truncate');
  });

  it('off card has cursor-pointer class (real image, expandable)', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    expect(card).toHaveClass('cursor-pointer');
    expect(card).not.toHaveClass('cursor-default');
  });
});

describe('TakeVerbPage — "off" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(localStorage.getItem('takeOff_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To remove clothing or accessories/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('takeOff_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('takeOff_section_expanded', 'true');
    localStorage.setItem('takeOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Please take off your shoes inside the house\."/i)).toBeInTheDocument();
  });

  it('keeps other cards collapsed when one is restored as expanded', () => {
    localStorage.setItem('takeOff_section_expanded', 'true');
    localStorage.setItem('takeOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To leave the ground and begin flying/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describe('TakeVerbPage — "off" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(within(getCard(/To remove clothing or accessories/i)).getByText(/"Please take off your shoes/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(within(getCard(/To remove clothing or accessories/i)).getByText(/"Please take off your shoes/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To remove clothing or accessories/i));
    expect(within(getCard(/To remove clothing or accessories/i)).getByText(/"Please take off your shoes/i)).not.toHaveClass('truncate');
  });
});
