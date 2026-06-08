import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "up" section definitions', () => {
  it('renders definition for chopping into pieces', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To chop into small pieces/i)).toBeInTheDocument();
  });

  it('renders definition for acting silly', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To act silly or cause a playful disruption/i)).toBeInTheDocument();
  });

  it('renders definition for upsetting someone emotionally', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To deeply upset someone emotionally/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing severely', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To severely criticize/i)).toBeInTheDocument();
  });

  it("renders definition for driving aggressively across someone's path", () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To drive aggressively across someone's path/i)).toBeInTheDocument();
  });

  it('all 5 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To chop into small pieces/i)).toHaveClass('truncate');
    expect(screen.getByText(/To act silly or cause a playful disruption/i)).toHaveClass('truncate');
    expect(screen.getByText(/To deeply upset someone emotionally/i)).toHaveClass('truncate');
    expect(screen.getByText(/To severely criticize/i)).toHaveClass('truncate');
    expect(screen.getByText(/To drive aggressively across someone's path/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To chop into small pieces/i)).toHaveAttribute(
      'title',
      'To chop into small pieces.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'cutUp_section_expanded', /To chop into small pieces/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'cutUp', /To chop into small pieces/i, /Could you cut up the carrots/i, renderPage, getCard);
