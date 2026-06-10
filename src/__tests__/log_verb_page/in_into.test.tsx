import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'LogVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('LogVerbPage — "in / into" section definitions', () => {
  it('renders definition for providing credentials to access a system', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To provide credentials \(like a username and password\)/i)).toBeInTheDocument();
  });

  it('renders definition for officially recording arrival', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To officially record that someone has arrived/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To provide credentials \(like a username and password\)/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in / into');
    expect(screen.getByText(/To provide credentials \(like a username and password\)/i)).toHaveAttribute(
      'title',
      'To provide credentials (like a username and password) to access a computer system, application, or network.'
    );
  });
});

describeSectionToggle(LABEL, 'in / into', 'logIn_section_expanded', /To provide credentials \(like a username and password\)/i, renderPage);

describeChevronAndColour(LABEL, 'in / into', renderPage);

describeDefaultImageCards(LABEL, 'in / into', 'logIn', /To provide credentials \(like a username and password\)/i, /You must log into the Java application using your administrator credentials\./i, renderPage, getCard);
