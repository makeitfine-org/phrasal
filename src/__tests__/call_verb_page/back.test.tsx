import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CallVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CallVerbPage — "back" section definitions', () => {
  it('renders definition for returning a phone call', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return a telephone call\./i)).toBeInTheDocument();
  });

  it('renders definition for asking someone to return for an interview', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To ask someone to return for a second job interview\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return a telephone call\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('back');
    expect(screen.getByText(/To return a telephone call\./i)).toHaveAttribute(
      'title',
      'To return a telephone call.'
    );
  });
});

describeSectionToggle(LABEL, 'back', 'callBack_section_expanded', /To return a telephone call\./i, renderPage);

describeChevronAndColour(LABEL, 'back', renderPage);

describeDefaultImageCards(LABEL, 'back', 'callBack', /To return a telephone call\./i, /call you back in an hour/i, renderPage, getCard);
