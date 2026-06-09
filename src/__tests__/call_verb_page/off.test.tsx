import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "off" section definitions', () => {
  it('renders definition for cancelling an event', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel an event, meeting, or agreement that was planned\./i)).toBeInTheDocument();
  });

  it('renders definition for ordering to stop attacking', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To order a person or animal to stop attacking or searching\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel an event, meeting, or agreement that was planned\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cancel an event, meeting, or agreement that was planned\./i)).toHaveAttribute(
      'title',
      'To cancel an event, meeting, or agreement that was planned.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'callOff_section_expanded', /To cancel an event, meeting, or agreement that was planned\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'callOff', /To cancel an event, meeting, or agreement that was planned\./i, /call off the project meeting/i, renderPage, getCard);
