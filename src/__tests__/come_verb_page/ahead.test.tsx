import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "ahead" section definitions', () => {
  it('renders definition for finishing in a winning position', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To finish in a winning, profitable, or advantageous position \(come out ahead\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'ahead', 'comeAhead_section_expanded', /To finish in a winning, profitable, or advantageous position \(come out ahead\)/i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'comeAhead', /To finish in a winning, profitable, or advantageous position \(come out ahead\)/i, /"Despite the economic crisis, our company came out ahead of the competition/i, renderPage, getCard);
