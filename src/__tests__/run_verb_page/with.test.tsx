import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "with" section definitions', () => {
  it('renders definition for taking an idea and developing it independently', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take an idea and develop it independently/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take an idea and develop it independently/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To take an idea and develop it independently/i)).toHaveAttribute(
      'title',
      'To take an idea and develop it independently.'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'runWith_section_expanded', /To take an idea and develop it independently/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'runWith', /To take an idea and develop it independently/i, /The management team loved the proposal and told us to run with it/i, renderPage, getCard);
