import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "out" section definitions', () => {
  it('renders definition for producing a new product', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce a new product and start selling it/i)).toBeInTheDocument();
  });

  it('renders definition for highlighting a quality', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To highlight or make a particular quality noticeable/i)).toBeInTheDocument();
  });

  it('renders definition for causing a skin reaction', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To cause a physical reaction on the skin \(like a rash\)/i)).toBeInTheDocument();
  });

  it('renders definition for making a shy person more confident', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/\(Bring someone out of their shell\) To make a shy person more confident/i)).toBeInTheDocument();
  });

  it('all 4 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce a new product and start selling it/i)).toHaveClass('truncate');
    expect(screen.getByText(/To highlight or make a particular quality noticeable/i)).toHaveClass('truncate');
    expect(screen.getByText(/To cause a physical reaction on the skin \(like a rash\)/i)).toHaveClass('truncate');
    expect(screen.getByText(/\(Bring someone out of their shell\) To make a shy person more confident/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To produce a new product and start selling it/i)).toHaveAttribute(
      'title',
      'To produce a new product and start selling it, or to publish something.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'bringOut_section_expanded', /To produce a new product and start selling it/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'bringOut', /To produce a new product and start selling it/i, /Apple is bringing out a new iPhone model/i, renderPage, getCard);
