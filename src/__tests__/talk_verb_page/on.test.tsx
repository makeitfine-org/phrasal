import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'TalkVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('TalkVerbPage — "on" section definitions', () => {
  it('renders definition for continuing to talk for a long time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue talking, often for a long time or in a boring way\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue talking, often for a long time or in a boring way\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To continue talking, often for a long time or in a boring way\./i)).toHaveAttribute(
      'title',
      'To continue talking, often for a long time or in a boring way.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'talkOn_section_expanded', /To continue talking, often for a long time or in a boring way\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'talkOn', /To continue talking, often for a long time or in a boring way\./i, /He talked on and on about his holiday\./i, renderPage, getCard);
