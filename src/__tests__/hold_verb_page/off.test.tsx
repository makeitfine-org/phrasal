import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "off" section definitions', () => {
  it('renders definition for delaying something', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay doing something\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping a competitor', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To stop an opponent or competitor from defeating you\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay doing something\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To delay doing something\./i)).toHaveAttribute(
      'title',
      'To delay doing something.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'holdOff_section_expanded', /To delay doing something\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'holdOff', /To delay doing something\./i, /We decided to hold off on deploying the new Java application/i, renderPage, getCard);
