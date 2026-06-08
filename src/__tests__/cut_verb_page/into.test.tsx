import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "into" section definitions', () => {
  it('renders definition for slicing or penetrating', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To slice or penetrate a physical object/i)).toBeInTheDocument();
  });

  it('renders definition for consuming something valuable', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To consume a portion of something valuable/i)).toBeInTheDocument();
  });

  it('renders definition for interrupting (similar to cut in)', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To interrupt \(similar to cut in\)/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To slice or penetrate a physical object/i)).toHaveClass('truncate');
    expect(screen.getByText(/To consume a portion of something valuable/i)).toHaveClass('truncate');
    expect(screen.getByText(/To interrupt \(similar to cut in\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To slice or penetrate a physical object/i)).toHaveAttribute(
      'title',
      'To slice or penetrate a physical object.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'cutInto_section_expanded', /To slice or penetrate a physical object/i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'cutInto', /To slice or penetrate a physical object/i, /The sharp wire cut into my skin/i, renderPage, getCard);
