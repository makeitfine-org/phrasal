import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'DropVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('DropVerbPage — "into" section definitions', () => {
  it('renders definition for visiting a place briefly', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To visit a place briefly\./i)).toBeInTheDocument();
  });

  it('renders definition for accidentally falling into a habit', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To accidentally fall into a habit or state\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To visit a place briefly\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('into');
    expect(screen.getByText(/To visit a place briefly\./i)).toHaveAttribute(
      'title',
      'To visit a place briefly.'
    );
  });
});

describeSectionToggle(LABEL, 'into', 'dropInto_section_expanded', /To visit a place briefly\./i, renderPage);

describeChevronAndColour(LABEL, 'into', renderPage);

describeDefaultImageCards(LABEL, 'into', 'dropInto', /To visit a place briefly\./i, /I will drop into the IT department/i, renderPage, getCard);
