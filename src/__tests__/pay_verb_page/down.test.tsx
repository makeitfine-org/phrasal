import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PayVerbPage — "down" section definitions', () => {
  it('renders definition for reducing total debt by paying a portion', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the total amount of a debt by paying a portion of it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the total amount of a debt by paying a portion of it/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To reduce the total amount of a debt by paying a portion of it/i)).toHaveAttribute(
      'title',
      'To reduce the total amount of a debt by paying a portion of it.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'payDown_section_expanded', /To reduce the total amount of a debt by paying a portion of it/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'payDown', /To reduce the total amount of a debt by paying a portion of it/i, /The management team decided to pay down the company's debt before investing in new projects\./i, renderPage, getCard);
