import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BlowVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BlowVerbPage — "up" section definitions', () => {
  it('renders definition for exploding', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or be destroyed by an explosion\./i)).toBeInTheDocument();
  });

  it('renders definition for inflating', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To fill something with air \(inflate\)\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming angry', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To suddenly become very angry\./i)).toBeInTheDocument();
  });

  it('renders definition for enlarging a photograph', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To enlarge a photograph or image\./i)).toBeInTheDocument();
  });

  it('renders definition for becoming popular', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To suddenly become very popular or successful\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or be destroyed by an explosion\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To explode or be destroyed by an explosion\./i)).toHaveAttribute(
      'title',
      'To explode or be destroyed by an explosion.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'blowUp_section_expanded', /To explode or be destroyed by an explosion\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'blowUp', /To explode or be destroyed by an explosion\./i, /the car blew up behind him/i, renderPage, getCard);
