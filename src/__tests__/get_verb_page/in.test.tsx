import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'in', 'getIn_section_expanded', /To enter a car, room, or building/i, renderPage);

describe(`${LABEL} — "in" section independence`, () => {
  it('collapsing "in" section does not affect other sections', () => {
    renderPage();
    expandSection('off');
    expandSection('down');
    expandSection('in');
    fireEvent.click(screen.getByText('in'));
    expect(screen.getByText(/To leave a form of public transport/i)).toBeInTheDocument();
    expect(screen.getByText(/To move to a lower position/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'in', renderPage);

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
