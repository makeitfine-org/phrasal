import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

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

describe('GetVerbPage — "across" non-expandable cards (default image)', () => {
  it('across card has cursor-default class', () => {
    renderPage();
    expandSection('across');
    const card = getCard(/To communicate an idea successfully/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "across" card never renders an image', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    expect(within(getCard(/To communicate an idea successfully/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "across" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    fireEvent.click(getCard(/To physically cross a road/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "across" card does not remove truncate class', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    expect(within(getCard(/To communicate an idea successfully/i)).getByText(/"The leader got her vision across/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "across" localStorage persistence', () => {
  it('clicking "across" card does not save to localStorage', () => {
    renderPage();
    expandSection('across');
    fireEvent.click(getCard(/To communicate an idea successfully/i));
    expect(localStorage.getItem('getAcross_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getAcross_section_expanded', 'true');
    localStorage.setItem('getAcross_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To communicate an idea successfully/i)).getByText(/"The leader got her vision across/i)).toHaveClass('truncate');
  });
});
