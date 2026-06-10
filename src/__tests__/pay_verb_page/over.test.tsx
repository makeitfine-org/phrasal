import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "over" section definitions', () => {
  it('renders definition for transferring money to someone in authority', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer money to someone in authority or to a third party/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer money to someone in authority or to a third party/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To transfer money to someone in authority or to a third party/i)).toHaveAttribute(
      'title',
      'To transfer money to someone in authority or to a third party.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'payOver_section_expanded', /To transfer money to someone in authority or to a third party/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'payOver', /To transfer money to someone in authority or to a third party/i, /The business is required to pay over all collected taxes to the government at the end of the quarter\./i, renderPage, getCard);
