import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "over" section definitions', () => {
  it('renders definition for doing something again because it was wrong', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To do something again because it was wrong the first time/i)).toBeInTheDocument();
  });

  it('renders definition for attacking and beating someone up', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To attack and beat someone up \(UK informal\)\./i)).toBeInTheDocument();
  });

  it('renders definition for burgling or robbing a place', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To burgle or rob a place \(UK informal\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To do something again because it was wrong the first time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To do something again because it was wrong the first time/i)).toHaveAttribute(
      'title',
      'To do something again because it was wrong the first time (mainly US English).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'doOver_section_expanded', /To do something again because it was wrong the first time/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'doOver', /To do something again because it was wrong the first time/i, /you need to do it over/i, renderPage, getCard);
