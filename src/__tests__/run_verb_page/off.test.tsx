import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "off" section definitions', () => {
  it('renders definition for quickly making copies of a document', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To quickly make copies of a document/i)).toBeInTheDocument();
  });

  it('renders definition for forcing someone to leave', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To force someone or something to leave/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To quickly make copies of a document/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('off');
    expect(screen.getByText(/To quickly make copies of a document/i)).toHaveAttribute(
      'title',
      'To quickly make copies of a document.'
    );
  });
});

describeSectionToggle(LABEL, 'off', 'runOff_section_expanded', /To quickly make copies of a document/i, renderPage);

describeChevronAndColour(LABEL, 'off', renderPage);

describeDefaultImageCards(LABEL, 'off', 'runOff', /To quickly make copies of a document/i, /Could you run off 20 copies of the meeting agenda/i, renderPage, getCard);
