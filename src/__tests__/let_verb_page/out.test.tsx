import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "out" section definitions', () => {
  it('renders definition for allowing someone to leave', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To allow a person or animal to leave a place/i)).toBeInTheDocument();
  });

  it('renders definition for making clothing wider', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To make clothing wider/i)).toBeInTheDocument();
  });

  it('renders definition for suddenly making a sound', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To suddenly make a sound/i)).toBeInTheDocument();
  });

  it('renders definition for a class or meeting finishing', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/When a class, school, or meeting finishes/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To allow a person or animal to leave a place/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To allow a person or animal to leave a place/i)).toHaveAttribute(
      'title',
      'To allow a person or animal to leave a place.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'letOut_section_expanded', /To allow a person or animal to leave a place/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'letOut', /To allow a person or animal to leave a place/i, /Someone left the gate open and let the dogs out\./i, renderPage, getCard);
