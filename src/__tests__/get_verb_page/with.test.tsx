import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

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

describe('GetVerbPage — "with" card', () => {
  it('"with" card starts collapsed (no example visible before expand)', () => {
    renderPage();
    expect(screen.queryByText(/"You need to get with the new management strategy/i)).not.toBeInTheDocument();
  });

  it('"with" example visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"You need to get with the new management strategy, or you will be left behind\."/i)).toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'with', 'getWith', /To understand or adapt to modern trends/i, /"You need to get with/i, renderPage, getCard);
