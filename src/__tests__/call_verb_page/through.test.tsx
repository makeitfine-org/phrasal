import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "through" section definitions', () => {
  it('renders definition for connecting a phone call', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To connect a phone call to someone else\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To connect a phone call to someone else\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To connect a phone call to someone else\./i)).toHaveAttribute(
      'title',
      'To connect a phone call to someone else.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'callThrough_section_expanded', /To connect a phone call to someone else\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'callThrough', /To connect a phone call to someone else\./i, /receptionist called me through to the HR director/i, renderPage, getCard);
