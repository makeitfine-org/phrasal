import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "together" section definitions', () => {
  it('renders definition for mixing so things cannot be separated', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To mix or blend so that things cannot be separated/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To mix or blend so that things cannot be separated/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To mix or blend so that things cannot be separated/i)).toHaveAttribute(
      'title',
      'To mix or blend so that things cannot be separated.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'runTogether_section_expanded', /To mix or blend so that things cannot be separated/i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'runTogether', /To mix or blend so that things cannot be separated/i, /your professional and personal lives can easily run together/i, renderPage, getCard);
