import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CastVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CastVerbPage — "on" section definitions', () => {
  it('renders definition for knitting cast on', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To create the very first row of stitches on a needle/i)).toBeInTheDocument();
  });
});

describeSectionToggle(LABEL, 'on', 'castOn_section_expanded', /To create the very first row of stitches on a needle/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'castOn', /To create the very first row of stitches on a needle/i, /"She cast on fifty stitches/i, renderPage, getCard);
