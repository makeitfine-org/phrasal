import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CatchVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CatchVerbPage — "in" section definitions', () => {
  it('renders definition for discovering someone doing something bad', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To discover someone in the middle of doing something \(usually bad\)\./i)).toBeInTheDocument();
  });

  it('renders definition for being trapped in an unavoidable situation', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To be trapped or delayed by an unavoidable situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To discover someone in the middle of doing something \(usually bad\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To discover someone in the middle of doing something \(usually bad\)\./i)).toHaveAttribute(
      'title',
      'To discover someone in the middle of doing something (usually bad).'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'catchIn_section_expanded', /To discover someone in the middle of doing something \(usually bad\)\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'catchIn', /To discover someone in the middle of doing something \(usually bad\)\./i, /The audit team caught the vendor in a lie/i, renderPage, getCard);
