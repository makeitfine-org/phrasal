import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'SetVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('SetVerbPage — "to" section definitions', () => {
  it('renders definition for starting working with energy and determination', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start working or doing something with a lot of energy and determination\./i)).toBeInTheDocument();
  });

  it('definition paragraph has truncate class', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start working or doing something with a lot of energy and determination\./i)).toHaveClass('truncate');
  });

  it('definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('to');
    expect(screen.getByText(/To start working or doing something with a lot of energy and determination\./i)).toHaveAttribute(
      'title',
      'To start working or doing something with a lot of energy and determination.'
    );
  });
});

describeSectionToggle(LABEL, 'to', 'setTo_section_expanded', /To start working or doing something with a lot of energy and determination\./i, renderPage);

describeChevronAndColour(LABEL, 'to', renderPage);

describeDefaultImageCards(LABEL, 'to', 'setTo', /To start working or doing something with a lot of energy and determination\./i, /The developers set to and fixed all the major bugs before the deadline\./i, renderPage, getCard);
