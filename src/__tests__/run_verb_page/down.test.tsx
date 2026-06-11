import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "down" section definitions', () => {
  it('renders definition for losing power or energy', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose power/i)).toBeInTheDocument();
  });

  it('renders definition for criticizing someone constantly', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To criticize someone constantly/i)).toBeInTheDocument();
  });

  it('renders definition for finding the source of something after a long search', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To find the source of something after a long search/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose power/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To lose power/i)).toHaveAttribute(
      'title',
      'To lose power (a battery/machine) or energy (a person).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'runDown_section_expanded', /To lose power/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'runDown', /To lose power/i, /The server.*s backup battery finally ran down/i, renderPage, getCard);
