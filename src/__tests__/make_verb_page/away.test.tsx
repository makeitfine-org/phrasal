import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'away (with)', 'makeAway_section_expanded', /To steal something and escape with it/i, renderPage);

describe(`${LABEL} — "away (with)" section independence`, () => {
  it('collapsing "away (with)" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('away (with)');
    fireEvent.click(screen.getByText('away (with)'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'away (with)', renderPage);

describe('MakeVerbPage — "away (with)" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('away (with)');
    expect(screen.getByText(/"Hackers made away with thousands of encrypted passwords\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('away (with)');
    fireEvent.click(getCard(/To steal something and escape with it/i));
    expect(within(getCard(/To steal something and escape with it/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'away (with)', 'makeAway', /To steal something and escape with it/i, /"Hackers made away with/i, renderPage, getCard);
