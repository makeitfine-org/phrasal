import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "out" section definitions', () => {
  it('renders definition for using all of a supply', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use all of a supply so there is nothing left/i)).toBeInTheDocument();
  });

  it('renders definition for expiring', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To expire \(for a contract, document, or agreement\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use all of a supply so there is nothing left/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To use all of a supply so there is nothing left/i)).toHaveAttribute(
      'title',
      'To use all of a supply so there is nothing left.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'runOut_section_expanded', /To use all of a supply so there is nothing left/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'runOut', /To use all of a supply so there is nothing left/i, /We ran out of budget before finishing/i, renderPage, getCard);
