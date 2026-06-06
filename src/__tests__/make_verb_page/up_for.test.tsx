import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'MakeVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'up for', 'makeUpFor_section_expanded', /To compensate for something bad, missing, or lost/i, renderPage);

describe(`${LABEL} — "up for" section independence`, () => {
  it('collapsing "up for" section does not affect other sections', () => {
    renderPage();
    expandSection('for');
    expandSection('up for');
    fireEvent.click(screen.getByText('up for'));
    expect(screen.getByText(/To move directly towards a place/i)).toBeInTheDocument();
  });
});

describeChevronAndColour(LABEL, 'up for', renderPage);

describe('MakeVerbPage — "up for" card view', () => {
  it('example is visible without expanding card', () => {
    renderPage();
    expandSection('up for');
    expect(screen.getByText(/"We worked late on Friday to make up for the time lost/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('up for');
    fireEvent.click(getCard(/To compensate for something bad, missing, or lost/i));
    expect(within(getCard(/To compensate for something bad, missing, or lost/i)).queryByRole('img')).not.toBeInTheDocument();
  });
});

describeDefaultImageCards(LABEL, 'up for', 'makeUpFor', /To compensate for something bad, missing, or lost/i, /"We worked late on Friday to make up for/i, renderPage, getCard);
