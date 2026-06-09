import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "in" section definitions', () => {
  it('renders definition for asking an expert to help', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To ask an expert or specialist to come and help with a problem\./i)).toBeInTheDocument();
  });

  it('renders definition for telephoning office or show', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To telephone your office or a radio\/TV show\./i)).toBeInTheDocument();
  });

  it('renders definition for product recall', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To demand that people return a product because it is broken or dangerous/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To ask an expert or specialist to come and help with a problem\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('in');
    expect(screen.getByText(/To ask an expert or specialist to come and help with a problem\./i)).toHaveAttribute(
      'title',
      'To ask an expert or specialist to come and help with a problem.'
    );
  });
});

describeSectionToggle(LABEL, 'in', 'callIn_section_expanded', /To ask an expert or specialist to come and help with a problem\./i, renderPage);

describeChevronAndColour(LABEL, 'in', renderPage);

describeDefaultImageCards(LABEL, 'in', 'callIn', /To ask an expert or specialist to come and help with a problem\./i, /call in an external IT consultant/i, renderPage, getCard);
