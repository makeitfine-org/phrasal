import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "out" section definitions', () => {
  it('renders definition for being published or released', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be published, released, or made available to the public/i)).toBeInTheDocument();
  });

  it('renders definition for becoming known', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To become known \(often secrets or truth\)/i)).toBeInTheDocument();
  });

  it('renders definition for being removed like a stain', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To be removed \(like a stain\)/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'out', 'comeOut_section_expanded', /To be published, released, or made available to the public/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'comeOut', /To be published, released, or made available to the public/i, /"The next version of the Java Development Kit comes out next month/i, renderPage, getCard);
