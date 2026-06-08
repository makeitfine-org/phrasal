import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "by" section definitions', () => {
  it('renders definition for time passing quickly', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass very quickly \(usually referring to time\)\./i)).toBeInTheDocument();
  });

  it('renders definition for moving past a competitor', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To easily move past a competitor or obstacle\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass very quickly \(usually referring to time\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To pass very quickly \(usually referring to time\)\./i)).toHaveAttribute(
      'title',
      'To pass very quickly (usually referring to time).'
    );
  });
});

describeSectionToggle(LABEL, 'by', 'blowBy_section_expanded', /To pass very quickly \(usually referring to time\)\./i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'blowBy', /To pass very quickly \(usually referring to time\)\./i, /The weekend just blew by/i, renderPage, getCard);
