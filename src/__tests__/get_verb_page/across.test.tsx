import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'across', 'getAcross_section_expanded', /To communicate an idea successfully/i, renderPage);

describeChevronAndColour(LABEL, 'across', renderPage);

describe('GetVerbPage — "across" section definitions', () => {
  it('all 2 "across" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To communicate an idea successfully/i)).toHaveClass('truncate');
    expect(screen.getByText(/To physically cross a road/i)).toHaveClass('truncate');
  });

  it('all 2 "across" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/To communicate an idea successfully/i)).toHaveAttribute(
      'title',
      'To communicate an idea successfully so people understand it'
    );
    expect(screen.getByText(/To physically cross a road/i)).toHaveAttribute(
      'title',
      'To physically cross a road, river, or space'
    );
  });
});

describe('GetVerbPage — "across" card expand / collapse', () => {
  it('"across" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"The leader got her vision across/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get across the street\."/i)).not.toBeInTheDocument();
  });

  it('all 2 "across" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('across');
    expect(screen.getByText(/"The leader got her vision across perfectly during the presentation\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get across the street\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'across', 'getAcross', /To communicate an idea successfully/i, /"The leader got her vision across/i, renderPage, getCard);
