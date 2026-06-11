import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'ShutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('ShutVerbPage — "down" section definitions', () => {
  it('renders definition for turning off a computer or machine', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To turn off a computer, machine, or system completely\./i)).toBeInTheDocument();
  });

  it('renders definition for closing a business permanently', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To close a business or factory permanently or for a long time\./i)).toBeInTheDocument();
  });

  it('renders definition for stopping an opponent from succeeding', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To stop an opponent from playing well or succeeding/i)).toBeInTheDocument();
  });

  it('all 3 definition paragraphs have truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To turn off a computer, machine, or system completely\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To close a business or factory permanently or for a long time\./i)).toHaveClass('truncate');
    expect(screen.getByText(/To stop an opponent from playing well or succeeding/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To turn off a computer, machine, or system completely\./i)).toHaveAttribute(
      'title',
      'To turn off a computer, machine, or system completely.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'shutDown_section_expanded', /To turn off a computer, machine, or system completely\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'shutDown', /To turn off a computer, machine, or system completely\./i, /Always remember to shut down your laptop before putting it in your bag\./i, renderPage, getCard);
