import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "over" section definitions', () => {
  it('renders definition for going beyond a time limit', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To go beyond a time limit/i)).toBeInTheDocument();
  });

  it('renders definition for quickly reviewing something', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To quickly review or explain something/i)).toBeInTheDocument();
  });

  it('renders definition for hitting with a vehicle', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To hit with a vehicle/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To go beyond a time limit/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To go beyond a time limit/i)).toHaveAttribute(
      'title',
      'To go beyond a time limit.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'runOver_section_expanded', /To go beyond a time limit/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'runOver', /To go beyond a time limit/i, /The project review ran over its scheduled time/i, renderPage, getCard);
