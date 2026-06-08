import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "up" section definitions', () => {
  it('renders definition for separating into smaller pieces', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To separate into smaller pieces/i)).toBeInTheDocument();
  });

  it('renders definition for ending a romantic relationship', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end a romantic relationship or marriage/i)).toBeInTheDocument();
  });

  it('renders definition for dispersing a crowd or stopping a fight', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To force a crowd to disperse or to stop a fight/i)).toBeInTheDocument();
  });

  it('renders definition for dividing into smaller manageable parts', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To divide something into smaller, manageable parts/i)).toBeInTheDocument();
  });

  it('renders definition for losing audio signal', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To lose audio signal \(telecommunications\)/i)).toBeInTheDocument();
  });

  it('renders definition for ending the school term', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To end the school term for holidays/i)).toBeInTheDocument();
  });

  it('renders definition for bursting into laughter', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To burst into laughter, or make someone else laugh/i)).toBeInTheDocument();
  });

  it('all 7 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To separate into smaller pieces/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end a romantic relationship or marriage/i)).toHaveClass('truncate');
    expect(screen.getByText(/To force a crowd to disperse or to stop a fight/i)).toHaveClass('truncate');
    expect(screen.getByText(/To divide something into smaller, manageable parts/i)).toHaveClass('truncate');
    expect(screen.getByText(/To lose audio signal \(telecommunications\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To end the school term for holidays/i)).toHaveClass('truncate');
    expect(screen.getByText(/To burst into laughter, or make someone else laugh/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To separate into smaller pieces/i)).toHaveAttribute(
      'title',
      'To separate into smaller pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'breakUp_section_expanded', /To separate into smaller pieces/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'breakUp', /To separate into smaller pieces/i, /The ship broke up on the rocks/i, renderPage, getCard);
