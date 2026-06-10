import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'KeepVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('KeepVerbPage — "together" section definitions', () => {
  it('renders definition for staying in a group', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To stay in a group and not separate\./i)).toBeInTheDocument();
  });

  it('renders definition for not breaking apart', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To not break apart or fall to pieces\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To stay in a group and not separate\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('together');
    expect(screen.getByText(/To stay in a group and not separate\./i)).toHaveAttribute(
      'title',
      'To stay in a group and not separate.'
    );
  });
});

describeSectionToggle(LABEL, 'together', 'keepTogether_section_expanded', /To stay in a group and not separate\./i, renderPage);

describeChevronAndColour(LABEL, 'together', renderPage);

describeDefaultImageCards(LABEL, 'together', 'keepTogether', /To stay in a group and not separate\./i, /We need to keep together so we don't get lost in the city\./i, renderPage, getCard);
