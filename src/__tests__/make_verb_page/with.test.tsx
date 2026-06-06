import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'with', 'makeWith_section_expanded', /To produce, supply, or give something quickly/i, renderPage);

describe(`${LABEL} — "with" section independence`, () => {
  it('collapsing "with" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('with');
    fireEvent.click(screen.getByText('with'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'with', renderPage);

describe('MakeVerbPage — "with" card view (default image)', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/"Make with the financial reports, the board is waiting!"/i)).toBeInTheDocument();
  });

  it('card has cursor-default class', () => {
    renderPage();
    expandSection('with');
    const card = getCard(/To produce, supply, or give something quickly/i);
    expect(card).toHaveClass('cursor-default');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('with');
    fireEvent.click(getCard(/To produce, supply, or give something quickly/i));
    expect(within(getCard(/To produce, supply, or give something quickly/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});
