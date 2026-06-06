import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TakeVerbPage — "to" section definitions', () => {
  it('renders definition for start liking quickly', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start liking someone or something quickly/i)).toBeInTheDocument();
  });

  it('renders definition for starting a new habit', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start a new habit/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'to', 'takeTo_section_expanded', /To start liking someone or something quickly/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'takeTo', /To start liking someone or something quickly/i, /"The team took to the new manager/i, renderPage, getCard);
