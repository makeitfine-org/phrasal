import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "with" section definitions', () => {
  it('renders definition for matching or suiting something', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To match or suit something/i)).toBeInTheDocument();
  });

  it('renders definition for choosing or accepting an idea', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To choose or accept an idea or offer/i)).toBeInTheDocument();
  });

  it('renders definition for accompanying someone', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To accompany someone/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'with', 'goWith_section_expanded', /To match or suit something/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'goWith', /To match or suit something/i, /"That font doesn't go with the website/i, renderPage, getCard);
