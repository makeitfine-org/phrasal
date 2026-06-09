import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "forward" section definitions', () => {
  it('renders definition for asking someone to step forward', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To ask someone to step to the front of a group\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To ask someone to step to the front of a group\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('forward');
    expect(screen.getByText(/To ask someone to step to the front of a group\./i)).toHaveAttribute(
      'title',
      'To ask someone to step to the front of a group.'
    );
  });
});

describeSectionToggle(LABEL, 'forward', 'callForward_section_expanded', /To ask someone to step to the front of a group\./i, renderPage);

describeChevronAndColour(LABEL, 'forward', renderPage);

describeDefaultImageCards(LABEL, 'forward', 'callForward', /To ask someone to step to the front of a group\./i, /called the project manager forward to receive an award/i, renderPage, getCard);
