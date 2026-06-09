import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'EatVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('EatVerbPage — "out" section definitions', () => {
  it('renders definition for eating at a restaurant', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To eat a meal at a restaurant or café rather than cooking at home\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To eat a meal at a restaurant or café rather than cooking at home\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To eat a meal at a restaurant or café rather than cooking at home\./i)).toHaveAttribute(
      'title',
      'To eat a meal at a restaurant or café rather than cooking at home.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'eatOut_section_expanded', /To eat a meal at a restaurant or café rather than cooking at home\./i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'eatOut', /To eat a meal at a restaurant or café rather than cooking at home\./i, /I am far too exhausted to cook, so let's eat out tonight\./i, renderPage, getCard);
