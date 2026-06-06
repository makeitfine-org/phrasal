import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'away', 'getAway_section_expanded', /To escape/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describe('GetVerbPage — "away" section definitions', () => {
  it('all 3 "away" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape/i)).toHaveClass('truncate');
    expect(screen.getByText(/To go on a holiday or take a break/i)).toHaveClass('truncate');
    expect(screen.getByText(/To do something wrong without being punished/i)).toHaveClass('truncate');
  });

  it('all 3 "away" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To escape/i)).toHaveAttribute('title', 'To escape');
    expect(screen.getByText(/To go on a holiday or take a break/i)).toHaveAttribute('title', 'To go on a holiday or take a break');
    expect(screen.getByText(/To do something wrong without being punished/i)).toHaveAttribute(
      'title',
      'To do something wrong without being punished (often "get away with")'
    );
  });
});

describe('GetVerbPage — "away" card expand / collapse', () => {
  it('"away" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The thief got away before the police arrived\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We are hoping to get away to the mountains/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"He lied about his sales numbers/i)).not.toBeInTheDocument();
  });

  it('all 3 "away" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/"The thief got away before the police arrived\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We are hoping to get away to the mountains for the weekend\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"He lied about his sales numbers, but he won't get away with it\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "away" non-expandable cards (default image)', () => {
  it('away card has cursor-default class', () => {
    renderPage();
    expandSection('away');
    const card = getCard(/To escape/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "away" card never renders an image', () => {
    renderPage();
    expandSection('away');
    fireEvent.click(getCard(/To escape/i));
    expect(within(getCard(/To escape/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "away" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('away');
    fireEvent.click(getCard(/To escape/i));
    fireEvent.click(getCard(/To go on a holiday or take a break/i));
    fireEvent.click(getCard(/To do something wrong without being punished/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "away" card does not remove truncate class', () => {
    renderPage();
    expandSection('away');
    fireEvent.click(getCard(/To escape/i));
    expect(within(getCard(/To escape/i)).getByText(/"The thief got away/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "away" localStorage persistence', () => {
  it('clicking "away" card does not save to localStorage', () => {
    renderPage();
    expandSection('away');
    fireEvent.click(getCard(/To escape/i));
    expect(localStorage.getItem('getAway_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getAway_section_expanded', 'true');
    localStorage.setItem('getAway_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To escape/i)).getByText(/"The thief got away/i)).toHaveClass('truncate');
  });
});
