import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "around / round" section definitions', () => {
  it('renders definition for recovering from serious illness', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To recover from a serious illness or injury/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To recover from a serious illness or injury/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('around / round');
    expect(screen.getByText(/To recover from a serious illness or injury/i)).toHaveAttribute(
      'title',
      'To recover from a serious illness or injury (mostly British English).'
    );
  });
});

describeSectionToggle(LABEL, 'around / round', 'pullAround_section_expanded', /To recover from a serious illness or injury/i, renderPage);

describeChevronAndColour(LABEL, 'around / round', renderPage);

describeDefaultImageCards(LABEL, 'around / round', 'pullAround', /To recover from a serious illness or injury/i, /He was very sick after the surgery/i, renderPage, getCard);
