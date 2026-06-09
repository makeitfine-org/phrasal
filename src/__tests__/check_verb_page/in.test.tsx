import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CheckVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CheckVerbPage — "in" section definitions', () => {
  it('renders definition for registering arrival at a hotel', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To register your arrival at a hotel, airport, or event\./i)).toBeInTheDocument();
  });

  it('renders definition for contacting someone briefly', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To contact someone briefly to give an update or make sure everything is okay\./i)).toBeInTheDocument();
  });

  it('renders definition for uploading source code to version control', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To upload or save source code to a version control system/i)).toBeInTheDocument();
  });

  it('renders definition for leaving bags at the airport', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To leave your bags at the airport before a flight\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To register your arrival at a hotel, airport, or event\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To register your arrival at a hotel, airport, or event\./i)).toHaveAttribute(
      'title',
      'To register your arrival at a hotel, airport, or event.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'checkIn_section_expanded', /To register your arrival at a hotel, airport, or event\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'checkIn', /To register your arrival at a hotel, airport, or event\./i, /The CEO checked in at the hotel right before the leadership conference\./i, renderPage, getCard);
