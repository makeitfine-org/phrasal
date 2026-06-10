import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MixVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('MixVerbPage — "together" section definitions', () => {
  it('renders definition for blending items into a single substance or group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To blend two or more items so that they become a single substance or group/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To blend two or more items so that they become a single substance or group/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To blend two or more items so that they become a single substance or group/i)).toHaveAttribute(
      'title',
      'To blend two or more items so that they become a single substance or group.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'mixTogether_section_expanded', /To blend two or more items so that they become a single substance or group/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'mixTogether', /To blend two or more items so that they become a single substance or group/i, /In software development, you cannot easily mix together two completely different programming architectures\./i, renderPage, getCard);
