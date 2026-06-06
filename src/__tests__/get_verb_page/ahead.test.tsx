import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

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

describe('GetVerbPage — "ahead" card', () => {
  it('"ahead" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"She reads a lot of business books/i)).not.toBeInTheDocument();
  });

  it('"ahead" example visible without expanding card', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/"She reads a lot of business books because she wants to get ahead in her career\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'ahead', 'getAhead', /To be successful and make progress/i, /"She reads a lot of business books/i, renderPage, getCard);
