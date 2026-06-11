import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "around / round" section definitions', () => {
  it('renders definition for avoiding the main issue', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To avoid speaking directly about the main issue\./i)).toBeInTheDocument();
  });

  it('renders definition for persuading someone to change their mind', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with you or change their mind\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('around / round');
    const defs = [
      screen.getByText(/To avoid speaking directly about the main issue\./i),
      screen.getByText(/To persuade someone to agree with you or change their mind\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To avoid speaking directly about the main issue\./i)).toHaveAttribute(
      'title',
      'To avoid speaking directly about the main issue.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To persuade someone to agree with you or change their mind\./i)).toHaveAttribute(
      'title',
      'To persuade someone to agree with you or change their mind.'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'talkAround_section_expanded', /To avoid speaking directly about the main issue\./i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'talkAround', /To avoid speaking directly about the main issue\./i, /Stop talking around the problem and tell me what is wrong\./i, renderPage, getCard);
