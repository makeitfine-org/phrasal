import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "on" section definitions', () => {
  it('renders definition for waiting for a short time', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time\./i)).toBeInTheDocument();
  });

  it('renders definition for holding something very securely', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To hold something very securely\./i)).toBeInTheDocument();
  });

  it('renders definition for keeping something instead of throwing it away', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To keep something instead of throwing it away/i)).toBeInTheDocument();
  });

  it('renders definition for relying or depending completely on something', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To rely or depend completely on something\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To wait for a short time\./i)).toHaveAttribute(
      'title',
      'To wait for a short time.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'hangOn_section_expanded', /To wait for a short time\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'hangOn', /To wait for a short time\./i, /Hang on a minute, I need to find my laptop charger\./i, renderPage, getCard);
