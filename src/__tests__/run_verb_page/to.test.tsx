import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'RunVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('RunVerbPage — "to" section definitions', () => {
  it('renders definition for reaching a particular amount or cost', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a particular amount or cost/i)).toBeInTheDocument();
  });

  it('renders definition for asking someone for help too quickly', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To ask someone for help, often too quickly/i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a particular amount or cost/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To reach a particular amount or cost/i)).toHaveAttribute(
      'title',
      'To reach a particular amount or cost.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'runTo_section_expanded', /To reach a particular amount or cost/i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'runTo', /To reach a particular amount or cost/i, /The costs for upgrading the IT infrastructure will run to/i, renderPage, getCard);
