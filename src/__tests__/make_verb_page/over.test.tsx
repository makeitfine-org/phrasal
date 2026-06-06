import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'over', 'makeOver_section_expanded', /To change or improve the appearance/i, renderPage);

describe(`${LABEL} — "over" section independence`, () => {
  it('collapsing "over" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('over');
    fireEvent.click(screen.getByText('over'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'over', renderPage);

describe('MakeVerbPage — "over" section definitions', () => {
  it('all 2 "over" definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To change or improve the appearance/i)).toHaveClass('truncate');
    expect(screen.getByText(/To legally transfer ownership/i)).toHaveClass('truncate');
  });

  it('all 2 "over" title attributes contain the full definition text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To change or improve the appearance/i))
      .toHaveAttribute('title', 'To change or improve the appearance of someone or something');
    expect(screen.getByText(/To legally transfer ownership/i))
      .toHaveAttribute('title', 'To legally transfer ownership of property or money to someone else');
  });
});

describe('MakeVerbPage — "over" card view (default image)', () => {
  it('both examples visible without expanding cards', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/"We made over the entire office space/i)).toBeInTheDocument();
    expect(screen.getByText(/"The CEO made over his shares/i)).toBeInTheDocument();
  });

  it('cards have cursor-default class', () => {
    renderPage();
    expandSection('over');
    expect(getCard(/To change or improve the appearance/i)).toHaveClass('cursor-default');
    expect(getCard(/To legally transfer ownership/i)).toHaveClass('cursor-default');
  });

  it('clicking cards does not render images', () => {
    renderPage();
    expandSection('over');
    fireEvent.click(getCard(/To change or improve the appearance/i));
    fireEvent.click(getCard(/To legally transfer ownership/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});
