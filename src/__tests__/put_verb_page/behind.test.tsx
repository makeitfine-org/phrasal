import { screen, fireEvent, within } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describeSectionToggle(LABEL, 'behind', 'putBehind_section_expanded', /To forget about a bad experience and move on/i, renderPage);

describeChevronAndColour(LABEL, 'behind', renderPage);

describe('PutVerbPage — "behind" card view', () => {
  it('example visible without expanding card', () => {
    renderPage();
    expandSection('behind');
    expect(screen.getByText(/"We lost a big client, but we need to put it behind us/i)).toBeInTheDocument();
  });

  it('clicking card does not render an image', () => {
    renderPage();
    expandSection('behind');
    fireEvent.click(getCard(/To forget about a bad experience and move on/i));
    expect(screen.queryAllByRole('img')).toHaveLength(0);
  });
});

describeDefaultImageCards(LABEL, 'behind', 'putBehind', /To forget about a bad experience and move on/i, /"We lost a big client, but we need to put it behind us/i, renderPage, getCard);
