import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "about / around" section definitions', () => {
  it('renders definition for putting things in random places', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To put things in random places in an untidy way/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To put things in random places in an untidy way/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('about / around');
    expect(screen.getByText(/To put things in random places in an untidy way/i)).toHaveAttribute(
      'title',
      'To put things in random places in an untidy way, making a mess.'
    );
  });
});

describeSectionToggle(LABEL, 'about / around', 'leaveAbout_section_expanded', /To put things in random places in an untidy way/i, renderPage);

describeChevronAndColour(LABEL, 'about / around', renderPage);

describeDefaultImageCards(LABEL, 'about / around', 'leaveAbout', /To put things in random places in an untidy way/i, /Please don't leave your dirty clothes around the house\./i, renderPage, getCard);
