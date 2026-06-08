import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "away" section definitions', () => {
  it('renders definition for removing unwanted parts', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove the outer or unwanted parts by cutting/i)).toBeInTheDocument();
  });

  it('renders definition for shifting the camera to another scene', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To suddenly shift the camera to another scene/i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove the outer or unwanted parts by cutting/i)).toHaveClass('truncate');
    expect(screen.getByText(/To suddenly shift the camera to another scene/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('away');
    expect(screen.getByText(/To remove the outer or unwanted parts by cutting/i)).toHaveAttribute(
      'title',
      'To remove the outer or unwanted parts by cutting.'
    );
  });
});

describeSectionToggle(LABEL, 'away', 'cutAway_section_expanded', /To remove the outer or unwanted parts by cutting/i, renderPage);

describeChevronAndColour(LABEL, 'away', renderPage);

describeDefaultImageCards(LABEL, 'away', 'cutAway', /To remove the outer or unwanted parts by cutting/i, /The surgeon carefully cut away/i, renderPage, getCard);
