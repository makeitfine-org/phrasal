import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'PassVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('PassVerbPage — "over" section definitions', () => {
  it('renders definition for ignoring someone for a promotion', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore or not choose someone for a position or promotion/i)).toBeInTheDocument();
  });

  it('renders definition for ignoring a topic in conversation', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore a topic in a conversation/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore or not choose someone for a position or promotion/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('over');
    expect(screen.getByText(/To ignore or not choose someone for a position or promotion/i)).toHaveAttribute(
      'title',
      'To ignore or not choose someone for a position or promotion.'
    );
  });
});

describeSectionToggle(LABEL, 'over', 'passOver_section_expanded', /To ignore or not choose someone for a position or promotion/i, renderPage);

describeChevronAndColour(LABEL, 'over', renderPage);

describeDefaultImageCards(LABEL, 'over', 'passOver', /To ignore or not choose someone for a position or promotion/i, /She was passed over for the leadership role, so she decided to leave the company\./i, renderPage, getCard);
