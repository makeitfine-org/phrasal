import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DoVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DoVerbPage — "with" section definitions', () => {
  it('renders definition for needing or wanting something', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To need or want something/i)).toBeInTheDocument();
  });

  it('renders definition for having a connection or relationship with', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To have a connection or relationship with/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To need or want something/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('with');
    expect(screen.getByText(/To need or want something/i)).toHaveAttribute(
      'title',
      'To need or want something (always used with "could" or "can").'
    );
  });
});

describeSectionToggle(LABEL, 'with', 'doWith_section_expanded', /To need or want something/i, renderPage);

describeChevronAndColour(LABEL, 'with', renderPage);

describeDefaultImageCards(LABEL, 'with', 'doWith', /To need or want something/i, /I could really do with a hot cup of coffee/i, renderPage, getCard);
