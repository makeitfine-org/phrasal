import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'GoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('GoVerbPage — "together" section definitions', () => {
  it('renders definition for looking good in combination', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To look or sound good in combination/i)).toBeInTheDocument();
  });

  it('renders definition for frequently accompanying each other', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To frequently accompany each other/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'together', 'goTogether_section_expanded', /To look or sound good in combination/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'goTogether', /To look or sound good in combination/i, /"The new logo and the brand colors go together/i, renderPage, getCard);
