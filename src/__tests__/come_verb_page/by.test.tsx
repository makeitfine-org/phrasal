import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ComeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ComeVerbPage — "by" section definitions', () => {
  it('renders definition for obtaining something rare', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To get or obtain something, especially something that is rare or hard to find/i)).toBeInTheDocument();
  });

  it('renders definition for making a short visit', () => {
    renderPage();
    expandSection('by');
    expect(screen.getByText(/To make a short, casual visit/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'by', 'comeBy_section_expanded', /To get or obtain something, especially something that is rare or hard to find/i, renderPage);

describeChevronAndColour(LABEL, 'by', renderPage);

describeDefaultImageCards(LABEL, 'by', 'comeBy', /To get or obtain something, especially something that is rare or hard to find/i, /"Experienced Senior Java Developers are hard to come by these days/i, renderPage, getCard);
