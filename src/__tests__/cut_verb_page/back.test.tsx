import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "back" section definitions', () => {
  it('renders definition for reducing spending or consumption', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reduce spending, production, or consumption/i)).toBeInTheDocument();
  });

  it('renders definition for pruning a plant', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To prune a plant to control its growth/i)).toBeInTheDocument();
  });

  it('renders definition for returning to a previous scene', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return to a previous scene/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reduce spending, production, or consumption/i)).toHaveClass('truncate');
    expect(screen.getByText(/To prune a plant to control its growth/i)).toHaveClass('truncate');
    expect(screen.getByText(/To return to a previous scene/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To reduce spending, production, or consumption/i)).toHaveAttribute(
      'title',
      'To reduce spending, production, or consumption.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'cutBack_section_expanded', /To reduce spending, production, or consumption/i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'cutBack', /To reduce spending, production, or consumption/i, /The company is cutting back/i, renderPage, getCard);
