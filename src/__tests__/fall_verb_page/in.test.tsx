import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "in" section definitions', () => {
  it('renders definition for collapsing inwards', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collapse inwards \(like a roof, wall, or ceiling\)\./i)).toBeInTheDocument();
  });

  it('renders definition for forming a line', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To form a line \(military\)\./i)).toBeInTheDocument();
  });

  it('renders definition for agreeing to a plan', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To agree to a plan or join a group of people \(fall in with\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collapse inwards \(like a roof, wall, or ceiling\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To collapse inwards \(like a roof, wall, or ceiling\)\./i)).toHaveAttribute(
      'title',
      'To collapse inwards (like a roof, wall, or ceiling).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'fallIn_section_expanded', /To collapse inwards \(like a roof, wall, or ceiling\)\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'fallIn', /To collapse inwards \(like a roof, wall, or ceiling\)\./i, /The roof of the old warehouse fell in under the heavy snow\./i, renderPage, getCard);
