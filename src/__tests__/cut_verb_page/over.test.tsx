import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "over" section definitions', () => {
  it('renders definition for switching to a new system', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To switch from an old system to a new one/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To switch from an old system to a new one/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To switch from an old system to a new one/i)).toHaveAttribute(
      'title',
      'To switch from an old system to a new one (IT/Business context).'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'cutOver_section_expanded', /To switch from an old system to a new one/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'cutOver', /To switch from an old system to a new one/i, /The engineering team will cut over/i, renderPage, getCard);
