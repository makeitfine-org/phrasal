import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PickVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PickVerbPage — "off" section definitions', () => {
  it('renders definition for targeting or shooting one by one', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To target or shoot one by one/i)).toBeInTheDocument();
  });

  it('renders definition for removing something by pulling it', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To remove something by pulling it/i)).toBeInTheDocument();
  });

  it('renders definition for intercepting in sports', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To intercept \(often in sports\)/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To target or shoot one by one/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To target or shoot one by one/i)).toHaveAttribute(
      'title',
      'To target or shoot one by one.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'pickOff_section_expanded', /To target or shoot one by one/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'pickOff', /To target or shoot one by one/i, /The sniper picked off the enemy guards from a distance\./i, renderPage, getCard);
