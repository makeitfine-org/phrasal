import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "through" section definitions', () => {
  it('renders definition for looking at a collection of items carefully', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To look at or read a collection of items carefully\./i)).toBeInTheDocument();
  });

  it('renders definition for sending luggage directly to a final destination', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To send luggage directly to a final destination without needing to collect it during a connection\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To look at or read a collection of items carefully\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('through');
    expect(screen.getByText(/To look at or read a collection of items carefully\./i)).toHaveAttribute(
      'title',
      'To look at or read a collection of items carefully.'
    );
  });
});

describeSectionToggle(LABEL, 'through', 'checkThrough_section_expanded', /To look at or read a collection of items carefully\./i, renderPage);

describeChevronAndColour(LABEL, 'through', renderPage);

describeDefaultImageCards(LABEL, 'through', 'checkThrough', /To look at or read a collection of items carefully\./i, /I checked through the error logs to find where the Java exception happened\./i, renderPage, getCard);
