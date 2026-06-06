import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'to', 'getTo_section_expanded', /To arrive at a destination/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describe('GetVerbPage — "to" section definitions', () => {
  it('all 4 "to" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To arrive at a destination/i)).toHaveClass('truncate');
    expect(screen.getByText(/To have the opportunity to do something/i)).toHaveClass('truncate');
    expect(screen.getByText(/To annoy or upset someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To begin an action/i)).toHaveClass('truncate');
  });

  it('all 4 "to" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To arrive at a destination/i)).toHaveAttribute('title', 'To arrive at a destination');
    expect(screen.getByText(/To have the opportunity to do something/i)).toHaveAttribute('title', 'To have the opportunity to do something');
    expect(screen.getByText(/To annoy or upset someone/i)).toHaveAttribute('title', 'To annoy or upset someone');
    expect(screen.getByText(/To begin an action/i)).toHaveAttribute('title', 'To begin an action (often "get to work")');
  });
});

describe('GetVerbPage — "to" card expand / collapse', () => {
  it('"to" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"What time did you get to the office/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"Because of my job, I get to travel/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The constant complaining is really getting to me\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The break is over/i)).not.toBeInTheDocument();
  });

  it('all 4 "to" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/"What time did you get to the office this morning\?"/i)).toBeInTheDocument();
    expect(screen.getByText(/"Because of my job, I get to travel all over the world\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The constant complaining is really getting to me\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The break is over; let's get to work\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'to', 'getTo', /To arrive at a destination/i, /"What time did you get to the office/i, renderPage, getCard);
