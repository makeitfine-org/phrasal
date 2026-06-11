import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "ahead" section definitions', () => {
  it('renders definition for changing time on a clock to a later time', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To change the time on a clock to a later time\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To change the time on a clock to a later time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('ahead');
    expect(screen.getByText(/To change the time on a clock to a later time\./i)).toHaveAttribute(
      'title',
      'To change the time on a clock to a later time.'
    );
  });
});

describeSectionToggle(LABEL, 'ahead', 'setAhead_section_expanded', /To change the time on a clock to a later time\./i, renderPage);

describeChevronAndColour(LABEL, 'ahead', renderPage);

describeDefaultImageCards(LABEL, 'ahead', 'setAhead', /To change the time on a clock to a later time\./i, /Don't forget to set your clocks ahead by one hour this weekend\./i, renderPage, getCard);
