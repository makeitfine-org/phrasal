import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FallVerbPage — "into" section definitions', () => {
  it('renders definition for starting something by chance', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To start doing something by chance, rather than by plan \(like a career\)\./i)).toBeInTheDocument();
  });

  it('renders definition for being naturally divided into categories', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To be naturally divided into categories\./i)).toBeInTheDocument();
  });

  it('renders definition for entering a specific state', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To enter a specific state or condition\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To start doing something by chance, rather than by plan \(like a career\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To start doing something by chance, rather than by plan \(like a career\)\./i)).toHaveAttribute(
      'title',
      'To start doing something by chance, rather than by plan (like a career).'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'fallInto_section_expanded', /To start doing something by chance, rather than by plan \(like a career\)\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'fallInto', /To start doing something by chance, rather than by plan \(like a career\)\./i, /I didn't study management; I just fell into it\./i, renderPage, getCard);
