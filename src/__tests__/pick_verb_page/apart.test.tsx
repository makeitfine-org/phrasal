import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "apart" section definitions', () => {
  it('renders definition for pulling something into separate physical pieces', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To pull something into separate physical pieces/i)).toBeInTheDocument();
  });

  it('renders definition for finding mistakes or flaws in an idea', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To find all the mistakes or flaws in an idea or argument/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To pull something into separate physical pieces/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To pull something into separate physical pieces/i)).toHaveAttribute(
      'title',
      'To pull something into separate physical pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'apart', 'pickApart_section_expanded', /To pull something into separate physical pieces/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'pickApart', /To pull something into separate physical pieces/i, /The birds picked the piece of bread apart\./i, renderPage, getCard);
