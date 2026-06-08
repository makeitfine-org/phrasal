import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BuildVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BuildVerbPage — "to" section definitions', () => {
  it('renders definition for approaching a climax', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually increase and approach a climax, peak, or major event\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually increase and approach a climax, peak, or major event\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To gradually increase and approach a climax, peak, or major event\./i)).toHaveAttribute(
      'title',
      'To gradually increase and approach a climax, peak, or major event.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'buildTo_section_expanded', /To gradually increase and approach a climax, peak, or major event\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'buildTo', /To gradually increase and approach a climax, peak, or major event\./i, /tension in the boardroom was building to a breaking point/i, renderPage, getCard);
