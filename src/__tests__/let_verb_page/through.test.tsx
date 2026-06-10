import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LetVerbPage — "through" section definitions', () => {
  it('renders definition for allowing someone to pass a barrier', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To allow someone or something to pass a barrier/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To allow someone or something to pass a barrier/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To allow someone or something to pass a barrier/i)).toHaveAttribute(
      'title',
      'To allow someone or something to pass a barrier, a security check, or a test.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'letThrough_section_expanded', /To allow someone or something to pass a barrier/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'letThrough', /To allow someone or something to pass a barrier/i, /The firewall is strictly configured and will not let unauthorized traffic through\./i, renderPage, getCard);
