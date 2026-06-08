import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ActVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ActVerbPage — "out" section definitions', () => {
  it('renders definition for performing a scene', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform a story, scene/i)).toBeInTheDocument();
  });

  it('renders definition for expressing negative emotions', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To express negative emotions or stress/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform a story, scene/i)).toHaveClass('truncate');
    expect(screen.getByText(/To express negative emotions or stress/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To perform a story, scene/i)).toHaveAttribute(
      'title',
      'To perform a story, scene, or situation using actions and words.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'actOut_section_expanded', /To perform a story, scene/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'actOut', /To perform a story, scene/i, /the developers acted out/i, renderPage, getCard);
