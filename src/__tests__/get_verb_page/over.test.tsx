import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'over', 'getOver_section_expanded', /To recover from an illness/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describe('GetVerbPage — "over" section definitions', () => {
  it('all 3 "over" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To recover from an illness/i)).toHaveClass('truncate');
    expect(screen.getByText(/To overcome a problem or difficulty/i)).toHaveClass('truncate');
    expect(screen.getByText(/To finish something unpleasant/i)).toHaveClass('truncate');
  });

  it('all 3 "over" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To recover from an illness/i)).toHaveAttribute(
      'title',
      'To recover from an illness, a shock, or a bad emotional experience'
    );
    expect(screen.getByText(/To overcome a problem or difficulty/i)).toHaveAttribute(
      'title',
      'To overcome a problem or difficulty'
    );
    expect(screen.getByText(/To finish something unpleasant/i)).toHaveAttribute(
      'title',
      'To finish something unpleasant so you don\'t have to worry about it (often "get it over with")'
    );
  });
});

describe('GetVerbPage — "over" card expand / collapse', () => {
  it('"over" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"It took him two weeks to get over the flu\."/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"We need to get over this technical issue/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I hate performance reviews/i)).not.toBeInTheDocument();
  });

  it('all 3 "over" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/"It took him two weeks to get over the flu\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"We need to get over this technical issue before the software launches\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I hate performance reviews, but let's just do it and get it over with\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "over" non-expandable cards (default image)', () => {
  it('over card has cursor-default class', () => {
    renderPage();
    expandSection('over');
    const card = getCard(/To recover from an illness/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "over" card never renders an image', () => {
    renderPage();
    expandSection('over');
    fireEvent.click(getCard(/To recover from an illness/i));
    expect(within(getCard(/To recover from an illness/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "over" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('over');
    fireEvent.click(getCard(/To recover from an illness/i));
    fireEvent.click(getCard(/To overcome a problem or difficulty/i));
    fireEvent.click(getCard(/To finish something unpleasant/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "over" card does not remove truncate class', () => {
    renderPage();
    expandSection('over');
    fireEvent.click(getCard(/To recover from an illness/i));
    expect(within(getCard(/To recover from an illness/i)).getByText(/"It took him two weeks/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "over" localStorage persistence', () => {
  it('clicking "over" card does not save to localStorage', () => {
    renderPage();
    expandSection('over');
    fireEvent.click(getCard(/To recover from an illness/i));
    expect(localStorage.getItem('getOver_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getOver_section_expanded', 'true');
    localStorage.setItem('getOver_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To recover from an illness/i)).getByText(/"It took him two weeks/i)).toHaveClass('truncate');
  });
});
