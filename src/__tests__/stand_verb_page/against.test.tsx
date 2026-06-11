import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'StandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('StandVerbPage — "against" section definitions', () => {
  it('renders definition for opposing someone or something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or fight against someone or something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or fight against someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose or fight against someone or something\./i)).toHaveAttribute(
      'title',
      'To oppose or fight against someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'standAgainst_section_expanded', /To oppose or fight against someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'standAgainst', /To oppose or fight against someone or something\./i, /The team leader stood against the new policy because it was bad for productivity\./i, renderPage, getCard);
