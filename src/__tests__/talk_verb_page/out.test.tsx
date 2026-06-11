import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "out" section definitions', () => {
  it('renders definition for discussing a problem until resolved', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discuss a problem thoroughly until it is completely resolved\./i)).toBeInTheDocument();
  });

  it('renders definition for persuading someone not to do something', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To persuade someone not to do something/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    const defs = [
      screen.getByText(/To discuss a problem thoroughly until it is completely resolved\./i),
      screen.getByText(/To persuade someone not to do something/i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To discuss a problem thoroughly until it is completely resolved\./i)).toHaveAttribute(
      'title',
      'To discuss a problem thoroughly until it is completely resolved.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To persuade someone not to do something/i)).toHaveAttribute(
      'title',
      'To persuade someone not to do something (talk out of).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'talkOut_section_expanded', /To discuss a problem thoroughly until it is completely resolved\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'talkOut', /To discuss a problem thoroughly until it is completely resolved\./i, /We had a disagreement, but we sat down and talked it out\./i, renderPage, getCard);
