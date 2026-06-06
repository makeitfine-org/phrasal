import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "apart" section definitions', () => {
  it('renders definition for breaking into pieces or failing', () => {
    renderPage();
    expandSection('apart');
    expect(screen.getByText(/To break into pieces or fail completely/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'apart', 'comeApart_section_expanded', /To break into pieces or fail completely/i, renderPage);

describeChevronAndColour(LABEL, 'apart', renderPage);

describeDefaultImageCards(LABEL, 'apart', 'comeApart', /To break into pieces or fail completely/i, /"The legacy system is so old that its architecture is starting to come apart/i, renderPage, getCard);
