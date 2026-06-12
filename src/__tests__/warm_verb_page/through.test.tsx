import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'WarmVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('WarmVerbPage — "through" section definitions', () => {
  it('renders definition for heating food to the middle', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    const def = screen.getByText(/To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i);
    expect(def).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i)).toHaveAttribute(
      'title',
      'To heat food gently until it is warm right to the middle without cooking it further or changing its texture.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'warmThrough_section_expanded', /To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'warmThrough', /To heat food gently until it is warm right to the middle without cooking it further or changing its texture\./i, /Just put the tortillas in the oven for a few minutes to warm through\./i, renderPage, getCard);
