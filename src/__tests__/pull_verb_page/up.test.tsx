import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "up" section definitions', () => {
  it('renders definition for slowing and stopping a vehicle', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slow down and stop a vehicle/i)).toBeInTheDocument();
  });

  it('renders definition for bringing info onto a screen', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To bring information onto a computer screen/i)).toBeInTheDocument();
  });

  it('renders definition for correcting someone for a mistake', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To correct or criticize someone for a mistake/i)).toBeInTheDocument();
  });

  it('renders definition for moving furniture closer', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To move a piece of furniture closer/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slow down and stop a vehicle/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To slow down and stop a vehicle/i)).toHaveAttribute(
      'title',
      'To slow down and stop a vehicle.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'pullUp_section_expanded', /To slow down and stop a vehicle/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'pullUp', /To slow down and stop a vehicle/i, /A black taxi pulled up outside/i, renderPage, getCard);
