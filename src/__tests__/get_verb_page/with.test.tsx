import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'with', 'getWith_section_expanded', /To understand or adapt to modern trends/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describe('GetVerbPage — "with" section definitions', () => {
  it('"with" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To understand or adapt to modern trends/i)).toHaveClass('truncate');
  });

  it('"with" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To understand or adapt to modern trends/i)).toHaveAttribute(
      'title',
      'To understand or adapt to modern trends or new rules (informal)'
    );
  });
});

describe('GetVerbPage — "with" non-expandable card (default image)', () => {
  it('"with" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"You need to get with the new management strategy/i)).not.toBeInTheDocument();
  });

  it('"with" example visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"You need to get with the new management strategy, or you will be left behind\."/i)).toBeInTheDocument();
  });

  it('with card has cursor-default class', () => {
    renderPage();
    expandSection('with');
    const card = getCard(/To understand or adapt to modern trends/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "with" card never renders an image', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To understand or adapt to modern trends/i));
    expect(within(getCard(/To understand or adapt to modern trends/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking "with" card does not remove truncate class', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To understand or adapt to modern trends/i));
    expect(within(getCard(/To understand or adapt to modern trends/i)).getByText(/"You need to get with/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "with" localStorage persistence', () => {
  it('clicking "with" card does not save to localStorage', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To understand or adapt to modern trends/i));
    expect(localStorage.getItem('getWith_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getWith_section_expanded', 'true');
    localStorage.setItem('getWith_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To understand or adapt to modern trends/i)).getByText(/"You need to get with/i)).toHaveClass('truncate');
  });
});
