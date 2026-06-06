import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "off" section definitions', () => {
  it('renders definition for happening successfully', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To happen successfully or go exactly as planned/i)).toBeInTheDocument();
  });

  it('renders definition for detaching or being removed', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To detach or be removed from something/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'off', 'comeOff_section_expanded', /To happen successfully or go exactly as planned/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'comeOff', /To happen successfully or go exactly as planned/i, /"The software launch came off without a single major bug/i, renderPage, getCard);
