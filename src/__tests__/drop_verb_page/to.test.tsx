import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "to" section definitions', () => {
  it('renders definition for decreasing to a specific level', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To decrease to a specific level or amount\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To decrease to a specific level or amount\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To decrease to a specific level or amount\./i)).toHaveAttribute(
      'title',
      'To decrease to a specific level or amount.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'dropTo_section_expanded', /To decrease to a specific level or amount\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'dropTo', /To decrease to a specific level or amount\./i, /The server response time dropped to 50 milliseconds/i, renderPage, getCard);
