import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "off" section definitions', () => {
  it('renders definition for removing a layer by eating or corrosion', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a layer or surface by eating, chewing, or chemical corrosion\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a layer or surface by eating, chewing, or chemical corrosion\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove a layer or surface by eating, chewing, or chemical corrosion\./i)).toHaveAttribute(
      'title',
      'To remove a layer or surface by eating, chewing, or chemical corrosion.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'eatOff_section_expanded', /To remove a layer or surface by eating, chewing, or chemical corrosion\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'eatOff', /To remove a layer or surface by eating, chewing, or chemical corrosion\./i, /The dog chewed the furniture so aggressively that he ate the varnish off\./i, renderPage, getCard);
