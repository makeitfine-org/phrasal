import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BrushVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BrushVerbPage — "on" section definitions', () => {
  it('renders definition for applying liquid with a brush', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply a liquid.*to a surface using a brush\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply a liquid.*to a surface using a brush\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To apply a liquid.*to a surface using a brush\./i)).toHaveAttribute(
      'title',
      'To apply a liquid (like paint, glue, or a sauce) to a surface using a brush.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'brushOn_section_expanded', /To apply a liquid.*to a surface using a brush\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'brushOn', /To apply a liquid.*to a surface using a brush\./i, /Brush on a light coat of varnish/i, renderPage, getCard);
