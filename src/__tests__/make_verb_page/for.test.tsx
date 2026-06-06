import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'for', 'makeFor_section_expanded', /To move directly towards a place/i, renderPage);

describe(`${LABEL} — "for" section independence`, () => {
  it('collapsing "for" section does not affect other sections', () => {
    renderPage();
    expandSection('after');
    expandSection('out');
    expandSection('for');
    fireEvent.click(screen.getByText('for'));
    expect(screen.getByText(/To chase someone or something/i)).toBeInTheDocument();
    expect(screen.getByText(/To manage to see, hear, or read something with difficulty/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'for', renderPage);

describe('MakeVerbPage — "for" section definitions', () => {
  it('all 2 "for" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To move directly towards a place/i)).toHaveClass('truncate');
    expect(screen.getByText(/To help make something possible/i)).toHaveClass('truncate');
  });

  it('all 2 "for" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/To move directly towards a place/i))
      .toHaveAttribute('title', 'To move directly towards a place');
    expect(screen.getByText(/To help make something possible/i))
      .toHaveAttribute('title', 'To help make something possible or produce a specific result');
  });
});

describe('MakeVerbPage — "for" card view', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('for');
    expect(screen.getByText(/"After the meeting ended, we made for the exit\."/i)).toBeInTheDocument();
    expect(screen.getByText(/"Clear communication makes for a highly effective management team\."/i)).toBeInTheDocument();
  });

  it('card example has title attribute with quoted text', () => {
    renderPage();
    expandSection('for');
    const card = getCard(/To move directly towards a place/i);
    expect(within(card).getByText(/"After the meeting ended/i))
      .toHaveAttribute('title', '"After the meeting ended, we made for the exit."');
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('for');
    fireEvent.click(getCard(/To move directly towards a place/i));
    expect(within(getCard(/To move directly towards a place/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'for', 'makeFor', /To move directly towards a place/i, /"After the meeting ended, we made for the exit/i, renderPage, getCard);
