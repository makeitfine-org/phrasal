import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SettleVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SettleVerbPage — "down" section definitions', () => {
  it('renders definition for becoming quiet and relaxed', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To become quiet and relaxed after being excited, nervous, or angry\./i)).toBeInTheDocument();
  });

  it('renders definition for starting a quiet stable life', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To start living a quiet, stable life/i)).toBeInTheDocument();
  });

  it('renders definition for paying serious attention to a task', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To start paying serious attention to a task/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To become quiet and relaxed after being excited, nervous, or angry\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To become quiet and relaxed after being excited, nervous, or angry\./i)).toHaveAttribute(
      'title',
      'To become quiet and relaxed after being excited, nervous, or angry.'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'settleDown_section_expanded', /To become quiet and relaxed after being excited, nervous, or angry\./i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'settleDown', /To become quiet and relaxed after being excited, nervous, or angry\./i, /The manager waited for the noisy room to settle down before starting her presentation\./i, renderPage, getCard);
