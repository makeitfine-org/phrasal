import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "through" section definitions', () => {
  it('renders definition for practicing something from beginning to end', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practice, review, or explain something from beginning to end/i)).toBeInTheDocument();
  });

  it('renders definition for spending money very quickly', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To spend money very quickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practice, review, or explain something from beginning to end/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To practice, review, or explain something from beginning to end/i)).toHaveAttribute(
      'title',
      'To practice, review, or explain something from beginning to end.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'runThrough_section_expanded', /To practice, review, or explain something from beginning to end/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'runThrough', /To practice, review, or explain something from beginning to end/i, /The team ran through the deployment steps/i, renderPage, getCard);
