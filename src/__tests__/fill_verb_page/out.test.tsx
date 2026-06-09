import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FillVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FillVerbPage — "out" section definitions', () => {
  it('renders definition for completing a form (US English)', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To complete a form or document \(US English equivalent of "fill in"\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming larger or heavier', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become larger, heavier, or rounder/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To complete a form or document \(US English equivalent of "fill in"\)\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To complete a form or document \(US English equivalent of "fill in"\)\./i)).toHaveAttribute(
      'title',
      'To complete a form or document (US English equivalent of "fill in").'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'fillOut_section_expanded', /To complete a form or document \(US English equivalent of "fill in"\)\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'fillOut', /To complete a form or document \(US English equivalent of "fill in"\)\./i, /It took me an hour to fill out the tax documents\./i, renderPage, getCard);
