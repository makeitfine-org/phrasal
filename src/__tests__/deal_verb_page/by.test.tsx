import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DealVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DealVerbPage — "by" section definitions', () => {
  it('renders definition for treating someone in a particular way', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way \(formal \/ old-fashioned\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way \(formal \/ old-fashioned\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To treat someone in a particular way \(formal \/ old-fashioned\)\./i)).toHaveAttribute(
      'title',
      'To treat someone in a particular way (formal / old-fashioned).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'dealBy_section_expanded', /To treat someone in a particular way \(formal \/ old-fashioned\)\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'dealBy', /To treat someone in a particular way \(formal \/ old-fashioned\)\./i, /she had been dealt by unfairly in the promotion process/i, renderPage, getCard);
