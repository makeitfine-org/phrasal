import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShutVerbPage — "out" section definitions', () => {
  it('renders definition for preventing something from entering', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent something from entering a place \(like light or noise\)\./i)).toBeInTheDocument();
  });

  it('renders definition for excluding someone from an activity', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To exclude someone from an activity, or from your thoughts and feelings\./i)).toBeInTheDocument();
  });

  it('renders definition for preventing an opposing team from scoring', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent an opposing team from scoring any points/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent something from entering a place \(like light or noise\)\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To exclude someone from an activity, or from your thoughts and feelings\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To prevent an opposing team from scoring any points/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To prevent something from entering a place \(like light or noise\)\./i)).toHaveAttribute(
      'title',
      'To prevent something from entering a place (like light or noise).'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'shutOut_section_expanded', /To prevent something from entering a place \(like light or noise\)\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'shutOut', /To prevent something from entering a place \(like light or noise\)\./i, /We use heavy curtains to shut out the street lights at night\./i, renderPage, getCard);
