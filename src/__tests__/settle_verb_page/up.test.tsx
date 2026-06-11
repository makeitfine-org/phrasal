import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "up" section definitions', () => {
  it('renders definition for paying money owed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay money that you owe, usually to balance an account or share a bill\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay money that you owe, usually to balance an account or share a bill\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To pay money that you owe, usually to balance an account or share a bill\./i)).toHaveAttribute(
      'title',
      'To pay money that you owe, usually to balance an account or share a bill.'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'settleUp_section_expanded', /To pay money that you owe, usually to balance an account or share a bill\./i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'settleUp', /To pay money that you owe, usually to balance an account or share a bill\./i, /I will pay for the client's lunch now, and we can settle up when we get back to the office\./i, renderPage, getCard);
