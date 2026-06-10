import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "with" section definitions', () => {
  it('renders definition for approving of an idea', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To approve of an idea or activity \(almost always used in the negative\)\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To approve of an idea or activity/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To approve of an idea or activity/i)).toHaveAttribute(
      'title',
      'To approve of an idea or activity (almost always used in the negative).'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'holdWith_section_expanded', /To approve of an idea or activity/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'holdWith', /To approve of an idea or activity/i, /I do not hold with micromanaging experienced developers/i, renderPage, getCard);
