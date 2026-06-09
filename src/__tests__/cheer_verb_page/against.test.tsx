import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheerVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheerVerbPage — "against" section definitions', () => {
  it('renders definition for expressing a desire for someone to fail', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To express a desire for someone or something to fail or lose\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To express a desire for someone or something to fail or lose\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To express a desire for someone or something to fail or lose\./i)).toHaveAttribute(
      'title',
      'To express a desire for someone or something to fail or lose.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'cheerAgainst_section_expanded', /To express a desire for someone or something to fail or lose\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'cheerAgainst', /To express a desire for someone or something to fail or lose\./i, /In a healthy business environment/i, renderPage, getCard);
