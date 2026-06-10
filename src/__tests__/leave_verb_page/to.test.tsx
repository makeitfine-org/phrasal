import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LeaveVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LeaveVerbPage — "to" section definitions', () => {
  it('renders definition for giving responsibility to someone else', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give someone else the responsibility or authority to handle a task/i)).toBeInTheDocument();
  });

  it('renders definition for giving money in a will', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give money or property to someone in a will/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give someone else the responsibility or authority to handle a task/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To give someone else the responsibility or authority to handle a task/i)).toHaveAttribute(
      'title',
      'To give someone else the responsibility or authority to handle a task.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'leaveTo_section_expanded', /To give someone else the responsibility or authority to handle a task/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'leaveTo', /To give someone else the responsibility or authority to handle a task/i, /I don't know how to fix this server error; I'll leave it to the IT department\./i, renderPage, getCard);
