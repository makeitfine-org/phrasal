import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "with" section definitions', () => {
  it('renders definition for giving an object to someone temporarily', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To give an object to someone so they can keep it safe or take care of it temporarily/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To give an object to someone so they can keep it safe or take care of it temporarily/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To give an object to someone so they can keep it safe or take care of it temporarily/i)).toHaveAttribute(
      'title',
      'To give an object to someone so they can keep it safe or take care of it temporarily.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'leaveWith_section_expanded', /To give an object to someone so they can keep it safe or take care of it temporarily/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'leaveWith', /To give an object to someone so they can keep it safe or take care of it temporarily/i, /Can I leave my heavy bags with you while I quickly run to the store\?/i, renderPage, getCard);
