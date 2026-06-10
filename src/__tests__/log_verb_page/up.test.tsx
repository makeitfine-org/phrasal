import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LogVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LogVerbPage — "up" section definitions', () => {
  it('renders definition for achieving or recording a specific amount', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To achieve, record, or complete a specific amount of time/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To achieve, record, or complete a specific amount of time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To achieve, record, or complete a specific amount of time/i)).toHaveAttribute(
      'title',
      'To achieve, record, or complete a specific amount of time, distance, or number of items (more common in British English).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'logUp_section_expanded', /To achieve, record, or complete a specific amount of time/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'logUp', /To achieve, record, or complete a specific amount of time/i, /The development team has logged up over 200 hours of overtime to meet the project deadline\./i, renderPage, getCard);
