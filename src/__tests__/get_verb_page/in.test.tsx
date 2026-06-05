import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';

beforeEach(() => {
  localStorage.clear();
});

describe('GetVerbPage — "in" section toggle', () => {
  it('renders "in" section toggle', () => {
    renderPage();
    expect(screen.getByText('in')).toBeInTheDocument();
  });

  it('"in" section starts collapsed showing no definitions', () => {
    renderPage();
    expect(screen.queryByText(/To enter a car, room, or building/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To arrive \(usually a train, flight/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To be accepted into a school, club, or organization/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/To submit something/i)).not.toBeInTheDocument();
  });

  it('clicking "in" expands all "in" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText(/To enter a car, room, or building/i)).toBeInTheDocument();
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toBeInTheDocument();
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toBeInTheDocument();
    expect(screen.getByText(/To submit something/i)).toBeInTheDocument();
  });

  it('clicking "in" twice collapses all "in" meaning cards', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    fireEvent.click(screen.getByText('in'));
    expect(screen.queryByText(/To enter a car, room, or building/i)).not.toBeInTheDocument();
  });

  it('collapsing "in" section does not affect other sections', () => {
    renderPage();
    expandSection('off');
    expandSection('down');
    expandSection('in');
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To move to a lower position/i)).toBeInTheDocument();
  });

  it('saves "in" section state to localStorage when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(localStorage.getItem('getIn_section_expanded')).toBe('true');
  });

  it('restores "in" section collapsed state from localStorage', () => {
    localStorage.setItem('getIn_section_expanded', 'false');
    renderPage();
    expect(screen.queryByText(/To enter a car, room, or building/i)).not.toBeInTheDocument();
  });
});

describe('GetVerbPage — "in" chevron and colour', () => {
  it('in chevron has rotate-90 class when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).toHaveClass('rotate-90');
  });

  it('in chevron does not have rotate-90 class when collapsed', () => {
    renderPage();
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).not.toHaveClass('rotate-90');
  });

  it('in chevron is blue when collapsed', () => {
    renderPage();
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).toHaveClass('text-blue-600');
  });

  it('in chevron is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    const inHeader = screen.getByText('in').closest('div')!;
    expect(within(inHeader).getByText('▶')).toHaveClass('text-white');
  });

  it('in particle text is blue when collapsed', () => {
    renderPage();
    expect(screen.getByText('in')).toHaveClass('text-blue-600');
  });

  it('in particle text is white when expanded', () => {
    renderPage();
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText('in')).toHaveClass('text-white');
  });
});

describe('GetVerbPage — "in" section definitions', () => {
  it('all 4 "in" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a car, room, or building/i)).toHaveClass('truncate');
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toHaveClass('truncate');
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toHaveClass('truncate');
    expect(screen.getByText(/To submit something/i)).toHaveClass('truncate');
  });

  it('all 4 "in" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To enter a car, room, or building/i)).toHaveAttribute('title', 'To enter a car, room, or building');
    expect(screen.getByText(/To arrive \(usually a train, flight/i)).toHaveAttribute('title', 'To arrive (usually a train, flight, or arriving at home/work)');
    expect(screen.getByText(/To be accepted into a school, club, or organization/i)).toHaveAttribute('title', 'To be accepted into a school, club, or organization');
    expect(screen.getByText(/To submit something/i)).toHaveAttribute('title', 'To submit something');
  });
});

describe('GetVerbPage — "in" card expand / collapse', () => {
  it('"in" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"Get in the car, we are going to be late\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"What time does your flight get in\?"/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"She applied to a top university and she got in\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I need to get my expenses application in by Friday\."/i)).not.toBeInTheDocument();
  });

  it('expands an "in" card when clicked', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
  });

  it('renders all 4 "in" example sentences when all cards are expanded', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    fireEvent.click(getCard(/To arrive \(usually a train, flight/i));
    fireEvent.click(getCard(/To be accepted into a school, club, or organization/i));
    fireEvent.click(getCard(/To submit something/i));
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"What time does your flight get in\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"She applied to a top university and she got in\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I need to get my expenses application in by Friday\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "in" collapsed card view', () => {
  it('collapsed card shows example sentence', () => {
    renderPage();
    expandSection('in');
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).toBeInTheDocument();
  });

  it('collapsed card example has truncate class', () => {
    renderPage();
    expandSection('in');
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).toHaveClass('truncate');
  });

  it('collapsed card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('in');
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).toHaveAttribute(
      'title',
      '"Get in the car, we are going to be late."'
    );
  });

  it('expanded card example does not have truncate class', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    const card = getCard(/To enter a car, room, or building/i);
    expect(within(card).getByText(/"Get in the car/i)).not.toHaveClass('truncate');
  });
});

describe('GetVerbPage — "in" localStorage persistence', () => {
  it('saves "in" card expanded state to localStorage', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(localStorage.getItem('getIn_meaning_1_collapsed')).toBe('false');
  });

  it('restores "in" card expanded state from localStorage on mount', () => {
    localStorage.setItem('getIn_section_expanded', 'true');
    localStorage.setItem('getIn_meaning_1_collapsed', 'false');
    renderPage();
    expect(screen.getByText(/"Get in the car, we are going to be late\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "in" text selection does not toggle card', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('clicking card with text selected does not expand it', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(within(getCard(/To enter a car, room, or building/i)).getByText(/"Get in the car/i)).toHaveClass('truncate');
  });

  it('clicking expanded card with text selected does not collapse it', () => {
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(within(getCard(/To enter a car, room, or building/i)).getByText(/"Get in the car/i)).not.toHaveClass('truncate');
  });

  it('clicking card with empty selection toggles normally', () => {
    vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);
    renderPage();
    expandSection('in');
    fireEvent.click(getCard(/To enter a car, room, or building/i));
    expect(within(getCard(/To enter a car, room, or building/i)).getByText(/"Get in the car/i)).not.toHaveClass('truncate');
  });
});
