import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'forward', 'getForward_section_expanded', /To move to the front/i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describe('GetVerbPage — "forward" section definitions', () => {
  it('"forward" definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move to the front/i)).toHaveClass('truncate');
  });

  it('"forward" title attribute contains the full definition text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To move to the front/i)).toHaveAttribute(
      'title',
      'To move to the front (often used in sports to describe attacking)'
    );
  });
});

describe('GetVerbPage — "forward" card', () => {
  it('"forward" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"The team's defenders need to get forward/i)).not.toBeInTheDocument();
  });

  it('"forward" example visible without expanding card', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/"The team's defenders need to get forward to help score a goal\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'forward', 'getForward', /To move to the front/i, /"The team's defenders/i, renderPage, getCard);
