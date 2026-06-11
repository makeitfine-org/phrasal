import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShowVerbPage — "to" section definitions', () => {
  it('renders definition for escorting someone to a specific location', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To escort or lead someone to a specific location or seat\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To escort or lead someone to a specific location or seat\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To escort or lead someone to a specific location or seat\./i)).toHaveAttribute(
      'title',
      'To escort or lead someone to a specific location or seat.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'showTo_section_expanded', /To escort or lead someone to a specific location or seat\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'showTo', /To escort or lead someone to a specific location or seat\./i, /The host showed us to our table\./i, renderPage, getCard);
