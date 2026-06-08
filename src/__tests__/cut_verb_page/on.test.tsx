import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CutVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CutVerbPage — "on" section definitions', () => {
  it('renders definition for turning on a device', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To turn on a device or switch/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To turn on a device or switch/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To turn on a device or switch/i)).toHaveAttribute(
      'title',
      'To turn on a device or switch (Regional/Southern US).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'cutOn_section_expanded', /To turn on a device or switch/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'cutOn', /To turn on a device or switch/i, /Can you cut on the lights/i, renderPage, getCard);
