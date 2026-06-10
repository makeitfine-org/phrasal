import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "apart" section definitions', () => {
  it('renders definition for separating people that are fighting', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate people or animals that are fighting/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing heavily', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To criticize heavily to show the flaws in something/i)).toBeInTheDocument();
  });

  it('renders definition for breaking into pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To break or tear something into pieces/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate people or animals that are fighting/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To separate people or animals that are fighting/i)).toHaveAttribute(
      'title',
      'To separate people or animals that are fighting.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'pullApart_section_expanded', /To separate people or animals that are fighting/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'pullApart', /To separate people or animals that are fighting/i, /The referee had to pull the two players apart/i, renderPage, getCard);
