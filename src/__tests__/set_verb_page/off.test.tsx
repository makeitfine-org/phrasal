import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "off" section definitions', () => {
  it('renders definition for starting a journey', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To start a journey\./i)).toBeInTheDocument();
  });

  it('renders definition for causing an alarm to ring', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause an alarm to ring or a bomb to explode\./i)).toBeInTheDocument();
  });

  it('renders definition for causing a series of events to happen', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To cause a series of events to happen\./i)).toBeInTheDocument();
  });

  it('renders definition for making someone start laughing or crying', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To make someone start laughing or crying\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To start a journey\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To start a journey\./i)).toHaveAttribute(
      'title',
      'To start a journey.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'setOff_section_expanded', /To start a journey\./i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'setOff', /To start a journey\./i, /They set off for the tech conference in Berlin at 8:00 AM\./i, renderPage, getCard);
