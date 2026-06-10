import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HoldVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HoldVerbPage — "down" section definitions', () => {
  it('renders definition for keeping a job', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep a job for a period of time\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping costs low', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To keep costs, prices, or numbers at a low level\./i)).toBeInTheDocument();
  });

  it('renders definition for physically preventing movement', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To physically prevent someone or something from moving\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep a job for a period of time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To manage to keep a job for a period of time\./i)).toHaveAttribute(
      'title',
      'To manage to keep a job for a period of time.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'holdDown_section_expanded', /To manage to keep a job for a period of time\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'holdDown', /To manage to keep a job for a period of time\./i, /It requires excellent leadership skills to hold down a management position/i, renderPage, getCard);
