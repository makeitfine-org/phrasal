import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'FigureVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('FigureVerbPage — "on" section definitions', () => {
  it('renders definition for planning on something happening', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To plan on something happening or expect something to be true\./i)).toBeInTheDocument();
  });

  it('renders definition for relying on or trusting someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To rely on or trust someone\/something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To plan on something happening or expect something to be true\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To plan on something happening or expect something to be true\./i)).toHaveAttribute(
      'title',
      'To plan on something happening or expect something to be true.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'figureOn_section_expanded', /To plan on something happening or expect something to be true\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'figureOn', /To plan on something happening or expect something to be true\./i, /We figure on launching the new product by the end of the second quarter\./i, renderPage, getCard);
