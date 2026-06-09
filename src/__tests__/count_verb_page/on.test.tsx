import { screen } from '@testing-library/react';
import { renderPage, getCard, expandSection } from './helpers';
import { describeChevronAndColour, describeSectionToggle, describeDefaultImageCards } from '../verbPage/sharedSectionTests';

const LABEL = 'CountVerbPage';

beforeEach(() => {
  localStorage.clear();
});

describe('CountVerbPage — "on" section definitions', () => {
  it('renders definition for depending on someone', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or rely on someone to do something\./i)).toBeInTheDocument();
  });

  it('renders definition for expecting something to happen', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To expect something to happen and base your plans on it\./i)).toBeInTheDocument();
  });

  it('first definition paragraph has truncate class', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or rely on someone to do something\./i)).toHaveClass('truncate');
  });

  it('first definition paragraph has title attribute with full text', () => {
    renderPage();
    expandSection('on');
    expect(screen.getByText(/To depend or rely on someone to do something\./i)).toHaveAttribute(
      'title',
      'To depend or rely on someone to do something.'
    );
  });
});

describeSectionToggle(LABEL, 'on', 'countOn_section_expanded', /To depend or rely on someone to do something\./i, renderPage);

describeChevronAndColour(LABEL, 'on', renderPage);

describeDefaultImageCards(LABEL, 'on', 'countOn', /To depend or rely on someone to do something\./i, /You can always count on Sarah/i, renderPage, getCard);
