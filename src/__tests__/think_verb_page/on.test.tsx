import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ThinkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ThinkVerbPage — "on" section definitions', () => {
  it('renders definition for spending time considering something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time considering something/i)).toBeInTheDocument();
  });

  it('renders definition for keeping something in mind', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To keep in mind or remember/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('on');
    const defs = [
      screen.getByText(/To spend time considering something/i),
      screen.getByText(/To keep in mind or remember/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To spend time considering something/i)).toHaveAttribute(
      'title',
      'To spend time considering something — similar to "think about," meaning to reflect on a decision or idea.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To keep in mind or remember/i)).toHaveAttribute(
      'title',
      'To keep in mind or remember (mainly British/informal).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'thinkOn_section_expanded', /To spend time considering something/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'thinkOn', /To spend time considering something/i, /It is a strong offer, but I need to think on it for a few days\./i, renderPage, getCard);
