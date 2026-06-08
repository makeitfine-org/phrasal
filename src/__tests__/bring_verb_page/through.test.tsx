import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'BringVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('BringVerbPage — "through" section definitions', () => {
  it('renders definition for helping someone survive a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone successfully survive a very difficult/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone successfully survive a very difficult/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To help someone successfully survive a very difficult/i)).toHaveAttribute(
      'title',
      'To help someone successfully survive a very difficult, dangerous, or life-threatening situation.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'bringThrough_section_expanded', /To help someone successfully survive a very difficult/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'bringThrough', /To help someone successfully survive a very difficult/i, /The incredible medical team brought him through/i, renderPage, getCard);
