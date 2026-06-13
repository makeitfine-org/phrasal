import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "off" section definitions', () => {
  it('renders definition for getting rid of something unwanted', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To get rid of something or someone that you no longer want/i)).toBeInTheDocument();
  });

  it('renders definition for untying a boat', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To untie a boat from its dock or mooring/i)).toBeInTheDocument();
  });

  it('renders definition for knitting cast off', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove the final stitches from the needle/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To get rid of something or someone that you no longer want/i)).toHaveClass('truncate');
    expect(screen.getByText(/To untie a boat from its dock or mooring/i)).toHaveClass('truncate');
    expect(screen.getByText(/To remove the final stitches from the needle/i)).toHaveClass('truncate');
  });
});

describeSectionToggle(LABEL, 'off', 'castOff_section_expanded', /To get rid of something or someone that you no longer want/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'castOff', /To get rid of something or someone that you no longer want/i, /"The company managed to cast off/i, renderPage, getCard);

describe('CastVerbPage — "off" card expand / collapse', () => {
  it('starts all cards collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The company managed to cast off/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The captain ordered the crew to cast off/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Once the scarf is the right length/i)).not.toBeInTheDocument();
  });

  it('expands a card when clicked', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To get rid of something or someone that you no longer want/i));
    expect(screen.getByText(/"The company managed to cast off/i)).toBeInTheDocument();
  });

  it('collapses an expanded card when clicked again', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To get rid of something or someone that you no longer want/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(within(card).getByText(/"The company managed to cast off/i)).toHaveClass('truncate');
  });

  it('renders all 3 example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To get rid of something or someone that you no longer want/i));
    fireEvent.click(getCard(/To untie a boat from its dock or mooring/i));
    fireEvent.click(getCard(/To remove the final stitches from the needle/i));
    expect(screen.getByText(/"The company managed to cast off/i)).toBeInTheDocument();
    expect(screen.getByText(/"The captain ordered the crew to cast off at sunrise\./i)).toBeInTheDocument();
    expect(screen.getByText(/"Once the scarf is the right length, you can cast off\./i)).toBeInTheDocument();
  });
});

describe('CastVerbPage — "off" localStorage persistence', () => {
  it('saves expanded state to localStorage when a card is expanded', () => {
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To get rid of something or someone that you no longer want/i));
    expect(localStorage.getItem('castOff_meaning_1_collapsed')).toBe('false');
  });

  it('saves collapsed state to localStorage when a card is collapsed', () => {
    renderPage();
    expandSection('off');
    const card = getCard(/To get rid of something or someone that you no longer want/i);
    fireEvent.click(card);
    fireEvent.click(card);
    expect(localStorage.getItem('castOff_meaning_1_collapsed')).toBe('true');
  });

  it('restores expanded state from localStorage on mount', () => {
    localStorage.setItem('castOff_section_expanded', 'true');
    localStorage.setItem('castOff_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"The company managed to cast off/i)).toBeInTheDocument();
  });
});

describe('CastVerbPage — "off" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To get rid of something or someone that you no longer want/i));
    expect(within(getCard(/To get rid of something or someone that you no longer want/i)).getByText(/"The company managed to cast off/i)).toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('off');
    fireEvent.click(getCard(/To get rid of something or someone that you no longer want/i));
    expect(within(getCard(/To get rid of something or someone that you no longer want/i)).getByText(/"The company managed to cast off/i)).not.toHaveClass('truncate');
  });
});
