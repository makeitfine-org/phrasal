import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BreakVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BreakVerbPage — "down" section definitions', () => {
  it('renders definition for machinery stopping working', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(machinery or vehicles\)/i)).toBeInTheDocument();
  });

  it('renders definition for losing control of emotions', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose control of one's emotions and start crying/i)).toBeInTheDocument();
  });

  it('renders definition for negotiations failing', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To fail or collapse \(negotiations, systems, or relationships\)/i)).toBeInTheDocument();
  });

  it('renders definition for dividing information for analysis', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To divide information into smaller parts for easier analysis/i)).toBeInTheDocument();
  });

  it('renders definition for destroying a barrier', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To destroy or remove a barrier or obstacle/i)).toBeInTheDocument();
  });

  it('renders definition for decomposing chemically', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To decompose or separate into basic chemical elements/i)).toBeInTheDocument();
  });

  it('all 6 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(machinery or vehicles\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To lose control of one's emotions and start crying/i)).toHaveClass('truncate');
    expect(screen.getByText(/To fail or collapse \(negotiations, systems, or relationships\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/To divide information into smaller parts for easier analysis/i)).toHaveClass('truncate');
    expect(screen.getByText(/To destroy or remove a barrier or obstacle/i)).toHaveClass('truncate');
    expect(screen.getByText(/To decompose or separate into basic chemical elements/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop working \(machinery or vehicles\)/i)).toHaveAttribute(
      'title',
      'To stop working (machinery or vehicles).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'breakDown_section_expanded', /To stop working \(machinery or vehicles\)/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'breakDown', /To stop working \(machinery or vehicles\)/i, /My car broke down on the highway/i, renderPage, getCard);
