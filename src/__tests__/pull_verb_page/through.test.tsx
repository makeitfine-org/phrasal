import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PullVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PullVerbPage — "through" section definitions', () => {
  it('renders definition for recovering from serious illness', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To recover from a very serious illness or injury/i)).toBeInTheDocument();
  });

  it('renders definition for succeeding in a difficult situation', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To succeed in a very difficult situation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To recover from a very serious illness or injury/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To recover from a very serious illness or injury/i)).toHaveAttribute(
      'title',
      'To recover from a very serious illness or injury.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'pullThrough_section_expanded', /To recover from a very serious illness or injury/i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'pullThrough', /To recover from a very serious illness or injury/i, /the doctors are confident she will pull through/i, renderPage, getCard);
