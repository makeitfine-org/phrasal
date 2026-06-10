import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HangVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HangVerbPage — "off" section definitions', () => {
  it('renders definition for holding onto the side of something to prevent falling', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hold onto the side of something to prevent yourself from falling\./i)).toBeInTheDocument();
  });

  it('renders definition for hesitating or waiting before taking an action', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hesitate or wait before taking an action/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hold onto the side of something to prevent yourself from falling\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To hold onto the side of something to prevent yourself from falling\./i)).toHaveAttribute(
      'title',
      'To hold onto the side of something to prevent yourself from falling.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'hangOff_section_expanded', /To hold onto the side of something to prevent yourself from falling\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'hangOff', /To hold onto the side of something to prevent yourself from falling\./i, /The rescue worker was hanging off the side of the helicopter\./i, renderPage, getCard);
