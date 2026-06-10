import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LogVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LogVerbPage — "off" section definitions', () => {
  it('renders definition for disconnecting from a computer network', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disconnect from a computer network or system/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disconnect from a computer network or system/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disconnect from a computer network or system/i)).toHaveAttribute(
      'title',
      'To disconnect from a computer network or system (same meaning as log out).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'logOff_section_expanded', /To disconnect from a computer network or system/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'logOff', /To disconnect from a computer network or system/i, /Make sure you log off your workstation before leaving the office\./i, renderPage, getCard);
