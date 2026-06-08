import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "back" section definitions', () => {
  it('renders definition for returning something to its original place', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original place or owner/i)).toBeInTheDocument();
  });

  it('renders definition for causing someone to remember the past', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To cause someone to remember something from the past/i)).toBeInTheDocument();
  });

  it('renders definition for reintroducing something', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reintroduce something or start doing something again/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original place or owner/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause someone to remember something from the past/i)).toHaveClass('truncate');
    expect(screen.getByText(/To reintroduce something or start doing something again/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return something to its original place or owner/i)).toHaveAttribute(
      'title',
      'To return something to its original place or owner.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'bringBack_section_expanded', /To return something to its original place or owner/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'bringBack', /To return something to its original place or owner/i, /Please bring back the laptop/i, renderPage, getCard);
