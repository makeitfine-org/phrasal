import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MixVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('MixVerbPage — "down" section definitions', () => {
  it('renders definition for combining sound tracks into a final track', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In audio engineering and music production, to combine multiple individual sound tracks/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In audio engineering and music production, to combine multiple individual sound tracks/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/In audio engineering and music production, to combine multiple individual sound tracks/i)).toHaveAttribute(
      'title',
      'In audio engineering and music production, to combine multiple individual sound tracks into one final stereo or mono track.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'mixDown_section_expanded', /In audio engineering and music production, to combine multiple individual sound tracks/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'mixDown', /In audio engineering and music production, to combine multiple individual sound tracks/i, /After recording the vocals and instruments, the sound engineer will mix down the project\./i, renderPage, getCard);
