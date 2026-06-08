import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BeVerbPage — "against" section definitions', () => {
  it('renders definition for opposing something', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose someone or something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose someone or something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('against');
    expect(screen.getByText(/To oppose someone or something\./i)).toHaveAttribute(
      'title',
      'To oppose someone or something.'
    );
  });
});

describeSectionToggle(LABEL, 'against', 'beAgainst_section_expanded', /To oppose someone or something\./i, renderPage);

describeChevronAndColour(LABEL, 'against', renderPage);

describeDefaultImageCards(LABEL, 'against', 'beAgainst', /To oppose someone or something\./i, /Many users are against the new interface changes/i, renderPage, getCard);
