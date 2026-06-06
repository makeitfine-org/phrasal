import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

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

describeDefaultImageCards(LABEL, 'away', 'getAway', /To escape/i, /"The thief got away/i, renderPage, getCard);
