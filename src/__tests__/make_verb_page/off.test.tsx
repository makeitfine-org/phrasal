import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'off (with)', 'makeOff_section_expanded', /To leave quickly, especially to escape/i, renderPage);

describe(`${LABEL} — "off (with)" section independence`, () => {
  it('collapsing "off (with)" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('off (with)');
    fireEvent.click(screen.getByText('off (with)'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'off (with)', renderPage);

describe('MakeVerbPage — "off (with)" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('off (with)');
    expect(screen.getByText(/"The thieves made off before the police arrived\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('off (with)');
    fireEvent.click(getCard(/To leave quickly, especially to escape/i));
    expect(within(getCard(/To leave quickly, especially to escape/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'off (with)', 'makeOff', /To leave quickly, especially to escape/i, /"The thieves made off/i, renderPage, getCard);
