import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'through', 'getThrough_section_expanded', /To finish a difficult task or survive a difficult period/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describe('GetVerbPage — "through" section definitions', () => {
  it('all 3 "through" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To finish a difficult task or survive a difficult period/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make contact by telephone/i)).toHaveClass('truncate');
    expect(screen.getByText(/To make someone understand something/i)).toHaveClass('truncate');
  });

  it('all 3 "through" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To finish a difficult task or survive a difficult period/i)).toHaveAttribute(
      'title',
      'To finish a difficult task or survive a difficult period'
    );
    expect(screen.getByText(/To make contact by telephone/i)).toHaveAttribute(
      'title',
      'To make contact by telephone'
    );
    expect(screen.getByText(/To make someone understand something/i)).toHaveAttribute(
      'title',
      'To make someone understand something (often "get through to")'
    );
  });
});

describe('GetVerbPage — "through" card expand / collapse', () => {
  it('"through" cards start collapsed (no examples visible)', () => {
    renderPage();
    expect(screen.queryByText(/"We just need to get through this busy week/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I tried to call customer service/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/"I've explained the risks/i)).not.toBeInTheDocument();
  });

  it('all 3 "through" example sentences visible without expanding cards', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/"We just need to get through this busy week, and then we can relax\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I tried to call customer service, but I couldn't get through\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"I've explained the risks, but I just can't get through to him\."/i)).toBeInTheDocument();
  });
});

describe('GetVerbPage — "through" non-expandable cards (default image)', () => {
  it('through card has cursor-default class', () => {
    renderPage();
    expandSection('through');
    const card = getCard(/To finish a difficult task or survive a difficult period/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "through" card never renders an image', () => {
    renderPage();
    expandSection('through');
    fireEvent.click(getCard(/To finish a difficult task or survive a difficult period/i));
    expect(within(getCard(/To finish a difficult task or survive a difficult period/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('no "through" card ever renders an image regardless of clicks', () => {
    renderPage();
    expandSection('through');
    fireEvent.click(getCard(/To finish a difficult task or survive a difficult period/i));
    fireEvent.click(getCard(/To make contact by telephone/i));
    fireEvent.click(getCard(/To make someone understand something/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });

  it('clicking "through" card does not remove truncate class', () => {
    renderPage();
    expandSection('through');
    fireEvent.click(getCard(/To finish a difficult task or survive a difficult period/i));
    expect(within(getCard(/To finish a difficult task or survive a difficult period/i)).getByText(/"We just need to get through/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "through" localStorage persistence', () => {
  it('clicking "through" card does not save to localStorage', () => {
    renderPage();
    expandSection('through');
    fireEvent.click(getCard(/To finish a difficult task or survive a difficult period/i));
    expect(localStorage.getItem('getThrough_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getThrough_section_expanded', 'true');
    localStorage.setItem('getThrough_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To finish a difficult task or survive a difficult period/i)).getByText(/"We just need to get through/i)).toHaveClass('truncate');
  });
});
