import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "over" section definitions', () => {
  it('renders definition for discussing a plan carefully', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To discuss a plan or problem carefully before making a decision\./i)).toBeInTheDocument();
  });

  it('renders definition for speaking louder than someone else', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To speak louder than someone else to interrupt them\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('over');
    const defs = [
      screen.getByText(/To discuss a plan or problem carefully before making a decision\./i),
      screen.getByText(/To speak louder than someone else to interrupt them\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To discuss a plan or problem carefully before making a decision\./i)).toHaveAttribute(
      'title',
      'To discuss a plan or problem carefully before making a decision.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To speak louder than someone else to interrupt them\./i)).toHaveAttribute(
      'title',
      'To speak louder than someone else to interrupt them.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'talkOver_section_expanded', /To discuss a plan or problem carefully before making a decision\./i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'talkOver', /To discuss a plan or problem carefully before making a decision\./i, /Let's talk over the contract before we sign it\./i, renderPage, getCard);
