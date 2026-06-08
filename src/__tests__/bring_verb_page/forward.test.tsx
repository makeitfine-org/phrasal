import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "forward" section definitions', () => {
  it('renders definition for changing an event to an earlier date', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To change the date or time of an event so that it happens earlier/i)).toBeInTheDocument();
  });

  it('renders definition for introducing a plan for discussion', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To introduce a plan, proposal, or argument for discussion/i)).toBeInTheDocument();
  });

  it('renders definition for transferring a total in accounting', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/\(Accounting\) To transfer a total from the bottom of one page/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To change the date or time of an event so that it happens earlier/i)).toHaveClass('truncate');
    expect(screen.getByText(/To introduce a plan, proposal, or argument for discussion/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Accounting\) To transfer a total from the bottom of one page/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To change the date or time of an event so that it happens earlier/i)).toHaveAttribute(
      'title',
      'To change the date or time of an event so that it happens earlier.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'bringForward_section_expanded', /To change the date or time of an event so that it happens earlier/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'bringForward', /To change the date or time of an event so that it happens earlier/i, /the interview was brought forward to 10:00 AM/i, renderPage, getCard);
