import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'after', 'getAfter_section_expanded', /To urge, remind, or scold someone/i, renderPage);

describeChevronAndColour(LABEL, 'after', renderPage);

describe('GetVerbPage — "after" section definitions', () => {
  it('all 2 "after" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To urge, remind, or scold someone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To chase someone or something/i)).toHaveClass('truncate');
  });

  it('all 2 "after" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/To urge, remind, or scold someone/i)).toHaveAttribute(
      'title',
      'To urge, remind, or scold someone to do something they are supposed to do'
    );
    expect(screen.getByText(/To chase someone or something/i)).toHaveAttribute(
      'title',
      'To chase someone or something'
    );
  });
});

describe('GetVerbPage — "after" card expand / collapse', () => {
  it('"after" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"I need to get after the developers/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"The dog got after the cat\."/i)).not.toBeInTheDocument();
  });

  it('all 2 "after" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('after');
    expect(screen.getByText(/"I need to get after the developers to finish writing the code\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"The dog got after the cat\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "after" non-expandable cards (default image)', () => {
  it('after card has cursor-default class', () => {
    renderPage();
    expandSection('after');
    const card = getCard(/To urge, remind, or scold someone/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "after" card never renders an image', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To urge, remind, or scold someone/i));
    expect(within(getCard(/To urge, remind, or scold someone/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "after" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To urge, remind, or scold someone/i));
    fireEvent.click(getCard(/To chase someone or something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "after" card does not remove truncate class', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To urge, remind, or scold someone/i));
    expect(within(getCard(/To urge, remind, or scold someone/i)).getByText(/"I need to get after the developers/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "after" localStorage persistence', () => {
  it('clicking "after" card does not save to localStorage', () => {
    renderPage();
    expandSection('after');
    fireEvent.click(getCard(/To urge, remind, or scold someone/i));
    expect(localStorage.getItem('getAfter_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getAfter_section_expanded', 'true');
    localStorage.setItem('getAfter_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To urge, remind, or scold someone/i)).getByText(/"I need to get after the developers/i)).toHaveClass('truncate');
  });
});
