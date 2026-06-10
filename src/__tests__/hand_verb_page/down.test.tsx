import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'HandVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('HandVerbPage — "down" section definitions', () => {
  it('renders definition for passing knowledge from an older person to a younger person', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To pass knowledge, traditions, or items from an older person to a younger person/i)).toBeInTheDocument();
  });

  it('renders definition for officially announcing a formal or legal decision', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To officially announce a formal or legal decision\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To pass knowledge, traditions, or items from an older person to a younger person/i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('down');
    expect(screen.getByText(/To pass knowledge, traditions, or items from an older person to a younger person/i)).toHaveAttribute(
      'title',
      'To pass knowledge, traditions, or items from an older person to a younger person (or from a predecessor to a successor).'
    );
  });
});

describeSectionToggle(LABEL, 'down', 'handDown_section_expanded', /To pass knowledge, traditions, or items from an older person to a younger person/i, renderPage);

describeChevronAndColour(LABEL, 'down', renderPage);

describeDefaultImageCards(LABEL, 'down', 'handDown', /To pass knowledge, traditions, or items from an older person to a younger person/i, /The retiring CEO handed down his leadership principles to the new management team\./i, renderPage, getCard);
