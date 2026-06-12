import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ZipVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ZipVerbPage — "into" section definitions', () => {
  it('renders definition for putting on clothing rapidly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To put on a piece of clothing rapidly\./i)).toBeInTheDocument();
  });

  it('renders definition for maneuvering into a space quickly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To maneuver a vehicle or oneself into a space quickly\./i)).toBeInTheDocument();
  });

  it('all 2 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('into');
    const defs = [
      screen.getByText(/To put on a piece of clothing rapidly\./i),
      screen.getByText(/To maneuver a vehicle or oneself into a space quickly\./i),
    ];
    defs.forEach(el => expect(el).toHaveClass('truncate'));
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To put on a piece of clothing rapidly\./i)).toHaveAttribute(
      'title',
      'To put on a piece of clothing rapidly.'
    );
  });

  it('second definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To maneuver a vehicle or oneself into a space quickly\./i)).toHaveAttribute(
      'title',
      'To maneuver a vehicle or oneself into a space quickly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'zipInto_section_expanded', /To put on a piece of clothing rapidly\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'zipInto', /To put on a piece of clothing rapidly\./i, /She zipped into her wetsuit and ran toward the ocean\./i, renderPage, getCard);
