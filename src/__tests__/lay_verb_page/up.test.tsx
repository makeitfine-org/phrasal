import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LayVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LayVerbPage — "up" section definitions', () => {
  it('renders definition for being forced to stay in bed', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be forced to stay in bed because of illness or injury/i)).toBeInTheDocument();
  });

  it('renders definition for taking something out of active use', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To take something out of active use and store it/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be forced to stay in bed because of illness or injury/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To be forced to stay in bed because of illness or injury/i)).toHaveAttribute(
      'title',
      'To be forced to stay in bed because of illness or injury (usually used in the passive: "laid up").'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'layUp_section_expanded', /To be forced to stay in bed because of illness or injury/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'layUp', /To be forced to stay in bed because of illness or injury/i, /Our project manager is laid up with the flu and won't be in the office this week\./i, renderPage, getCard);
