import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WatchVerbPage — "over" section definitions', () => {
  it('renders definition for protecting or caring for someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To protect, guard, or care for someone or something\./i)).toBeInTheDocument();
  });

  it('renders definition for strictly supervising someone', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To strictly supervise someone or an activity to ensure it is done correctly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To protect, guard, or care for someone or something\./i),
      screen.getByText(/To strictly supervise someone or an activity to ensure it is done correctly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To protect, guard, or care for someone or something\./i)).toHaveAttribute(
      'title',
      'To protect, guard, or care for someone or something.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To strictly supervise someone or an activity to ensure it is done correctly\./i)).toHaveAttribute(
      'title',
      'To strictly supervise someone or an activity to ensure it is done correctly.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'watchOver_section_expanded', /To protect, guard, or care for someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'watchOver', /To protect, guard, or care for someone or something\./i, /The shepherd watched over his flock of sheep through the night\./i, renderPage, getCard);
