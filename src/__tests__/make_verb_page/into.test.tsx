import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'into', 'makeInto_section_expanded', /To change or transform something into something else/i, renderPage);

describe(`${LABEL} — "into" section independence`, () => {
  it('collapsing "into" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('into');
    fireEvent.click(screen.getByText('into'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'into', renderPage);

describe('MakeVerbPage — "into" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/"The developers made the old legacy system into a modern Java application\."/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('into');
    fireEvent.click(getCard(/To change or transform something into something else/i));
    expect(within(getCard(/To change or transform something into something else/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'into', 'makeInto', /To change or transform something into something else/i, /"The developers made the old legacy system/i, renderPage, getCard);
