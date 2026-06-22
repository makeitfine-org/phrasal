import { screen } from '@testing-library/react';
import { expandSection, getCard, renderPage } from './helpers';
import { describeChevronAndColour, describeDefaultImageCards, describeSectionToggle } from '../verbPage/sharedSectionTests';

const LABEL = 'LogVerbPage';

beforeEach(() => {
  localStorage.clear();
});

// --- in_into ---

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

// --- off ---

describe('LogVerbPage — "off" section definitions', () => {
  it('renders definition for disconnecting from a computer network', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disconnect from a computer network or system/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disconnect from a computer network or system/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To disconnect from a computer network or system/i)).toHaveAttribute(
      'title',
      'To disconnect from a computer network or system (same meaning as log out).'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'logOff_section_expanded', /To disconnect from a computer network or system/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'logOff', /To disconnect from a computer network or system/i, /Make sure you log off your workstation before leaving the office\./i, renderPage, getCard);

// --- on ---

describe('LogVerbPage — "on" section definitions', () => {
  it('renders definition for connecting to a computer network', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To connect to a computer network or start using a digital system/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To connect to a computer network or start using a digital system/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To connect to a computer network or start using a digital system/i)).toHaveAttribute(
      'title',
      'To connect to a computer network or start using a digital system (same meaning as log in).'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'logOn_section_expanded', /To connect to a computer network or start using a digital system/i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'logOn', /To connect to a computer network or start using a digital system/i, /The project manager logged on to the company network to review the latest software release\./i, renderPage, getCard);

// --- out ---

describe('LogVerbPage — "out" section definitions', () => {
  it('renders definition for safely closing a session', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To safely close your session and disconnect from a system/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To safely close your session and disconnect from a system/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('out');
    expect(screen.getByText(/To safely close your session and disconnect from a system/i)).toHaveAttribute(
      'title',
      'To safely close your session and disconnect from a system, application, or website.'
    );
  });
});

describeSectionToggle(LABEL, 'out', 'logOut_section_expanded', /To safely close your session and disconnect from a system/i, renderPage);

describeChevronAndColour(LABEL, 'out', renderPage);

describeDefaultImageCards(LABEL, 'out', 'logOut', /To safely close your session and disconnect from a system/i, /Always remember to log out of the database when you finish your shift\./i, renderPage, getCard);

// --- up ---

describe('LogVerbPage — "up" section definitions', () => {
  it('renders definition for achieving or recording a specific amount', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To achieve, record, or complete a specific amount of time/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To achieve, record, or complete a specific amount of time/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('up');
    expect(screen.getByText(/To achieve, record, or complete a specific amount of time/i)).toHaveAttribute(
      'title',
      'To achieve, record, or complete a specific amount of time, distance, or number of items (more common in British English).'
    );
  });
});

describeSectionToggle(LABEL, 'up', 'logUp_section_expanded', /To achieve, record, or complete a specific amount of time/i, renderPage);

describeChevronAndColour(LABEL, 'up', renderPage);

describeDefaultImageCards(LABEL, 'up', 'logUp', /To achieve, record, or complete a specific amount of time/i, /The development team has logged up over 200 hours of overtime to meet the project deadline\./i, renderPage, getCard);
