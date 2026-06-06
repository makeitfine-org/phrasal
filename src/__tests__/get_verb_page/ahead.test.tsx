import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'ahead', 'getAhead_section_expanded', /To be successful and make progress/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describe('GetVerbPage — "ahead" section definitions', () => {
  it('"ahead" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be successful and make progress/i)).toHaveClass('truncate');
  });

  it('"ahead" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To be successful and make progress/i)).toHaveAttribute(
      'title',
      'To be successful and make progress in your career or life'
    );
  });
});

describe('GetVerbPage — "ahead" non-expandable card (default image)', () => {
  it('"ahead" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"She reads a lot of business books/i)).not.toBeInTheDocument();
  });

  it('"ahead" example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"She reads a lot of business books because she wants to get ahead in her career\."/i)).toBeInTheDocument();
  });

  it('ahead card has cursor-default class', () => {
    renderPage();
    expandSection('ahead');
    const card = getCard(/To be successful and make progress/i);
    expect(card).toHaveClass('cursor-default');
    expect(card).not.toHaveClass('cursor-pointer');
  });

  it('clicking "ahead" card never renders an image', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To be successful and make progress/i));
    expect(within(getCard(/To be successful and make progress/i)).queryByRole('img')).not.toBeInTheDocument();
  });

  it('clicking "ahead" card does not remove truncate class', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To be successful and make progress/i));
    expect(within(getCard(/To be successful and make progress/i)).getByText(/"She reads a lot of business books/i)).toHaveClass('truncate');
  });
});

describe('GetVerbPage — "ahead" localStorage persistence', () => {
  it('clicking "ahead" card does not save to localStorage', () => {
    renderPage();
    expandSection('ahead');
    fireEvent.click(getCard(/To be successful and make progress/i));
    expect(localStorage.getItem('getAhead_meaning_1_collapsed')).toBeNull();
  });

  it('ignores localStorage expanded state for default image cards', () => {
    localStorage.setItem('getAhead_section_expanded', 'true');
    localStorage.setItem('getAhead_meaning_1_collapsed', 'false');
    renderPage();
    expect(within(getCard(/To be successful and make progress/i)).getByText(/"She reads a lot of business books/i)).toHaveClass('truncate');
  });
});
